import { GoogleGenAI } from '@google/genai';
import { ENV } from '../config/env.js';
import {
  LAYOUT_LIBRARY,
  COLOR_SCHEME_LIBRARY,
  DashboardLayoutDefinition,
  ColorSchemeDefinition,
  DesignLibraryManager,
} from './designLibrary.js';

export interface CreativeAgentSynthesizeInput {
  userName?: string;
  selectedCourses?: string[];
  academicFocus?: string;
  school?: string;
  vibe?: string;
  preferredLayoutId?: string;
  preferredThemeId?: string;
  customInstruction?: string;
}

export interface CuratedCourseWidget {
  id: string;
  courseName: string;
  code: string;
  credits: number;
  priority: 'HIGH' | 'MEDIUM' | 'NORMAL';
  specializedTool: string;
  nextAssignment: string;
  dueText: string;
  completionPercent: number;
  gradeEstimate: string;
}

export interface CreativeAgentSynthesisResult {
  aiAgentName: string;
  aiAgentRole: string;
  aiAgentGreeting: string;
  aiAgentMessage: string;
  thoughtProcess: string[];
  recommendedLayout: DashboardLayoutDefinition;
  recommendedTheme: ColorSchemeDefinition;
  availableLayouts: DashboardLayoutDefinition[];
  availableThemes: ColorSchemeDefinition[];
  courseWidgets: CuratedCourseWidget[];
  optimizationMetrics: {
    focusScore: number;
    cognitiveLoadIndex: string;
    layoutDensity: string;
    activeCourseCount: number;
    estimatedWeeklyStudyHours: number;
  };
}

export class CreativeAgentService {
  /**
   * Access to the AI Agent's Knowledge Mind: Layout Concepts
   */
  public static get layoutKnowledgeMind(): DashboardLayoutDefinition[] {
    return LAYOUT_LIBRARY;
  }

  /**
   * Access to the AI Agent's Knowledge Mind: Color Schemes
   */
  public static get colorSchemeKnowledgeMind(): ColorSchemeDefinition[] {
    return COLOR_SCHEME_LIBRARY;
  }

  /**
   * Curated flagship layout architectures for fast user browsing
   */
  public static get flagshipLayouts(): DashboardLayoutDefinition[] {
    const flagshipIds = [
      'layout_bento_classic',
      'layout_command_nasa',
      'layout_split_inspector',
      'layout_focus_terminal',
      'layout_gen_5',
      'layout_gen_8',
    ];
    return LAYOUT_LIBRARY.filter((l) => flagshipIds.includes(l.id) || l.id.startsWith('layout_bento')).slice(0, 8);
  }

  /**
   * Curated flagship color schemes for fast user browsing
   */
  public static get flagshipThemes(): ColorSchemeDefinition[] {
    const flagshipIds = [
      'theme_dark_synth',
      'theme_clean_paper',
      'theme_cyberpunk_2077',
      'theme_rainbow_spectrum',
      'theme_matrix_emerald',
      'theme_ocean_abyss',
      'theme_solar_amber',
      'theme_royal_amethyst',
    ];
    return COLOR_SCHEME_LIBRARY.filter((t) => flagshipIds.includes(t.id) || t.id.startsWith('theme_dark')).slice(0, 10);
  }

