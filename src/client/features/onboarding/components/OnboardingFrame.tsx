import React, { ReactNode } from 'react';
import { useOnboarding } from '../OnboardingProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Sparkles, Shield, Brain } from 'lucide-react';
import { AiMascotTutorial } from '../../../components/AiMascotTutorial';
import { AegisGuardianCharacter } from '../../../components/AegisGuardianCharacter';
import { STEPS } from '../onboardingMachine';

interface OnboardingFrameProps {
  children: ReactNode;
}

export function OnboardingFrame({ children }: OnboardingFrameProps) {
  const { currentStep, progress, prevStep } = useOnboarding();

  const currentStepIndex = STEPS.indexOf(currentStep as any) + 1;

  const showBackButton = ![
    'HELLO',
    'FINAL_WELCOME',
    'BUILD_WORKSPACE',
  ].includes(currentStep);

  const formatStepName = (step: string) => {
    switch (step) {
      case 'HELLO': return 'Welcome';
      case 'WELCOME_SETUP': return 'Get Started';
      case 'PRIVACY_TERMS': return 'Privacy & Data';
      case 'ACCOUNT_SETUP': return 'Account Registration';
      case 'STUDENT_PROFILE': return 'Personal Details';
      case 'UNIVERSITY_SELECT': return 'Campus & Institution';
      case 'CANVAS_BRIDGE': return 'Canvas LMS Sync';
      case 'COURSE_SELECT': return 'Active Courses';
      case 'CONTINUOUS_SYNC': return 'Background Sync';
      case 'CEREBRO_SIGNATURE': return 'Appearance & Theme';
      case 'BUILD_WORKSPACE': return 'System Initialization';
      case 'AEGIS_ACTIVATION': return 'AEGIS Security';
      case 'FINAL_WELCOME': return 'Setup Complete';
      default: return step;
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#030712] text-zinc-100 font-sans flex flex-col items-center justify-between p-4 sm:p-6 md:p-8 relative overflow-x-hidden selection:bg-blue-500/30 selection:text-white">
      {/* Radiant Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-blue-600/15 via-indigo-600/10 to-transparent rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 left-10 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px]" />
      </div>

      {/* Top Brand Header */}
      <header className="w-full max-w-2xl mx-auto flex items-center justify-between z-20 pt-2 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-0.5 shadow-lg shadow-blue-500/20">
            <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center text-blue-400">
              <Brain size={22} />
            </div>
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-white flex items-center gap-2">
              <span>Cerebro AI</span>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                v2.5
              </span>
            </h1>
            <p className="text-xs text-zinc-400">Academic Intelligence Platform</p>
          </div>
        </div>

        {/* AEGIS Shield Status Pill */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs font-medium text-zinc-300 shadow-sm">
          <Shield size={14} className="text-amber-400" />
          <span className="text-[11px] font-mono text-zinc-300">AEGIS Phase 2</span>
        </div>
      </header>

      {/* Central Glassmorphic Card Container */}
      <main className="w-full max-w-xl mx-auto my-auto relative z-10">
        <div className="w-full bg-zinc-900/80 border border-zinc-800/90 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.85)] flex flex-col justify-between min-h-[540px] relative overflow-hidden">
          
          {/* Top Progress & Navigation Bar */}
          <div className="w-full mb-6 shrink-0">
            <div className="flex items-center justify-between mb-3 min-h-[32px]">
              {showBackButton ? (
                <button
                  onClick={prevStep}
                  className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition-colors bg-zinc-800/60 hover:bg-zinc-800 px-3 py-1.5 rounded-full border border-zinc-700/50"
                >
                  <ChevronLeft size={16} />
                  <span>Back</span>
                </button>
              ) : (
                <div />
              )}

              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 font-mono">
                <Sparkles size={13} className="text-blue-400" />
                <span>{formatStepName(currentStep)}</span>
              </div>
            </div>

            {/* Linear Progress Bar */}
            <div className="w-full h-1.5 bg-zinc-800/80 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full transition-all duration-500 ease-out shadow-[0_0_12px_rgba(59,130,246,0.5)]"
                style={{ width: `${Math.max(8, progress)}%` }}
              />
            </div>
          </div>

          {/* Screen Content View with Smooth Spring Fade */}
          <div className="flex-1 flex flex-col justify-center w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 12, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.99 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="w-full flex-1 flex flex-col justify-between"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Interactive AI Mascot Assistant */}
      <AiMascotTutorial currentStep={currentStep} stepIndex={currentStepIndex} />

      {/* AEGIS Guardian Interactive Character Overlay */}
      <AegisGuardianCharacter autoTriggerStep={currentStep} />

      {/* Footer copyright */}
      <footer className="w-full max-w-2xl mx-auto text-center z-20 py-3">
        <p className="text-[11px] text-zinc-500 font-mono">
          Project AEGIS • Secure Encrypted Workspace Setup • Cerebro System
        </p>
      </footer>
    </div>
  );
}


