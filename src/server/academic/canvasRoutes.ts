import { Router } from 'express';
import { requireAuthToken } from '../auth/session.js';
import { ENV } from '../config/env.js';
import crypto from 'crypto';
import { executeCanvasSync } from './canvasSyncEngine.js';

export const canvasRoutes = Router();
canvasRoutes.use(requireAuthToken);

// Mock storage for Canvas tokens - in a real app this goes to a secure DB table
const canvasTokenStore = new Map<string, string>();

const getEncryptionKey = (): Buffer => {
  const b64Key = ENV.CANVAS_TOKEN_ENCRYPTION_KEY_B64;
  if (!b64Key) {
    return crypto.randomBytes(32); // Fallback for dev only
  }
  return Buffer.from(b64Key, 'base64');
};

const encryptToken = (token: string) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-gcm', getEncryptionKey(), iv);
  let encrypted = cipher.update(token, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag().toString('hex');
  return `${iv.toString('hex')}:${authTag}:${encrypted}`;
};

const decryptToken = (encryptedData: string) => {
  const [ivHex, authTagHex, encrypted] = encryptedData.split(':');
  if (!ivHex || !authTagHex || !encrypted) {
    throw new Error('Invalid encrypted token format');
  }
  const decipher = crypto.createDecipheriv(
    'aes-256-gcm',
    getEncryptionKey(),
    Buffer.from(ivHex, 'hex')
  );
  decipher.setAuthTag(Buffer.from(authTagHex, 'hex'));
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

canvasRoutes.post('/token', async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      res.status(400).json({ error: 'MISSING_TOKEN' });
      return;
    }

    const encrypted = encryptToken(token);
    canvasTokenStore.set(req.principal!.subjectId, encrypted);

    res.json({ status: 'success' });
  } catch (error) {
    res.status(500).json({ error: 'TOKEN_VALIDATION_FAILED' });
  }
});

canvasRoutes.get('/status', (req, res) => {
  const hasToken = canvasTokenStore.has(req.principal!.subjectId);
  res.json({ connected: hasToken });
});

canvasRoutes.delete('/token', (req, res) => {
  canvasTokenStore.delete(req.principal!.subjectId);
  res.json({ status: 'success' });
});

canvasRoutes.post('/sync', async (req, res) => {
  const encrypted = canvasTokenStore.get(req.principal!.subjectId);
  if (!encrypted) {
    res.status(401).json({ error: 'CANVAS_NOT_CONNECTED' });
    return;
  }

  try {
    const token = decryptToken(encrypted);
    const tenant = { subjectId: req.principal!.subjectId };

    const result = await executeCanvasSync(req.principal!.subjectId, token);
    res.json({ status: 'success', syncedCourses: result.syncedCourses });
  } catch (error) {
    console.error('Canvas sync failed:', error);
    res.status(500).json({ error: 'SYNC_FAILED' });
  }
});
