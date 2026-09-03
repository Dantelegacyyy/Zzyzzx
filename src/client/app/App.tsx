import React, { useEffect, useState } from 'react';
import { OnboardingRouter } from '../features/onboarding/OnboardingRouter';
import { MainDashboard } from './MainDashboard';

export default function App() {
  const [session, setSession] = useState<{ isAuth: boolean; loading: boolean }>(
    { isAuth: false, loading: true }
  );
  const [setupComplete, setSetupComplete] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = async () => {
      const isComplete = localStorage.getItem('onboardingComplete') === 'true';
      setSetupComplete(isComplete);
      setSession({ isAuth: true, loading: false });
    };
    checkAuth();
  }, []);

  const handleOnboardingComplete = async () => {
    try {
      localStorage.setItem('onboardingComplete', 'true');
      setSetupComplete(true);
    } catch (error) {
      console.error('Failed to mark onboarding complete', error);
      setSetupComplete(true);
    }
  };

  if (session.loading) {
    return (
      <div className="min-h-screen bg-[#050B14] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!setupComplete) {
    return <OnboardingRouter onComplete={handleOnboardingComplete} />;
  }

  return <MainDashboard />;
}
