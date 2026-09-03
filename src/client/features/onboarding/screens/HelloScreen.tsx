import React from 'react';
import { OnboardingFrame } from '../components/OnboardingFrame';
import { PrimaryAction } from '../components/PrimaryAction';
import { Brain } from 'lucide-react';

export function HelloScreen({ onNext }: { onNext: () => void }) {
  return (
    <OnboardingFrame theme="dark">
      <div className="flex flex-col items-center text-center space-y-12">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500/20 blur-[60px] rounded-full"></div>
          <Brain className="w-24 h-24 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)] relative z-10" />
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-medium tracking-wide text-white">
            Welcome to CEREBRO
          </h1>
          <p className="text-xl text-slate-400 font-light tracking-wide">
            Your academic command center.
          </p>
        </div>
        <PrimaryAction
          onClick={onNext}
          className="mt-8 bg-cyan-900/50 hover:bg-cyan-800 text-cyan-100 border border-cyan-700/50"
        >
          Begin
        </PrimaryAction>
      </div>
    </OnboardingFrame>
  );
}
