import { Router } from 'express';
import { requireAuthToken } from '../auth/session.js';
import multer from 'multer';
import { processDocumentAsObserver } from '../ai/aegisEngine.js';

export const uploadRoutes = Router();
uploadRoutes.use(requireAuthToken);

// Configure multer for memory storage initially (limit 50MB)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 },
});

uploadRoutes.post('/document', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'NO_FILE' });
      return;
    }

    const tenant = { subjectId: req.principal!.subjectId };
    const result = await processDocumentAsObserver(
      req.principal!.subjectId,
      req.file
    );

    res.json({
      status: 'success',
      metadata: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'UPLOAD_FAILED' });
  }
});
