import React, { ReactNode } from 'react';
import { useOnboarding } from '../OnboardingProvider';
import { motion, AnimatePresence } from 'framer-motion';

interface OnboardingFrameProps {
  theme?: 'light' | 'dark' | 'adaptive' | string;
  children: ReactNode;
}

export function OnboardingFrame({
  children,
  theme = 'dark',
}: OnboardingFrameProps) {
  const { currentStep, progress } = useOnboarding();

  const showProgress = ![
    'HELLO',
    'WELCOME',
    'ACCOUNT',
    'FINAL_WELCOME',
    'COMPLETE',
  ].includes(currentStep);

  const isLight = theme === 'light';

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center font-sans selection:bg-cyan-500/30 ${isLight ? 'bg-white text-slate-900' : 'bg-[#050B14] text-white'}`}
    >
      {/* Dynamic Background Effects */}
      {!isLight && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-cyan-900/10 blur-[120px] rounded-full mix-blend-screen opacity-50" />
        </div>
      )}

      <div className="w-full max-w-3xl px-6 py-12 relative z-10 flex flex-col min-h-screen justify-center">
        {/* Header / Progress */}
        {showProgress && (
          <div className="absolute top-12 left-6 right-6 flex items-center justify-between">
            <div
              className={`text-xs font-semibold tracking-widest uppercase ${isLight ? 'text-slate-400' : 'text-cyan-500/50'}`}
            >
              Phase: {currentStep.replace('_', ' ')}
            </div>
            <div
              className={`flex-1 max-w-xs mx-4 h-1 rounded-full overflow-hidden ${isLight ? 'bg-slate-100' : 'bg-white/5'}`}
            >
              <motion.div
                className={`h-full ${isLight ? 'bg-slate-900' : 'bg-cyan-500'}`}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              />
            </div>
            <div
              className={`text-xs font-mono ${isLight ? 'text-slate-500' : 'text-cyan-500'}`}
            >
              {progress}%
            </div>
          </div>
        )}

        {/* Content Area with Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="w-full flex-1 flex flex-col items-center justify-center"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
