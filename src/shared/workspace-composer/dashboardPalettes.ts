export interface DashboardPalette {
  id: string;
  mode: 'LIGHT' | 'DARK';
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
    id: `pal_L${palCounter.toString().padStart(3, '0')}`,
    mode: 'LIGHT',
    foundation: '#FFFFFF',
    surface: '#F8FAFC',
    surfaceAlt: '#F1F5F9',
    primary: '#0F172A',
    secondary: '#334155',
    accent: '#3B82F6',
    border: '#E2E8F0',
    muted: '#94A3B8',
    success: '#22C55E',
    warning: '#F59E0B',
    danger: '#EF4444',
  });
  palCounter++;
}
for (let i = 0; i < 75; i++) {
  PALETTE_REGISTRY.push({
    id: `pal_D${palCounter.toString().padStart(3, '0')}`,
    mode: 'DARK',
    foundation: '#0F172A',
    surface: '#1E293B',
    surfaceAlt: '#334155',
    primary: '#F8FAFC',
    secondary: '#CBD5E1',
    accent: '#3B82F6',
    border: '#475569',
    muted: '#64748B',
    success: '#22C55E',
    warning: '#F59E0B',
    danger: '#EF4444',
  });
  palCounter++;
}
