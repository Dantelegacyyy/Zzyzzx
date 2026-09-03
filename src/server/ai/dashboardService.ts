import {
  LAYOUT_LIBRARY,
  COLOR_SCHEME_LIBRARY,
  DashboardLayoutDefinition,
  ColorSchemeDefinition,
  DesignLibraryManager,
} from './designLibrary.js';
import { generateCuratedDashboardConfig, CuratedDashboardConfig, StudentOnboardingData } from './curationService.js';
import { db } from '../../db/index.js';
import { users } from '../../db/schema.js';
import { getOrCreateUser } from '../../db/users.js';
import { eq } from 'drizzle-orm';
import { DashboardCacheService } from '../cache/redis.js';

export interface CourseInput {
  courseCode?: string;
  courseName: string;
  department?: string;
  credits?: number;
}

export interface StudentDashboardRequest {
  userId?: string;
  userName?: string;
  email?: string;
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
   * Stores and persists the selected user theme color preference in the Postgres database.
   */
  public static async persistUserThemePreference(
    userId: string,
    themeColor: string,
    email: string = 'commander@cerebro.edu'
  ): Promise<{ success: boolean; userId: string; themeColor: string; error?: string }> {
    try {
      // Ensure user record exists in Postgres database
      await getOrCreateUser(userId, email);

      // Persist user theme preference in users table
      await db
        .update(users)
        .set({ themeColor })
        .where(eq(users.uid, userId));

      return {
        success: true,
        userId,
        themeColor,
      };
    } catch (error: any) {
      console.warn('[AIDashboardService] Postgres theme persistence warning:', error?.message || error);
      return {
        success: false,
        userId,
        themeColor,
        error: error?.message || 'Database update failed',
      };
    }
  }

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
   * Helper method to generate a deterministic cache key for student dashboard requests
   */
  private static buildCacheKey(request: StudentDashboardRequest): string {
    const courseNames = request.courses
      .map((c) => (typeof c === 'string' ? c : c.courseName))
      .sort()
      .join(',');
    const user = request.userId || request.email || request.userName || 'anonymous';
    const focus = request.academicFocus || request.fieldOfStudy || 'default';
    const vibe = request.vibe || 'default';
    return `layout:${user}:${focus}:${courseNames}:${vibe}`;
  }

  /**
   * Retrieve cached dashboard layout schema for a user request if present in Redis
   */
  public static async getCachedLayoutSchema(request: StudentDashboardRequest): Promise<CuratedDashboardConfig | null> {
    const cacheKey = this.buildCacheKey(request);
    return await DashboardCacheService.get<CuratedDashboardConfig>(cacheKey);
  }

  /**
   * Invalidate cached dashboard layout schema for a user
   */
  public static async invalidateUserDashboardCache(request: StudentDashboardRequest): Promise<void> {
    const cacheKey = this.buildCacheKey(request);
    await DashboardCacheService.invalidate(cacheKey);
  }

  /**
   * Main entrypoint method: Accepts course data input and returns a complete curated dashboard configuration.
   * Leverages Redis cache layer to prevent repeated expensive AI & DB schema queries.
   */
  public static async generateDashboardConfig(
    request: StudentDashboardRequest
  ): Promise<CuratedDashboardConfig> {
    const cacheKey = this.buildCacheKey(request);

    // 1. Check Redis / Memory Caching Layer first
    try {
      const cachedConfig = await DashboardCacheService.get<CuratedDashboardConfig>(cacheKey);
      if (cachedConfig) {
        console.log(`[AIDashboardService] Redis Cache HIT for key: ${cacheKey}`);
        return {
          ...cachedConfig,
          cached: true,
        };
      }
    } catch (err) {
      console.warn('[AIDashboardService] Cache read error, continuing to fresh generation:', err);
    }

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

    // Automatically persist the selected user theme color preference in Postgres if user info is present
    const selectedThemeColor = mapping.theme.primaryAccent || mapping.theme.name;
    const targetUserId = request.userId || (request.userName ? `usr_${request.userName.toLowerCase().replace(/\s+/g, '_')}` : 'usr_commander');
    
    await AIDashboardService.persistUserThemePreference(
      targetUserId,
      selectedThemeColor,
      request.email || 'commander@cerebro.edu'
    );

    // 2. Persist in Redis Cache layer (1 hour TTL) to reduce repeated database/AI queries
    try {
      await DashboardCacheService.set(cacheKey, dashboardConfig, 3600);
      console.log(`[AIDashboardService] Cached layout schema in Redis for key: ${cacheKey}`);
    } catch (err) {
      console.warn('[AIDashboardService] Failed to cache dashboard config in Redis:', err);
    }

    return dashboardConfig;
  }
}

export const persistUserThemePreference = AIDashboardService.persistUserThemePreference;

export default AIDashboardService;
