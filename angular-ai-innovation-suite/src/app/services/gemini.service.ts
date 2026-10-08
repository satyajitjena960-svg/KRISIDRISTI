import { Injectable } from '@angular/core';
import { GoogleGenAI } from '@google/genai';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private ai: GoogleGenAI | null = null;

  constructor() {
    // Uses process.env.API_KEY or window environment if present
    const apiKey = (window as any).process?.env?.API_KEY || '';
    if (apiKey) {
      this.ai = new GoogleGenAI({ apiKey });
    }
  }

  async askChat(prompt: string, useSearch = false): Promise<{ text: string; sources?: any[] }> {
    if (!this.ai) {
      return { text: `[Simulated Gemini AI Answer] Processed your prompt: "${prompt}". Configure a valid GEMINI_API_KEY for real-time model streaming.` };
    }
    try {
      const config: any = {};
      if (useSearch) {
        config.tools = [{ googleSearch: {} }];
      }
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config
      });
      
      const searchGrounding = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      return {
        text: response.text || 'No response generated.',
        sources: searchGrounding
      };
    } catch (err: any) {
      return { text: `Error connecting to Gemini API: ${err.message || err}` };
    }
  }

  async analyzeImage(base64Image: string, mimeType: string, prompt: string): Promise<string> {
    if (!this.ai) {
      return `[Simulated Vision Analysis] Image type: ${mimeType}. Key elements detected: Objects, colors, composition, and high contrast detail. Direct prompt: "${prompt}".`;
    }
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          {
            inlineData: {
              data: base64Image.split(',')[1] || base64Image,
              mimeType
            }
          },
          prompt || 'Describe this image in detail and highlight key features.'
        ]
      });
      return response.text || 'No analysis produced.';
    } catch (err: any) {
      return `Vision processing error: ${err.message || err}`;
    }
  }

  async synthesizeSpeech(text: string): Promise<string | null> {
    if (!this.ai) return null;
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Read the following text aloud with natural, engaging inflection: "${text}"`,
        config: {
          responseMimeType: 'audio/mp3'
        }
      });
      return response.text ?? null;;
    } catch {
      return null;
    }
  }

  async translateBatch(texts: string[], targetLang: string): Promise<Record<string, string>> {
    if (!this.ai || targetLang === 'English') {
      return {};
    }
    try {
      const prompt = `Translate the following JSON list of UI text strings into regional language: "${targetLang}". Return ONLY valid JSON mapping key to translated string.\nJSON: ${JSON.stringify(texts)}`;
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      return JSON.parse(response.text || '{}');
    } catch {
      return {};
    }
  }
}
