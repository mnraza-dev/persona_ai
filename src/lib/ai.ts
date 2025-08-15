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

Respond **exactly in the style, tone, and personality of ${persona.displayName}**.
Use fun Hinglish, emojis, casual but practical language.
Be motivating, relatable, and engaging like the mentor would.
  `.trim();
}

export async function generateAIResponse(message: string, personaId: string) {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      maxOutputTokens: 150,
      temperature: 0.7,
    },
  });

  const prompt = buildPersonaPrompt(personaId, message);
  const result = await model.generateContent(prompt);
  return result.response.text();
}
