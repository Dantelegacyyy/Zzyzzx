import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Shield,
  Layers,
  GraduationCap,
  BookOpen,
  CheckCircle2,
  Workflow,
  Sparkles,
  Zap,
  Activity,
  Cpu,
  X,
  Radio,
} from 'lucide-react';
import { OnboardingStep } from '../onboardingTypes';

interface SetupProcessVisualizerProps {
  currentStep: OnboardingStep;
  userName?: string;
  university?: string;
  selectedCoursesCount?: number;
  architectStatus?: string;
}

interface StepMilestone {
  id: string;
  stepRange: OnboardingStep[];
  label: string;
  shortLabel: string;
  icon: React.ReactNode;
  stageNumber: number;
}

const MILESTONES: StepMilestone[] = [
  {
    id: 'identity',
    stepRange: ['HELLO', 'WELCOME', 'PRIVACY', 'ACCOUNT'],
    label: 'Identity & Security',
    shortLabel: 'Identity',
    icon: <Shield size={13} />,
    stageNumber: 1,
  },
  {
    id: 'campus',
    stepRange: ['PROFILE', 'UNIVERSITY'],
    label: 'Campus & Academic SIS',
    shortLabel: 'Campus',
    icon: <GraduationCap size={13} />,
    stageNumber: 2,
  },
  {
    id: 'courses',
    stepRange: ['CANVAS_BRIDGE', 'COURSES', 'CONTINUOUS_SYNC'],
    label: 'Canvas & Neural Courses',
    shortLabel: 'Courses',
    icon: <BookOpen size={13} />,
    stageNumber: 3,
  },
  {
    id: 'signature',
    stepRange: ['CEREBRO_SIGNATURE'],
    label: 'Cerebro Signature',
    shortLabel: 'Signature',
    icon: <Sparkles size={13} />,
    stageNumber: 4,
  },
  {
    id: 'architect',
    stepRange: ['CREATIVE_AI_SETUP'],
    label: 'Sentient Dashboard Architect',
    shortLabel: 'AI Architect',
    icon: <Brain size={13} />,
    stageNumber: 5,
  },
  {
    id: 'assembly',
    stepRange: ['BUILD_WORKSPACE'],
    label: 'Workspace Assembly',
    shortLabel: 'Assembly',
    icon: <Layers size={13} />,
    stageNumber: 6,
  },
  {
    id: 'ready',
    stepRange: ['FINAL_WELCOME', 'COMPLETE'],
    label: 'Ready to Launch',
    shortLabel: 'Ready',
    icon: <Zap size={13} />,
    stageNumber: 7,
  },
];

const STEP_NUMBERS: Record<OnboardingStep, number> = {
  HELLO: 1,
  WELCOME: 2,
  PRIVACY: 3,
  ACCOUNT: 4,
  PROFILE: 5,
  UNIVERSITY: 6,
  CANVAS_BRIDGE: 7,
  COURSES: 8,
  CONTINUOUS_SYNC: 9,
  CEREBRO_SIGNATURE: 10,
  CREATIVE_AI_SETUP: 11,
  BUILD_WORKSPACE: 12,
  FINAL_WELCOME: 13,
  COMPLETE: 13,
};

