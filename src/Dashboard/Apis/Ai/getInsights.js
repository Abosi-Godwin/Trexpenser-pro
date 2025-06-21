import { useMutation } from "@tanstack/react-query";
import axios from "axios"; // Remove this if you are not using it

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const apiKey = GEMINI_API_KEY;

const useAI = () => {
    const queryAi = async prompt => {
        const model = "gemini-1.5-pro-latest"; // Or 'gemini-1.5-flash-latest'

        if (!GEMINI_API_KEY) {
            throw new Error("Missing Gemini API key. Check your .env file."); // Correct message
        }

        try {
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, // Correct URL
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        contents: [
                            {
                                parts: [{ text: prompt }] // correct body formatting
                            }
                        ],
                        generationConfig: {
                            maxOutputTokens: 200, // Adjust as needed
                            temperature: 0.7, // Adjust as needed (0.0 - 1.0)
                            topP: 0.8, // Adjust as needed (0.0 - 1.0)
                            topK: 40 // Adjust as needed
                        },
                        safetySettings: [
                            {
                                category: "HARM_CATEGORY_HARASSMENT",
                                threshold: "BLOCK_MEDIUM_AND_ABOVE"
                            },
                            {
                                category: "HARM_CATEGORY_HATE_SPEECH",
                                threshold: "BLOCK_MEDIUM_AND_ABOVE"
                            },
                            {
                                category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                                threshold: "BLOCK_MEDIUM_AND_ABOVE"
                            },
                            {
                                category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                                threshold: "BLOCK_MEDIUM_AND_ABOVE"
                            }
                        ]
                    })
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                console.error(
                    "Gemini API Error:",
                    response.status,
                    response.statusText
                );
                console.error("Error Data:", errorData);
                throw new Error(
                    `Gemini API Error: ${response.status} - ${
                        response.statusText
                    } - ${errorData?.error?.message || "No details"}`
                );
            }

            const data = await response.json();
            console.log(data);

            if (
                data.candidates &&
                data.candidates.length > 0 &&
                data.candidates[0].content &&
                data.candidates[0].content.parts &&
                data.candidates[0].content.parts.length > 0
            ) {
                return data.candidates[0].content.parts[0].text; // Return the generated text
            } else {
                console.error("Unexpected API Response Structure:", data);
                throw new Error(
                    "Unexpected API Response Structure from Gemini"
                );
            }
        } catch (err) {
            console.error("Fetch error:", err);
            throw new Error(`Gemini API error: ${err.message}`); // More specific error
        }
    };

    const {
        mutate: getInsight,
        data: insight,
        error: insightError,
        isPending: gettingInsights,
        isError: isInsightError
    } = useMutation({
        mutationFn: queryAi
    });

    return {
        getInsight,
        insight,
        insightError,
        isInsightError,
        gettingInsights
    };
};

export default useAI;
