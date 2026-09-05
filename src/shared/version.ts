export interface AppVersionInfo {
  version: string;
  phase: string;
  buildDate: string;
  buildId: string;
  aegisStatus: string;
  port: number;
  environment: string;
  features: string[];
}

export const APP_VERSION_INFO: AppVersionInfo = {
  version: '3.0.0-READY',
  phase: 'Phase 3: Grand Master 3 (The Full Beat)',
  buildDate: '2026-09-05T05:25:00Z',
  buildId: 'GM3-AEGIS-2026.09.05',
  aegisStatus: 'Phase 3 Active • Owner Locked (Order 66 Enforced)',
  port: 3000,
  environment: 'Cloud Run / AI Studio',
  features: [
    'Academic Intelligence Graph Engine',
    'Multimodal Note Folder Architecture',
    'AEGIS Immune Memory & Canary Fleet',
    'Real-time Canvas LMS Integration',
    'Zero-Distraction UI (Widget Free)',
    'Dual-Wall Replay Guard & Nonce Store',
  ],
};
