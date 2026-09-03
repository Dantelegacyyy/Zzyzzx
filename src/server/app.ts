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
import { workspaceRoutes } from './routes/workspaceRoutes.js';
import { authRoutes } from './auth/authRoutes.js';
import { generateStabilityReport } from './utils/stability.js';
import {
  runAegisSecurityAudit,
  runOperationalFeatureTests,
  generateAppStoreReadinessReport,
} from './aegis/aegisGuardian.js';
import { checkDatabaseConnection } from '../db/index.js';
import { runMigrations } from '../db/migrate.js';

export interface ApiLogEntry {
  id: string;
  timestamp: string;
  method: string;
  path: string;
  statusCode: number;
  durationMs: number;
  clientIp: string;
  statusText: string;
}

const apiLogsBuffer: ApiLogEntry[] = [];
const MAX_LOGS = 100;

export function addApiLog(entry: Omit<ApiLogEntry, 'id'>) {
  const log: ApiLogEntry = {
    ...entry,
    id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
  };
  apiLogsBuffer.unshift(log);
  if (apiLogsBuffer.length > MAX_LOGS) {
    apiLogsBuffer.pop();
  }
}

const app = express();
app.set('trust proxy', 1);
app.use(assignRequestId);

// API Connection Logger Middleware
app.use((req, res, next) => {
  const startTime = Date.now();
  const path = req.path;
  const method = req.method;

  res.on('finish', () => {
    if (path.startsWith('/api')) {
      const durationMs = Date.now() - startTime;
      const statusCode = res.statusCode;
      let statusText = 'OK';
      if (statusCode >= 400 && statusCode < 500) statusText = 'Client Error';
      else if (statusCode >= 500) statusText = 'Server Error';

      addApiLog({
        timestamp: new Date().toISOString(),
        method,
        path,
        statusCode,
        durationMs,
        clientIp: (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '127.0.0.1',
        statusText,
      });
    }
  });

  next();
});

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
  validate: false,
  keyGenerator: (req) => {
    return req.ip || (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '127.0.0.1';
  },
});
app.use('/api', globalLimiter);
app.use('/api/auth', authRoutes);
app.use('/api/canvas', canvasRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/workspace', workspaceRoutes);

app.get('/api/logs', (req, res) => {
  res.json({
    total: apiLogsBuffer.length,
    logs: apiLogsBuffer,
  });
});

app.get('/api/db/health', async (req, res) => {
  const dbHealth = await checkDatabaseConnection();
  res.status(dbHealth.connected ? 200 : 500).json(dbHealth);
});

app.post('/api/db/migrate', async (req, res) => {
  try {
    const result = await runMigrations();
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Migration failed' });
  }
});

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

app.get('/api/aegis/audit', async (req, res) => {
  try {
    const report = await runAegisSecurityAudit();
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: 'Failed to execute AEGIS security audit' });
  }
});

app.get('/api/aegis/operational-tests', async (req, res) => {
  try {
    const results = await runOperationalFeatureTests();
    res.json({ timestamp: new Date().toISOString(), results });
  } catch (error) {
    res.status(500).json({ error: 'Failed to execute operational feature tests' });
  }
});

app.get('/api/aegis/appstore-report', (req, res) => {
  try {
    const report = generateAppStoreReadinessReport();
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate App Store report' });
  }
});

app.get('/api/status', (req, res) => {
  res.json({ status: 'READY' });
});

export { app };
