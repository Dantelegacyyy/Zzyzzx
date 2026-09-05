import { Router } from 'express';
import { z } from 'zod';
import { searchInstitutions } from './InstitutionCatalog.js';

export const institutionRoutes = Router();

institutionRoutes.get('/search', (req, res) => {
  const parsed = z
    .object({
      q: z.string().trim().max(160).default(''),
      limit: z.coerce.number().int().min(1).max(100).default(50),
    })
    .safeParse(req.query);

  if (!parsed.success) {
    return res.status(400).json({ error: 'INVALID_INSTITUTION_SEARCH' });
  }

  return res.json(searchInstitutions(parsed.data.q, parsed.data.limit));
});
