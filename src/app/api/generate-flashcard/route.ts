import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

/**
 * Google Gemini AI client for flashcard generation.
 */
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

/**
 * POST /api/generate-flashcard
 * Accepts a political term and returns a concise AI-generated definition.
 * Uses Google Gemini to generate non-partisan educational content.
 */
export async function POST(req: Request) {
  try {
    const { term } = await req.json();

    if (!term || typeof term !== 'string') {
      return NextResponse.json({ error: 'A valid term is required.' }, { status: 400 });
    }

    // Sanitize: limit length
    const sanitizedTerm = term.trim().slice(0, 100);

    if (!process.env.GEMINI_API_KEY) {
      // Fallback when API key is not configured
      return NextResponse.json({
        term: sanitizedTerm,
        definition: `This is a simulated definition for "${sanitizedTerm}". To get real AI-generated definitions, configure your GEMINI_API_KEY environment variable.`,
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `You are an educational assistant for ElectoGuide, a non-partisan election education platform. Define the following political/electoral term in exactly 1-2 concise sentences. Be factual and non-partisan. Term: "${sanitizedTerm}"`,
            },
          ],
        },
      ],
    });

    const definition = response.text || 'Unable to generate a definition at this time.';

    return NextResponse.json({ term: sanitizedTerm, definition });
  } catch (error) {
    console.error('Flashcard generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate flashcard. Please try again.' },
      { status: 500 }
    );
  }
}
