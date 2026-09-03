export type QuarantineDisposition =
  'OBSERVE' | 'ISOLATE' | 'QUARANTINE' | 'REJECT' | 'RELEASE' | 'SECURE_DELETE';

export interface SecureDeleteAuthorization {
  incidentId: string;
  resourceId: string;
  evidenceDigest: string;
  authorizationRef: string;
  forensicSnapshotVerified: true;
  scopeVerified: true;
}

export class QuarantineService {
  quarantine(resourceId: string): QuarantineDisposition {
    return 'QUARANTINE';
  }
  secureDelete(auth: SecureDeleteAuthorization) {
    if (!auth.forensicSnapshotVerified)
      throw new Error('Cannot delete without forensic snapshot');
  }
}
