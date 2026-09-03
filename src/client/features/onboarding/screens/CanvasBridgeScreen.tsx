import React, { useState } from 'react';
import { OnboardingFrame } from '../components/OnboardingFrame';
import { PrimaryAction } from '../components/PrimaryAction';
import { SecondaryAction } from '../components/SecondaryAction';
import { Link2, Check, ShieldCheck } from 'lucide-react';

export function CanvasBridgeScreen({
  onNext,
  onBack,
}: {
  onNext: (connected: boolean) => void;
  onBack: () => void;
}) {
  const [isEnabled, setIsEnabled] = useState(true);

  return (
    <OnboardingFrame>
      <div className="flex-1 flex flex-col justify-between py-2 w-full text-center">
        {/* Header Section */}
        <div>
          <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 text-[#FF3B30] flex items-center justify-center mx-auto mb-4 shadow-sm">
            <Link2 size={32} />
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight mb-2">
            Canvas LMS Bridge
          </h2>
          <p className="text-sm text-zinc-400 max-w-xs mx-auto leading-relaxed">
            Connect Canvas to automatically import your assignments, announcements, and course files.
          </p>
        </div>

        {/* Grouped iOS Switch & Permission Items */}
        <div className="my-auto py-3 space-y-3 text-left">
          <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold text-white">Enable Canvas LMS Sync</h4>
              <p className="text-xs text-zinc-400">Read-only OAuth 2.0 authorization</p>
            </div>
            <button
              onClick={() => setIsEnabled(!isEnabled)}
              className={`w-12 h-7 rounded-full p-0.5 transition-colors duration-200 ease-in-out ${
                isEnabled ? 'bg-[#34C759]' : 'bg-zinc-700'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${
                  isEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 space-y-2.5">
            {[
              'Official Canvas OAuth 2.0 encrypted protocol',
              'Zero logging or storage of your student password',
              'Revoke access anytime from Cerebro Settings',
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
          <PrimaryAction
            onClick={() => onNext(isEnabled)}
            className="w-full bg-[#FF3B30] hover:bg-[#D70015] shadow-[0_4px_20px_rgba(255,59,48,0.35)]"
          >
            {isEnabled ? 'Connect Canvas LMS' : 'Continue Without Canvas'}
          </PrimaryAction>
          <SecondaryAction onClick={onBack} className="w-full">
            Set Up Later in Settings
          </SecondaryAction>
        </div>
      </div>
    </OnboardingFrame>
  );
}


