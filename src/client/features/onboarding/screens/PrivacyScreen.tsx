import React from 'react';
import { OnboardingFrame } from '../components/OnboardingFrame';
import { PrimaryAction } from '../components/PrimaryAction';
import { SecondaryAction } from '../components/SecondaryAction';
import { Shield } from 'lucide-react';

export function PrivacyScreen({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <OnboardingFrame theme="light">
      <div className="w-full max-w-lg mx-auto flex flex-col items-center">
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8">
          <Shield className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-medium text-slate-900 mb-2 text-center">
          Your data is yours.
        </h2>
        <p className="text-xl text-slate-600 mb-12 text-center">
          You're in control.
        </p>

        <ul className="space-y-6 w-full mb-12">
          {[
            'We store only what is needed to power Cerebro.',
            'You own your data.',
            'You decide what to connect.',
            'Cerebro does not collect your school password.',
            'AI features operate only on permitted workspace context.',
          ].map((stmt, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 shrink-0" />
              <span className="text-slate-700 text-lg leading-relaxed">
                {stmt}
              </span>
            </li>
          ))}
        </ul>

        <div className="flex gap-4 w-full">
          <SecondaryAction onClick={onBack} className="flex-1">
            Back
          </SecondaryAction>
          <PrimaryAction
            onClick={() => {
              // Persist privacy acknowledgement here
              onNext();
            }}
            className="flex-1"
          >
            I Understand
          </PrimaryAction>
        </div>
      </div>
    </OnboardingFrame>
  );
}
