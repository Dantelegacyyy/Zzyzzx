import {
  LAYOUT_LIBRARY,
  COLOR_SCHEME_LIBRARY,
  DashboardLayoutDefinition,
  ColorSchemeDefinition,
  DesignLibraryManager,
} from './designLibrary.js';
import { generateCuratedDashboardConfig, CuratedDashboardConfig, StudentOnboardingData } from './curationService.js';

export interface CourseInput {
  courseCode?: string;
  courseName: string;
  department?: string;
  credits?: number;
}

export interface StudentDashboardRequest {
  userName?: string;
  courses: (string | CourseInput)[];
  academicFocus?: string;
  fieldOfStudy?: string;
  school?: string;
  visualStyle?: string;
  accent?: string;
  vibe?: string;
  customInstruction?: string;
}

export interface MappedThemeAndLayout {
  layout: DashboardLayoutDefinition;
  theme: ColorSchemeDefinition;
  matchingScore: number;
  reasoning: string;
}

export class AIDashboardService {
  /**
   * Database references
   */
  public static readonly layoutSchemas = LAYOUT_LIBRARY;
  public static readonly colorThemes = COLOR_SCHEME_LIBRARY;

  /**
   * Dynamically maps layout schemas and color themes based on the student's academic focus and courses.
   */
  public static mapAcademicFocusToDesign(
    academicFocus: string,
    courses: string[],
    vibe?: string,
    visualStyle?: string
  ): MappedThemeAndLayout {
    const focusLower = (academicFocus || '').toLowerCase();
    const coursesStr = courses.join(' ').toLowerCase();
    const combined = `${focusLower} ${coursesStr}`;

    let matchedLayoutCategory: DashboardLayoutDefinition['category'] = 'bento-grid';
    let matchedThemeCategory: ColorSchemeDefinition['category'] = 'Dark';
    let reasoning = 'Selected versatile academic layout and dark ambient theme.';

    if (
      combined.includes('computer science') ||
      combined.includes('software') ||
      combined.includes('coding') ||
      combined.includes('cyber') ||
      combined.includes('algorithm')
    ) {
      matchedLayoutCategory = 'focus-canvas';
      matchedThemeCategory = 'Cyberpunk';
      reasoning = 'Mapped to Cybernetic Focus Terminal and Cyberpunk Neon theme for high-velocity software engineering & algorithm analysis.';
    } else if (
      combined.includes('math') ||
      combined.includes('physics') ||
      combined.includes('discrete') ||
      combined.includes('engineering')
    ) {
      matchedLayoutCategory = 'split-view';
      matchedThemeCategory = 'Monochrome';
      reasoning = 'Mapped to 60/40 Split View Inspector and Matrix Emerald theme for proof checking & deep problem solving.';
    } else if (
      combined.includes('biology') ||
      combined.includes('chemistry') ||
      combined.includes('medicine') ||
      combined.includes('pre-med') ||
      combined.includes('neuro')
    ) {
      matchedLayoutCategory = 'bento-grid';
      matchedThemeCategory = 'Nature';
      reasoning = 'Mapped to Bento Grid layout and Teal/Forest Mint theme for active recall, lab tracking, and medical study.';
    } else if (
      combined.includes('business') ||
      combined.includes('finance') ||
      combined.includes('economics')
    ) {
      matchedLayoutCategory = 'command-center';
      matchedThemeCategory = 'High-Contrast';
      reasoning = 'Mapped to NASA Flight Deck Command Center and High-Contrast Gold theme for quantitative modeling and analytics.';
    } else if (
      combined.includes('art') ||
      combined.includes('design') ||
      combined.includes('humanities')
    ) {
      matchedLayoutCategory = 'cards-timeline';
      matchedThemeCategory = 'Rainbow';
      reasoning = 'Mapped to Cards Timeline Flow and Full Rainbow Spectrum theme for creative research and project streams.';
    }

    // Pull directly from 100+ layouts and 250+ themes
    const candidateLayouts = this.layoutSchemas.filter((l) => l.category === matchedLayoutCategory);
    const selectedLayout = candidateLayouts.length > 0
      ? candidateLayouts[Math.floor(Math.random() * candidateLayouts.length)]
      : DesignLibraryManager.getRandomLayout();

    const candidateThemes = this.colorThemes.filter((t) => t.category.toLowerCase() === matchedThemeCategory.toLowerCase());
    const selectedTheme = candidateThemes.length > 0
      ? candidateThemes[Math.floor(Math.random() * candidateThemes.length)]
      : DesignLibraryManager.getRandomColorScheme();

    return {
      layout: selectedLayout,
      theme: selectedTheme,
      matchingScore: 0.96,
      reasoning,
    };
  }

  /**
   * Main entrypoint method: Accepts course data input and returns a complete curated dashboard configuration.
   */
  public static async generateDashboardConfig(
    request: StudentDashboardRequest
  ): Promise<CuratedDashboardConfig> {
    const courseNames: string[] = request.courses.map((c) =>
      typeof c === 'string' ? c : c.courseName
    );

    const academicFocus = request.academicFocus || request.fieldOfStudy || 'Computer Science & Software Systems';

    // Map using internal logic against the 100+ layout schemas & 250+ color themes database
    const mapping = this.mapAcademicFocusToDesign(
      academicFocus,
      courseNames,
      request.vibe,
      request.visualStyle
    );

    // Call curation engine (which leverages Gemini + design library fallback)
    const onboardingData: StudentOnboardingData = {
      userName: request.userName,
      courses: courseNames,
      school: request.school,
      academicLevel: 'Undergraduate',
      fieldOfStudy: academicFocus,
      visualStyle: mapping.theme.name,
      accent: mapping.theme.primaryAccent,
      vibe: request.vibe || 'Focus',
      customInstruction: request.customInstruction,
    };

    const dashboardConfig = await generateCuratedDashboardConfig(onboardingData);

    // Ensure mapped layout and theme definitions from the database are injected
    dashboardConfig.selectedLayoutConcept = mapping.layout;
    dashboardConfig.selectedColorScheme = mapping.theme;
    dashboardConfig.layoutMode = mapping.layout.category;

    return dashboardConfig;
  }
}

export default AIDashboardService;
