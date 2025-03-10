import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { goals, level, preferences } = await request.json();

    // Generate personalized fitness plan using Google's Gemini
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const prompt = `Create a detailed fitness plan for someone with the following:
    Goals: ${goals}
    Fitness Level: ${level}
    Preferences: ${preferences}
    
    Format the response as a JSON object with:
    - name: string (name of the plan)
    - exercises: array of exercises with sets, reps, and instructions
    - frequency: string (how often to exercise)
    - intensity: string (low/medium/high)
    - notes: string (additional tips)`;

    const result = await model.generateContent(prompt);
    const planData = JSON.parse(result.response.text());

    // Save the plan to database
    const plan = await prisma.fitnessPlan.create({
      data: {
        userId,
        name: planData.name,
        startDate: new Date(),
        exercises: planData.exercises,
        frequency: planData.frequency,
        intensity: planData.intensity,
        notes: planData.notes
      }
    });

    return NextResponse.json(plan);
  } catch (error) {
    console.error('Error creating fitness plan:', error);
    return NextResponse.json(
      { error: 'Failed to create fitness plan' },
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

    const plans = await prisma.fitnessPlan.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(plans);
  } catch (error) {
    console.error('Error fetching fitness plans:', error);
    return NextResponse.json(
      { error: 'Failed to fetch fitness plans' },
      { status: 500 }
    );
  }
} 