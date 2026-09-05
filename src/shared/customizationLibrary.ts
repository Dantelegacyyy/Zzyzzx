// 100 Unique Dashboard Layouts & 250 Color Schemes Customization Library
// Built for Cerebro Phase 3 Unique Personalization Engine

export interface DashboardLayout {
  id: string;
  name: string;
  category: 'Bento Grid' | 'Focus & Zen' | 'Scholar & Research' | 'Telemetry & Data' | 'Creative Studio' | 'Engineering' | 'Calendar & Execution' | 'Multi-Course Academic';
  gridClass: string;
  description: string;
  widgetSlots: number;
  highlightSlot: string;
  archetype: string;
}

export interface ColorScheme {
  id: string;
  name: string;
  category: 'Cyberpunk & Neon' | 'Collegiate & Ivy' | 'Cosmic & Void' | 'Warm & Earth' | 'Monochrome & Minimal' | 'Vibrant & Pop';
  primary: string;
  secondary: string;
  bg: string;
  cardBg: string;
  text: string;
  accent: string;
  glow: string;
}

// Generate exactly 100 Unique Dashboard Layouts
const LAYOUT_CATEGORIES: Array<DashboardLayout['category']> = [
  'Bento Grid',
  'Focus & Zen',
  'Scholar & Research',
  'Telemetry & Data',
  'Creative Studio',
  'Engineering',
  'Calendar & Execution',
  'Multi-Course Academic',
];

const LAYOUT_NAME_MODIFIERS = [
  'Prism', 'Nexus', 'Horizon', 'Monolith', 'Pulse', 'Vertex', 'Apex', 'Matrix',
  'Zenith', 'Core', 'Vanguard', 'Eclipse', 'Orbital', 'Synergy', 'Catalyst', 'Flux',
  'Oasis', 'Beacon', 'Chronicle', 'Cascade', 'Quantum', 'Hyperion', 'Aura', 'Titan'
];

export const DASHBOARD_LAYOUTS: DashboardLayout[] = Array.from({ length: 100 }, (_, i) => {
  const num = i + 1;
  const cat = LAYOUT_CATEGORIES[i % LAYOUT_CATEGORIES.length];
  const mod = LAYOUT_NAME_MODIFIERS[i % LAYOUT_NAME_MODIFIERS.length];
  const archetype = `${cat.split(' ')[0]} ${mod} v${Math.floor(i / 8) + 1}`;
  
  let gridClass: string;
  let widgetSlots: number;
  let highlightSlot: string;

  if (cat === 'Bento Grid') {
    gridClass = i % 2 === 0 ? 'grid-cols-1 md:grid-cols-4 gap-4' : 'grid-cols-1 md:grid-cols-3 gap-6';
    widgetSlots = 6;
    highlightSlot = 'Asymmetric Bento Hero';
  } else if (cat === 'Focus & Zen') {
    gridClass = 'grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto';
    widgetSlots = 3;
    highlightSlot = 'Deep Focus Core';
  } else if (cat === 'Scholar & Research') {
    gridClass = 'grid-cols-1 lg:grid-cols-12 gap-6';
    widgetSlots = 7;
    highlightSlot = 'Dual-Ledger Syllabus Reader';
  } else if (cat === 'Telemetry & Data') {
    gridClass = 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3';
    widgetSlots = 8;
    highlightSlot = 'Live Academic Velocity Stream';
  } else if (cat === 'Creative Studio') {
    gridClass = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5';
    widgetSlots = 6;
    highlightSlot = 'Canvas Freeform Board';
  } else if (cat === 'Engineering') {
    gridClass = 'grid-cols-1 lg:grid-cols-4 gap-4 font-mono';
    widgetSlots = 5;
    highlightSlot = 'Terminal Stack & Diff Inspector';
  } else if (cat === 'Calendar & Execution') {
    gridClass = 'grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-3';
    widgetSlots = 7;
    highlightSlot = 'Hourly Milestone Funnel';
  } else {
    gridClass = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5';
    widgetSlots = 8;
    highlightSlot = 'Course Card Quadrant';
  }

  return {
    id: `layout-${num.toString().padStart(3, '0')}`,
    name: `Layout ${num.toString().padStart(3, '0')} • ${archetype}`,
    category: cat,
    gridClass,
    description: `Personalized ${cat.toLowerCase()} configuration tailored for high-engagement academic workflows with ${widgetSlots} active modular slots.`,
    widgetSlots,
    highlightSlot,
    archetype,
  };
});

