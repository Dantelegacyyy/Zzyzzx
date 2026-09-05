import React, { useState } from 'react';
import { useOnboarding, OnboardingProvider } from './OnboardingProvider';
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
import { CreativeAIAgentScreen } from './screens/CreativeAIAgentScreen';
import { WorkspaceBuildScreen } from './screens/WorkspaceBuildScreen';
import { FinalWelcomeScreen } from './screens/FinalWelcomeScreen';
import type { OnboardingStep } from './onboardingTypes';

export function OnboardingRouterContent({
  onComplete,
  onExistingUserComplete,
}: {
  onComplete: (user?: any) => void;
  onExistingUserComplete: (user: any) => void;
}) {
  const { currentStep, nextStep, prevStep, updateData, data } =
    useOnboarding();
  const [completing, setCompleting] = useState(false);

  const handleFinalEnter = async () => {
    try {
      setCompleting(true);
      const res = await fetch('/api/auth/onboarding-complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data?.profileName || 'Alex',
          school: data?.university || 'Arizona State University — Tempe Campus',
          selectedCourses: data?.selectedCourses || ['Data Structures', 'Discrete Mathematics', 'Algorithms'],
          customizedDashboardConfig: data?.customizedDashboardConfig,
        }),
      });

      const responseData = await res.json();
      const userPayload = {
        ...(responseData?.user || {}),
        name: data?.profileName || 'Alex',
        school: data?.university,
        onboardingComplete: true,
        customizedDashboardConfig: data?.customizedDashboardConfig,
        selectedCourses: data?.selectedCourses,
      };

      onComplete(userPayload);
    } catch (err) {
      console.error('Failed to persist onboarding completion:', err);
      onComplete({
        name: data?.profileName || 'Alex',
        school: data?.university,
        onboardingComplete: true,
        customizedDashboardConfig: data?.customizedDashboardConfig,
        selectedCourses: data?.selectedCourses,
      });
    } finally {
      setCompleting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'HELLO':
        return <HelloScreen onNext={nextStep} />;
      case 'WELCOME':
        return <WelcomeScreen onNext={nextStep} onBack={prevStep} />;
      case 'PRIVACY':
        return <PrivacyScreen onNext={nextStep} onBack={prevStep} />;
      case 'ACCOUNT':
        return (
          <AccountScreen
            onNext={(user) => {
              if (user?.name) updateData({ profileName: user.name });
              nextStep();
            }}
            onExistingUserComplete={(user) => {
              onExistingUserComplete(user);
            }}
            onBack={prevStep}
          />
        );
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
        return (
          <UniversityScreen
            onNext={(school) => {
              updateData({ university: school });
              nextStep();
            }}
            onBack={prevStep}
          />
        );
      case 'CANVAS_BRIDGE':
        return <CanvasBridgeScreen onNext={nextStep} onBack={prevStep} />;
      case 'COURSES':
        return (
          <CourseSelectionScreen
            onNext={(courses) => {
              updateData({ selectedCourses: courses });
              nextStep();
            }}
            onBack={prevStep}
          />
        );
      case 'CONTINUOUS_SYNC':
        return <ContinuousSyncScreen onNext={nextStep} onBack={prevStep} />;
      case 'CEREBRO_SIGNATURE':
        return (
          <CerebroSignatureScreen
            onNext={(sig) => {
              if (sig) updateData({ signature: sig });
              nextStep();
            }}
            onBack={prevStep}
          />
        );
      case 'CREATIVE_AI_SETUP':
        return (
          <CreativeAIAgentScreen
            userName={data?.profileName || 'Alex'}
            selectedCourses={data?.selectedCourses || ['Data Structures', 'Discrete Mathematics', 'Algorithms']}
            school={data?.university}
            onNext={(customizedConfig) => {
              updateData({ customizedDashboardConfig: customizedConfig });
              nextStep();
            }}
            onBack={prevStep}
          />
        );
      case 'BUILD_WORKSPACE':
        return <WorkspaceBuildScreen onNext={nextStep} />;
      case 'FINAL_WELCOME':
        return (
          <FinalWelcomeScreen
            onEnter={handleFinalEnter}
            name={data?.profileName || 'Alex'}
          />
        );
      default:
        return <HelloScreen onNext={nextStep} />;
    }
  };

  return <OnboardingFrame>{renderStep()}</OnboardingFrame>;
}

export function OnboardingRouter({
  onComplete,
  onExistingUserComplete,
  initialStep = 'HELLO',
  initialUser,
}: {
  onComplete: (user?: any) => void;
  onExistingUserComplete: (user: any) => void;
  initialStep?: OnboardingStep;
  initialUser?: any;
}) {
  return (
    <OnboardingProvider
      initialStep={initialStep}
      initialData={{
        profileName: initialUser?.name || '',
        university: initialUser?.school || '',
      }}
    >
      <OnboardingRouterContent
        onComplete={onComplete}
        onExistingUserComplete={onExistingUserComplete}
      />
    </OnboardingProvider>
  );
}

