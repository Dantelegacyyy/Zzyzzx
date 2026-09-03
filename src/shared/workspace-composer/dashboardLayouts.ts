export type NavPlacement = 'TOP' | 'LEFT_RAIL' | 'COMPACT_DOCK';
export type HeroStyle =
  | 'GREETING_ONLY'
  | 'TODAY_FOCUS'
  | 'NEXT_DEADLINE'
  | 'COURSE_FOCUS'
  | 'STUDY_FOCUS';
export type ContentFlow =
  'SINGLE_COLUMN' | 'TWO_COLUMN' | 'ASYMMETRIC' | 'STACKED' | 'FOCUS_PANEL';
export type ModuleStyle =
  'LIST' | 'COMPACT_CARDS' | 'TIMELINE' | 'STRIPS' | 'MINIMAL_ROWS';
export type Density = 'AIRY' | 'BALANCED' | 'COMPACT';

export interface DashboardLayoutDefinition {
  id: string;
  navPlacement: NavPlacement;
  heroStyle: HeroStyle;
  contentFlow: ContentFlow;
  moduleStyle: ModuleStyle;
  density: Density;
  maxPrimaryModules: number;
  accessibilityClass: 'STANDARD';
  allowedModuleSlots: readonly string[];
}

const navPlacements: NavPlacement[] = ['TOP', 'LEFT_RAIL', 'COMPACT_DOCK'];
const heroStyles: HeroStyle[] = [
  'GREETING_ONLY',
  'TODAY_FOCUS',
  'NEXT_DEADLINE',
  'COURSE_FOCUS',
  'STUDY_FOCUS',
];
const contentFlows: ContentFlow[] = [
  'SINGLE_COLUMN',
  'TWO_COLUMN',
  'ASYMMETRIC',
  'STACKED',
  'FOCUS_PANEL',
];
const moduleStyles: ModuleStyle[] = [
  'LIST',
  'COMPACT_CARDS',
  'TIMELINE',
  'STRIPS',
  'MINIMAL_ROWS',
];
const densities: Density[] = ['AIRY', 'BALANCED', 'COMPACT'];

export const LAYOUT_REGISTRY: DashboardLayoutDefinition[] = [];

let idCounter = 1;
for (const n of navPlacements) {
  for (const h of heroStyles) {
    for (const c of contentFlows) {
      for (const m of moduleStyles) {
        for (const d of densities) {
          if (LAYOUT_REGISTRY.length < 120) {
            LAYOUT_REGISTRY.push({
              id: `lay_${idCounter.toString().padStart(3, '0')}`,
              navPlacement: n,
              heroStyle: h,
              contentFlow: c,
              moduleStyle: m,
              density: d,
              maxPrimaryModules: 6,
              accessibilityClass: 'STANDARD',
              allowedModuleSlots: ['courses', 'tasks', 'calendar'],
            });
            idCounter++;
          }
        }
      }
    }
  }
}
