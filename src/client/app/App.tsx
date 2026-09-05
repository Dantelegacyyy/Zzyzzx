import React, { useEffect, useState } from 'react';
import { OnboardingRouter } from '../features/onboarding/OnboardingRouter';
import { ExistingUserWelcome } from '../features/onboarding/components/ExistingUserWelcome';
import { MainDashboard } from './MainDashboard';
import { api } from '../lib/api';
import { Brain } from 'lucide-react';
import type { OnboardingStep } from '../features/onboarding/onboardingTypes';

export interface UserSession {
  subjectId: string;
  email: string;
  name?: string;
  role: 'STUDENT' | 'FACULTY' | 'ADMIN';
  onboardingComplete: boolean;
  emailVerified: boolean;
  school?: string;
}

type LaunchStage = 'VERIFYING' | 'FIRST_RUN' | 'EXISTING_USER_WELCOME' | 'DASHBOARD';

export default function App() {
  const [stage, setStage] = useState<LaunchStage>('VERIFYING');
  const [user, setUser] = useState<UserSession | null>(null);
  const [initialStep, setInitialStep] = useState<OnboardingStep>('HELLO');
  const [dashboardConfig, setDashboardConfig] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;

    const verifyLaunchGate = async () => {
      try {
        const res = await api.get('/auth/me');
        if (!isMounted) return;

        if (res.authenticated && res.user) {
          setUser(res.user);
          if (res.user.onboardingComplete) {
            // Returning user with completed onboarding -> Launch Gate presents full-screen Welcome Back
            setStage('EXISTING_USER_WELCOME');
          } else {
            // Authenticated but incomplete onboarding -> resume at Profile screen
            setInitialStep('PROFILE');
            setStage('FIRST_RUN');
          }
        } else {
          // Unauthenticated -> start first-run launch gate from screen 01 (HELLO)
          setInitialStep('HELLO');
          setStage('FIRST_RUN');
        }
      } catch (error) {
        console.warn('[Launch Gate Verification Warning]:', error);
        if (isMounted) {
          setInitialStep('HELLO');
          setStage('FIRST_RUN');
        }
      }
    };

    verifyLaunchGate();

    // Fail-safe watchdog so verification never leaves screen blank
    const watchdog = setTimeout(() => {
      if (isMounted) {
        setStage((current) => (current === 'VERIFYING' ? 'FIRST_RUN' : current));
      }
    }, 2000);

    return () => {
      isMounted = false;
      clearTimeout(watchdog);
    };
  }, []);

  const handleFirstRunComplete = (updatedUser?: any) => {
    if (updatedUser) {
      setUser((prev) => ({ ...prev, ...updatedUser, onboardingComplete: true }));
      if (updatedUser.customizedDashboardConfig) {
        setDashboardConfig(updatedUser.customizedDashboardConfig);
      }
    }
    setStage('DASHBOARD');
  };

  const handleExistingUserFromAuth = (authenticatedUser: any) => {
    setUser(authenticatedUser);
    setStage('EXISTING_USER_WELCOME');
  };

  const handleSignOut = async () => {
    try {
      await api.post('/auth/logout', {});
    } catch (e) {
      console.warn('Logout note:', e);
    }
    setUser(null);
    setInitialStep('HELLO');
    setStage('FIRST_RUN');
  };

  // 1. Loading / Verification state (OS-level boot animation)
  if (stage === 'VERIFYING') {
    return (
      <div
        id="cerebro-launch-gate-verifying"
        className="min-h-screen w-screen bg-[#030712] text-white flex flex-col items-center justify-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-cyan-600/10 blur-[130px] pointer-events-none rounded-full w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-xl shadow-cyan-500/25 mb-6 flex items-center justify-center animate-pulse">
            <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center text-cyan-400">
              <Brain size={26} />
            </div>
          </div>
          <h1 className="text-2xl font-black tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-blue-300">
            CEREBRO
          </h1>
          <p className="text-xs font-mono text-cyan-400/80 mt-2">
            Verifying system session...
          </p>
        </div>
      </div>
    );
  }

  // 2. First-Run Launch Gate: The 13-screen onboarding experience owns the entire viewport
  if (stage === 'FIRST_RUN') {
    return (
      <OnboardingRouter
        initialStep={initialStep}
        initialUser={user}
        onComplete={handleFirstRunComplete}
        onExistingUserComplete={handleExistingUserFromAuth}
      />
    );
  }

  // 3. Returning User Launch Gate: Full-screen branded welcome sequence before dashboard
  if (stage === 'EXISTING_USER_WELCOME') {
    return (
      <ExistingUserWelcome
        userName={user?.name || user?.email?.split('@')[0] || 'Student'}
        school={user?.school}
        onEnter={() => setStage('DASHBOARD')}
      />
    );
  }

  // 4. Main Dashboard: Mounted strictly AFTER onboarding completion or verified existing user
  return (
    <MainDashboard
      user={user}
      onSignOut={handleSignOut}
      initialDashboardConfig={dashboardConfig}
    />
  );
}

