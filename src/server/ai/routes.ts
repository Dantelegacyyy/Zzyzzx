import { Router } from 'express';
import { requireAuthToken } from '../auth/session.js';
import { GoogleGenAI } from '@google/genai';
import { ENV } from '../config/env.js';

export const aiRoutes = Router();
aiRoutes.use(requireAuthToken);

aiRoutes.post('/study-guides', async (req, res) => {
  try {
    if (!ENV.GEMINI_API_KEY) {
      res.status(503).json({ error: 'AI_UNAVAILABLE' });
      return;
    }

    const ai = new GoogleGenAI({ apiKey: ENV.GEMINI_API_KEY });

    // Simulate study guide generation for now until sources are fully hooked up
    res.json({ status: 'Simulated AI Response' });
  } catch (error) {
    if (error && (error as any).status === 429) {
      res.status(429).json({ error: 'RATE_LIMITED' });
    } else {
      res.status(500).json({ error: 'INTERNAL_SERVER_ERROR' });
    }
  }
});
