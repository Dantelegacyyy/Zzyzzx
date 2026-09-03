import { app } from './src/server/app.js';
import { ENV } from './src/server/config/env.js';

app.get('/api/debug-env', (req, res) =>
  res.json({
    AI_STUDIO_PREVIEW_EMBED: ENV.AI_STUDIO_PREVIEW_EMBED,
    RAW: process.env.AI_STUDIO_PREVIEW_EMBED,
  })
);
