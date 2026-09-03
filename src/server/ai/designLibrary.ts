export interface DashboardLayoutDefinition {
  id: string;
  name: string;
  category: 'bento-grid' | 'focus-canvas' | 'split-view' | 'cards-timeline' | 'command-center' | 'hud-radar';
  description: string;
  gridDensity: 'compact' | 'balanced' | 'spacious' | 'dense-terminal';
  widgetArrangement: {
    widgetType: string;
    colSpan: string;
    rowSpan?: string;
    priority: number;
  }[];
  tags: string[];
}

export interface ColorSchemeDefinition {
  id: string;
  name: string;
  category: 'Dark' | 'Light' | 'Neon' | 'Rainbow' | 'Monochrome' | 'Pastel' | 'Cyberpunk' | 'Retro' | 'Nature' | 'High-Contrast';
  bgGradient: string[];
  cardBg: string;
  cardBorder: string;
  primaryAccent: string;
  secondaryAccent: string;
  textPrimary: string;
  textSecondary: string;
  badgeBg: string;
  badgeText: string;
  glowColor: string;
}

// Helper generators to guarantee 100+ unique layout concepts
const layoutCategories = ['bento-grid', 'focus-canvas', 'split-view', 'cards-timeline', 'command-center', 'hud-radar'] as const;
const layoutModifiers = [
  'Ultra-Dense', 'Asymmetric', 'Triple Stack', 'Floating Glass', 'Quad Split', 'Vertical Focus',
  'Grid Matrix', 'Minimalist', 'High-Velocity', 'Command Center', 'Synthesis Deck', 'Bento Master',
  'Radar View', 'Timeline Stream', 'Split Code', 'Lecture Stage', 'Solitary Pad', 'Dual Inspector',
  'Kanban Flow', 'NASA Flight Deck', 'Cyber Grid', 'Bloomberg Terminal', 'Aurora Flow', 'Compact Pill',
];

