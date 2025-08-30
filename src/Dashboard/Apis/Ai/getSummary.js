import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: apiKey });

export const getSummary = async prompt => {
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-001",
        contents: prompt
    });
 
    return JSON.parse(response.text.replace(/```json\s*|```/g, "").trim());
};
