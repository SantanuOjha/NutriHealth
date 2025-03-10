import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from dotenv import load_dotenv
import pathway as pw
from pathway.stdlib.indexing import default_vector_document_index

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Configure Google Generative AI
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if GOOGLE_API_KEY:
    genai.configure(api_key=GOOGLE_API_KEY)
    model = genai.GenerativeModel('gemini-pro')
else:
    print("Warning: GOOGLE_API_KEY not found in environment variables")

# Sample knowledge base for RAG
nutrition_knowledge = [
    {"id": 1, "content": "Protein is essential for muscle growth and repair. Good sources include lean meats, eggs, dairy, legumes, and plant-based alternatives."},
    {"id": 2, "content": "Carbohydrates are the body's main energy source. Complex carbs like whole grains, fruits, and vegetables provide sustained energy."},
    {"id": 3, "content": "Healthy fats support brain function and hormone production. Sources include avocados, nuts, seeds, and olive oil."},
    {"id": 4, "content": "Hydration is crucial for overall health. The recommended daily water intake is about 3.7 liters for men and 2.7 liters for women."},
    {"id": 5, "content": "Fiber aids digestion and helps maintain healthy blood sugar levels. Good sources include whole grains, fruits, vegetables, and legumes."}
]

# Initialize PathwayRAG (simplified version for demo)
class SimpleEmbedder:
    def __call__(self, texts):
        # This is a placeholder. In production, use a real embedding model
        return [[0.1] * 10 for _ in texts]

def setup_pathway_rag():
    # This is a simplified version. In production, use proper embedding models and indexing
    embedder = SimpleEmbedder()
    documents = pw.io.memory.from_list(
        [{"id": doc["id"], "content": doc["content"]} for doc in nutrition_knowledge],
        schema=pw.schema_from_dict({"id": int, "content": str})
    )
    
    # Create a simple index
    index = default_vector_document_index(
        documents.content, 
        documents, 
        embedder=embedder, 
        dimensions=10
    )
    
    return index

# Routes
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy"})

@app.route('/api/nutrition-advice', methods=['POST'])
def nutrition_advice():
    data = request.json
    query = data.get('query', '')
    
    if not query:
        return jsonify({"error": "Query is required"}), 400
    
    if not GOOGLE_API_KEY:
        return jsonify({"error": "API key not configured"}), 500
    
    try:
        # Simple RAG implementation
        # In production, use the proper PathwayRAG implementation
        context = "\n".join([doc["content"] for doc in nutrition_knowledge])
        
        prompt = f"""
        You are a nutrition and fitness expert. Use the following information to answer the user's question:
        
        {context}
        
        User question: {query}
        
        Provide a detailed, helpful response based on the information provided and your knowledge of nutrition and fitness.
        """
        
        response = model.generate_content(prompt)
        
        return jsonify({
            "response": response.text,
            "sources": [doc["id"] for doc in nutrition_knowledge]
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/fitness-plan', methods=['POST'])
def fitness_plan():
    data = request.json
    
    # Extract user information
    age = data.get('age')
    weight = data.get('weight')
    height = data.get('height')
    goals = data.get('goals')
    activity_level = data.get('activityLevel')
    
    if not all([age, weight, height, goals, activity_level]):
        return jsonify({"error": "Missing required user information"}), 400
    
    if not GOOGLE_API_KEY:
        return jsonify({"error": "API key not configured"}), 500
    
    try:
        prompt = f"""
        You are a fitness expert. Create a personalized fitness plan based on the following user information:
        
        Age: {age}
        Weight: {weight}
        Height: {height}
        Goals: {goals}
        Activity Level: {activity_level}
        
        Provide a detailed weekly fitness plan including:
        1. Recommended workout types and frequency
        2. Estimated calorie needs
        3. Specific exercises with sets and reps
        4. Rest day recommendations
        5. Progress tracking metrics
        
        Format the response in a structured, easy-to-follow manner.
        """
        
        response = model.generate_content(prompt)
        
        return jsonify({
            "plan": response.text
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 5000))) 