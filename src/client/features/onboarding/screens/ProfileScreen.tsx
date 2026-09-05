import React, { useState } from 'react';
import { User, ChevronDown } from 'lucide-react';

export function ProfileScreen({
  onNext,
  onBack,
}: {
  onNext: (data: { name: string; level: string; field: string }) => void;
  onBack: () => void;
}) {
  const [name, setName] = useState('Alex');
  const [level, setLevel] = useState('Undergraduate');
  const [field, setField] = useState('Computer Science');

  return (
    <div className="w-full h-full flex flex-col justify-between py-2 text-center text-white bg-[#050B18] rounded-3xl p-6 sm:p-8 shadow-2xl border border-blue-950/40 relative overflow-hidden transition-all">
      {/* Top Header */}
      <div className="flex items-center justify-between text-xs font-mono font-bold tracking-wider text-[#38bdf8] uppercase mb-3">
        <span>05 PROFILE</span>
      </div>

      {/* Center Hero */}
      <div className="my-auto flex flex-col items-center py-2 max-w-sm mx-auto w-full">
        {/* Purple Silhouette Avatar Circle */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-600 to-purple-500 p-1 shadow-[0_0_30px_rgba(168,85,247,0.4)] flex items-center justify-center mb-4">
          <div className="w-full h-full rounded-full bg-zinc-950/80 flex items-center justify-center text-white">
            <User size={38} className="text-purple-300" />
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-6">
          Tell us about you.
        </h2>

        {/* Form Fields */}
        <div className="w-full space-y-3.5 text-left">
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">
              Preferred Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex"
              className="w-full py-2.5 px-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">
              Academic Level
            </label>
            <div className="relative">
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full py-2.5 px-3.5 rounded-xl bg-[#0B132B] border border-white/10 text-xs sm:text-sm text-white appearance-none focus:outline-none focus:border-blue-500 pr-10"
              >
                <option value="Undergraduate">Undergraduate</option>
                <option value="Graduate / Master">Graduate / Master</option>
                <option value="PhD Candidate">PhD Candidate</option>
                <option value="Postdoc / Researcher">Postdoc / Researcher</option>
                <option value="High School">High School</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">
              Field of Study
            </label>
            <div className="relative">
              <select
                value={field}
                onChange={(e) => setField(e.target.value)}
                className="w-full py-2.5 px-3.5 rounded-xl bg-[#0B132B] border border-white/10 text-xs sm:text-sm text-white appearance-none focus:outline-none focus:border-blue-500 pr-10"
              >
                <option value="Computer Science">Computer Science</option>
                <option value="Data Science & AI">Data Science & AI</option>
                <option value="Electrical & Computer Engineering">Electrical & Computer Engineering</option>
                <option value="Mathematics & Statistics">Mathematics & Statistics</option>
                <option value="Biology & Life Sciences">Biology & Life Sciences</option>
                <option value="Business & Finance">Business & Finance</option>
                <option value="Psychology">Psychology</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Other">Other / Interdisciplinary</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="w-full space-y-3 pt-4">
        <div className="flex items-center justify-center gap-3 max-w-xs mx-auto">
          <button
            onClick={onBack}
            className="flex-1 py-3 px-4 rounded-full bg-white/10 hover:bg-white/15 text-slate-300 hover:text-white font-medium text-xs transition-colors"
          >
            Back
          </button>
          <button
            onClick={() => onNext({ name, level, field })}
            className="flex-1 py-3 px-6 rounded-full bg-[#007AFF] hover:bg-[#0062CC] active:scale-[0.98] text-white font-bold text-xs shadow-[0_4px_20px_rgba(0,122,255,0.4)] transition-all"
          >
            Next
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-1.5 pt-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === 4 ? 'w-4 bg-blue-400' : 'w-1.5 bg-zinc-700'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
