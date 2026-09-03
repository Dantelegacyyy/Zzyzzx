import React from 'react';
import { OnboardingFrame } from '../components/OnboardingFrame';
import { PrimaryAction } from '../components/PrimaryAction';
import { SecondaryAction } from '../components/SecondaryAction';
import { BookOpen, Calendar, CheckSquare, Layers } from 'lucide-react';

export function WelcomeScreen({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <OnboardingFrame theme="light">
      <div className="w-full max-w-lg mx-auto flex flex-col items-center">
        <h2 className="text-3xl font-medium text-slate-900 mb-4 text-center">
          All your knowledge.
          <br />
          All your courses.
          <br />
          All in one place.
        </h2>

        <div className="w-full space-y-6 my-12">
          {[
            { icon: <BookOpen />, title: 'Study Smarter' },
            { icon: <Layers />, title: 'Stay Organized' },
            { icon: <Calendar />, title: 'Save Time' },
            { icon: <CheckSquare />, title: 'Reach Your Goals' },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm"
            >
              <div className="p-3 bg-slate-50 rounded-xl text-slate-700">
                {item.icon}
              </div>
              <span className="text-lg font-medium text-slate-800">
                {item.title}
              </span>
            </div>
          ))}
        </div>

        <div className="flex gap-4 w-full">
          <SecondaryAction onClick={onBack} className="flex-1">
            Back
          </SecondaryAction>
          <PrimaryAction onClick={onNext} className="flex-1">
            Continue
          </PrimaryAction>
        </div>
      </div>
    </OnboardingFrame>
  );
}
