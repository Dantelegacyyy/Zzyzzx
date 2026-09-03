import React, { useState } from 'react';
import { OnboardingFrame } from '../components/OnboardingFrame';
import { PrimaryAction } from '../components/PrimaryAction';
import { SecondaryAction } from '../components/SecondaryAction';

export function ProfileScreen({
  onNext,
  onBack,
}: {
  onNext: (data: any) => void;
  onBack: () => void;
}) {
  const [name, setName] = useState('');
  const [level, setLevel] = useState('');
  const [field, setField] = useState('');
  const [gradYear, setGradYear] = useState('');

  return (
    <OnboardingFrame theme="light">
      <div className="w-full max-w-md mx-auto">
        <h2 className="text-3xl font-medium text-slate-900 mb-8 text-center">
          Tell us about yourself
        </h2>

        <div className="space-y-5 mb-12">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Preferred Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full min-h-[44px] px-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Academic Level
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full min-h-[44px] px-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400"
            >
              <option value="">Select level...</option>
              <option value="undergrad">Undergraduate</option>
              <option value="grad">Graduate</option>
              <option value="phd">PhD</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Field of Study
            </label>
            <input
              type="text"
              value={field}
              onChange={(e) => setField(e.target.value)}
              placeholder="e.g. Computer Science"
              className="w-full min-h-[44px] px-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Graduation Target Year{' '}
              <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <input
              type="number"
              value={gradYear}
              onChange={(e) => setGradYear(e.target.value)}
              placeholder="YYYY"
              className="w-full min-h-[44px] px-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400"
            />
          </div>
        </div>

        <div className="flex gap-4 w-full">
          <SecondaryAction onClick={onBack} className="flex-1">
            Back
          </SecondaryAction>
          <PrimaryAction
            onClick={() => onNext({ name, level, field, gradYear })}
            className="flex-1"
            disabled={!name || !level || !field}
          >
            Next
          </PrimaryAction>
        </div>
      </div>
    </OnboardingFrame>
  );
}
