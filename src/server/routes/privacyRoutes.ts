import { Router } from 'express';
import { requireAuthToken } from '../auth/session.js';
import { PrivacyLifecycleService } from '../privacy/PrivacyLifecycleService.js';

export const privacyRoutes = Router();
privacyRoutes.use(requireAuthToken);
const privacy = new PrivacyLifecycleService();

privacyRoutes.get('/export', async (req, res) => {
  return res.json(await privacy.exportUser(req.principal!.subjectId));
});

privacyRoutes.delete('/account', async (req, res) => {
  await privacy.deleteUser(req.principal!.subjectId);
  return res.status(204).end();
});
