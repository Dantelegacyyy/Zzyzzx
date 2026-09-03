import React from 'react';
import { OnboardingFrame } from '../components/OnboardingFrame';
import { PrimaryAction } from '../components/PrimaryAction';
import { SecondaryAction } from '../components/SecondaryAction';

export function AegisActivationScreen({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <OnboardingFrame theme="dark">
      <div className="w-full max-w-lg mx-auto flex flex-col items-center text-center">
        <div className="mb-10 w-32 h-32 relative flex items-center justify-center">
          {/* Fallback styling if image fails to load */}
          <div className="absolute inset-0 bg-yellow-600/20 rounded-full blur-[40px]"></div>
          <img
            src="/assets/brand/aegis-guardian-emblem.png"
            alt="AEGIS Guardian"
            className="w-full h-full object-contain relative z-10"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement!.innerHTML +=
                '<div class="text-yellow-500 w-full h-full flex items-center justify-center border-2 border-yellow-500/50 rounded-full"><span class="text-xs">AEGIS</span></div>';
            }}
          />
        </div>

        <h3 className="text-yellow-600 font-semibold tracking-widest uppercase text-sm mb-3">
          AEGIS GUARDIAN
        </h3>
        <h2 className="text-4xl md:text-5xl font-medium text-white mb-6">
          Meet Your Guardian.
        </h2>

        <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-md">
          Adaptive Guardian Intelligence monitors your workspace integrity,
          synthesizes complex materials securely, and protects your data
          parameters.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full mt-4">
          <SecondaryAction
            onClick={onBack}
            className="text-slate-400 hover:text-white hover:bg-white/10"
          >
            Back
          </SecondaryAction>
          <SecondaryAction
            onClick={onNext}
            className="text-slate-400 hover:text-white hover:bg-white/10"
          >
            Learn more
          </SecondaryAction>
          <PrimaryAction
            onClick={onNext}
            className="bg-yellow-600 hover:bg-yellow-500 text-black border-transparent shadow-[0_0_20px_rgba(202,138,4,0.3)] flex-1"
          >
            Activate AEGIS Guardian
          </PrimaryAction>
        </div>
      </div>
    </OnboardingFrame>
  );
}
