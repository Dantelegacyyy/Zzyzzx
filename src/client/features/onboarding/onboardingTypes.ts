export type OnboardingStep =
  | 'HELLO'              // 01 HELLO
  | 'WELCOME'            // 02 WELCOME TO CEREBRO
  | 'PRIVACY'            // 03 DATA & PRIVACY
  | 'ACCOUNT'            // 04 CREATE ACCOUNT / SIGN IN
  | 'PROFILE'            // 05 PROFILE
  | 'UNIVERSITY'         // 06 UNIVERSITY
  | 'CANVAS_BRIDGE'      // 07 CANVAS PERMISSION BRIDGE
  | 'COURSES'            // 08 SELECT YOUR COURSES
  | 'CONTINUOUS_SYNC'    // 09 CONTINUOUS SYNC
  | 'CEREBRO_SIGNATURE'  // 10 CEREBRO SIGNATURE
  | 'CREATIVE_AI_SETUP'  // 11 CREATIVE AI AGENT DASHBOARD SETUP & OPTIMIZATION
  | 'BUILD_WORKSPACE'    // 12 BUILDING YOUR CEREBRO
  | 'FINAL_WELCOME'      // 13 WELCOME TO CEREBRO
  | 'COMPLETE';

export interface OnboardingStateRecord {
  ownerSubjectId: string;
  currentStep: OnboardingStep;
  completedSteps: readonly OnboardingStep[];
  setupCompletedAt: string | null;
  updatedAt: string;
}

export interface CerebroSignatureInput {
  preferredMode: 'LIGHT' | 'DARK' | 'ADAPTIVE';
  density: 'SIMPLE' | 'BALANCED' | 'RICH';
  navigationComfort: 'TOP' | 'SIDE' | 'ADAPTIVE';
  accentPreference:
    | 'COOL' | 'WARM' | 'VIBRANT' | 'MUTED' | 'MONOCHROME' | 'SURPRISE_ME';
  motionPreference: 'FULL' | 'REDUCED';
  visualStyleIndex?: number;
  accentIndex?: number;
  vibeIndex?: number;
}

// ── Setup State Types ───────────────────────────────────────────

export type SetupStepStatus = 'PENDING' | 'ACTIVE' | 'COMPLETED' | 'SKIPPED';

export interface SetupStepMetadata {
  step: OnboardingStep;
  stepNumber: number;
  title: string;
  subtitle: string;
  isMandatory: boolean;
  canSkip: boolean;
  status: SetupStepStatus;
}

export interface UserSetupProfile {
  fullName: string;
  preferredName?: string;
  email: string;
  universityName?: string;
  universityDomain?: string;
  major?: string;
  graduationYear?: number;
  degreeLevel?: 'UNDERGRADUATE' | 'GRADUATE' | 'DOCTORAL' | 'POSTDOC';
}

export interface CanvasSyncSetupState {
  connected: boolean;
  institutionUrl?: string;
  accessTokenValidated: boolean;
  selectedCourseIds: string[];
  autoSyncEnabled: boolean;
  syncIntervalMinutes: number;
  lastSyncAttempt?: string;
}

export interface WorkspaceProvisioningState {
  status: 'IDLE' | 'INITIALIZING' | 'IMPORTING_COURSES' | 'GENERATING_GRAPH' | 'FINALIZING' | 'READY' | 'ERROR';
  progressPercent: number;
  currentTask: string;
  completedTasks: string[];
  error?: string;
}

export interface SetupSystemValidation {
  apiGatewayConnected: boolean;
  databaseResponsive: boolean;
  sessionAuthorityValid: boolean;
  securityShieldActive: boolean;
  latencyMs: number;
}

export interface SetupSessionState {
  sessionId: string;
  userId?: string;
  currentStep: OnboardingStep;
  completedSteps: OnboardingStep[];
  profile: Partial<UserSetupProfile>;
  canvas: CanvasSyncSetupState;
  signature: CerebroSignatureInput;
  provisioning: WorkspaceProvisioningState;
  systemValidation: SetupSystemValidation;
  startedAt: string;
  lastUpdatedAt: string;
  isCompleted: boolean;
}

export type SetupStatusMap = Record<OnboardingStep, SetupStepStatus>;

