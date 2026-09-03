import { db } from './index.js';
import { users } from './schema.js';

export async function getOrCreateUser(uid: string, email: string, profileName?: string) {
  try {
    const result = await db
      .insert(users)
      .values({
        uid,
        email,
        profileName: profileName || null,
      })
      .onConflictDoUpdate({
        target: users.uid,
        set: {
          email,
          ...(profileName ? { profileName } : {}),
        },
      })
      .returning();

    return result[0];
  } catch (error) {
    console.error('Database query failed:', error);
    throw new Error('Database query failed. Please try again later.', { cause: error });
  }
}
