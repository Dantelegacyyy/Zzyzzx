import React from 'react';
import { OnboardingFrame } from '../components/OnboardingFrame';
import { PrimaryAction } from '../components/PrimaryAction';
import { Brain } from 'lucide-react';

export function FinalWelcomeScreen({
  onEnter,
  name,
}: {
  onEnter: () => void;
  name: string;
}) {
  return (
    <OnboardingFrame theme="dark">
      <div className="flex flex-col items-center text-center space-y-12">
        <div className="relative">
          <div className="absolute inset-0 bg-cyan-500/30 blur-[80px] rounded-full"></div>
          <Brain className="w-24 h-24 text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.7)] relative z-10" />
        </div>
        <div className="space-y-4 max-w-xl">
          <h1 className="text-4xl md:text-5xl font-medium tracking-wide text-white">
            Welcome to Cerebro,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              {name || 'Commander'}
            </span>
            .
          </h1>
          <p className="text-xl text-slate-400 font-light tracking-wide mt-4">
            Your workspace is ready.
          </p>
        </div>
        <PrimaryAction
          onClick={onEnter}
          className="mt-8 px-12 py-4 text-lg bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_30px_rgba(8,145,178,0.4)]"
        >
          Enter Cerebro
        </PrimaryAction>
      </div>
    </OnboardingFrame>
  );
}
