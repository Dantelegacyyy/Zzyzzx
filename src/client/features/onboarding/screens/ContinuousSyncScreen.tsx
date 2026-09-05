import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export function ContinuousSyncScreen({
  onNext,
  onBack,
}: {
  onNext: (sync?: boolean) => void;
  onBack: () => void;
}) {
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="w-full h-full flex flex-col justify-between py-2 text-center text-white bg-[#050B18] rounded-3xl p-6 sm:p-8 shadow-2xl border border-cyan-950/40 relative overflow-hidden transition-all">
      {/* Top Header */}
      <div className="flex items-center justify-between text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase mb-3">
        <span>09 CONTINUOUS SYNC</span>
      </div>

      {/* Center Hero */}
      <div className="my-auto flex flex-col items-center py-2 max-w-sm mx-auto w-full">
        {/* Glowing Cyan Circular Sync Arrows Icon */}
        <div className="relative w-20 h-20 flex items-center justify-center mb-5">
          <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-xl animate-pulse" />
          <svg className="w-16 h-16 drop-shadow-[0_0_15px_rgba(34,211,238,0.7)] text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
            <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
            <path d="M16 16h5v5" />
          </svg>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight mb-5">
          Keep your courses<br />
          in sync automatically.
        </h2>

        {/* 3 Bullet items with right arrows */}
        <div className="space-y-3 w-full text-left mb-6 pl-2">
          {[
            'New assignments & updates',
            'Deadlines & announcements',
            'Lecture materials & files',
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-slate-200 font-medium">
              <ArrowRight size={14} className="text-cyan-400 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* Toggle Row */}
        <div className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 mb-2">
          <span className="text-xs sm:text-sm font-semibold text-slate-200">
            Enable continuous sync
          </span>
          <button
            type="button"
            onClick={() => setEnabled(!enabled)}
            className={`w-12 h-6.5 rounded-full p-0.5 transition-colors duration-200 ease-in-out ${
              enabled ? 'bg-cyan-400' : 'bg-zinc-700'
            }`}
          >
            <div
              className={`w-5.5 h-5.5 rounded-full bg-zinc-950 shadow-md transform transition-transform duration-200 ease-in-out ${
                enabled ? 'translate-x-5.5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="w-full space-y-3 pt-2">
        <div className="flex items-center justify-center gap-3 max-w-xs mx-auto">
          <button
            onClick={onBack}
            className="flex-1 py-3 px-4 rounded-full bg-white/10 hover:bg-white/15 text-slate-300 hover:text-white font-medium text-xs transition-colors"
          >
            Back
          </button>
          <button
            onClick={() => onNext(enabled)}
            className="flex-1 py-3 px-6 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 active:scale-[0.98] text-zinc-950 font-extrabold text-xs shadow-[0_4px_20px_rgba(6,182,212,0.4)] transition-all"
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
                i === 3 ? 'w-4 bg-cyan-400' : 'w-1.5 bg-zinc-700'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
