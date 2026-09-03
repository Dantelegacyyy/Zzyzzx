import { z } from 'zod';

export const UserProfileSchema = z.object({
  uid: z.string(),
  displayName: z.string().optional(),
  preferredName: z.string(),
  email: z.string().email(),
  photoUrl: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  onboardingVersion: z.number().default(1),
  onboardingStatus: z.enum([
    'NOT_STARTED',
    'IN_PROGRESS',
    'COMPLETED',
    'SKIPPED',
  ]),
  selectedTour: z.string().optional(),
  lastOnboardingStep: z.number().default(0),
  optionalInstitutionName: z.string().optional(),
  optionalTerm: z.string().optional(),
});

export const CourseSchema = z.object({
  id: z.string(),
  ownerSubjectId: z.string(),
  code: z.string(),
  name: z.string(),
  term: z.string(),
  instructor: z.string().optional(),
  accent: z.string().optional(),
  provider: z.enum(['STUDENT', 'CANVAS']).default('STUDENT'),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const JobStateSchema = z.enum([
  'QUEUED',
  'RUNNING',
  'SUCCEEDED',
  'FAILED',
  'CANCELLED',
]);

export const JobOperationSchema = z.enum([
  'PDF_EXTRACTION',
  'DOCUMENT_EXTRACTION',
  'OCR',
  'AUDIO_TRANSCRIPTION',
  'VIDEO_ANALYSIS',
  'STUDY_GENERATION',
  'FLASHCARD_GENERATION',
  'PRACTICE_EXAM_GENERATION',
  'RAG_INDEXING',
  'CANVAS_SYNC',
  'WORKSPACE_REINDEX',
]);

export const ProcessingJobSchema = z.object({
  id: z.string(),
  ownerSubjectId: z.string(),
  operation: JobOperationSchema,
  inputIdentityHash: z.string(),
  idempotencyKey: z.string(),
  progressEvidence: z.number().default(0),
  attempt: z.number().default(0),
  maxAttempts: z.number().default(3),
  createdAt: z.string(),
  startedAt: z.string().optional(),
  completedAt: z.string().optional(),
  cancelledAt: z.string().optional(),
  errorClass: z.string().optional(),
  errorMessageSafe: z.string().optional(),
  resultReference: z.string().optional(),
});

export const NoteTemplateSchema = z.enum([
  'CORNELL',
  'OUTLINE',
  'BOXING',
  'CHARTING',
  'MIND_MAP',
  'SENTENCE',
  'MATRIX',
  'SPLIT_PAGE',
  'DOUBLE_ENTRY',
  'TRIPLE_ENTRY',
  'QEC',
  'FRAYER',
  'SOCRATIC',
  'SQ3R',
  'OK5R',
  'FEYNMAN',
  'REVERSE_OUTLINE',
  'GUIDED_NOTES',
  'ZETTELKASTEN',
  'PROBLEM_SOLUTION_STEM',
  'SKETCHNOTE',
  'VISUAL_SUMMARY',
  'COMPARATIVE_MATRIX',
  'LEARNING_LOG',
  'MEETING_SEMINAR',
  'BLANK_CANVAS',
]);

export const NoteBlockTypeSchema = z.enum([
  'heading',
  'paragraph',
  'bullet',
  'numbered',
  'quote',
  'callout',
  'definition',
  'question-answer',
  'matrix',
  'table',
  'timeline',
  'formula',
  'citation',
  'source_excerpt',
  'image_reference',
  'ai_proposal',
]);

export const NoteBlockSchema = z.object({
  blockId: z.string(),
  revisionId: z.string(),
  type: NoteBlockTypeSchema,
  content: z.any(),
  provenance: z.string().optional(),
  citationIds: z.array(z.string()).default([]),
  authorType: z.enum(['STUDENT', 'AI']),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const AcademicNoteSchema = z.object({
  id: z.string(),
  ownerSubjectId: z.string(),
  title: z.string(),
  template: NoteTemplateSchema,
  blocks: z.array(NoteBlockSchema),
  currentRevisionId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const FlashcardSchema = z.object({
  id: z.string(),
  ownerSubjectId: z.string(),
  courseId: z.string().optional(),
  sourceIds: z.array(z.string()).default([]),
  front: z.string(),
  back: z.string(),
  explanation: z.string().optional(),
  citationIds: z.array(z.string()).default([]),
  provenance: z.string(),
  difficulty: z.enum(['HARD', 'GOOD', 'EASY']),
  reviewHistory: z.array(z.any()).default([]),
  schedulingState: z.any(),
});

export const PracticeExamItemSchema = z.object({
  id: z.string(),
  courseId: z.string().optional(),
  sourceIds: z.array(z.string()).default([]),
  learningObjective: z.string(),
  type: z.enum(['MULTIPLE_CHOICE', 'SHORT_ANSWER', 'ESSAY', 'SCENARIO']),
  prompt: z.string(),
  answerRubric: z.string(),
  explanation: z.string(),
  citationIds: z.array(z.string()).default([]),
  provenance: z.string(),
});

export const CalendarEventSchema = z.object({
  id: z.string(),
  ownerSubjectId: z.string(),
  title: z.string(),
  description: z.string().optional(),
  courseId: z.string().optional(),
  startTime: z.string(),
  endTime: z.string().optional(),
  isDeadline: z.boolean().default(false),
  providerProvenance: z.string().optional(),
});

export const TaskSchema = z.object({
  id: z.string(),
  ownerSubjectId: z.string(),
  title: z.string(),
  description: z.string().optional(),
  status: z.enum(['TODO', 'IN_PROGRESS', 'COMPLETED']),
  courseId: z.string().optional(),
  dueDate: z.string().optional(),
  providerProvenance: z.string().optional(),
});
