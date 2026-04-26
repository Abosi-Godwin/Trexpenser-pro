import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey });

export const getSummary = async prompt => {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-lite",
        contents: [{ role: "user", parts: [{ text: prompt }] }],

        httpOptions: {
            headers: {
                "x-goog-user-project": "928924791573"
            }
        }
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from Gemini.");

    try {
        return JSON.parse(text.replace(/```json\s*|```/g, "").trim());
    } catch {
        throw new Error("Invalid JSON from Gemini. Try again.");
    }
};
