import React, { useState } from 'react';
import { OnboardingFrame } from '../components/OnboardingFrame';
import { PrimaryAction } from '../components/PrimaryAction';
import { SecondaryAction } from '../components/SecondaryAction';
import { CerebroSignatureInput } from '../onboardingTypes';

export function CerebroSignatureScreen({
  onNext,
  onBack,
}: {
  onNext: (sig: CerebroSignatureInput) => void;
  onBack: () => void;
}) {
  const [sig, setSig] = useState<CerebroSignatureInput>({
    preferredMode: 'ADAPTIVE',
    density: 'BALANCED',
    navigationComfort: 'SIDE',
    accentPreference: 'SURPRISE_ME',
    motionPreference: 'FULL',
  });

  return (
    <OnboardingFrame theme="light">
      <div className="w-full max-w-lg mx-auto">
        <h2 className="text-3xl font-medium text-slate-900 mb-8 text-center">
          Cerebro Signature
        </h2>

        <div className="space-y-8 mb-10">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Color Mode
            </label>
            <div className="flex gap-2">
              {['LIGHT', 'DARK', 'ADAPTIVE'].map((m) => (
                <button
                  key={m}
                  onClick={() => setSig({ ...sig, preferredMode: m as any })}
                  className={`flex-1 py-2.5 rounded-xl border text-sm font-medium transition-colors ${sig.preferredMode === m ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'}`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Density
            </label>
            <div className="flex gap-2">
              {['SIMPLE', 'BALANCED', 'RICH'].map((m) => (
                <button
                  key={m}
                  onClick={() => setSig({ ...sig, density: m as any })}
                  className={`flex-1 py-2.5 rounded-xl border text-sm font-medium transition-colors ${sig.density === m ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'}`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Vibe / Accent
            </label>
            <select
              value={sig.accentPreference}
              onChange={(e) =>
                setSig({ ...sig, accentPreference: e.target.value as any })
              }
              className="w-full min-h-[44px] px-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400"
            >
              <option value="SURPRISE_ME">Surprise Me</option>
              <option value="COOL">Cool / Technical</option>
              <option value="WARM">Warm / Organic</option>
              <option value="VIBRANT">Vibrant / Neon</option>
              <option value="MUTED">Muted / Academic</option>
              <option value="MONOCHROME">Monochrome / Minimalist</option>
            </select>
          </div>
        </div>

        <div className="flex gap-4 w-full">
          <SecondaryAction onClick={onBack} className="flex-1">
            Back
          </SecondaryAction>
          <PrimaryAction onClick={() => onNext(sig)} className="flex-1">
            Compose
          </PrimaryAction>
        </div>
      </div>
    </OnboardingFrame>
  );
}
