import { LAYOUT_REGISTRY } from '../../shared/workspace-composer/dashboardLayouts.js';
import { PALETTE_REGISTRY } from '../../shared/workspace-composer/dashboardPalettes.js';
import { WorkspaceComposition } from '../../shared/workspace-composer/workspaceComposition.js';

export class DashboardComposer {
  static compose(ownerId: string, signature: any): WorkspaceComposition {
    const isDark =
      signature.preferredMode === 'DARK' ||
      (signature.preferredMode === 'ADAPTIVE' && Math.random() > 0.5);
    const validPalettes = PALETTE_REGISTRY.filter(
      (p: any) => p.mode === (isDark ? 'DARK' : 'LIGHT')
    );
    const paletteId = validPalettes[0] ? validPalettes[0].id : 'pal_L001';

    const validLayouts = LAYOUT_REGISTRY.filter(
      (l: any) => l.density === signature.density
    );
    const layoutId = validLayouts[0] ? validLayouts[0].id : 'lay_001';

    return {
      ownerId,
      layoutId,
      paletteId,
      updatedAt: new Date().toISOString(),
    };
  }
}
