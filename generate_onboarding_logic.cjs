const fs = require('fs');
const path = require('path');

const onboardingMachine = `
import { OnboardingStep } from './onboardingTypes';

export const STEPS: OnboardingStep[] = [
  "HELLO",
  "WELCOME",
  "PRIVACY",
  "ACCOUNT",
  "PROFILE",
  "UNIVERSITY",
  "CANVAS_BRIDGE",
  "COURSES",
  "CONTINUOUS_SYNC",
  "CEREBRO_SIGNATURE",
  "BUILD_WORKSPACE",
  "AEGIS_ACTIVATION",
  "FINAL_WELCOME",
  "COMPLETE"
];

export function getNextStep(current: OnboardingStep): OnboardingStep {
  const idx = STEPS.indexOf(current);
  if (idx === -1 || idx === STEPS.length - 1) return current;
  return STEPS[idx + 1];
}

export function getPrevStep(current: OnboardingStep): OnboardingStep {
  const idx = STEPS.indexOf(current);
  if (idx <= 0) return current;
  return STEPS[idx - 1];
}
`;

const onboardingRouter = `
import React, { useState, useEffect } from 'react';
import { auth } from '../../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { STEPS, getNextStep, getPrevStep } from './onboardingMachine';
import { OnboardingStep } from './onboardingTypes';

// Screens
import { HelloScreen } from './screens/HelloScreen';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { PrivacyScreen } from './screens/PrivacyScreen';
import { AccountScreen } from './screens/AccountScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { UniversityScreen } from './screens/UniversityScreen';
import { CanvasBridgeScreen } from './screens/CanvasBridgeScreen';
import { CourseSelectionScreen } from './screens/CourseSelectionScreen';
import { ContinuousSyncScreen } from './screens/ContinuousSyncScreen';
import { CerebroSignatureScreen } from './screens/CerebroSignatureScreen';
import { WorkspaceBuildScreen } from './screens/WorkspaceBuildScreen';
import { AegisActivationScreen } from './screens/AegisActivationScreen';
import { FinalWelcomeScreen } from './screens/FinalWelcomeScreen';

export function OnboardingRouter({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("HELLO");
  const [profileName, setProfileName] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setIsAuth(!!user);
      setLoading(false);
    });
  }, []);

  const handleNext = () => setCurrentStep(getNextStep(currentStep));
  const handleBack = () => setCurrentStep(getPrevStep(currentStep));

  // State guards
  useEffect(() => {
    if (!loading && isAuth && STEPS.indexOf(currentStep) <= STEPS.indexOf("ACCOUNT")) {
      setCurrentStep("PROFILE"); // Skip forward if already auth'd and on early steps
    }
  }, [isAuth, loading, currentStep]);

  if (loading) {
    return <div className="min-h-screen bg-[#050B14] flex items-center justify-center"><div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div></div>;
  }

  switch (currentStep) {
    case "HELLO":
      return <HelloScreen onNext={handleNext} />;
    case "WELCOME":
      return <WelcomeScreen onNext={handleNext} onBack={handleBack} />;
    case "PRIVACY":
      return <PrivacyScreen onNext={handleNext} onBack={handleBack} />;
    case "ACCOUNT":
      return <AccountScreen onNext={handleNext} onBack={handleBack} />;
    case "PROFILE":
      return <ProfileScreen onNext={(data) => { setProfileName(data.name); handleNext(); }} onBack={handleBack} />;
    case "UNIVERSITY":
      return <UniversityScreen onNext={handleNext} onBack={handleBack} />;
    case "CANVAS_BRIDGE":
      return <CanvasBridgeScreen onNext={handleNext} onBack={handleBack} />;
    case "COURSES":
      return <CourseSelectionScreen onNext={handleNext} onBack={handleBack} />;
    case "CONTINUOUS_SYNC":
      return <ContinuousSyncScreen onNext={handleNext} onBack={handleBack} />;
    case "CEREBRO_SIGNATURE":
      return <CerebroSignatureScreen onNext={handleNext} onBack={handleBack} />;
    case "BUILD_WORKSPACE":
      return <WorkspaceBuildScreen onNext={handleNext} />;
    case "AEGIS_ACTIVATION":
      return <AegisActivationScreen onNext={handleNext} onBack={handleBack} />;
    case "FINAL_WELCOME":
      return <FinalWelcomeScreen onEnter={onComplete} name={profileName} />;
    default:
      return null;
  }
}
`;

fs.writeFileSync(
  path.join(__dirname, 'src/client/features/onboarding/onboardingMachine.ts'),
  onboardingMachine.trim()
);
fs.writeFileSync(
  path.join(__dirname, 'src/client/features/onboarding/OnboardingRouter.tsx'),
  onboardingRouter.trim()
);

console.log('Router logic generated.');