export function generateLayoutLibrary(): DashboardLayoutDefinition[] {
  const library: DashboardLayoutDefinition[] = [];

  let idCounter = 1;

  // Curated flagship layouts
  const flagships: DashboardLayoutDefinition[] = [
    {
      id: 'layout_bento_classic',
      name: 'Classic Academic Bento Grid',
      category: 'bento-grid',
      description: 'Balanced 3-column layout highlighting primary subjects, upcoming deadlines, and live AI assistant.',
      gridDensity: 'balanced',
      widgetArrangement: [
        { widgetType: 'course_hub', colSpan: 'col-span-1 md:col-span-2', priority: 1 },
        { widgetType: 'deadline_queue', colSpan: 'col-span-1', priority: 2 },
        { widgetType: 'code_pad', colSpan: 'col-span-1 md:col-span-2', priority: 3 },
        { widgetType: 'aegis_status', colSpan: 'col-span-1', priority: 4 },
      ],
      tags: ['academic', 'balanced', 'bento', 'popular'],
    },
    {
      id: 'layout_focus_terminal',
      name: 'Cybernetic Focus Terminal',
      category: 'focus-canvas',
      description: 'Single-focus canvas centering live code execution and AI synthesis with collateral widgets pinned.',
      gridDensity: 'spacious',
      widgetArrangement: [
        { widgetType: 'code_pad', colSpan: 'col-span-1 md:col-span-3', priority: 1 },
        { widgetType: 'course_hub', colSpan: 'col-span-1 md:col-span-2', priority: 2 },
        { widgetType: 'deadline_queue', colSpan: 'col-span-1', priority: 3 },
      ],
      tags: ['coding', 'focus', 'terminal', 'cyberpunk'],
    },
    {
      id: 'layout_command_nasa',
      name: 'NASA Flight Deck Command System',
      category: 'command-center',
      description: 'High-density multi-widget monitoring dashboard with telemetry streams and AI study vectors.',
      gridDensity: 'dense-terminal',
      widgetArrangement: [
        { widgetType: 'course_hub', colSpan: 'col-span-1', priority: 1 },
        { widgetType: 'deadline_queue', colSpan: 'col-span-1', priority: 2 },
        { widgetType: 'aegis_status', colSpan: 'col-span-1', priority: 3 },
        { widgetType: 'code_pad', colSpan: 'col-span-1 md:col-span-3', priority: 4 },
        { widgetType: 'ai_study_vector', colSpan: 'col-span-1 md:col-span-3', priority: 5 },
      ],
      tags: ['dense', 'telemetry', 'flight-deck', 'advanced'],
    },
    {
      id: 'layout_split_inspector',
      name: '60/40 Dual Stream Split Inspector',
      category: 'split-view',
      description: 'Dual-pane architecture separating active subject work on the left from AI intelligence on the right.',
      gridDensity: 'compact',
      widgetArrangement: [
        { widgetType: 'course_hub', colSpan: 'col-span-1 md:col-span-2', priority: 1 },
        { widgetType: 'code_pad', colSpan: 'col-span-1 md:col-span-2', priority: 2 },
        { widgetType: 'deadline_queue', colSpan: 'col-span-1', priority: 3 },
      ],
      tags: ['split', 'dual-pane', 'productivity'],
    },
  ];

  library.push(...flagships);

  // Procedurally generate remaining layouts up to 120 total layout concepts
  for (let i = library.length + 1; i <= 120; i++) {
    const category = layoutCategories[i % layoutCategories.length];
    const modifier = layoutModifiers[i % layoutModifiers.length];
    const suffix = Math.floor(i / layoutCategories.length) + 1;

    library.push({
      id: `layout_gen_${i}`,
      name: `${modifier} ${category.replace('-', ' ').toUpperCase()} v${suffix}`,
      category,
      description: `Architectural layout design paradigm #${i} optimized for ${modifier.toLowerCase()} workflows and multi-modal study.`,
      gridDensity: i % 3 === 0 ? 'compact' : i % 3 === 1 ? 'balanced' : 'spacious',
      widgetArrangement: [
        { widgetType: 'course_hub', colSpan: i % 2 === 0 ? 'col-span-1 md:col-span-2' : 'col-span-1', priority: 1 },
        { widgetType: 'deadline_queue', colSpan: 'col-span-1', priority: 2 },
        { widgetType: 'code_pad', colSpan: i % 3 === 0 ? 'col-span-1 md:col-span-3' : 'col-span-1 md:col-span-2', priority: 3 },
        { widgetType: 'ai_study_vector', colSpan: 'col-span-1', priority: 4 },
        { widgetType: 'aegis_status', colSpan: 'col-span-1', priority: 5 },
      ],
      tags: [category, modifier.toLowerCase(), `v${suffix}`],
    });
  }

  return library;
}

