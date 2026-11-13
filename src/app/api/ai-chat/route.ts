import { NextRequest, NextResponse } from 'next/server';
import { processStrokeSenseQuery } from '@/lib/stroke-ai-engine';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'A valid message string is required.' },
        { status: 400 }
      );
    }

    const response = await processStrokeSenseQuery(message);

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Error in StrokeSense AI API:', error);
    return NextResponse.json(
      {
        content: 'An error occurred while analyzing the stroke intelligence database. Please try again.',
        citations: [],
        isEmergencyAlert: false
      },
      { status: 500 }
    );
  }
}
