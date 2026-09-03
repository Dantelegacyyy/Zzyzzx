import React, { useState } from 'react';
import { OnboardingFrame } from '../components/OnboardingFrame';
import { PrimaryAction } from '../components/PrimaryAction';
import { SecondaryAction } from '../components/SecondaryAction';
import { User, GraduationCap, BookOpen, Calendar, Camera } from 'lucide-react';

export function ProfileScreen({
  onNext,
  onBack,
}: {
  onNext: (data: any) => void;
  onBack: () => void;
}) {
  const [name, setName] = useState('');
  const [level, setLevel] = useState('undergrad');
  const [field, setField] = useState('');
  const [gradYear, setGradYear] = useState('2027');

  return (
    <OnboardingFrame>
      <div className="flex-1 flex flex-col justify-between py-2 w-full text-center">
        {/* Header Section with Apple ID Style Avatar */}
        <div>
          <div className="relative w-20 h-20 mx-auto mb-3">
            <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#007AFF] to-[#5856D6] flex items-center justify-center text-white text-2xl font-semibold shadow-md border-2 border-zinc-700">
              {name ? name.charAt(0).toUpperCase() : <User size={36} />}
            </div>
            <div className="absolute bottom-0 right-0 p-1.5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300 shadow-sm">
              <Camera size={12} />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight mb-1">
            Personal Details
          </h2>
          <p className="text-sm text-zinc-400 max-w-xs mx-auto">
            Your name and academic details will personalize your Cerebro workspace.
          </p>
        </div>

        {/* Grouped iOS Input Fields Container */}
        <div className="my-auto py-3">
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl overflow-hidden divide-y divide-zinc-800/80 text-left">
            <div className="flex items-center px-4 py-3 gap-3">
              <span className="text-xs font-semibold text-zinc-400 w-24 shrink-0">
                Name
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Required"
                className="w-full bg-transparent text-white focus:outline-none text-sm placeholder-zinc-600"
              />
            </div>

            <div className="flex items-center px-4 py-3 gap-3">
              <span className="text-xs font-semibold text-zinc-400 w-24 shrink-0">
                Academic Level
              </span>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full bg-transparent text-white focus:outline-none text-sm"
              >
                <option value="undergrad" className="bg-zinc-900">Undergraduate</option>
                <option value="grad" className="bg-zinc-900">Graduate Master</option>
                <option value="phd" className="bg-zinc-900">PhD / Postdoc</option>
                <option value="other" className="bg-zinc-900">Other / High School</option>
              </select>
            </div>

            <div className="flex items-center px-4 py-3 gap-3">
              <span className="text-xs font-semibold text-zinc-400 w-24 shrink-0">
                Major / Field
              </span>
              <input
                type="text"
                value={field}
                onChange={(e) => setField(e.target.value)}
                placeholder="e.g. Computer Science"
                className="w-full bg-transparent text-white focus:outline-none text-sm placeholder-zinc-600"
              />
            </div>

            <div className="flex items-center px-4 py-3 gap-3">
              <span className="text-xs font-semibold text-zinc-400 w-24 shrink-0">
                Class Year
              </span>
              <input
                type="text"
                value={gradYear}
                onChange={(e) => setGradYear(e.target.value)}
                placeholder="2027"
                className="w-full bg-transparent text-white focus:outline-none text-sm placeholder-zinc-600"
              />
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="w-full space-y-2 pt-2">
          <PrimaryAction
            onClick={() => onNext({ name, level, field, gradYear })}
            className="w-full"
            disabled={!name.trim()}
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


