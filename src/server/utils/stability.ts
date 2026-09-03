import { GoogleGenAI } from '@google/genai';
import { ENV } from '../config/env.js';
import { checkDatabaseConnection } from '../../db/index.js';

export interface StabilityReport {
  timestamp: string;
  services: {
    cloudsql: { status: 'OK' | 'ERROR'; latencyMs?: number; version?: string; error?: string };
    gemini: { status: 'OK' | 'ERROR'; latencyMs?: number; error?: string };
    canvas: { status: 'OK' | 'ERROR'; latencyMs?: number; error?: string };
  };
  overall: 'STABLE' | 'DEGRADED' | 'DOWN';
}

export async function generateStabilityReport(): Promise<StabilityReport> {
  const report: StabilityReport = {
    timestamp: new Date().toISOString(),
    services: {
      cloudsql: { status: 'ERROR' },
      gemini: { status: 'ERROR' },
      canvas: { status: 'ERROR' },
    },
    overall: 'DOWN',
  };

  // 1. Check Cloud SQL (PostgreSQL)
  try {
    const dbCheck = await checkDatabaseConnection();
    if (dbCheck.connected) {
      report.services.cloudsql = {
        status: 'OK',
        latencyMs: dbCheck.latencyMs,
        ...(dbCheck.version ? { version: dbCheck.version } : {}),
      };
    } else {
      report.services.cloudsql = {
        status: 'ERROR',
        error: dbCheck.error || 'Database disconnected',
      };
    }
  } catch (err: any) {
    report.services.cloudsql = { status: 'ERROR', error: err.message };
  }

  // 2. Check Gemini
  try {
    const geminiStart = Date.now();
    if (!ENV.GEMINI_API_KEY) {
      report.services.gemini = {
        status: 'ERROR',
        error: 'Missing GEMINI_API_KEY',
      };
    } else {
      const ai = new GoogleGenAI({ apiKey: ENV.GEMINI_API_KEY });
      await ai.models.get({ model: 'gemini-2.5-flash' });
      report.services.gemini = {
        status: 'OK',
        latencyMs: Date.now() - geminiStart,
      };
    }
  } catch (err: any) {
    report.services.gemini = { status: 'ERROR', error: err.message };
  }

  // 3. Check Canvas API
  try {
    const canvasStart = Date.now();
    const res = await fetch('https://canvas.instructure.com/api/v1/courses', {
      method: 'GET',
    });
    if (res.status === 401 || res.ok) {
      report.services.canvas = {
        status: 'OK',
        latencyMs: Date.now() - canvasStart,
      };
    } else {
      report.services.canvas = {
        status: 'ERROR',
        error: `Unexpected status: ${res.status}`,
      };
    }
  } catch (err: any) {
    report.services.canvas = { status: 'ERROR', error: err.message };
  }

  // Overall status
  const statuses = [
    report.services.cloudsql.status,
    report.services.gemini.status,
    report.services.canvas.status,
  ];

  if (statuses.every((s) => s === 'OK')) {
    report.overall = 'STABLE';
  } else if (statuses.every((s) => s === 'ERROR')) {
    report.overall = 'DOWN';
  } else {
    report.overall = 'DEGRADED';
  }

  return report;
}
