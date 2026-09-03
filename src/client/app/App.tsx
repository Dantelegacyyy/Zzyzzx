import React, { useEffect, useState } from 'react';
import { OnboardingRouter } from '../features/onboarding/OnboardingRouter';
import { MainDashboard } from './MainDashboard';
import { api } from '../lib/api';

export interface UserSession {
  subjectId: string;
  email: string;
  name?: string;
  role: 'STUDENT' | 'FACULTY' | 'ADMIN';
  onboardingComplete: boolean;
  emailVerified: boolean;
  school?: string;
}

export default function App() {
  const [session, setSession] = useState<{ isAuth: boolean; loading: boolean; user?: UserSession }>(
    { isAuth: false, loading: true }
  );
  const [setupComplete, setSetupComplete] = useState<boolean>(false);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const res = await api.get('/auth/me');
        if (res.authenticated && res.user) {
          setSession({ isAuth: true, loading: false, user: res.user });
          setSetupComplete(Boolean(res.user.onboardingComplete));
        } else {
          setSession({ isAuth: false, loading: false });
          setSetupComplete(false);
        }
      } catch (error) {
        console.error('[Session Verification Failed]:', error);
        setSession({ isAuth: false, loading: false });
        setSetupComplete(false);
      }
    };
    verifySession();
  }, []);

  const handleOnboardingComplete = async () => {
    try {
      const res = await api.post('/auth/onboarding-complete', {});
      if (res.success && res.user) {
        setSession((prev) => ({ ...prev, user: res.user }));
      }
      setSetupComplete(true);
    } catch (error) {
      console.error('Failed to update session onboarding status:', error);
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
