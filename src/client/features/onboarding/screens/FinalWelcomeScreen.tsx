import React from 'react';
import { OnboardingFrame } from '../components/OnboardingFrame';
import { PrimaryAction } from '../components/PrimaryAction';
import { Smartphone, Sparkles } from 'lucide-react';

export function FinalWelcomeScreen({
  onEnter,
  name,
}: {
  onEnter: () => void;
  name: string;
}) {
  return (
    <OnboardingFrame>
      <div className="flex-1 flex flex-col justify-between py-6 w-full text-center">
        {/* Apple-style Setup Complete Header */}
        <div className="my-auto space-y-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#007AFF] via-[#34C759] to-[#5856D6] p-0.5 mx-auto shadow-2xl">
            <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center text-white">
              <Sparkles size={36} className="text-[#007AFF] animate-pulse" />
            </div>
          </div>

          <div>
            <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">
              Welcome to Cerebro
            </h1>
            <p className="text-base text-zinc-400 max-w-xs mx-auto font-medium">
              Your iPhone setup is complete, {name || 'User'}.
            </p>
          </div>
        </div>

        {/* Bottom Get Started Button */}
        <div className="w-full space-y-3 pt-2">
          <PrimaryAction
            onClick={onEnter}
            className="w-full text-base font-semibold py-4 bg-[#007AFF] hover:bg-[#0062CC] shadow-[0_4px_25px_rgba(0,122,255,0.4)]"
          >
            Get Started
          </PrimaryAction>
          <p className="text-[11px] text-zinc-600 font-mono">
            Swipe up or tap Get Started to enter home screen
          </p>
        </div>
      </div>
    </OnboardingFrame>
  );
}