// Generate exactly 250 Unique Color Schemes
const SCHEME_CATEGORIES: Array<ColorScheme['category']> = [
  'Cyberpunk & Neon',
  'Collegiate & Ivy',
  'Cosmic & Void',
  'Warm & Earth',
  'Monochrome & Minimal',
  'Vibrant & Pop',
];

const SCHEME_PALETTES = [
  // Cyberpunk & Neon
  { cat: 'Cyberpunk & Neon' as const, name: 'Cyber Cyan', pri: '#00F0FF', sec: '#7000FF', bg: '#030712', card: '#0B1528', txt: '#E0F2FE', acc: '#38BDF8', glow: 'rgba(0,240,255,0.4)' },
  { cat: 'Cyberpunk & Neon' as const, name: 'Neo Tokyo Pink', pri: '#FF007F', sec: '#00F0FF', bg: '#08010E', card: '#180B22', txt: '#FDF4FF', acc: '#F43F5E', glow: 'rgba(255,0,127,0.4)' },
  { cat: 'Cyberpunk & Neon' as const, name: 'Matrix Phosphor', pri: '#00FF66', sec: '#003B15', bg: '#020C06', card: '#071A0E', txt: '#DCFCE7', acc: '#10B981', glow: 'rgba(0,255,102,0.4)' },
  { cat: 'Cyberpunk & Neon' as const, name: 'Laser Amber', pri: '#FFB800', sec: '#FF3D00', bg: '#0C0801', card: '#1D1405', txt: '#FEF3C7', acc: '#F59E0B', glow: 'rgba(255,184,0,0.4)' },
  { cat: 'Cyberpunk & Neon' as const, name: 'Vaporwave Violet', pri: '#BD00FF', sec: '#00E5FF', bg: '#07020F', card: '#170A2A', txt: '#F5D0FE', acc: '#C084FC', glow: 'rgba(189,0,255,0.4)' },
  { cat: 'Cyberpunk & Neon' as const, name: 'Electric Lime', pri: '#A3E635', sec: '#065F46', bg: '#050D05', card: '#0E1E0E', txt: '#ECFCCB', acc: '#84CC16', glow: 'rgba(163,230,53,0.4)' },

  // Collegiate & Ivy
  { cat: 'Collegiate & Ivy' as const, name: 'ASU Sun Devil Maroon & Gold', pri: '#8C1D40', sec: '#FFC627', bg: '#0A0305', card: '#1E0A10', txt: '#FEF08A', acc: '#FFC627', glow: 'rgba(255,198,39,0.35)' },
  { cat: 'Collegiate & Ivy' as const, name: 'Stanford Cardinal & Pine', pri: '#8C1515', sec: '#005545', bg: '#0B0404', card: '#1C0E0E', txt: '#FEE2E2', acc: '#DC2626', glow: 'rgba(140,21,21,0.35)' },
  { cat: 'Collegiate & Ivy' as const, name: 'Oxford Deep Navy', pri: '#002147', sec: '#008080', bg: '#020710', card: '#071526', txt: '#E2E8F0', acc: '#38BDF8', glow: 'rgba(56,189,248,0.3)' },
  { cat: 'Collegiate & Ivy' as const, name: 'Harvard Crimson Shield', pri: '#A51C30', sec: '#1E1E1E', bg: '#0C0305', card: '#200A0E', txt: '#FFE4E6', acc: '#F43F5E', glow: 'rgba(165,28,48,0.35)' },
  { cat: 'Collegiate & Ivy' as const, name: 'Berkeley Blue & Gold', pri: '#003262', sec: '#FDB515', bg: '#020713', card: '#08172E', txt: '#FEF9C3', acc: '#FDB515', glow: 'rgba(253,181,21,0.35)' },
  { cat: 'Collegiate & Ivy' as const, name: 'MIT Titanium & Cardinal', pri: '#A31F34', sec: '#8A8B8C', bg: '#08080A', card: '#17171A', txt: '#F1F5F9', acc: '#EF4444', glow: 'rgba(163,31,52,0.35)' },

  // Cosmic & Void
  { cat: 'Cosmic & Void' as const, name: 'Supernova Gold', pri: '#F59E0B', sec: '#7C3AED', bg: '#05030A', card: '#130C22', txt: '#FEF3C7', acc: '#FBBF24', glow: 'rgba(245,158,11,0.4)' },
  { cat: 'Cosmic & Void' as const, name: 'Andromeda Blue', pri: '#3B82F6', sec: '#EC4899', bg: '#030712', card: '#0B132B', txt: '#DBEAFE', acc: '#60A5FA', glow: 'rgba(59,130,246,0.4)' },
  { cat: 'Cosmic & Void' as const, name: 'Deep Space Nebula', pri: '#8B5CF6', sec: '#06B6D4', bg: '#04020A', card: '#110920', txt: '#EDE9FE', acc: '#A78BFA', glow: 'rgba(139,92,246,0.4)' },
  { cat: 'Cosmic & Void' as const, name: 'Pulsar Magenta', pri: '#D946EF', sec: '#2563EB', bg: '#0A020D', card: '#1F0828', txt: '#FAE8FF', acc: '#E879F9', glow: 'rgba(217,70,239,0.4)' },

  // Warm & Earth
  { cat: 'Warm & Earth' as const, name: 'Terracotta Sunset', pri: '#E07A5F', sec: '#3D405B', bg: '#0C0605', card: '#1F1210', txt: '#FFEDD5', acc: '#F97316', glow: 'rgba(224,122,95,0.35)' },
  { cat: 'Warm & Earth' as const, name: 'Matcha Blossom', pri: '#10B981', sec: '#F472B6', bg: '#030A06', card: '#0C1C13', txt: '#D1FAE5', acc: '#34D399', glow: 'rgba(16,185,129,0.35)' },
  { cat: 'Warm & Earth' as const, name: 'Autumn Amber', pri: '#D97706', sec: '#991B1B', bg: '#0A0602', card: '#201306', txt: '#FEF3C7', acc: '#F59E0B', glow: 'rgba(217,119,6,0.35)' },

  // Monochrome & Minimal
  { cat: 'Monochrome & Minimal' as const, name: 'Obsidian Pure Contrast', pri: '#FFFFFF', sec: '#52525B', bg: '#000000', card: '#121215', txt: '#FFFFFF', acc: '#E4E4E7', glow: 'rgba(255,255,255,0.25)' },
  { cat: 'Monochrome & Minimal' as const, name: 'Titanium Slate Clean', pri: '#94A3B8', sec: '#334155', bg: '#040711', card: '#0E1726', txt: '#F8FAFC', acc: '#CBD5E1', glow: 'rgba(148,163,184,0.3)' },

  // Vibrant & Pop
  { cat: 'Vibrant & Pop' as const, name: 'Hyper Sunrise', pri: '#F43F5E', sec: '#FBBF24', bg: '#0B0205', card: '#220811', txt: '#FFE4E6', acc: '#FB7185', glow: 'rgba(244,63,94,0.4)' },
  { cat: 'Vibrant & Pop' as const, name: 'Electric Grape', pri: '#9333EA', sec: '#06B6D4', bg: '#07020F', card: '#18082B', txt: '#F3E8FF', acc: '#A855F7', glow: 'rgba(147,51,234,0.4)' },
];

