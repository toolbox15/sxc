import { GoogleGenAI, Type } from "@google/genai";
import { MenuItem } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateMenu = async (theme: string): Promise<MenuItem[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate a list of 3 creative coffee shop menu specials based on the theme: "${theme}". 
      The prices should be realistic for a high-end cafe (e.g., $4.00 - $7.00).
      Return ONLY the items.`,
      config: {
        systemInstruction: "You are a world-class barista and menu designer. Keep names concise (max 3-4 words). Prices should include the currency symbol.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              price: { type: Type.STRING },
              description: { type: Type.STRING }
            },
            required: ["name", "price"]
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as MenuItem[];
    }
    return [];
  } catch (error) {
    console.error("Failed to generate menu:", error);
    throw error;
  }
};