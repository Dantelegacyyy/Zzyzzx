import { OnboardingProvider } from './OnboardingProvider';
import React, { useEffect, useState } from 'react';
import { useOnboarding } from './OnboardingProvider';
import { OnboardingFrame } from './components/OnboardingFrame';
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
import { STEPS } from './onboardingMachine';

export function OnboardingRouterContent({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const { currentStep, nextStep, prevStep, setStep, updateData, data } =
    useOnboarding();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mocking auth check without Firebase
    const checkAuth = async () => {
      setLoading(false);
      const isComplete = localStorage.getItem('onboardingStarted') === 'true';
      if (isComplete) {
        setStep((prev: import('./onboardingTypes').OnboardingStep) => {
          if (STEPS.indexOf(prev as any) <= STEPS.indexOf('ACCOUNT')) {
            return 'PROFILE';
          }
          return prev as any;
        });
      } else {
        localStorage.setItem('onboardingStarted', 'true');
      }
    };
    checkAuth();
  }, [setStep]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050B14] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 'HELLO':
        return <HelloScreen onNext={nextStep} />;
      case 'WELCOME':
        return <WelcomeScreen onNext={nextStep} onBack={prevStep} />;
      case 'PRIVACY':
        return <PrivacyScreen onNext={nextStep} onBack={prevStep} />;
      case 'ACCOUNT':
        return <AccountScreen onNext={nextStep} onBack={prevStep} />;
      case 'PROFILE':
        return (
          <ProfileScreen
            onNext={(profileData) => {
              updateData({ profileName: profileData.name });
              nextStep();
            }}
            onBack={prevStep}
          />
        );
      case 'UNIVERSITY':
        return <UniversityScreen onNext={nextStep} onBack={prevStep} />;
      case 'CANVAS_BRIDGE':
        return <CanvasBridgeScreen onNext={nextStep} onBack={prevStep} />;
      case 'COURSES':
        return <CourseSelectionScreen onNext={nextStep} onBack={prevStep} />;
      case 'CONTINUOUS_SYNC':
        return <ContinuousSyncScreen onNext={nextStep} onBack={prevStep} />;
      case 'CEREBRO_SIGNATURE':
        return <CerebroSignatureScreen onNext={nextStep} onBack={prevStep} />;
      case 'BUILD_WORKSPACE':
        return <WorkspaceBuildScreen onNext={nextStep} />;
      case 'AEGIS_ACTIVATION':
        return <AegisActivationScreen onNext={nextStep} onBack={prevStep} />;
      case 'FINAL_WELCOME':
        return (
          <FinalWelcomeScreen onEnter={onComplete} name={data.profileName} />
        );
      default:
        return null;
    }
  };

  return <OnboardingFrame>{renderStep()}</OnboardingFrame>;
}

export function OnboardingRouter({ onComplete }: { onComplete: () => void }) {
  return (
    <OnboardingProvider>
      <OnboardingRouterContent onComplete={onComplete} />
    </OnboardingProvider>
  );
}
