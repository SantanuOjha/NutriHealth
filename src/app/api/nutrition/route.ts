import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Add logging to check if API key is loaded
console.log('API Key present:', !!process.env.GOOGLE_API_KEY);

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { mealType, preferences, restrictions } = await request.json();
    console.log('Received request:', { mealType, preferences, restrictions });

    if (!process.env.GOOGLE_API_KEY) {
      console.error('GOOGLE_API_KEY is not set');
      return NextResponse.json({ error: 'AI service configuration error' }, { status: 500 });
    }

    // Generate nutritional advice using Google's Gemini
    try {
      console.log('Initializing Gemini model...');
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      const prompt = `Create a healthy meal plan for ${mealType} with the following considerations:
      Dietary Preferences: ${preferences}
      Restrictions: ${restrictions}
      
      Format the response as a JSON object with:
      - foodItems: array of food items with portions and calories
      - totalCalories: number
      - protein: number (in grams)
      - carbs: number (in grams)
      - fats: number (in grams)
      - notes: string (nutritional tips)`;

      console.log('Sending prompt to Gemini...');
      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      console.log('AI Response received:', responseText);
      
      try {
        const nutritionData = JSON.parse(responseText);
        console.log('Successfully parsed nutrition data:', nutritionData);
        
        // Save the nutrition log to database
        const log = await prisma.nutritionLog.create({
          data: {
            userId,
            date: new Date(),
            mealType,
            foodItems: nutritionData.foodItems,
            calories: nutritionData.totalCalories,
            protein: nutritionData.protein,
            carbs: nutritionData.carbs,
            fats: nutritionData.fats,
            notes: nutritionData.notes
          }
        });

        return NextResponse.json(log);
      } catch (parseError: any) {
        console.error('Error parsing AI response:', parseError);
        console.error('Raw AI response:', responseText);
        return NextResponse.json({ 
          error: 'Invalid AI response format',
          details: parseError.message,
          rawResponse: responseText 
        }, { status: 500 });
      }
    } catch (aiError: any) {
      console.error('AI Generation Error:', aiError);
      return NextResponse.json({ 
        error: 'Failed to generate AI response',
        details: aiError.message 
      }, { status: 500 });
    }
  } catch (error: any) {
    console.error('Error creating nutrition log:', error);
    return NextResponse.json(
      { error: 'Failed to create nutrition log', details: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const logs = await prisma.nutritionLog.findMany({
      where: { userId },
      orderBy: { date: 'desc' }
    });

    return NextResponse.json(logs);
  } catch (error) {
    console.error('Error fetching nutrition logs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch nutrition logs' },
      { status: 500 }
    );
  }
} 