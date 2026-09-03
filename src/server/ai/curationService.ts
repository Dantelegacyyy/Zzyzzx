import { GoogleGenAI } from '@google/genai';
import { ENV } from '../config/env.js';
import {
  DesignLibraryManager,
  DashboardLayoutDefinition,
  ColorSchemeDefinition,
} from './designLibrary.js';

export interface StudentOnboardingData {
  userName?: string;
  courses: string[];
  school?: string;
  academicLevel?: string;
  fieldOfStudy?: string;
  visualStyle?: string;
  accent?: string;
  vibe?: string;
  customInstruction?: string;
  themeCategory?: string;
}

export interface FocusArea {
  courseName: string;
  keyTopics: string[];
  priorityLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  weeklyHours: number;
  recommendedTools: string[];
}

export interface CuratedWidget {
  id: string;
  title: string;
  type: 'course_hub' | 'deadline_queue' | 'code_pad' | 'aegis_status' | 'ai_study_vector' | 'flashcards';
  description: string;
  gridSpan: string;
  items?: any[];
}

export interface StudyVectorSchedule {
  day: string;
  subject: string;
  activity: string;
  durationMinutes: number;
}

export interface CuratedDashboardConfig {
  studentName: string;
  greeting: string;
  academicFocus: string;
  layoutMode: 'bento-grid' | 'focus-canvas' | 'split-view' | 'cards-timeline' | 'command-center' | 'hud-radar';
  selectedLayoutConcept: DashboardLayoutDefinition;
  selectedColorScheme: ColorSchemeDefinition;
  themePalette: {
    visualStyle: string;
    accent: string;
    vibe: string;
    bgGradients: string[];
  };
  focusAreas: FocusArea[];
  widgets: CuratedWidget[];
  studyVectorSchedule: StudyVectorSchedule[];
  aiSystemPrompt: string;
  cached?: boolean;
}

