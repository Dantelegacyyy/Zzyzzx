import { securityHeaders } from './src/server/security/headers.js';
import { ENV } from './src/server/config/env.js';
import express from 'express';
const app = express();
app.use(securityHeaders());
app.get('/', (req, res) => res.json({ embed: ENV.AI_STUDIO_PREVIEW_EMBED }));
app.listen(3002, () => console.log('started'));
