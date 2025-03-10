# NutriHealth - AI-Powered Health & Fitness Insights

NutriHealth is a web application that provides personalized AI-based insights on health and fitness. It uses advanced AI technology to deliver customized nutrition advice and fitness plans tailored to individual needs and goals.

## Features

- **AI-Powered Nutrition Advice**: Get personalized nutrition recommendations based on your goals and preferences
- **Customized Fitness Plans**: Receive workout plans tailored to your fitness level and goals
- **User Authentication**: Secure user authentication with Clerk
- **Data Management**: Store and manage user data with Supabase
- **Responsive Design**: Beautiful and modern UI that works on all devices

## Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Backend**: Flask, PyTorch, Pathway RAG
- **AI**: Google Gemini AI
- **Authentication**: Clerk
- **Database**: Supabase
- **Deployment**: Vercel (frontend), Heroku (backend)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Python (v3.9 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/nutrihealth.git
   cd nutrihealth
   ```

2. Install frontend dependencies:

   ```bash
   npm install
   ```

3. Install backend dependencies:

   ```bash
   cd api
   pip install -r requirements.txt
   cd ..
   ```

   > **Note**: If you encounter issues installing the Pathway package, the application will automatically fall back to a simplified version that doesn't require Pathway.

   **Alternative minimal installation**: If you're having trouble with dependencies, you can use the minimal installation script:

   ```bash
   cd api
   python install_minimal.py
   cd ..
   ```

   This will install only the essential dependencies needed for the simplified backend.

4. Set up environment variables:

   - Create a `.env.local` file in the root directory with the following variables:

     ```
     # Clerk Authentication
     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
     CLERK_SECRET_KEY=your_clerk_secret_key

     # Supabase
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

     # Google Generative AI (Gemini)
     GOOGLE_API_KEY=your_google_api_key

     # API URL
     NEXT_PUBLIC_API_URL=http://localhost:5000
     ```

   - Create a `.env` file in the `api` directory with the following variables:

     ```
     # Google Generative AI (Gemini)
     GOOGLE_API_KEY=your_google_api_key

     # Flask settings
     PORT=5000
     DEBUG=True
     ```

### Running the Application

#### Option 1: Using the start scripts

**For Windows:**

Simply run the start.bat file:

```bash
start.bat
```

This will start both the backend and frontend servers in separate command windows. If there are issues with Python dependencies, it will automatically use a simplified backend version.

**For macOS/Linux:**

Make the shell script executable and run it:

```bash
chmod +x start.sh
./start.sh
```

This will start both servers and allow you to stop them with Ctrl+C. If there are issues with Python dependencies, it will automatically use a simplified backend version.

#### Option 2: Manual startup

1. Start the backend server:

   ```bash
   cd api
   python app.py
   ```

   If you encounter issues with Pathway, you can use the simplified version:

   ```bash
   python app_simple.py
   ```

2. In a new terminal, start the frontend development server:

   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Troubleshooting

If you encounter any issues during setup or running the application, please refer to the [Troubleshooting Guide](TROUBLESHOOTING.md).

## Project Structure

```
nutrihealth/
├── api/                  # Flask backend
│   ├── app.py            # Main Flask application with Pathway RAG
│   ├── app_simple.py     # Simplified Flask application without Pathway
│   ├── install_minimal.py # Minimal installation script
│   └── requirements.txt  # Python dependencies
├── public/               # Static files
├── src/                  # Next.js frontend
│   ├── app/              # App router pages
│   ├── components/       # React components
│   └── lib/              # Utility functions and libraries
├── .env.local            # Frontend environment variables
├── start.bat             # Windows startup script
├── start.sh              # Unix startup script
├── TROUBLESHOOTING.md    # Troubleshooting guide
└── README.md             # Project documentation
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Flask](https://flask.palletsprojects.com/)
- [Pathway](https://pathway.com/)
- [Google Gemini AI](https://ai.google.dev/)
- [Clerk](https://clerk.com/)
- [Supabase](https://supabase.com/)
- [Tailwind CSS](https://tailwindcss.com/)
