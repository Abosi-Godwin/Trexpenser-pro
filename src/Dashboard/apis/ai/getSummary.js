import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey });
export const getSummary = async prompt => {
    /*  const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json"
        }
    });
    */
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "Why is the sky blue?"
    });
    console.log(response);
    const text = response.text();

    if (!text) {
        throw new Error("Empty response from Gemini");
    }

    try {
        return JSON.parse(text);
    } catch (err) {
        console.error("Raw Gemini response:", text);
        throw new Error("Invalid JSON from Gemini");
    }
};
