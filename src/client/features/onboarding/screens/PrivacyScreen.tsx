import React from 'react';
import { OnboardingFrame } from '../components/OnboardingFrame';
import { PrimaryAction } from '../components/PrimaryAction';
import { SecondaryAction } from '../components/SecondaryAction';
import { ShieldCheck, Users, Lock, ChevronRight, Check } from 'lucide-react';

export function PrivacyScreen({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <OnboardingFrame>
      <div className="flex-1 flex flex-col justify-between py-2 w-full text-center">
        {/* Top Apple Privacy Header */}
        <div>
          <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 text-[#007AFF] flex items-center justify-center mx-auto mb-4 shadow-sm">
            <Users size={32} />
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight mb-2">
            Data & Privacy
          </h2>
          <p className="text-sm text-zinc-400 max-w-xs mx-auto leading-relaxed">
            This icon appears when a Cerebro feature asks to access your personal academic information.
          </p>
        </div>

        {/* Grouped iOS Security Statements */}
        <div className="space-y-3 my-auto py-4 text-left">
          {[
            {
              title: 'Data Ownership & Protection',
              desc: 'Cerebro does not sell, trade, or monetize your academic records or personal data.',
            },
            {
              title: 'Secure Institution Tokens',
              desc: 'Your Canvas LMS passwords and OAuth credentials remain strictly encrypted.',
            },
            {
              title: 'Transparent AI Processing',
              desc: 'Gemini AI models operate exclusively on permitted course materials and schedule vectors.',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 flex items-start gap-3.5"
            >
              <div className="p-1.5 rounded-full bg-[#007AFF]/20 text-[#007AFF] shrink-0 mt-0.5">
                <Check size={14} className="stroke-[3]" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                <p className="text-xs text-zinc-400 leading-normal mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="w-full space-y-2 pt-2">
          <PrimaryAction onClick={onNext} className="w-full">
            Continue
          </PrimaryAction>
          <SecondaryAction onClick={onBack} className="w-full">
            Learn More
          </SecondaryAction>
        </div>
      </div>
    </OnboardingFrame>
  );
}


