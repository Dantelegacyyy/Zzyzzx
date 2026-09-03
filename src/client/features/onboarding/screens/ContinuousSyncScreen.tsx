import React, { useState } from 'react';
import { OnboardingFrame } from '../components/OnboardingFrame';
import { PrimaryAction } from '../components/PrimaryAction';
import { SecondaryAction } from '../components/SecondaryAction';
import { RefreshCw, Check } from 'lucide-react';

export function ContinuousSyncScreen({
  onNext,
  onBack,
}: {
  onNext: (sync: boolean) => void;
  onBack: () => void;
}) {
  const [sync, setSync] = useState(true);

  return (
    <OnboardingFrame>
      <div className="flex-1 flex flex-col justify-between py-2 w-full text-center">
        {/* Header Section */}
        <div>
          <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 text-[#007AFF] flex items-center justify-center mx-auto mb-4 shadow-sm">
            <RefreshCw size={32} />
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight mb-2">
            Automatic Updates
          </h2>
          <p className="text-sm text-zinc-400 max-w-xs mx-auto leading-relaxed">
            Keep your academic schedules, assignment alerts, and course materials automatically up to date.
          </p>
        </div>

        {/* Grouped iOS Toggle Switch Card */}
        <div className="my-auto py-3 space-y-3 text-left">
          <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold text-white">Continuous Background Sync</h4>
              <p className="text-xs text-zinc-400">Automated syllabus & deadline intake</p>
            </div>
            <button
              onClick={() => setSync(!sync)}
              className={`w-12 h-7 rounded-full p-0.5 transition-colors duration-200 ease-in-out ${
                sync ? 'bg-[#34C759]' : 'bg-zinc-700'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${
                  sync ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 space-y-2.5">
            {[
              'Instant calendar deadline sync & smart notifications',
              'Background processing of lecture notes and files',
              'Zero battery drain with optimized event listeners',
            ].map((stmt, i) => (
              <div key={i} className="flex items-center gap-3 text-xs text-zinc-300">
                <div className="p-1 rounded-full bg-[#34C759]/20 text-[#34C759] shrink-0">
                  <Check size={12} className="stroke-[3]" />
                </div>
                <span>{stmt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="w-full space-y-2 pt-2">
          <PrimaryAction onClick={() => onNext(sync)} className="w-full">
            Continue
          </PrimaryAction>
          <SecondaryAction onClick={onBack} className="w-full">
            Back
          </SecondaryAction>
        </div>
      </div>
    </OnboardingFrame>
  );
}


