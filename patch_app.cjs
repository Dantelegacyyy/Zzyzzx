const fs = require('fs');

let appContent = fs.readFileSync('src/server/app.ts', 'utf8');

// Imports
const newImports = `
import { generateStabilityReport } from './utils/stability.js';
import { requireAuthToken } from './auth/session.js';
`;
appContent = appContent.replace(
  "import { uploadRoutes } from './ingestion/uploadRoutes.js';",
  "import { uploadRoutes } from './ingestion/uploadRoutes.js';" + newImports
);

// Endpoint
const newEndpoint = `
app.get('/api/admin/stability', requireAuthToken, async (req, res) => {
  try {
    const report = await generateStabilityReport();
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate stability report' });
  }
});
`;
appContent = appContent.replace(
  "app.get('/api/status', (req, res) => {",
  newEndpoint + "\napp.get('/api/status', (req, res) => {"
);

fs.writeFileSync('src/server/app.ts', appContent);
