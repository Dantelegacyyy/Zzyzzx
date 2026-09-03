import React from 'react';
import { OnboardingFrame } from '../components/OnboardingFrame';
import { PrimaryAction } from '../components/PrimaryAction';
import { SecondaryAction } from '../components/SecondaryAction';

export function CanvasBridgeScreen({
  onNext,
  onBack,
}: {
  onNext: (connected: boolean) => void;
  onBack: () => void;
}) {
  return (
    <OnboardingFrame theme="light">
      <div className="w-full max-w-lg mx-auto flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-8 border border-red-100">
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10" />
          </svg>
        </div>

        <h2 className="text-3xl font-medium text-slate-900 mb-4 text-center">
          The Canvas Bridge
        </h2>
        <p className="text-lg text-slate-600 mb-10">
          Cerebro connects securely to your Canvas account.
        </p>

        <ul className="space-y-6 w-full text-left bg-white p-6 rounded-2xl border border-slate-100 shadow-sm mb-10">
          {[
            'We use official Canvas OAuth.',
            'We never see your school password.',
            'You control what we access.',
            'You can disconnect later.',
          ].map((stmt, i) => (
            <li key={i} className="flex items-center gap-3 text-slate-700">
              <svg
                className="w-5 h-5 text-green-500 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {stmt}
            </li>
          ))}
        </ul>

        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <SecondaryAction
            onClick={onBack}
            className="flex-1 order-2 sm:order-1"
          >
            Back
          </SecondaryAction>
          <SecondaryAction
            onClick={() => onNext(false)}
            className="flex-1 order-1 sm:order-2"
          >
            Not now
          </SecondaryAction>
          <PrimaryAction
            onClick={() => onNext(true)}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white order-3"
          >
            Connect Canvas
          </PrimaryAction>
        </div>
      </div>
    </OnboardingFrame>
  );
}
