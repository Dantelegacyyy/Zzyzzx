import { AegisMode } from './AegisStateMachine.js';

export interface GuardianDecision {
  incidentId: string;
  confidence: number;
  severity: 'INFO' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  recommendedMode: AegisMode;
  recommendedControls: readonly string[];
  evidenceRefs: readonly string[];
  requiresOwnerApproval: boolean;
}
