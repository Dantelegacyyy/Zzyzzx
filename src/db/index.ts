import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema.js';

declare global {
  var _postgresPool: Pool | undefined;
}

export const createPool = (): Pool => {
  if (!global._postgresPool) {
    const host = process.env.SQL_HOST || 'localhost';
    const user = process.env.SQL_USER || 'postgres';
    const password = process.env.SQL_PASSWORD || '';
    const database = process.env.SQL_DB_NAME || 'postgres';

    global._postgresPool = new Pool({
      host,
      user,
      password,
      database,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    });

    global._postgresPool.on('error', (err) => {
      console.error('[Cloud SQL Postgres Pool Error]:', err);
    });
  }
  return global._postgresPool;
};

export const pool = createPool();
export const db = drizzle(pool, { schema });

/**
 * Health check procedure to ping Cloud SQL PostgreSQL instance
 */
export async function checkDatabaseConnection(): Promise<{
  connected: boolean;
  latencyMs: number;
  version?: string;
  error?: string;
}> {
  const startTime = Date.now();
  try {
    const client = await pool.connect();
    try {
      const res = await client.query('SELECT version();');
      const latencyMs = Date.now() - startTime;
      return {
        connected: true,
        latencyMs,
        ...(res.rows[0]?.version ? { version: String(res.rows[0].version) } : {}),
      };
    } finally {
      client.release();
    }
  } catch (err: any) {
    return {
      connected: false,
      latencyMs: Date.now() - startTime,
      error: err.message || 'Failed to connect to Cloud SQL PostgreSQL',
    };
  }
}
