import { GoogleGenerativeAI } from "@google/generative-ai";
import { mentorProfiles } from "@/data/mentors";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateAIResponse(message: string, personaId: string) {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: { maxOutputTokens: 100, temperature: 0.7 },
  });

  const prompt = `Respond to: "${message}" as ${personaId}`;
  const result = await model.generateContent(prompt);
  return result.response.text();
}
