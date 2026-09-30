import { Groq } from "groq-sdk";
import "dotenv/config";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const obtenerConsultaGroqService = async (messages) => {
  const chatCompletion = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",
    messages,
  });

  return chatCompletion;
};
