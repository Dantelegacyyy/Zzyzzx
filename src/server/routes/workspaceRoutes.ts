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

// Smart Search Endpoint
router.get('/smart-search', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const query = String(req.query.q || '').trim().toLowerCase();
    const filter = String(req.query.filter || 'all').toLowerCase();

    // Fetch user courses & notes from Cloud SQL
    let userCourses: any[] = [];
    let userNotes: any[] = [];

    if (req.user?.uid) {
      userCourses = await db.select().from(courses).where(eq(courses.userId, req.user.uid));
      userNotes = await db.select().from(notes).where(eq(notes.userId, req.user.uid));
    }

    // Curated Academic Knowledge Topics & Syllabus Concepts
    const academicConcepts = [
      {
        id: 'c-1',
        title: 'Binary Search Trees & AVL Balancing',
        category: 'Concept',
        course: 'CS 2110: Computer Science II',
        snippet: 'Self-balancing binary trees ensuring O(log n) worst-case search and insertion times.',
        relevance: 98,
        tags: ['Algorithms', 'Data Structures', 'Tree Traversal'],
      },
      {
        id: 'c-2',
        title: 'Fourier Transform & Frequency Analysis',
        category: 'Lecture Topic',
        course: 'ECE 3100: Signals & Systems',
        snippet: 'Decomposing continuous waveforms into sinusoidal frequency spectrum components.',
        relevance: 94,
        tags: ['Calculus', 'Signals', 'DSP'],
      },
      {
        id: 'c-3',
        title: 'Dijkstra and A* Shortest Path Algorithms',
        category: 'Concept',
        course: 'CS 3110: Algorithm Design',
        snippet: 'Graph exploration using priority queues and heuristic distance estimations.',
        relevance: 92,
        tags: ['Graphs', 'Shortest Path', 'Heuristics'],
      },
      {
        id: 'c-4',
        title: 'Eigenvalues, Eigenvectors & PCA Reduction',
        category: 'Formula / Theorem',
        course: 'MATH 2940: Linear Algebra',
        snippet: 'Matrix diagonalization and dimensional reduction for machine learning feature spaces.',
        relevance: 90,
        tags: ['Linear Algebra', 'Matrices', 'Dimensionality'],
      },
      {
        id: 'c-5',
        title: 'TCP Flow Control & Congestion Avoidance',
        category: 'Syllabus Module',
        course: 'CS 4450: Computer Networks',
        snippet: 'Sliding window protocols, Tahoe/Reno congestion windows, and packet ACK pacing.',
        relevance: 88,
        tags: ['Networking', 'Protocols', 'TCP/IP'],
      },
    ];

    const results: any[] = [];

    // Filter courses
    if (filter === 'all' || filter === 'courses') {
      userCourses.forEach((c) => {
        if (!query || c.title.toLowerCase().includes(query) || (c.code && c.code.toLowerCase().includes(query))) {
          results.push({
            id: `course-${c.id}`,
            title: `${c.code ? c.code + ': ' : ''}${c.title}`,
            category: 'Course',
            course: c.code || 'Academic Course',
            snippet: `Instructor: ${c.instructor || 'Staff'} • Canvas Synced`,
            relevance: query ? 95 : 85,
            tags: ['Enrolled', 'Cloud SQL Synced'],
          });
        }
      });
    }

    // Filter notes
    if (filter === 'all' || filter === 'notes') {
      userNotes.forEach((n) => {
        if (!query || n.title.toLowerCase().includes(query) || n.content.toLowerCase().includes(query)) {
          results.push({
            id: `note-${n.id}`,
            title: n.title,
            category: 'Note',
            course: 'Personal Notes Vault',
            snippet: n.content.slice(0, 140) + (n.content.length > 140 ? '...' : ''),
            relevance: query ? 96 : 80,
            tags: ['Cloud SQL', 'Voice/Text Note'],
          });
        }
      });
    }

    // Filter concepts
    if (filter === 'all' || filter === 'concepts') {
      academicConcepts.forEach((c) => {
        if (!query || c.title.toLowerCase().includes(query) || c.snippet.toLowerCase().includes(query) || c.tags.some(t => t.toLowerCase().includes(query))) {
          results.push(c);
        }
      });
    }

    // Sort by relevance
    results.sort((a, b) => b.relevance - a.relevance);

    return res.json({
      query,
      filter,
      total: results.length,
      results,
    });
  } catch (error: any) {
    console.error('Smart search error:', error);
    return res.status(500).json({ error: 'Search indexing failure' });
  }
});

