import { OnboardingStep } from './onboardingTypes';

export const STEPS: OnboardingStep[] = [
  'HELLO',              // 01 HELLO
  'WELCOME',            // 02 WELCOME TO CEREBRO (All your knowledge. All your courses.)
  'PRIVACY',            // 03 DATA & PRIVACY
  'ACCOUNT',            // 04 CREATE ACCOUNT / SIGN IN
  'PROFILE',            // 05 PROFILE
  'UNIVERSITY',         // 06 UNIVERSITY
  'CANVAS_BRIDGE',      // 07 CANVAS PERMISSION BRIDGE
  'COURSES',            // 08 SELECT YOUR COURSES
  'CONTINUOUS_SYNC',    // 09 CONTINUOUS SYNC
  'CEREBRO_SIGNATURE',  // 10 CEREBRO SIGNATURE
  'CREATIVE_AI_SETUP',  // 11 CREATIVE AI AGENT DASHBOARD SETUP & OPTIMIZATION
  'BUILD_WORKSPACE',    // 12 BUILDING YOUR CEREBRO
  'FINAL_WELCOME',      // 13 WELCOME TO CEREBRO
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
