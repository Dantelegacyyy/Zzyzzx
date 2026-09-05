import { Router } from 'express';
import { optionalAuthToken } from '../auth/session.js';
import { GoogleGenAI } from '@google/genai';
import { ENV } from '../config/env.js';
import { generateCuratedDashboardConfig } from './curationService.js';
import { DesignLibraryManager } from './designLibrary.js';
import { AIDashboardService } from './dashboardService.js';
import { CreativeAgentService } from './creativeAgentService.js';
import { DashboardArchitectService } from './dashboardArchitect.js';

export const aiRoutes = Router();
aiRoutes.use(optionalAuthToken);

/**
 * POST /api/ai/architect/synthesize
 * Sentient Dashboard Architect autonomously evaluates student data and synthesizes layout & theme
 * (Layout & Theme libraries stay strictly on the backend; users do not browse raw lists)
 */
aiRoutes.post('/architect/synthesize', async (req, res) => {
  try {
    const {
      name,
      userName,
      selectedCourses,
      courses,
      academicFocus,
      school,
      vibe,
      directive,
      customInstruction,
    } = req.body;

    const finalCourses = selectedCourses || courses || req.principal?.selectedCourses || [];
    const finalName = userName || name || req.principal?.name || 'Alex';
    const finalSchool = school || req.principal?.school || 'Arizona State University';

    const result = await DashboardArchitectService.synthesizeWorkspace({
      userName: finalName,
      selectedCourses: Array.isArray(finalCourses) && finalCourses.length > 0
        ? finalCourses
        : ['Data Structures', 'Discrete Mathematics', 'Algorithms'],
      academicFocus,
      school: finalSchool,
      vibe,
      directive,
      customInstruction,
    });

    res.json({ success: true, ...result });
  } catch (error: any) {
    console.error('[Dashboard Architect Synthesize Error]:', error);
    res.status(500).json({ success: false, error: error.message || 'Architect synthesis failed' });
  }
});

/**
 * POST /api/ai/architect/directive
 * Allows student to send high-level directives to the Sentient Architect
 * (e.g. Exam Sprint, Deep Code, Night Shift) which the Architect autonomously fulfills
 */
aiRoutes.post('/architect/directive', async (req, res) => {
  try {
    const { directive, customInstruction, selectedCourses, userName, school } = req.body;

    const result = await DashboardArchitectService.synthesizeWorkspace({
      userName: userName || req.principal?.name || 'Alex',
      selectedCourses: selectedCourses || req.principal?.selectedCourses || ['Data Structures', 'Discrete Mathematics', 'Algorithms'],
      school: school || req.principal?.school || 'University',
      directive: directive || 'dir_exam_sprint',
      customInstruction,
    });

    res.json({ success: true, ...result });
  } catch (error: any) {
    console.error('[Dashboard Architect Directive Error]:', error);
    res.status(500).json({ success: false, error: error.message || 'Directive execution failed' });
  }
});

/**
 * GET /api/ai/architect/status
 * Telemetry and current state of the Sentient Architect
 */
aiRoutes.get('/architect/status', (req, res) => {
  res.json({
    success: true,
    architectName: DashboardArchitectService.ARCHITECT_NAME,
    architectRole: DashboardArchitectService.ARCHITECT_ROLE,
    active: true,
    backendLibrariesSecured: true,
    supportedDirectives: DashboardArchitectService.DIRECTIVES,
  });
});

// Creative AI Agent Synthesis & Customization Endpoint (Backwards-Compatible Alias)
aiRoutes.post('/creative-agent/synthesize', async (req, res) => {
  try {
    const {
      name,
      userName,
      selectedCourses,
      courses,
      academicFocus,
      school,
      vibe,
      preferredLayoutId,
      preferredThemeId,
      directive,
      customInstruction,
    } = req.body;

    const finalCourses = selectedCourses || courses || req.principal?.selectedCourses || [];
    const finalName = userName || name || req.principal?.name || 'Alex';

    // Route through the Sentient Architect engine
    const result = await DashboardArchitectService.synthesizeWorkspace({
      userName: finalName,
      selectedCourses: Array.isArray(finalCourses) && finalCourses.length > 0
        ? finalCourses
        : ['Data Structures', 'Discrete Mathematics', 'Algorithms'],
      academicFocus,
      school: school || req.principal?.school,
      vibe,
      directive,
      customInstruction,
    });

    res.json({
      success: true,
      ...result,
      aiAgentName: result.architectName,
      aiAgentRole: result.architectRole,
      aiAgentMessage: result.sentientRationale,
      thoughtProcess: result.sentientLogs,
      recommendedLayout: result.activeLayout,
      recommendedTheme: result.activeTheme,
    });
  } catch (error: any) {
    console.error('[Creative Agent Synthesize Error]:', error);
    res.status(500).json({ success: false, error: error.message || 'Creative AI Agent synthesis failed' });
  }
});

// Creative AI Agent Libraries (Layout Concepts & Color Schemes from Memory)
aiRoutes.get('/creative-agent/libraries', (req, res) => {
  try {
    res.json({
      success: true,
      layoutKnowledgeMind: {
        total: CreativeAgentService.layoutKnowledgeMind.length,
        flagships: CreativeAgentService.flagshipLayouts,
        all: CreativeAgentService.layoutKnowledgeMind.slice(0, 30),
      },
      colorSchemeKnowledgeMind: {
        total: CreativeAgentService.colorSchemeKnowledgeMind.length,
        flagships: CreativeAgentService.flagshipThemes,
        all: CreativeAgentService.colorSchemeKnowledgeMind.slice(0, 30),
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to query knowledge libraries' });
  }
});

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

aiRoutes.post('/theme-preference', async (req, res) => {
  try {
    const userId = req.principal?.subjectId || req.body.userId || 'usr_commander';
    const email = req.principal?.email || req.body.email || 'commander@cerebro.edu';
    const { themeColor } = req.body;

    if (!themeColor) {
      return res.status(400).json({ error: 'themeColor is required' });
    }

    const result = await AIDashboardService.persistUserThemePreference(userId, themeColor, email);
    res.json(result);
  } catch (error: any) {
    console.error('Theme preference route error:', error);
    res.status(500).json({ error: 'Failed to persist theme preference' });
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

