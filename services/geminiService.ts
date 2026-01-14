
import { GoogleGenAI, Type } from "@google/genai";
import type { DreamResult, DreamPalette } from '../types';

// IMPORTANT: Do NOT configure process.env.API_KEY here.
// It is assumed to be configured externally.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const textModel = 'gemini-3-flash-preview';
const imageModel = 'gemini-2.5-flash-image';

const dreamAnalysisSchema = {
  type: Type.OBJECT,
  properties: {
    interpretation: {
      type: Type.STRING,
      description: "A psychological and symbolic interpretation of the dream, in 2-3 sentences."
    },
    palette: {
      type: Type.ARRAY,
      description: "A color palette of 5 colors that represent the dream's mood.",
      items: {
        type: Type.OBJECT,
        properties: {
          name: {
            type: Type.STRING,
            description: "A creative name for the color (e.g., 'Celestial Blue')."
          },
          hex: {
            type: Type.STRING,
            description: "The hex code for the color (e.g., '#AABBCC')."
          }
        },
        required: ['name', 'hex']
      }
    },
    story: {
      type: Type.STRING,
      description: "A short, poetic, and imaginative story (around 100 words) expanding on the dream's narrative."
    }
  },
  required: ['interpretation', 'palette', 'story']
};

async function generateDreamImage(prompt: string, palette: DreamPalette[]): Promise<string> {
    const colorString = palette.map(c => c.name).join(', ');
    const imagePrompt = `A surreal, dreamlike, ethereal, and artistic digital painting of: "${prompt}". The style should be imaginative and abstract, evoking a feeling rather than a literal scene. Key colors: ${colorString}.`;

    try {
        const response = await ai.models.generateContent({
            model: imageModel,
            contents: {
                parts: [{ text: imagePrompt }],
            },
             config: {
                imageConfig: {
                    aspectRatio: "4:3",
                }
            }
        });

        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                const base64String = part.inlineData.data;
                return `data:${part.inlineData.mimeType};base64,${base64String}`;
            }
        }
        throw new Error("No image was generated.");

    } catch (error) {
        console.error("Error generating image:", error);
        throw new Error("Failed to generate the dream image.");
    }
}

export const generateDreamAnalysis = async (dreamPrompt: string): Promise<DreamResult> => {
  try {
    const textPrompt = `You are an AI Dream Weaver. Analyze the following dream description. Provide a symbolic interpretation, a 5-color palette representing the mood, and a short poetic story. Dream: "${dreamPrompt}"`;
    
    // Step 1: Generate Text Content (Interpretation, Palette, Story)
    const textResponse = await ai.models.generateContent({
      model: textModel,
      contents: textPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: dreamAnalysisSchema,
      },
    });

    const textContent = textResponse.text;
    if (!textContent) {
      throw new Error("The AI did not return any text content.");
    }
    
    const parsedContent = JSON.parse(textContent.trim());

    // Step 2: Generate Image based on the dream and palette
    const imageUrl = await generateDreamImage(dreamPrompt, parsedContent.palette);

    // Step 3: Combine results
    return {
      interpretation: parsedContent.interpretation,
      palette: parsedContent.palette,
      story: parsedContent.story,
      imageUrl: imageUrl,
    };

  } catch (error) {
    console.error("Error in generateDreamAnalysis:", error);
    if (error.message.includes('API key not valid')) {
       throw new Error("Invalid API Key. Please check your configuration.");
    }
    throw new Error("Failed to weave the dream. The AI may be resting.");
  }
};
