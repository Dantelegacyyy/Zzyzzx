import { GoogleGenAI, Type } from '@google/genai';
import { ENV } from '../config/env.js';
import crypto from 'crypto';

export async function processDocumentAsObserver(
  subjectId: string,
  file: Express.Multer.File
) {
  const apiKey = ENV.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured');
  }

  const ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  const base64Data = file.buffer.toString('base64');

  const response = await ai.models.generateContent({
    model: ENV.GEMINI_MODEL || 'gemini-3.7-flash',
    contents: [
      {
        inlineData: {
          mimeType: file.mimetype,
          data: base64Data,
        },
      },
      'Analyze this document. Extract the main topics, provide a 2-3 sentence summary, and classify its primary subject matter. The output must be JSON.',
    ],
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          summary: { type: Type.STRING },
          topics: { type: Type.ARRAY, items: { type: Type.STRING } },
          subject: { type: Type.STRING },
          evidenceTags: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
      },
    },
  });

  let analysis = {};
  try {
    const rawText = response.text;
    if (rawText) {
      analysis = JSON.parse(rawText.trim());
    }
  } catch (e) {
    console.error('Failed to parse AEGIS output', e);
  }

  const docId = crypto.randomUUID();
  const docRecord = {
    id: docId,
    filename: file.originalname,
    mimetype: file.mimetype,
    size: file.size,
    analysis,
    ingestedAt: new Date().toISOString(),
    phase: 'PHASE_2_READ_ONLY_OBSERVER',
  };

  return docRecord;
}
