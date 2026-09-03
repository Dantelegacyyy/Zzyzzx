import { pool } from './index.js';

/**
 * Migration Script to verify and initialize Cloud SQL PostgreSQL schema DDL.
 */
export async function runMigrations() {
  console.log('[Cloud SQL Migration]: Executing schema migration on Cloud SQL (PostgreSQL)...');
  const client = await pool.connect();
  try {
    await client.query('BEGIN;');

    // 1. Create Users Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        uid TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL,
        profile_name TEXT,
        university TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // 2. Create Courses Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS courses (
        id SERIAL PRIMARY KEY,
        user_id TEXT NOT NULL REFERENCES users(uid) ON DELETE CASCADE,
        title TEXT NOT NULL,
        code TEXT,
        instructor TEXT,
        synced_canvas TEXT DEFAULT 'false',
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // 3. Create Notes Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS notes (
        id SERIAL PRIMARY KEY,
        user_id TEXT NOT NULL REFERENCES users(uid) ON DELETE CASCADE,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        course_id INTEGER REFERENCES courses(id) ON DELETE SET NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    await client.query('COMMIT;');
    console.log('[Cloud SQL Migration]: Migration successfully applied to Cloud SQL PostgreSQL.');
    return { success: true, message: 'Cloud SQL PostgreSQL migration complete' };
  } catch (error: any) {
    await client.query('ROLLBACK;');
    console.error('[Cloud SQL Migration Error]:', error);
    throw error;
  } finally {
    client.release();
  }
}

// Executable directly if run as main script
if (process.argv[1]?.endsWith('migrate.ts') || process.argv[1]?.endsWith('migrate.js')) {
  runMigrations()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
