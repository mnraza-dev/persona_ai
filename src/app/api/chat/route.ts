// app/api/chat/route.ts
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API!);

export async function POST(req: Request) {
  try {
    const { message, personaId } = await req.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: { maxOutputTokens: 100, temperature: 0.7 },
    });

    const prompt = `Respond to: "${message}" as ${personaId}`;

    const result = await model.generateContent(prompt);

    return NextResponse.json({ reply: result.response.text() });
  } catch (error: any) {
    console.error("AI Error:", error);

    // Return fallback instead of crashing
    return NextResponse.json({
      reply: "Sorry, the AI model is busy right now. Please try again in a few seconds.",
      error: error.message,
    });
  }
}
