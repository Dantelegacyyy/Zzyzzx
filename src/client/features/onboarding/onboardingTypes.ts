export type OnboardingStep =
  | 'HELLO'
  | 'WELCOME'
  | 'PRIVACY'
  | 'ACCOUNT'
  | 'PROFILE'
  | 'UNIVERSITY'
  | 'CANVAS_BRIDGE'
  | 'COURSES'
  | 'CONTINUOUS_SYNC'
  | 'CEREBRO_SIGNATURE'
  | 'BUILD_WORKSPACE'
  | 'AEGIS_ACTIVATION'
  | 'FINAL_WELCOME'
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
    'COOL' | 'WARM' | 'VIBRANT' | 'MUTED' | 'MONOCHROME' | 'SURPRISE_ME';
  motionPreference: 'FULL' | 'REDUCED';
}
