import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { ENV } from './config/env.js';
import { securityHeaders } from './security/headers.js';
import { enforceContentType } from './security/contentType.js';
import { assignRequestId } from './security/requestId.js';
import rateLimit from 'express-rate-limit';
import { canvasRoutes } from './academic/canvasRoutes.js';
import { aiRoutes } from './ai/routes.js';
import { uploadRoutes } from './ingestion/uploadRoutes.js';
import { generateStabilityReport } from './utils/stability.js';

const app = express();
app.use(assignRequestId);
app.use(securityHeaders());
app.use(
  cors({
    origin: ENV.CLIENT_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json({ limit: '1mb' }));

app.use(enforceContentType);

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', globalLimiter);
app.use('/api/canvas', canvasRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/debug-env', (req, res) =>
  res.json({
    embed: ENV.AI_STUDIO_PREVIEW_EMBED,
    raw: process.env.AI_STUDIO_PREVIEW_EMBED,
  })
);

app.get('/api/diagnostic', (req, res) => {
  res.json({
    status: 'READY',
    timestamp: new Date().toISOString(),
    expected_binding: {
      host: '0.0.0.0',
      port: 3001,
    },
    node_env: process.env.NODE_ENV || 'development',
  });
});

app.get('/api/debug-server', async (req, res) => {
  const memoryUsage = process.memoryUsage();
  res.json({
    timestamp: new Date().toISOString(),
    uptime_seconds: process.uptime(),
    memory_usage_mb: {
      rss: Math.round(memoryUsage.rss / 1024 / 1024),
      heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024),
      heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024),
      external: Math.round(memoryUsage.external / 1024 / 1024),
    },
    env_status: {
      NODE_ENV: process.env.NODE_ENV || 'missing',
      PORT: process.env.PORT || 'missing',
      GCLOUD_PROJECT: process.env.GCLOUD_PROJECT || 'missing',
    },
  });
});

app.get('/api/admin/stability', async (req, res) => {
  try {
    const report = await generateStabilityReport();
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate stability report' });
  }
});

app.get('/api/status', (req, res) => {
  res.json({ status: 'READY' });
});

export { app };