// Knowledge Graph Data Endpoint
router.get('/knowledge-graph', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const nodes = [
      { id: 'n1', label: 'Computer Science II', type: 'course', level: 1, color: '#38bdf8', category: 'Core CS' },
      { id: 'n2', label: 'Data Structures', type: 'module', level: 2, color: '#818cf8', category: 'Core CS' },
      { id: 'n3', label: 'Binary Search Trees', type: 'concept', level: 3, color: '#c084fc', category: 'Core CS', mastery: 88 },
      { id: 'n4', label: 'AVL & Red-Black Trees', type: 'concept', level: 3, color: '#e879f9', category: 'Core CS', mastery: 74 },
      { id: 'n5', label: 'Graph Algorithms', type: 'module', level: 2, color: '#818cf8', category: 'Core CS' },
      { id: 'n6', label: "Dijkstra's Algorithm", type: 'concept', level: 3, color: '#34d399', category: 'Core CS', mastery: 95 },
      { id: 'n7', label: 'Linear Algebra', type: 'course', level: 1, color: '#fbbf24', category: 'Mathematics' },
      { id: 'n8', label: 'Eigenvectors & SVD', type: 'concept', level: 2, color: '#f59e0b', category: 'Mathematics', mastery: 82 },
      { id: 'n9', label: 'Signals & Systems', type: 'course', level: 1, color: '#f43f5e', category: 'Engineering' },
      { id: 'n10', label: 'Fourier Transforms', type: 'concept', level: 2, color: '#ec4899', category: 'Engineering', mastery: 91 },
      { id: 'n11', label: 'Machine Learning Foundations', type: 'course', level: 1, color: '#06b6d4', category: 'AI & Data' },
      { id: 'n12', label: 'Gradient Descent & Loss', type: 'concept', level: 2, color: '#22d3ee', category: 'AI & Data', mastery: 89 },
      { id: 'n13', label: 'Computer Networks', type: 'course', level: 1, color: '#a78bfa', category: 'Systems' },
      { id: 'n14', label: 'TCP/IP Protocol Stack', type: 'concept', level: 2, color: '#818cf8', category: 'Systems', mastery: 85 },
    ];

    const edges = [
      { source: 'n1', target: 'n2', relationship: 'contains' },
      { source: 'n2', target: 'n3', relationship: 'covers' },
      { source: 'n3', target: 'n4', relationship: 'advances_to' },
      { source: 'n1', target: 'n5', relationship: 'contains' },
      { source: 'n5', target: 'n6', relationship: 'covers' },
      { source: 'n7', target: 'n8', relationship: 'core_theorem' },
      { source: 'n8', target: 'n11', relationship: 'prerequisite_for' },
      { source: 'n11', target: 'n12', relationship: 'optimizes_with' },
      { source: 'n9', target: 'n10', relationship: 'mathematical_foundation' },
      { source: 'n10', target: 'n11', relationship: 'feature_extraction' },
      { source: 'n13', target: 'n14', relationship: 'architects' },
      { source: 'n6', target: 'n14', relationship: 'shortest_path_routing' },
    ];

    return res.json({ nodes, edges, generatedAt: new Date().toISOString() });
  } catch (error: any) {
    console.error('Knowledge graph error:', error);
    return res.status(500).json({ error: 'Failed to construct knowledge graph' });
  }
});

// Academic Progress & Mastery Statistics Endpoint
router.get('/progress-stats', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    return res.json({
      overallVelocity: 88,
      studyHoursWeekly: [
        { day: 'Mon', hours: 4.5, target: 4.0 },
        { day: 'Tue', hours: 5.2, target: 4.0 },
        { day: 'Wed', hours: 3.8, target: 4.0 },
        { day: 'Thu', hours: 6.0, target: 4.5 },
        { day: 'Fri', hours: 4.0, target: 3.5 },
        { day: 'Sat', hours: 2.5, target: 2.0 },
        { day: 'Sun', hours: 5.0, target: 3.0 },
      ],
      courseMastery: [
        { name: 'CS 2110: Computer Science II', completion: 84, grade: 'A', status: 'Ahead of Pace' },
        { name: 'MATH 2940: Linear Algebra', completion: 91, grade: 'A+', status: 'Exam Ready' },
        { name: 'ECE 3100: Signals & Systems', completion: 76, grade: 'B+', status: 'Active Review' },
        { name: 'CS 4450: Computer Networks', completion: 88, grade: 'A', status: 'Assignments Done' },
      ],
      activeStreakDays: 14,
      retentionScore: 94.2,
      studyMilestonesCompleted: 28,
    });
  } catch (error: any) {
    console.error('Progress stats error:', error);
    return res.status(500).json({ error: 'Failed to retrieve progress statistics' });
  }
});

// Voice Note Transcription & Direct Storage Endpoint
router.post('/voice-notes/save', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.uid) return res.status(401).json({ error: 'Unauthorized' });
    const { title, audioDuration, transcription, courseId, tags } = req.body;

    if (!transcription) {
      return res.status(400).json({ error: 'Transcription text is required' });
    }

    const noteTitle = title || `Voice Note - ${new Date().toLocaleDateString()} (${Math.round(audioDuration || 0)}s)`;
    const structuredContent = `🎙️ **Voice Recording Synthesis** (${Math.round(audioDuration || 0)}s)\n\n${transcription}\n\n---\n*Recorded via Cerebro Phase 3 Voice Engine • Tags: ${tags?.join(', ') || 'Audio, Lecture'}*`;

    const [newNote] = await db
      .insert(notes)
      .values({
        userId: req.user.uid,
        title: noteTitle,
        content: structuredContent,
        courseId: courseId ? Number(courseId) : null,
      })
      .returning();

    return res.json({ success: true, note: newNote });
  } catch (error: any) {
    console.error('Voice note save error:', error);
    return res.status(500).json({ error: 'Failed to save voice note to Cloud SQL' });
  }
});

export { router as workspaceRoutes };
