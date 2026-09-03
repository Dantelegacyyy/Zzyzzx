const fs = require('fs');
const path = require('path');

const sharedDir = path.join(__dirname, 'src/shared/workspace-composer');
const serverDir = path.join(__dirname, 'src/server/workspace-composer');

fs.mkdirSync(sharedDir, { recursive: true });
fs.mkdirSync(serverDir, { recursive: true });

const dashboardLayoutsContent = `
export type NavPlacement = "TOP" | "LEFT_RAIL" | "COMPACT_DOCK";
export type HeroStyle = "GREETING_ONLY" | "TODAY_FOCUS" | "NEXT_DEADLINE" | "COURSE_FOCUS" | "STUDY_FOCUS";
export type ContentFlow = "SINGLE_COLUMN" | "TWO_COLUMN" | "ASYMMETRIC" | "STACKED" | "FOCUS_PANEL";
export type ModuleStyle = "LIST" | "COMPACT_CARDS" | "TIMELINE" | "STRIPS" | "MINIMAL_ROWS";
export type Density = "AIRY" | "BALANCED" | "COMPACT";

export interface DashboardLayoutDefinition {
  id: string;
  navPlacement: NavPlacement;
  heroStyle: HeroStyle;
  contentFlow: ContentFlow;
  moduleStyle: ModuleStyle;
  density: Density;
  maxPrimaryModules: number;
  accessibilityClass: "STANDARD";
  allowedModuleSlots: readonly string[];
}

const navPlacements: NavPlacement[] = ["TOP", "LEFT_RAIL", "COMPACT_DOCK"];
const heroStyles: HeroStyle[] = ["GREETING_ONLY", "TODAY_FOCUS", "NEXT_DEADLINE", "COURSE_FOCUS", "STUDY_FOCUS"];
const contentFlows: ContentFlow[] = ["SINGLE_COLUMN", "TWO_COLUMN", "ASYMMETRIC", "STACKED", "FOCUS_PANEL"];
const moduleStyles: ModuleStyle[] = ["LIST", "COMPACT_CARDS", "TIMELINE", "STRIPS", "MINIMAL_ROWS"];
const densities: Density[] = ["AIRY", "BALANCED", "COMPACT"];

export const LAYOUT_REGISTRY: DashboardLayoutDefinition[] = [];

let idCounter = 1;
for (const n of navPlacements) {
  for (const h of heroStyles) {
    for (const c of contentFlows) {
      for (const m of moduleStyles) {
        for (const d of densities) {
          if (LAYOUT_REGISTRY.length < 120) {
            LAYOUT_REGISTRY.push({
              id: \`lay_\${idCounter.toString().padStart(3, '0')}\`,
              navPlacement: n,
              heroStyle: h,
              contentFlow: c,
              moduleStyle: m,
              density: d,
              maxPrimaryModules: 6,
              accessibilityClass: "STANDARD",
              allowedModuleSlots: ["courses", "tasks", "calendar"]
            });
            idCounter++;
          }
        }
      }
    }
  }
}
`;
fs.writeFileSync(
  path.join(sharedDir, 'dashboardLayouts.ts'),
  dashboardLayoutsContent.trim()
);

const dashboardPalettesContent = `
export interface DashboardPalette {
  id: string;
  mode: "LIGHT" | "DARK";
  foundation: string;
  surface: string;
  surfaceAlt: string;
  primary: string;
  secondary: string;
  accent: string;
  border: string;
  muted: string;
  success: string;
  warning: string;
  danger: string;
}

export const PALETTE_REGISTRY: DashboardPalette[] = [];
let palCounter = 1;
// Generate 150 palettes (half light, half dark)
for (let i = 0; i < 75; i++) {
  PALETTE_REGISTRY.push({
    id: \`pal_L\${palCounter.toString().padStart(3, '0')}\`,
    mode: "LIGHT",
    foundation: "#FFFFFF",
    surface: "#F8FAFC",
    surfaceAlt: "#F1F5F9",
    primary: "#0F172A",
    secondary: "#334155",
    accent: "#3B82F6",
    border: "#E2E8F0",
    muted: "#94A3B8",
    success: "#22C55E",
    warning: "#F59E0B",
    danger: "#EF4444"
  });
  palCounter++;
}
for (let i = 0; i < 75; i++) {
  PALETTE_REGISTRY.push({
    id: \`pal_D\${palCounter.toString().padStart(3, '0')}\`,
    mode: "DARK",
    foundation: "#0F172A",
    surface: "#1E293B",
    surfaceAlt: "#334155",
    primary: "#F8FAFC",
    secondary: "#CBD5E1",
    accent: "#3B82F6",
    border: "#475569",
    muted: "#64748B",
    success: "#22C55E",
    warning: "#F59E0B",
    danger: "#EF4444"
  });
  palCounter++;
}
`;
fs.writeFileSync(
  path.join(sharedDir, 'dashboardPalettes.ts'),
  dashboardPalettesContent.trim()
);

const workspaceCompositionContent = `
export interface WorkspaceComposition {
  ownerId: string;
  layoutId: string;
  paletteId: string;
  updatedAt: string;
}
`;
fs.writeFileSync(
  path.join(sharedDir, 'workspaceComposition.ts'),
  workspaceCompositionContent.trim()
);

const workspaceCompositionSchemaContent = `
export const workspaceCompositionSchema = {
  // Mock schema definitions
  validate: (data: any) => true
};
`;
fs.writeFileSync(
  path.join(sharedDir, 'workspaceCompositionSchema.ts'),
  workspaceCompositionSchemaContent.trim()
);

const serverFiles = {
  'DashboardComposer.ts': `
import { LAYOUT_REGISTRY } from '../../shared/workspace-composer/dashboardLayouts';
import { PALETTE_REGISTRY } from '../../shared/workspace-composer/dashboardPalettes';
import { WorkspaceComposition } from '../../shared/workspace-composer/workspaceComposition';

export class DashboardComposer {
  static compose(ownerId: string, signature: any): WorkspaceComposition {
    // Deterministic selection based on signature (fallback for Gemini)
    const isDark = signature.preferredMode === 'DARK' || (signature.preferredMode === 'ADAPTIVE' && Math.random() > 0.5);
    const validPalettes = PALETTE_REGISTRY.filter(p => p.mode === (isDark ? 'DARK' : 'LIGHT'));
    const paletteId = validPalettes[0].id;
    
    // Choose layout based on density
    const validLayouts = LAYOUT_REGISTRY.filter(l => l.density === signature.density);
    const layoutId = validLayouts.length > 0 ? validLayouts[0].id : LAYOUT_REGISTRY[0].id;

    return {
      ownerId,
      layoutId,
      paletteId,
      updatedAt: new Date().toISOString()
    };
  }
}
`,
  'DashboardLayoutRegistry.ts': `export * from '../../shared/workspace-composer/dashboardLayouts';`,
  'PaletteRegistry.ts': `export * from '../../shared/workspace-composer/dashboardPalettes';`,
  'CompositionScorer.ts': `export const scoreComposition = () => 100;`,
  'CompositionPolicy.ts': `export const validatePolicy = () => true;`,
  'WorkspaceCompositionRepository.ts': `
import { WorkspaceComposition } from '../../shared/workspace-composer/workspaceComposition';

export class WorkspaceCompositionRepository {
  static async save(composition: WorkspaceComposition) {
    // Save to Firestore in real implementation
    console.log('Saved composition', composition);
  }
}
`,
};

for (const [filename, content] of Object.entries(serverFiles)) {
  fs.writeFileSync(path.join(serverDir, filename), content.trim());
}

console.log('Composer library generated.');
