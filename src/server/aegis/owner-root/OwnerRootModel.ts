export interface OwnerAuthorizationEnvelope {
  version: 1;
  authorizationId: string;
  issuedAt: string;
  expiresAt: string;
  nonce: string;
  action: string;
  resourceScope: readonly string[];
  environment: 'LAB' | 'STAGING' | 'PRODUCTION';
  evidenceDigest: string;
  signature: string;
}