export async function generateCuratedDashboardConfig(
  data: StudentOnboardingData
): Promise<CuratedDashboardConfig> {
  const selectedCourses = data.courses && data.courses.length > 0
    ? data.courses
    : ['Data Structures', 'Discrete Mathematics', 'Algorithms'];
  const userName = data.userName || 'Commander';
  const school = data.school || 'University';
  const visualStyle = data.visualStyle || 'Dark Synth';
  const accent = data.accent || 'Cyan';
  const vibe = data.vibe || 'Focus';

  // Pull library concept matching student signature
  const { layout: libraryLayout, theme: libraryTheme } = DesignLibraryManager.matchConcept(vibe, visualStyle);

  // Sample 5 random layout ideas & 5 theme ideas from library for Gemini to consider
  const sampleLayouts = [libraryLayout, DesignLibraryManager.getRandomLayout(), DesignLibraryManager.getRandomLayout()];
  const sampleThemes = [libraryTheme, DesignLibraryManager.getRandomColorScheme(), DesignLibraryManager.getRandomColorScheme()];

  let aiResult: Partial<CuratedDashboardConfig> | null = null;

  if (ENV.GEMINI_API_KEY) {
    try {
      const ai = new GoogleGenAI({ apiKey: ENV.GEMINI_API_KEY });
      const prompt = `You are Cerebro's AI Academic Architect with access to a library of 100+ Dashboard Layouts and 250+ Color Schemes.

Student Profile:
- Name: ${userName}
- Institution: ${school}
- Level: ${data.academicLevel || 'Undergraduate'}
- Major/Field: ${data.fieldOfStudy || 'Computer Science'}
- Enrolled Courses: ${selectedCourses.join(', ')}
- Visual Signature: ${visualStyle}, Accent: ${accent}, Vibe: ${vibe}
${data.customInstruction ? `- Custom Instruction: ${data.customInstruction}` : ''}

Design Library Suggestions Selected For This Student:
- Suggested Layout Architecture: "${libraryLayout.name}" (${libraryLayout.category}) - ${libraryLayout.description}
- Suggested Theme: "${libraryTheme.name}" (${libraryTheme.category}) - Primary: ${libraryTheme.primaryAccent}, Secondary: ${libraryTheme.secondaryAccent}

Sample Theme Options from 250+ Theme Library:
${sampleThemes.map((t) => `- ${t.name} [Category: ${t.category}]`).join('\n')}

Sample Layout Options from 100+ Layout Library:
${sampleLayouts.map((l) => `- ${l.name} [Category: ${l.category}]`).join('\n')}

Generate a JSON object matching this exact schema:
{
  "studentName": "${userName}",
  "greeting": "Personalized energetic greeting for ${userName}",
  "academicFocus": "One sentence summary of their high-velocity academic trajectory",
  "layoutMode": "${libraryLayout.category}",
  "themePalette": {
    "visualStyle": "${libraryTheme.name}",
    "accent": "${libraryTheme.primaryAccent}",
    "vibe": "${vibe}",
    "bgGradients": ${JSON.stringify(libraryTheme.bgGradient)}
  },
  "focusAreas": [
    {
      "courseName": "Course Name",
      "keyTopics": ["Topic 1", "Topic 2", "Topic 3"],
      "priorityLevel": "CRITICAL" | "HIGH" | "MEDIUM",
      "weeklyHours": 6,
      "recommendedTools": ["Tool 1", "Tool 2"]
    }
  ],
  "widgets": [
    {
      "id": "w_courses",
      "title": "Integrated Courses Hub",
      "type": "course_hub",
      "description": "Active sync for enrolled subjects",
      "gridSpan": "col-span-1 md:col-span-2",
      "items": ["Course 1", "Course 2"]
    },
    {
      "id": "w_deadlines",
      "title": "Canvas Assignment Queue",
      "type": "deadline_queue",
      "description": "Prioritized lab deadlines and problem sets",
      "gridSpan": "col-span-1",
      "items": [
        { "title": "Assignment title", "due": "In 2 days", "priority": "HIGH" }
      ]
    },
    {
      "id": "w_code_pad",
      "title": "AI Code & Synthesis Sandbox",
      "type": "code_pad",
      "description": "Real-time algorithmic testing engine",
      "gridSpan": "col-span-1 md:col-span-2"
    },
    {
      "id": "w_aegis",
      "title": "AEGIS Sentinel Shield",
      "type": "aegis_status",
      "description": "Cloud SQL PostgreSQL security active",
      "gridSpan": "col-span-1"
    }
  ],
  "studyVectorSchedule": [
    {
      "day": "Monday",
      "subject": "Course Name",
      "activity": "Deep dive focus block",
      "durationMinutes": 90
    }
  ],
  "aiSystemPrompt": "Tuned Gemini persona prompt for this student"
}`;

      const response = await ai.models.generateContent({
        model: ENV.GEMINI_MODEL || 'gemini-2.5-flash',
        contents: prompt,
      });

      const text = response.text;
      if (text) {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          aiResult = JSON.parse(jsonMatch[0]);
        }
      }
    } catch (err) {
      console.warn('[Gemini AI Curation Service Warning]:', err);
    }
  }

  // Construct structured fallback if AI result missing or partial
  const fallbackFocusAreas: FocusArea[] = selectedCourses.map((course, idx) => ({
    courseName: course,
    keyTopics: getTopicsForCourse(course),
    priorityLevel: idx === 0 ? 'CRITICAL' : idx === 1 ? 'HIGH' : 'MEDIUM',
    weeklyHours: 5 + (3 - Math.min(idx, 2)),
    recommendedTools: ['Cerebro Notes', 'Canvas Sync', 'Gemini Synth'],
  }));

  const fallbackWidgets: CuratedWidget[] = [
    {
      id: 'w_courses',
      title: 'Integrated Courses Hub',
      type: 'course_hub',
      description: `Active real-time sync for ${selectedCourses.length} enrolled subjects.`,
      gridSpan: 'col-span-1 md:col-span-2',
      items: selectedCourses,
    },
    {
      id: 'w_deadlines',
      title: 'Canvas Assignment Queue',
      type: 'deadline_queue',
      description: 'Upcoming Canvas problem sets, quizzes, and project milestones.',
      gridSpan: 'col-span-1',
      items: selectedCourses.slice(0, 3).map((c, i) => ({
        id: `d_${i}`,
        title: `${c} - Milestone ${i + 1}`,
        due: `In ${i + 2} days`,
        priority: i === 0 ? 'HIGH' : 'MEDIUM',
      })),
    },
    {
      id: 'w_code_pad',
      title: 'AI Synthesis & Code Sandbox',
      type: 'code_pad',
      description: 'Gemini 2.5 powered algorithmic verification & note synthesis.',
      gridSpan: 'col-span-1 md:col-span-2',
    },
    {
      id: 'w_aegis',
      title: 'AEGIS Security Guardian',
      type: 'aegis_status',
      description: 'Cloud SQL PostgreSQL integrity & OAuth token encryption online.',
      gridSpan: 'col-span-1',
    },
  ];

  const fallbackSchedule: StudyVectorSchedule[] = [
    { day: 'Monday', subject: selectedCourses[0] || 'Core Subject', activity: 'Concept Synthesis & Problem Sets', durationMinutes: 90 },
    { day: 'Wednesday', subject: selectedCourses[1] || 'Elective Subject', activity: 'Proof Review & Flashcards', durationMinutes: 60 },
    { day: 'Friday', subject: selectedCourses[2] || 'Lab Subject', activity: 'Implementation & Code Sandbox', durationMinutes: 120 },
  ];

  return {
    studentName: aiResult?.studentName || userName,
    greeting: aiResult?.greeting || `Welcome to Cerebro, ${userName}. Your workspace is customized.`,
    academicFocus: aiResult?.academicFocus || `Tuned for ${selectedCourses.join(', ')} with ${vibe} strategy.`,
    layoutMode: (aiResult?.layoutMode as any) || libraryLayout.category,
    selectedLayoutConcept: libraryLayout,
    selectedColorScheme: libraryTheme,
    themePalette: {
      visualStyle: aiResult?.themePalette?.visualStyle || libraryTheme.name,
      accent: aiResult?.themePalette?.accent || libraryTheme.primaryAccent,
      vibe: aiResult?.themePalette?.vibe || vibe,
      bgGradients: aiResult?.themePalette?.bgGradients || libraryTheme.bgGradient,
    },
    focusAreas: aiResult?.focusAreas || fallbackFocusAreas,
    widgets: aiResult?.widgets || fallbackWidgets,
    studyVectorSchedule: aiResult?.studyVectorSchedule || fallbackSchedule,
    aiSystemPrompt:
      aiResult?.aiSystemPrompt ||
      `You are an expert AI tutor specialized in ${selectedCourses.join(', ')} for ${userName}.`,
  };
}

function getTopicsForCourse(courseName: string): string[] {
  const lower = courseName.toLowerCase();
  if (lower.includes('data structure')) {
    return ['AVL & Red-Black Trees', 'Graph Traversal (BFS/DFS)', 'Dynamic Programming', 'Heap Priority Queues'];
  }
  if (lower.includes('discrete')) {
    return ['Predicate Logic & Proofs', 'Combinatorics & Graph Theory', 'Modular Arithmetic', 'Recurrence Relations'];
  }
  if (lower.includes('algorithm')) {
    return ['Divide & Conquer', 'Dijkstra & A* Pathfinding', 'NP-Completeness', 'Amortized Analysis'];
  }
  if (lower.includes('operating')) {
    return ['Process Synchronization & Mutex', 'Virtual Memory & Paging', 'File System Inodes', 'Kernel System Calls'];
  }
  return ['Core Concepts', 'Problem Sets', 'Algorithmic Optimization', 'Exam Preparation'];
}