// Library of 250+ Color Schemes
export function generateColorSchemeLibrary(): ColorSchemeDefinition[] {
  const themes: ColorSchemeDefinition[] = [];

  // Handcrafted Flagship Themes
  const flagships: ColorSchemeDefinition[] = [
    {
      id: 'theme_dark_synth',
      name: 'Dark Synth Neon',
      category: 'Dark',
      bgGradient: ['from-[#0A111F]', 'via-[#0D192E]', 'to-[#050B14]'],
      cardBg: 'bg-[#0A111F]/90',
      cardBorder: 'border-cyan-900/50',
      primaryAccent: '#22d3ee', // Cyan
      secondaryAccent: '#a855f7', // Purple
      textPrimary: 'text-white',
      textSecondary: 'text-slate-400',
      badgeBg: 'bg-cyan-950/80',
      badgeText: 'text-cyan-300',
      glowColor: 'rgba(34, 211, 238, 0.25)',
    },
    {
      id: 'theme_clean_paper',
      name: 'Clean Academic Paper',
      category: 'Light',
      bgGradient: ['from-[#F8FAFC]', 'via-[#F1F5F9]', 'to-[#E2E8F0]'],
      cardBg: 'bg-white',
      cardBorder: 'border-slate-200',
      primaryAccent: '#2563eb', // Blue
      secondaryAccent: '#4f46e5', // Indigo
      textPrimary: 'text-slate-900',
      textSecondary: 'text-slate-600',
      badgeBg: 'bg-blue-50',
      badgeText: 'text-blue-700',
      glowColor: 'rgba(37, 99, 235, 0.15)',
    },
    {
      id: 'theme_cyberpunk_2077',
      name: 'Cyberpunk Neon 2077',
      category: 'Cyberpunk',
      bgGradient: ['from-[#0B0314]', 'via-[#180228]', 'to-[#030008]'],
      cardBg: 'bg-[#120421]/90',
      cardBorder: 'border-fuchsia-600/50',
      primaryAccent: '#f0abfc', // Fuchsia
      secondaryAccent: '#facc15', // Yellow
      textPrimary: 'text-fuchsia-100',
      textSecondary: 'text-fuchsia-300/70',
      badgeBg: 'bg-fuchsia-950/90',
      badgeText: 'text-fuchsia-300',
      glowColor: 'rgba(240, 171, 252, 0.35)',
    },
    {
      id: 'theme_rainbow_spectrum',
      name: 'Full Rainbow Spectrum',
      category: 'Rainbow',
      bgGradient: ['from-[#0F172A]', 'via-[#1E1B4B]', 'to-[#31103F]'],
      cardBg: 'bg-[#0F172A]/90',
      cardBorder: 'border-pink-500/40',
      primaryAccent: '#ec4899', // Pink
      secondaryAccent: '#06b6d4', // Cyan
      textPrimary: 'text-white',
      textSecondary: 'text-slate-300',
      badgeBg: 'bg-gradient-to-r from-pink-500/20 to-cyan-500/20',
      badgeText: 'text-pink-300',
      glowColor: 'rgba(236, 72, 153, 0.3)',
    },
    {
      id: 'theme_matrix_emerald',
      name: 'Matrix Emerald Terminal',
      category: 'Monochrome',
      bgGradient: ['from-[#021208]', 'via-[#04200E]', 'to-[#010B04]'],
      cardBg: 'bg-[#031A0B]/90',
      cardBorder: 'border-emerald-600/50',
      primaryAccent: '#10b981', // Emerald
      secondaryAccent: '#34d399',
      textPrimary: 'text-emerald-100',
      textSecondary: 'text-emerald-400/80',
      badgeBg: 'bg-emerald-950',
      badgeText: 'text-emerald-300',
      glowColor: 'rgba(16, 185, 129, 0.3)',
    },
    {
      id: 'theme_sunset_dusk',
      name: 'Sunset Horizon Dusk',
      category: 'Retro',
      bgGradient: ['from-[#1A0B2E]', 'via-[#2B0B3F]', 'to-[#0F051D]'],
      cardBg: 'bg-[#1C0933]/90',
      cardBorder: 'border-rose-500/50',
      primaryAccent: '#fb7185', // Rose
      secondaryAccent: '#fb923c', // Orange
      textPrimary: 'text-rose-50',
      textSecondary: 'text-rose-200/70',
      badgeBg: 'bg-rose-950',
      badgeText: 'text-rose-300',
      glowColor: 'rgba(251, 113, 133, 0.3)',
    },
  ];

  themes.push(...flagships);

  // Palette combinations for procedural generation up to 250 total schemes
  const categories: ColorSchemeDefinition['category'][] = [
    'Dark', 'Light', 'Neon', 'Rainbow', 'Monochrome', 'Pastel', 'Cyberpunk', 'Retro', 'Nature', 'High-Contrast'
  ];

  const colorPairs = [
    { primary: '#22d3ee', secondary: '#38bdf8', name: 'Cyan Sky', bg: ['from-[#082f49]', 'to-[#0c4a6e]'] },
    { primary: '#a855f7', secondary: '#c084fc', name: 'Royal Purple', bg: ['from-[#3b0764]', 'to-[#581c87]'] },
    { primary: '#10b981', secondary: '#6ee7b7', name: 'Forest Mint', bg: ['from-[#064e3b]', 'to-[#047857]'] },
    { primary: '#f43f5e', secondary: '#fb7185', name: 'Crimson Rose', bg: ['from-[#881337]', 'to-[#9f1239]'] },
    { primary: '#eab308', secondary: '#fde047', name: 'Solar Gold', bg: ['from-[#713f12]', 'to-[#854d0e]'] },
    { primary: '#06b6d4', secondary: '#67e8f9', name: 'Oceanic Deep', bg: ['from-[#164e63]', 'to-[#155e75]'] },
    { primary: '#ec4899', secondary: '#f472b6', name: 'Hotline Pink', bg: ['from-[#831843]', 'to-[#9d174d]'] },
    { primary: '#6366f1', secondary: '#818cf8', name: 'Indigo Twilight', bg: ['from-[#1e1b4b]', 'to-[#312e81]'] },
    { primary: '#14b8a6', secondary: '#2dd4bf', name: 'Teal Lagoon', bg: ['from-[#134e4a]', 'to-[#115e59]'] },
    { primary: '#f97316', secondary: '#fb923c', name: 'Amber Glow', bg: ['from-[#7c2d12]', 'to-[#9a3412]'] },
  ];

  for (let i = themes.length + 1; i <= 250; i++) {
    const pair = colorPairs[i % colorPairs.length];
    const category = categories[i % categories.length];
    const themeNum = Math.floor(i / colorPairs.length) + 1;

    const isLight = category === 'Light' || category === 'Pastel';

    themes.push({
      id: `theme_scheme_${i}`,
      name: `${pair.name} ${category} Vol. ${themeNum}`,
      category,
      bgGradient: isLight
        ? ['from-[#F8FAFC]', 'via-[#F1F5F9]', 'to-[#E2E8F0]']
        : pair.bg,
      cardBg: isLight ? 'bg-white' : 'bg-black/60',
      cardBorder: isLight ? 'border-slate-300' : 'border-slate-800',
      primaryAccent: pair.primary,
      secondaryAccent: pair.secondary,
      textPrimary: isLight ? 'text-slate-900' : 'text-white',
      textSecondary: isLight ? 'text-slate-600' : 'text-slate-400',
      badgeBg: isLight ? 'bg-slate-100' : 'bg-slate-900',
      badgeText: isLight ? 'text-slate-800' : 'text-slate-200',
      glowColor: `${pair.primary}40`,
    });
  }

  return themes;
}

