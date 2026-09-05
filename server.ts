import express from 'express';
import path from 'path';
import { app } from './src/server/app.js';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const PORT = 3000;

  // Root health check endpoint for Cloud Run health probes
  app.get('/health', (req, res) => {
    res.status(200).json({
      status: 'ok',
      healthy: true,
      port: 3000,
      version: '3.0.0-READY',
      phase: 'Phase 3: Grand Master 3 (The Full Beat)',
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime()),
    });
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.use((req, res, next) => {
      if (req.method === 'GET' && !req.path.startsWith('/api') && req.path !== '/health') {
        return res.sendFile(path.join(distPath, 'index.html'));
      }
      next();
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
