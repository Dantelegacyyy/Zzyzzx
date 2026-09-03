import React, { useState } from 'react';
import { OnboardingFrame } from '../components/OnboardingFrame';
import { PrimaryAction } from '../components/PrimaryAction';
import { SecondaryAction } from '../components/SecondaryAction';

export function ContinuousSyncScreen({
  onNext,
  onBack,
}: {
  onNext: (sync: boolean) => void;
  onBack: () => void;
}) {
  const [sync, setSync] = useState(false);

  return (
    <OnboardingFrame theme="light">
      <div className="w-full max-w-lg mx-auto flex flex-col items-center">
        <h2 className="text-3xl font-medium text-slate-900 mb-10 text-center">
          Keep your courses in sync automatically.
        </h2>

        <div className="space-y-8 w-full bg-white p-8 rounded-3xl border border-slate-100 shadow-sm mb-10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-medium text-slate-900">
                Enable continuous sync
              </h3>
              <p className="text-slate-500 mt-1">
                Stays up to date in the background.
              </p>
            </div>
            <button
              onClick={() => setSync(!sync)}
              className={`w-14 h-8 rounded-full transition-colors relative ${sync ? 'bg-blue-500' : 'bg-slate-200'}`}
            >
              <div
                className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-all shadow ${sync ? 'left-7' : 'left-1'}`}
              />
            </button>
          </div>

          <div className="h-px bg-slate-100 w-full" />

          <ul className="space-y-4 text-slate-600">
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 shrink-0" />
              new assignments & updates
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 shrink-0" />
              deadlines & announcements
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 shrink-0" />
              lecture materials & files when authorized
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 shrink-0" />
              grades/feedback only when provider scope allows
            </li>
          </ul>
        </div>

        <div className="flex gap-4 w-full">
          <SecondaryAction onClick={onBack} className="flex-1">
            Back
          </SecondaryAction>
          <PrimaryAction onClick={() => onNext(sync)} className="flex-1">
            Next
          </PrimaryAction>
        </div>
      </div>
    </OnboardingFrame>
  );
}
