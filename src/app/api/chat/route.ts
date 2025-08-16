import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { mentorProfiles } from "@/data/mentors";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is missing in .env.local");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function buildPersonaPrompt(personaId: string, userMessage: string) {
  const persona = mentorProfiles.find((p) => p.key === personaId);
  if (!persona) {
    throw new Error(`Persona with id "${personaId}" not found`);
  }

  return `
You are ${persona.displayName}, ${persona.shortTitle}.
Bio: ${persona.bio}
Specialties: ${persona.specialties.join(", ")}
Style & Voice: ${persona.style.voice} (Traits: ${persona.style.traits.join(", ")})
Example phrases: ${persona.tunes.join(" | ")}
Course promotion: ${persona.genAICourse.promoteLine} (Link: ${persona.genAICourse.courseLink})

User says: "${userMessage}"

Respond exactly in the style, tone, and personality of ${persona.displayName}.
Use fun Hinglish, emojis, casual but practical language.
Be motivating, relatable, and engaging like the mentor would.
  `.trim();
}

export async function POST(req: Request) {
  try {
    const { message, personaId } = await req.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: { maxOutputTokens: 150, temperature: 0.7 },
    });

    const prompt = buildPersonaPrompt(personaId, message);

    // ✅ Correct method
    const result = await model.generateContentStream({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
        } catch (err) {
          console.error("Stream error:", err);
          controller.enqueue(encoder.encode("⚠️ Error generating response."));
        } finally {
          controller.close();
        }
      },
    });

    return new NextResponse(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (error: unknown) {
    let errorMessage = "Unknown error";
    if (error instanceof Error) errorMessage = error.message;

    console.error("AI Error:", errorMessage);
    return NextResponse.json(
      {
        reply:
          "Sorry, the AI model is busy right now. Please try again in a few seconds.",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
