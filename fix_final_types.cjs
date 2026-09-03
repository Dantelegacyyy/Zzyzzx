const fs = require('fs');

let sessionContent = fs.readFileSync('src/server/auth/session.ts', 'utf8');
sessionContent = sessionContent.replace(
  'const authHeader = req.headers.authorization;',
  'const authHeader = Array.isArray(req.headers.authorization) ? req.headers.authorization[0] : req.headers.authorization;'
);
fs.writeFileSync('src/server/auth/session.ts', sessionContent);

let dashboardComposer = fs.readFileSync(
  'src/server/workspace-composer/DashboardComposer.ts',
  'utf8'
);
dashboardComposer = dashboardComposer.replace(
  'const paletteId = validPalettes.length > 0 ? validPalettes[0].id : "pal_L001";',
  'const paletteId = validPalettes.length > 0 ? validPalettes[0]?.id : "pal_L001";'
);
dashboardComposer = dashboardComposer.replace(
  'const layoutId = validLayouts.length > 0 ? validLayouts[0].id : "lay_001";',
  'const layoutId = validLayouts.length > 0 ? validLayouts[0]?.id : "lay_001";'
);
fs.writeFileSync(
  'src/server/workspace-composer/DashboardComposer.ts',
  dashboardComposer
);