  /**
   * Synthesizes and optimizes a complete customized dashboard using dual memory libraries & Gemini AI
   */
  public static async synthesizeDashboard(
    input: CreativeAgentSynthesizeInput
  ): Promise<CreativeAgentSynthesisResult> {
    const userName = input.userName?.trim() || 'Alex';
    const courses = (input.selectedCourses && input.selectedCourses.length > 0)
      ? input.selectedCourses
      : ['Data Structures', 'Discrete Mathematics', 'Algorithms'];
    const school = input.school || 'Arizona State University';
    const focus = input.academicFocus || 'Computer Science';
    const vibe = input.vibe || 'High-Velocity Focus';

    // 1. Memory Query: Layout Concepts Library
    let recommendedLayout: DashboardLayoutDefinition;
    if (input.preferredLayoutId) {
      const found = LAYOUT_LIBRARY.find((l) => l.id === input.preferredLayoutId);
      recommendedLayout = found || DesignLibraryManager.getRandomLayout();
    } else {
      // Intelligently match layout based on courses & focus
      const coursesStr = courses.join(' ').toLowerCase();
      if (coursesStr.includes('algorithm') || coursesStr.includes('data structure') || coursesStr.includes('code')) {
        recommendedLayout = LAYOUT_LIBRARY.find((l) => l.id === 'layout_focus_terminal') || LAYOUT_LIBRARY[0];
      } else if (coursesStr.includes('math') || coursesStr.includes('discrete') || coursesStr.includes('calc')) {
        recommendedLayout = LAYOUT_LIBRARY.find((l) => l.id === 'layout_split_inspector') || LAYOUT_LIBRARY[1];
      } else if (courses.length >= 4) {
        recommendedLayout = LAYOUT_LIBRARY.find((l) => l.id === 'layout_command_nasa') || LAYOUT_LIBRARY[2];
      } else {
        recommendedLayout = LAYOUT_LIBRARY.find((l) => l.id === 'layout_bento_classic') || LAYOUT_LIBRARY[0];
      }
    }

    // 2. Memory Query: Color Schemes Library
    let recommendedTheme: ColorSchemeDefinition;
    if (input.preferredThemeId) {
      const found = COLOR_SCHEME_LIBRARY.find((t) => t.id === input.preferredThemeId);
      recommendedTheme = found || COLOR_SCHEME_LIBRARY[0];
    } else {
      // Select luminous, contrast-optimized theme
      const themeChoice = COLOR_SCHEME_LIBRARY.find((t) => t.id === 'theme_dark_synth') || COLOR_SCHEME_LIBRARY[0];
      recommendedTheme = themeChoice;
    }

    // 3. Construct Tailored Course Widgets for the selected courses
    const courseWidgets: CuratedCourseWidget[] = courses.map((course, idx) => {
      const cLower = course.toLowerCase();
      let code = `CRS ${100 + (idx + 1) * 10}`;
      let specializedTool = 'Interactive Notes & Flashcards';
      let nextAssignment = `${course} Problem Set ${idx + 1}`;
      let dueText = `Due in ${2 + idx} days`;

      if (cLower.includes('data structure')) {
        code = 'CS 201';
        specializedTool = 'Live Binary Tree Visualizer & Code Sandbox';
        nextAssignment = 'AVL Tree & Heap Balancing Implementation';
        dueText = 'Due in 2 days (11:59 PM)';
      } else if (cLower.includes('discrete')) {
        code = 'MATH 240';
        specializedTool = 'LaTeX Formula Sheet & Truth Table Generator';
        nextAssignment = 'Induction Proofs & Recurrence Relations';
        dueText = 'Due in 3 days';
      } else if (cLower.includes('algorithm')) {
        code = 'CS 310';
        specializedTool = 'Big-O Complexity Tracer & Graph Pathfinder';
        nextAssignment = 'Dijkstra & Dynamic Programming Lab';
        dueText = 'Due Friday';
      } else if (cLower.includes('operating')) {
        code = 'CS 330';
        specializedTool = 'C/POSIX Kernel Process Simulator';
        nextAssignment = 'Virtual Memory Page Replacement Project';
        dueText = 'Due next Monday';
      } else if (cLower.includes('architecture')) {
        code = 'CS 350';
        specializedTool = 'RISC-V Assembly Pipeline Visualizer';
        nextAssignment = 'MIPS Cache Simulation Benchmarks';
        dueText = 'Due in 5 days';
      }

      return {
        id: `widget_course_${idx + 1}`,
        courseName: course,
        code,
        credits: 3 + (idx % 2),
        priority: idx === 0 ? 'HIGH' : idx === 1 ? 'HIGH' : 'MEDIUM',
        specializedTool,
        nextAssignment,
        dueText,
        completionPercent: 68 + (idx * 9) % 30,
        gradeEstimate: idx === 0 ? '96% (A)' : idx === 1 ? '92% (A-)' : '94% (A)',
      };
    });

    // 4. Default AI Telemetry & Reasoning Logs
    const thoughtProcess = [
      `Ingested ${courses.length} enrolled academic courses: [${courses.join(', ')}]`,
      `Profile loaded: ${userName} @ ${school} (${focus})`,
      `Queried Layout Concepts Knowledge Mind (${LAYOUT_LIBRARY.length} architectural schemas loaded)`,
      `Matched optimal layout: "${recommendedLayout.name}" [${recommendedLayout.category.toUpperCase()}] for high-density academic throughput`,
      `Queried Color Schemes Knowledge Mind (${COLOR_SCHEME_LIBRARY.length} radiant themes loaded)`,
      `Matched color scheme: "${recommendedTheme.name}" [${recommendedTheme.category}] for eye-safe contrast & focus`,
      `Synthesized ${courseWidgets.length} course-specific interactive modules`,
    ];

    let aiAgentMessage = `Hello ${userName}! I have analyzed your ${courses.length} enrolled courses and designed an optimized academic command dashboard for you. I paired the "${recommendedLayout.name}" architecture with our "${recommendedTheme.name}" color scheme to give you maximum focus, instant Canvas sync, and specialized tools for each subject.`;

    // 5. Enhance using Gemini AI if API key is present
    if (ENV.GEMINI_API_KEY) {
      try {
        const ai = new GoogleGenAI({
          apiKey: ENV.GEMINI_API_KEY,
          httpOptions: {
            headers: { 'User-Agent': 'aistudio-build' },
          },
        });

        const prompt = `You are Cerebro's Creative AI Agent (named "Nova"). You specialize in custom dashboard architecture, cognitive learning optimization, and visual customization.

Student Profile:
- Name: ${userName}
- School: ${school}
- Academic Focus: ${focus}
- Courses Enrolled: ${courses.join(', ')}
- Chosen Layout Architecture: "${recommendedLayout.name}" (${recommendedLayout.category})
- Chosen Theme: "${recommendedTheme.name}" (Primary: ${recommendedTheme.primaryAccent})

Write a short, intelligent, inspiring 2-sentence message directly to ${userName} explaining why this layout and color scheme were custom curated for their specific courses and academic velocity. Keep it personal, sharp, and encouraging. Return plain text only.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
        });

        const generatedText = response.text?.trim();
        if (generatedText && generatedText.length > 20) {
          aiAgentMessage = generatedText;
          thoughtProcess.push(`Gemini 3.8 Flash personalized rationale synthesized for ${userName}`);
        }
      } catch (err: any) {
        console.warn('[CreativeAgentService Gemini Note]: Using fast deterministic synthesis:', err?.message || err);
      }
    }

    return {
      aiAgentName: 'Nova',
      aiAgentRole: 'Creative Dashboard Architect & Optimization Agent',
      aiAgentGreeting: `Welcome, ${userName}`,
      aiAgentMessage,
      thoughtProcess,
      recommendedLayout,
      recommendedTheme,
      availableLayouts: this.flagshipLayouts,
      availableThemes: this.flagshipThemes,
      courseWidgets,
      optimizationMetrics: {
        focusScore: 95,
        cognitiveLoadIndex: 'Optimal (Balanced)',
        layoutDensity: recommendedLayout.gridDensity,
        activeCourseCount: courses.length,
        estimatedWeeklyStudyHours: courses.length * 5,
      },
    };
  }
}