export function SetupProcessVisualizer({
  currentStep,
  userName = 'Alex',
  university = 'Arizona State University',
  selectedCoursesCount = 3,
  architectStatus = 'Autonomous Layout & Chromatic Management',
}: SetupProcessVisualizerProps) {
  const [showArchitectureMap, setShowArchitectureMap] = useState(false);

  const stepNumber = STEP_NUMBERS[currentStep] || 1;
  const currentMilestoneIndex = MILESTONES.findIndex((m) =>
    m.stepRange.includes(currentStep)
  );
  const activeMilestone =
    currentMilestoneIndex >= 0 ? MILESTONES[currentMilestoneIndex] : MILESTONES[0];
  const progressPercent = Math.round((stepNumber / 13) * 100);

  return (
    <div className="w-full max-w-xl md:max-w-2xl mx-auto mb-4 relative z-20">
      {/* Top HUD Visualizer Ribbon */}
      <div className="backdrop-blur-xl bg-zinc-950/70 border border-white/10 rounded-2xl p-2.5 sm:p-3 shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex flex-col gap-2">
        {/* Top Header Row */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <div className="relative flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping absolute" />
              <div className="w-2 h-2 rounded-full bg-cyan-400" />
            </div>
            <span className="font-mono font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              SETUP PIPELINE
            </span>
            <span className="hidden sm:inline text-slate-500 font-mono">•</span>
            <span className="hidden sm:inline font-mono text-slate-300">
              Step {stepNumber.toString().padStart(2, '0')} / 13
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-semibold text-cyan-300 bg-cyan-950/60 border border-cyan-800/60 px-2 py-0.5 rounded-full">
              {progressPercent}% COMPLETE
            </span>
            <button
              onClick={() => setShowArchitectureMap(true)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-200 border border-white/10 hover:border-cyan-500/40 text-[11px] font-medium transition-all"
              title="Inspect Setup Architecture Pipeline"
            >
              <Workflow size={12} className="text-cyan-400" />
              <span className="hidden xs:inline">Architecture Map</span>
            </button>
          </div>
        </div>

        {/* Milestone Node Progression Bar */}
        <div className="grid grid-cols-7 gap-1 sm:gap-1.5 pt-0.5">
          {MILESTONES.map((milestone, idx) => {
            const isCompleted = idx < currentMilestoneIndex;
            const isCurrent = idx === currentMilestoneIndex;

            return (
              <div
                key={milestone.id}
                className={`flex flex-col items-center p-1 sm:p-1.5 rounded-lg border transition-all text-center ${
                  isCurrent
                    ? 'bg-cyan-500/15 border-cyan-400/60 shadow-[0_0_15px_rgba(6,182,212,0.25)] text-cyan-300'
                    : isCompleted
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                    : 'bg-white/[0.02] border-white/5 text-slate-500 opacity-60'
                }`}
                title={`${milestone.label} (Stage ${milestone.stageNumber} of 7)`}
              >
                <div className="flex items-center justify-center mb-0.5">
                  {isCompleted ? (
                    <CheckCircle2 size={12} className="text-emerald-400" />
                  ) : (
                    milestone.icon
                  )}
                </div>
                <span className="text-[9px] sm:text-[10px] font-medium tracking-tight truncate w-full">
                  {milestone.shortLabel}
                </span>
              </div>
            );
          })}
        </div>

        {/* Active Stage Description Strip */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 pt-0.5 border-t border-white/5">
          <div className="flex items-center gap-1.5 truncate">
            <Radio size={11} className="text-cyan-400 animate-pulse shrink-0" />
            <span className="text-slate-300 font-semibold truncate">
              Active Stage: {activeMilestone.label}
            </span>
          </div>
          {currentStep === 'CREATIVE_AI_SETUP' && (
            <span className="shrink-0 text-[10px] font-mono text-purple-300 bg-purple-950/60 border border-purple-800/40 px-1.5 py-0.5 rounded">
              Sentient Architect Active
            </span>
          )}
        </div>
      </div>

      {/* Interactive Architecture Pipeline Modal */}
      <AnimatePresence>
        {showArchitectureMap && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="bg-zinc-950 border border-cyan-500/30 rounded-3xl p-6 max-w-2xl w-full shadow-[0_0_50px_rgba(6,182,212,0.25)] text-slate-200 relative overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
                    <Workflow size={18} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight">
                      Cerebro Setup Architecture Pipeline
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      Autonomous End-to-End Ingestion & Layout Synthesis
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowArchitectureMap(false)}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Pipeline Flow Diagram */}
              <div className="my-6 space-y-3 relative z-10 font-mono text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {/* Step A */}
                  <div className="p-3 rounded-2xl bg-zinc-900/80 border border-white/10 flex flex-col gap-1">
                    <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">
                      Stage 01 • INTAKE
                    </span>
                    <h4 className="font-bold text-white text-sm">Identity & University</h4>
                    <p className="text-[11px] text-slate-400 font-sans mt-1">
                      Credentials encrypted with HttpOnly JWT session tokens & campus SIS verification.
                    </p>
                    <div className="mt-2 text-[10px] text-cyan-300 bg-cyan-950/40 border border-cyan-800/40 px-2 py-1 rounded">
                      Subject: {userName || 'Active Student'}
                    </div>
                  </div>

                  {/* Step B */}
                  <div className="p-3 rounded-2xl bg-zinc-900/80 border border-white/10 flex flex-col gap-1">
                    <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">
                      Stage 02 • INGESTION
                    </span>
                    <h4 className="font-bold text-white text-sm">Canvas Live Bridge</h4>
                    <p className="text-[11px] text-slate-400 font-sans mt-1">
                      Continuous course syllabus sync, assignment tracking, and grade telemetry stream.
                    </p>
                    <div className="mt-2 text-[10px] text-blue-300 bg-blue-950/40 border border-blue-800/40 px-2 py-1 rounded">
                      Courses: {selectedCoursesCount} Synced
                    </div>
                  </div>

                  {/* Step C */}
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-950/40 to-zinc-900/80 border border-purple-500/40 flex flex-col gap-1 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                    <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">
                      Stage 03 • SENTIENT ARCHITECT
                    </span>
                    <h4 className="font-bold text-white text-sm">Aether Architect Engine</h4>
                    <p className="text-[11px] text-slate-300 font-sans mt-1">
                      Autonomous layout & color synthesis using private backend 120-layout memory mind.
                    </p>
                    <div className="mt-2 text-[10px] text-purple-300 bg-purple-950/60 border border-purple-800/40 px-2 py-1 rounded font-bold">
                      Memory Mind: Backend Protected
                    </div>
                  </div>
                </div>

                {/* Final Destination */}
                <div className="p-3.5 rounded-2xl bg-cyan-950/30 border border-cyan-500/40 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
                      <Cpu size={16} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">
                        Destination: Cerebro Academic Command Center
                      </div>
                      <div className="text-[11px] text-slate-400 font-sans">
                        Dynamic Bento Grid • Cloud SQL Persistence • AEGIS Sentinel Security Observer
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2.5 py-1 rounded-full shrink-0">
                    ONLINE
                  </span>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs text-slate-400 relative z-10">
                <span>Institution: {university}</span>
                <button
                  onClick={() => setShowArchitectureMap(false)}
                  className="px-4 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                >
                  Close Visualizer
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
