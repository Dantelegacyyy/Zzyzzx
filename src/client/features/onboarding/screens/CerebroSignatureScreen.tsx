import React, { useState } from 'react';
import { OnboardingFrame } from '../components/OnboardingFrame';
import { PrimaryAction } from '../components/PrimaryAction';
import { SecondaryAction } from '../components/SecondaryAction';
import { CerebroSignatureInput } from '../onboardingTypes';
import { Sun, Moon, Sparkles } from 'lucide-react';

export function CerebroSignatureScreen({
  onNext,
  onBack,
}: {
  onNext: (sig: CerebroSignatureInput) => void;
  onBack: () => void;
}) {
  const [sig, setSig] = useState<CerebroSignatureInput>({
    preferredMode: 'DARK',
    density: 'RICH',
    navigationComfort: 'SIDE',
    accentPreference: 'VIBRANT',
    motionPreference: 'FULL',
  });

  return (
    <OnboardingFrame>
      <div className="flex-1 flex flex-col justify-between py-2 w-full text-center">
        {/* Header Section */}
        <div>
          <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 text-[#007AFF] flex items-center justify-center mx-auto mb-4 shadow-sm">
            <Sparkles size={32} />
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight mb-2">
            Appearance
          </h2>
          <p className="text-sm text-zinc-400 max-w-xs mx-auto leading-relaxed">
            Select your preferred display theme for Cerebro.
          </p>
        </div>

        {/* Side-by-Side iOS Theme Options */}
        <div className="my-auto py-3">
          <div className="grid grid-cols-2 gap-4">
            {/* Dark Theme Option */}
            <button
              onClick={() => setSig({ ...sig, preferredMode: 'DARK' })}
              className={`p-4 rounded-2xl border flex flex-col items-center gap-3 transition-all ${
                sig.preferredMode === 'DARK'
                  ? 'border-[#007AFF] bg-zinc-800/90 ring-2 ring-[#007AFF]/50'
                  : 'border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800/50'
              }`}
            >
              <div className="w-full h-24 rounded-xl bg-zinc-950 border border-zinc-800 p-2 flex flex-col gap-1.5 shadow-inner">
                <div className="w-12 h-2 rounded bg-zinc-700" />
                <div className="w-full h-8 rounded bg-zinc-900 border border-zinc-800 flex items-center px-2">
                  <div className="w-3 h-3 rounded-full bg-[#007AFF]" />
                </div>
                <div className="w-3/4 h-2 rounded bg-zinc-800" />
              </div>
              <div className="flex items-center gap-2">
                <Moon size={16} className="text-[#007AFF]" />
                <span className="text-sm font-semibold text-white">Dark</span>
              </div>
            </button>

            {/* Light Theme Option */}
            <button
              onClick={() => setSig({ ...sig, preferredMode: 'LIGHT' })}
              className={`p-4 rounded-2xl border flex flex-col items-center gap-3 transition-all ${
                sig.preferredMode === 'LIGHT'
                  ? 'border-[#007AFF] bg-zinc-800/90 ring-2 ring-[#007AFF]/50'
                  : 'border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800/50'
              }`}
            >
              <div className="w-full h-24 rounded-xl bg-zinc-200 border border-zinc-300 p-2 flex flex-col gap-1.5 shadow-inner">
                <div className="w-12 h-2 rounded bg-zinc-400" />
                <div className="w-full h-8 rounded bg-white border border-zinc-300 flex items-center px-2">
                  <div className="w-3 h-3 rounded-full bg-[#007AFF]" />
                </div>
                <div className="w-3/4 h-2 rounded bg-zinc-300" />
              </div>
              <div className="flex items-center gap-2">
                <Sun size={16} className="text-amber-400" />
                <span className="text-sm font-semibold text-white">Light</span>
              </div>
            </button>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="w-full space-y-2 pt-2">
          <PrimaryAction onClick={() => onNext(sig)} className="w-full">
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


