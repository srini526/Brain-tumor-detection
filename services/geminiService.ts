
import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    diagnosis: {
      type: Type.STRING,
      description: "A very short diagnosis, either 'Tumor Detected' or 'No Tumor Detected'.",
    },
    confidence: {
      type: Type.NUMBER,
      description: "A confidence score between 0.0 and 1.0 for the diagnosis.",
    },
  },
  required: ['diagnosis', 'confidence'],
};


export const analyzeMriScan = async (base64ImageData: string): Promise<AnalysisResult> => {
  const imagePart = {
    inlineData: {
      mimeType: 'image/jpeg',
      data: base64ImageData,
    },
  };

  const textPart = {
    text: `You are a simulated medical imaging analysis AI. Analyze this MRI scan of a human brain. Based on the visual information, determine if a tumor is likely present. Your response must be in JSON format and conform to the provided schema. Do not add markdown backticks or any other text outside the JSON object. This is for a UI demonstration and not for real medical use.`
  };
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [imagePart, textPart] },
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.1, // Lower temperature for more deterministic, factual-style response
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    
    // Validate the result
    if (typeof result.diagnosis !== 'string' || typeof result.confidence !== 'number') {
      throw new Error('Invalid response structure from AI.');
    }
    
    return result as AnalysisResult;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("The AI model failed to process the image. Please try again.");
  }
};
