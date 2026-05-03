import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

// Initialize the Google Gen AI client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      // Fallback for when the API key is not yet configured by the user
      return NextResponse.json({ 
        response: 'API Key not configured. Please add GEMINI_API_KEY to your environment variables. Simulated response: You asked about ' + message
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [{ text: `You are a helpful, non-partisan AI assistant for ElectoGuide, an application that helps US citizens understand the electoral process. Please provide a concise, informative response to the following query: ${message}` }]
        }
      ]
    });

    return NextResponse.json({ response: response.text });
  } catch (error) {
    console.error('Error generating AI response:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
