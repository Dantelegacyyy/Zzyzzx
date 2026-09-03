import React, { useState } from 'react';
import { OnboardingFrame } from '../components/OnboardingFrame';
import { PrimaryAction } from '../components/PrimaryAction';
import { SecondaryAction } from '../components/SecondaryAction';
import { Building2, Search, ChevronRight, GraduationCap } from 'lucide-react';

export function UniversityScreen({
  onNext,
  onBack,
}: {
  onNext: (uni: string) => void;
  onBack: () => void;
}) {
  const [search, setSearch] = useState('');

  const topUnis = [
    'Stanford University',
    'Massachusetts Institute of Technology',
    'Princeton University',
    'University of California, Berkeley',
    'Harvard University',
    'Carnegie Mellon University',
  ];

  const filtered = search
    ? topUnis.filter((u) => u.toLowerCase().includes(search.toLowerCase()))
    : topUnis;

  return (
    <OnboardingFrame>
      <div className="flex-1 flex flex-col justify-between py-2 w-full text-center">
        {/* Header Section */}
        <div>
          <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 text-[#007AFF] flex items-center justify-center mx-auto mb-4 shadow-sm">
            <GraduationCap size={32} />
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight mb-2">
            Select Your Campus
          </h2>
          <p className="text-sm text-zinc-400 max-w-xs mx-auto leading-relaxed">
            Choose your university or institution to sync course catalogs and schedules.
          </p>
        </div>

        {/* Search Bar & Grouped List */}
        <div className="my-auto py-3 space-y-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-3 text-zinc-500" size={16} />
            <input
              type="text"
              placeholder="Search Campus or Institution..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-2xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#007AFF] transition-all placeholder-zinc-500"
            />
          </div>

          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl overflow-hidden divide-y divide-zinc-800/80 max-h-56 overflow-y-auto custom-scrollbar text-left">
            {filtered.map((uni, idx) => (
              <button
                key={idx}
                onClick={() => onNext(uni)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-zinc-800/80 transition-colors text-white text-sm font-medium"
              >
                <div className="flex items-center gap-3">
                  <Building2 size={16} className="text-[#007AFF]" />
                  <span className="truncate">{uni}</span>
                </div>
                <ChevronRight size={16} className="text-zinc-600 shrink-0" />
              </button>
            ))}

            <button
              onClick={() => onNext(search || 'Other Campus')}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-zinc-800/80 transition-colors text-[#007AFF] text-sm font-semibold"
            >
              <span>{search ? `Use "${search}"` : 'Other Campus / Not Listed'}</span>
              <ChevronRight size={16} className="text-zinc-600 shrink-0" />
            </button>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="w-full space-y-2 pt-2">
          <PrimaryAction
            onClick={() => onNext(search || 'Stanford University')}
            className="w-full"
          >
            Continue
          </PrimaryAction>
          <SecondaryAction onClick={onBack} className="w-full">
            Back
          </SecondaryAction>
        </div>
      </div>
    </OnboardingFrame>
  );
}


