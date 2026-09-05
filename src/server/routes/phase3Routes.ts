import { Router } from 'express';
import { PHASE3_SYSTEMS } from '../phase3/systemManifest.js';
import {
  AEGIS_RULES,
  constitutionDigest,
} from '../aegis/constitution/AegisConstitution.js';

export const phase3Routes = Router();

phase3Routes.get('/manifest', (_req, res) => {
  return res.json({
    systems: PHASE3_SYSTEMS,
    systemCount: PHASE3_SYSTEMS.length,
    constitutionRuleCount: AEGIS_RULES.length,
    constitutionDigest: constitutionDigest(),
    certification:
      'SOURCE_IMPLEMENTATION_PRESENT_RUNTIME_VALIDATION_REQUIRED',
  });
});
