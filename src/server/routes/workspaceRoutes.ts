import { Router, Response } from 'express';
import { requireAuth, AuthRequest } from '../middleware/auth.js';
import { db } from '../../db/index.js';
import { users, courses, notes } from '../../db/schema.js';
import { getOrCreateUser } from '../../db/users.js';
import { eq, desc } from 'drizzle-orm';

const router = Router();

// Fetch Cloud SQL Database Statistics
router.get('/db-stats', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const userCount = await db.select().from(users);
    const courseCount = await db.select().from(courses);
    const noteCount = await db.select().from(notes);

    return res.json({
      status: 'HEALTHY',
      database: 'Cloud SQL PostgreSQL',
      region: 'us-west2',
      tables: {
        users: userCount.length,
        courses: courseCount.length,
        notes: noteCount.length,
      },
      lastChecked: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Failed to fetch db stats:', error);
    return res.status(500).json({ error: 'Failed to query Cloud SQL stats' });
  }
});

// Sync user profile upon sign in
router.post('/user/sync', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || !req.user.uid || !req.user.email) {
      return res.status(400).json({ error: 'Invalid user token data' });
    }
    const profileName = req.body.profileName || req.user.name || '';
    const userRecord = await getOrCreateUser(req.user.uid, req.user.email, profileName);
    return res.json({ success: true, user: userRecord });
  } catch (error: any) {
    console.error('Failed to sync user:', error);
    return res.status(500).json({ error: error.message || 'Database error during user sync' });
  }
});

// Fetch user courses
router.get('/courses', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.uid) return res.status(401).json({ error: 'Unauthorized' });
    
    const userCourses = await db
      .select()
      .from(courses)
      .where(eq(courses.userId, req.user.uid))
      .orderBy(desc(courses.createdAt));

    return res.json({ courses: userCourses });
  } catch (error: any) {
    console.error('Failed to fetch courses:', error);
    return res.status(500).json({ error: 'Failed to fetch courses from Cloud SQL' });
  }
});

// Create course
router.post('/courses', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.uid) return res.status(401).json({ error: 'Unauthorized' });
    const { title, code, instructor, syncedCanvas } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Course title is required' });
    }

    const [newCourse] = await db
      .insert(courses)
      .values({
        userId: req.user.uid,
        title,
        code: code || null,
        instructor: instructor || null,
        syncedCanvas: syncedCanvas || 'false',
      })
      .returning();

    return res.json({ success: true, course: newCourse });
  } catch (error: any) {
    console.error('Failed to create course:', error);
    return res.status(500).json({ error: 'Failed to create course in Cloud SQL' });
  }
});

// Fetch user notes
router.get('/notes', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.uid) return res.status(401).json({ error: 'Unauthorized' });

    const userNotes = await db
      .select()
      .from(notes)
      .where(eq(notes.userId, req.user.uid))
      .orderBy(desc(notes.updatedAt));

    return res.json({ notes: userNotes });
  } catch (error: any) {
    console.error('Failed to fetch notes:', error);
    return res.status(500).json({ error: 'Failed to fetch notes from Cloud SQL' });
  }
});

// Create note
router.post('/notes', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.uid) return res.status(401).json({ error: 'Unauthorized' });
    const { title, content, courseId } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const [newNote] = await db
      .insert(notes)
      .values({
        userId: req.user.uid,
        title,
        content,
        courseId: courseId ? Number(courseId) : null,
      })
      .returning();

    return res.json({ success: true, note: newNote });
  } catch (error: any) {
    console.error('Failed to create note:', error);
    return res.status(500).json({ error: 'Failed to save note to Cloud SQL' });
  }
});

export { router as workspaceRoutes };
