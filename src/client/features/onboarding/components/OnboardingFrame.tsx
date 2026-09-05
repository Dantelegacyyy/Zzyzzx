import React, { ReactNode } from 'react';
import { useOnboarding } from '../OnboardingProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { SetupProcessVisualizer } from './SetupProcessVisualizer';

interface OnboardingFrameProps {
  children: ReactNode;
}

export function OnboardingFrame({ children }: OnboardingFrameProps) {
  const { currentStep, data } = useOnboarding();
  const isFullScreen = currentStep === 'HELLO';

  if (isFullScreen) {
    return (
      <div
        id="cerebro-launch-gate-viewport"
        className="fixed inset-0 w-screen h-screen bg-[#030712] text-zinc-100 font-sans overflow-hidden selection:bg-cyan-900 selection:text-white"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div
      id="cerebro-launch-gate-viewport"
      className="min-h-screen w-screen bg-[#030712] text-zinc-100 font-sans flex flex-col items-center justify-center p-3 sm:p-6 lg:p-8 relative overflow-x-hidden selection:bg-cyan-900 selection:text-white"
    >
      {/* Deep Space Background Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-cyan-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-10 w-[500px] h-[450px] bg-purple-600/10 rounded-full blur-[140px]" />
      </div>

      {/* Persistent Setup Process Visualizer Pipeline HUD */}
      <SetupProcessVisualizer
        currentStep={currentStep}
        userName={data.profileName || 'Commander'}
        university={data.university || 'Arizona State University'}
        selectedCoursesCount={data.selectedCourses?.length || 3}
      />

      {/* Full-Screen First-Run Screen Presentation Container */}
      <main className="w-full max-w-xl md:max-w-2xl mx-auto relative z-10 flex flex-col justify-center min-h-[540px] sm:min-h-[580px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, scale: 0.985, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.985, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-full min-h-[540px] sm:min-h-[580px] flex flex-col"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

