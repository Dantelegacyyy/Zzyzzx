import { Router } from 'express';
import { requireAuthToken } from '../auth/session.js';
import { GoogleGenAI } from '@google/genai';
import { ENV } from '../config/env.js';
import { generateCuratedDashboardConfig } from './curationService.js';
import { DesignLibraryManager } from './designLibrary.js';
import { AIDashboardService } from './dashboardService.js';

export const aiRoutes = Router();
aiRoutes.use(requireAuthToken);

aiRoutes.post('/generate-dashboard', async (req, res) => {
  try {
    const { name, courses, academicFocus, fieldOfStudy, school, visualStyle, accent, vibe, customInstruction } = req.body;

    const config = await AIDashboardService.generateDashboardConfig({
      userName: name,
      courses: Array.isArray(courses) ? courses : ['Data Structures', 'Discrete Mathematics', 'Algorithms'],
      academicFocus: academicFocus || fieldOfStudy,
      fieldOfStudy,
      school,
      visualStyle,
      accent,
      vibe,
      customInstruction,
    });

    res.json({ success: true, config });
  } catch (error: any) {
    console.error('Dashboard service route error:', error);
    res.status(500).json({ error: 'Failed to generate dashboard configuration' });
  }
});

aiRoutes.post('/curate-dashboard', async (req, res) => {
  try {
    const { name, courses, visualStyle, accent, vibe, school, academicLevel, fieldOfStudy, customInstruction } = req.body;

    const curatedConfig = await generateCuratedDashboardConfig({
      userName: name,
      courses: Array.isArray(courses) ? courses : ['Data Structures', 'Discrete Mathematics', 'Algorithms'],
      school,
      academicLevel,
      fieldOfStudy,
      visualStyle,
      accent,
      vibe,
      customInstruction,
    });

    res.json({ success: true, config: curatedConfig });
  } catch (error: any) {
    console.error('Curation endpoint error:', error);
    res.status(500).json({ error: 'Failed to curate AI dashboard' });
  }
});

aiRoutes.get('/design-library/layouts', (req, res) => {
  const query = (req.query.q as string) || '';
  const layouts = query
    ? DesignLibraryManager.searchLayouts(query)
    : DesignLibraryManager.getAllLayouts();
  res.json({
    totalCount: DesignLibraryManager.getAllLayouts().length,
    returnedCount: layouts.length,
    layouts: layouts.slice(0, 30), // Paginate/slice top 30
  });
});

aiRoutes.get('/design-library/themes', (req, res) => {
  const query = (req.query.q as string) || '';
  const themes = query
    ? DesignLibraryManager.searchColorSchemes(query)
    : DesignLibraryManager.getAllColorSchemes();
  res.json({
    totalCount: DesignLibraryManager.getAllColorSchemes().length,
    returnedCount: themes.length,
    themes: themes.slice(0, 40), // Paginate/slice top 40
  });
});

aiRoutes.get('/design-library/random', (req, res) => {
  const layout = DesignLibraryManager.getRandomLayout();
  const theme = DesignLibraryManager.getRandomColorScheme();
  res.json({ layout, theme });
});

aiRoutes.post('/study-guides', async (req, res) => {

  try {
    if (!ENV.GEMINI_API_KEY) {
      res.status(503).json({ error: 'AI_UNAVAILABLE' });
      return;
    }

    const ai = new GoogleGenAI({ apiKey: ENV.GEMINI_API_KEY });
    res.json({ status: 'Simulated AI Response' });
  } catch (error) {
    if (error && (error as any).status === 429) {
      res.status(429).json({ error: 'RATE_LIMITED' });
    } else {
      res.status(500).json({ error: 'INTERNAL_SERVER_ERROR' });
    }
  }
});

