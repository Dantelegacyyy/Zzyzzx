const fs = require('fs');

let dashboardComposer = fs.readFileSync(
  'src/server/workspace-composer/DashboardComposer.ts',
  'utf8'
);
dashboardComposer = dashboardComposer.replace(
  'const paletteId = validPalettes.length > 0 ? validPalettes[0].id : "pal_L001";',
  'const paletteId = validPalettes[0] ? validPalettes[0].id : "pal_L001";'
);
dashboardComposer = dashboardComposer.replace(
  'const layoutId = validLayouts.length > 0 ? validLayouts[0].id : "lay_001";',
  'const layoutId = validLayouts[0] ? validLayouts[0].id : "lay_001";'
);
fs.writeFileSync(
  'src/server/workspace-composer/DashboardComposer.ts',
  dashboardComposer
);
