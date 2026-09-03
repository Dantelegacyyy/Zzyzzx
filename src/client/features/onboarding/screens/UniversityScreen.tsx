import React, { useState } from 'react';
import { OnboardingFrame } from '../components/OnboardingFrame';
import { PrimaryAction } from '../components/PrimaryAction';
import { SecondaryAction } from '../components/SecondaryAction';

export function UniversityScreen({
  onNext,
  onBack,
}: {
  onNext: (uni: string) => void;
  onBack: () => void;
}) {
  const [search, setSearch] = useState('');

  return (
    <OnboardingFrame theme="light">
      <div className="w-full max-w-md mx-auto">
        <h2 className="text-3xl font-medium text-slate-900 mb-8 text-center">
          Where do you study?
        </h2>

        <div className="mb-12">
          <input
            type="text"
            placeholder="Search institution..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full min-h-[44px] px-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 mb-4 text-lg shadow-sm"
          />
          <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
            {/* Mocked list for UI feel, user types and we capture value */}
            <button
              onClick={() => onNext('Other / Not Listed')}
              className="w-full min-h-[44px] px-4 py-3 text-left rounded-xl hover:bg-slate-100 text-slate-600 transition-colors"
            >
              Other / Not Listed
            </button>
          </div>
        </div>

        <div className="flex gap-4 w-full">
          <SecondaryAction onClick={onBack} className="flex-1">
            Back
          </SecondaryAction>
          <PrimaryAction
            onClick={() => onNext(search || 'Other')}
            className="flex-1"
            disabled={!search}
          >
            Next
          </PrimaryAction>
        </div>
      </div>
    </OnboardingFrame>
  );
}
