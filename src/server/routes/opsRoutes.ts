import { Router } from 'express';
import { checkDatabaseConnection } from '../../db/index.js';
import { requireOperator } from '../auth/authorization.js';
import { runAegisSecurityAudit } from '../aegis/aegisGuardian.js';

export const publicOpsRoutes = Router();
publicOpsRoutes.get('/live', (_req, res) => res.json({ status: 'alive' }));
publicOpsRoutes.get('/ready', async (_req, res) => {
  const database = await checkDatabaseConnection();
  return res.status(database.connected ? 200 : 503).json({
    status: database.connected ? 'ready' : 'not-ready',
    dependencies: {
      database: database.connected ? 'available' : 'unavailable',
    },
  });
});

export const operatorOpsRoutes = Router();
operatorOpsRoutes.use(requireOperator);
operatorOpsRoutes.get('/aegis/audit', async (_req, res) => {
  return res.json(await runAegisSecurityAudit());
});
operatorOpsRoutes.get('/runtime', (_req, res) => {
  const memory = process.memoryUsage();
  return res.json({
    timestamp: new Date().toISOString(),
    uptimeSeconds: process.uptime(),
    memoryMb: {
      rss: Math.round(memory.rss / 1024 / 1024),
      heapUsed: Math.round(memory.heapUsed / 1024 / 1024),
    },
  });
});