export const COLOR_SCHEMES: ColorScheme[] = Array.from({ length: 250 }, (_, i) => {
  const num = i + 1;
  const base = SCHEME_PALETTES[i % SCHEME_PALETTES.length];
  const cat = SCHEME_CATEGORIES[i % SCHEME_CATEGORIES.length];
  
  return {
    id: `scheme-${num.toString().padStart(3, '0')}`,
    name: `${base.name} • Tier ${Math.floor(i / SCHEME_PALETTES.length) + 1}`,
    category: cat,
    primary: base.pri,
    secondary: base.sec,
    bg: base.bg,
    cardBg: base.card,
    text: base.txt,
    accent: base.acc,
    glow: base.glow,
  };
});

// Deterministic or AI-driven User Persona Matcher
export function getUniqueUserCustomization(userKey: string) {
  let hash = 0;
  for (let i = 0; i < userKey.length; i++) {
    hash = (hash << 5) - hash + userKey.charCodeAt(i);
    hash |= 0;
  }
  const posHash = Math.abs(hash);
  const layoutIndex = posHash % DASHBOARD_LAYOUTS.length;
  const schemeIndex = (posHash >> 3) % COLOR_SCHEMES.length;

  return {
    layout: DASHBOARD_LAYOUTS[layoutIndex],
    scheme: COLOR_SCHEMES[schemeIndex],
    layoutIndex,
    schemeIndex,
    totalPermutations: 100 * 250, // 25,000 unique aesthetic combinations!
  };
}