// Global cached instances
export const LAYOUT_LIBRARY = generateLayoutLibrary();
export const COLOR_SCHEME_LIBRARY = generateColorSchemeLibrary();

// Search & Retrieval API
export class DesignLibraryManager {
  static getAllLayouts(): DashboardLayoutDefinition[] {
    return LAYOUT_LIBRARY;
  }

  static getAllColorSchemes(): ColorSchemeDefinition[] {
    return COLOR_SCHEME_LIBRARY;
  }

  static searchLayouts(query: string): DashboardLayoutDefinition[] {
    const q = query.toLowerCase();
    return LAYOUT_LIBRARY.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.category.toLowerCase().includes(q) ||
        l.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  static searchColorSchemes(query: string): ColorSchemeDefinition[] {
    const q = query.toLowerCase();
    return COLOR_SCHEME_LIBRARY.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
    );
  }

  static getRandomLayout(category?: string): DashboardLayoutDefinition {
    const filtered = category
      ? LAYOUT_LIBRARY.filter((l) => l.category === category)
      : LAYOUT_LIBRARY;
    const pool = filtered.length > 0 ? filtered : LAYOUT_LIBRARY;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  static getRandomColorScheme(category?: string): ColorSchemeDefinition {
    const filtered = category
      ? COLOR_SCHEME_LIBRARY.filter((c) => c.category.toLowerCase() === category.toLowerCase())
      : COLOR_SCHEME_LIBRARY;
    const pool = filtered.length > 0 ? filtered : COLOR_SCHEME_LIBRARY;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  static matchConcept(vibe?: string, visualStyle?: string): { layout: DashboardLayoutDefinition; theme: ColorSchemeDefinition } {
    let layout = this.getRandomLayout();
    let theme = this.getRandomColorScheme();

    if (visualStyle) {
      const matchedTheme = COLOR_SCHEME_LIBRARY.find(
        (c) => c.name.toLowerCase().includes(visualStyle.toLowerCase()) || c.category.toLowerCase().includes(visualStyle.toLowerCase())
      );
      if (matchedTheme) theme = matchedTheme;
    }

    if (vibe) {
      const v = vibe.toLowerCase();
      if (v.includes('code') || v.includes('terminal')) {
        layout = LAYOUT_LIBRARY.find((l) => l.category === 'focus-canvas') || layout;
      } else if (v.includes('command') || v.includes('flight')) {
        layout = LAYOUT_LIBRARY.find((l) => l.category === 'command-center') || layout;
      }
    }

    return { layout, theme };
  }
}
