export type GuardianAgentType =
  | 'EVIDENCE'
  | 'ISOLATION'
  | 'CREDENTIAL_ROTATION'
  | 'INTEGRITY_VERIFICATION'
  | 'RECOVERY'
  | 'FORENSICS';

export interface GuardianAgentLease {
  id: string;
  incidentId: string;
  type: GuardianAgentType;
  targetResourceId: string;
  issuedAt: string;
  expiresAt: string;
  capabilityIds: readonly string[];
  templateDigest: string;
  authorizationRef: string;
  networkPolicy: 'DENY_BY_DEFAULT';
}

export class ResponseFleetController {
  dispatchAgent(lease: GuardianAgentLease) {
    if (lease.networkPolicy !== 'DENY_BY_DEFAULT')
      throw new Error('Violation: network must be deny by default');
  }
}
