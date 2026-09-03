import { OnboardingStep } from './onboardingTypes';

export const STEPS: OnboardingStep[] = [
  'HELLO',
  'WELCOME',
  'PRIVACY',
  'ACCOUNT',
  'PROFILE',
  'UNIVERSITY',
  'CANVAS_BRIDGE',
  'COURSES',
  'CONTINUOUS_SYNC',
  'CEREBRO_SIGNATURE',
  'BUILD_WORKSPACE',
  'AEGIS_ACTIVATION',
  'FINAL_WELCOME',
  'COMPLETE',
];

export function getNextStep(current: OnboardingStep): OnboardingStep {
  const idx = STEPS.indexOf(current);
  if (idx === -1 || idx >= STEPS.length - 1) return current;
  return STEPS[idx + 1] as OnboardingStep;
}

export function getPrevStep(current: OnboardingStep): OnboardingStep {
  const idx = STEPS.indexOf(current);
  if (idx <= 0) return current;
  return STEPS[idx - 1] as OnboardingStep;
}

export function getStepProgress(current: OnboardingStep): number {
  const idx = STEPS.indexOf(current);
  if (idx === -1) return 0;
  return Math.round((idx / (STEPS.length - 1)) * 100);
}
