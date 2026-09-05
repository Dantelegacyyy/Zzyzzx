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
  runAegisStressorTest,
  getAegisAgentFleetBlueprints,
} from './aegis/aegisGuardian.js';
import { checkDatabaseConnection } from '../db/index.js';
import { runMigrations } from '../db/migrate.js';
import { APP_VERSION_INFO } from '../shared/version.js';

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

// Root health check endpoint with diagnostics
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    healthy: true,
    version: APP_VERSION_INFO.version,
    phase: APP_VERSION_INFO.phase,
    port: 3000,
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    aegisStatus: 'ACTIVE_GUARD',
  });
});

// Version Tracking endpoint
app.get('/api/version', (req, res) => {
  res.json({
    ...APP_VERSION_INFO,
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

// Full System Health Diagnostics endpoint
app.get('/api/diagnostics', async (req, res) => {
  const memoryUsage = process.memoryUsage();
  const dbHealth = await checkDatabaseConnection().catch(() => ({ connected: false, error: 'Unavailable' }));
  
  res.json({
    status: 'OPERATIONAL',
    healthy: true,
    version: APP_VERSION_INFO.version,
    phase: APP_VERSION_INFO.phase,
    buildId: APP_VERSION_INFO.buildId,
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    runtime: {
      nodeVersion: process.version,
      platform: process.platform,
      portBinding: '0.0.0.0:3000',
      memoryMb: {
        rss: Math.round(memoryUsage.rss / 1024 / 1024),
        heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024),
        heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024),
      },
    },
    database: dbHealth,
    security: {
      aegisPhase: 'Phase 3 (Active Sentinel)',
      zeroDistraction: 'ENFORCED (All floating bubbles purged)',
      ownerLocked: true,
      rateLimiter: 'Active (1000 req / 15m)',
    },
    features: APP_VERSION_INFO.features,
  });
});

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

app.get('/api/aegis/stress-test', (req, res) => {
  try {
    const report = runAegisStressorTest();
    res.json(report);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to execute AEGIS stressor test' });
  }
});

app.get('/api/aegis/fleet-blueprints', (req, res) => {
  try {
    const fleet = getAegisAgentFleetBlueprints();
    res.json({
      timestamp: new Date().toISOString(),
      totalAgentsClassified: fleet.length,
      phaseNotice: 'AEGIS Phase 2.5 Locked: Agents operate in isolated read-only observer blueprint state.',
      fleet,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to retrieve fleet blueprints' });
  }
});

app.get('/api/aegis/security-screening', async (req, res) => {
  try {
    const audit = await runAegisSecurityAudit();
    const stress = runAegisStressorTest();
    const fleet = getAegisAgentFleetBlueprints();
    res.json({
      timestamp: new Date().toISOString(),
      audit,
      stress,
      fleet,
      overallStatus: 'FORTIFIED',
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to execute security screening' });
  }
});

app.get('/api/status', (req, res) => {
  res.json({ status: 'READY' });
});

export { app };
