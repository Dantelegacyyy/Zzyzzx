import React from 'react';
import { Hexagon, ArrowRight } from 'lucide-react';

export function WelcomeScreen({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <div className="w-full h-full flex flex-col justify-between py-2 text-center text-slate-900 bg-white rounded-3xl p-6 sm:p-8 shadow-2xl transition-all">
      {/* Top Header */}
      <div className="flex items-center justify-between text-xs font-mono font-bold tracking-wider text-[#007AFF] uppercase mb-4">
        <span>02 WELCOME TO CEREBRO</span>
      </div>

      {/* Center Hero */}
      <div className="my-auto flex flex-col items-center py-4">
        {/* Soft Blue Brain Icon Container */}
        <div className="w-20 h-20 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#007AFF] shadow-sm mb-6">
          <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
            <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
            <path d="M12 5v13" />
            <path d="M12 8a2 2 0 0 0 2 2" />
            <path d="M12 12a2 2 0 0 1-2 2" />
          </svg>
        </div>

        {/* 3-Line Headline */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight leading-tight mb-6">
          All your knowledge.<br />
          All your courses.<br />
          All in one place.
        </h2>

        {/* 2x2 Feature Grid */}
        <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
          {[
            'Study Smarter',
            'Stay Organized',
            'Save Time',
            'Reach Your Goals',
          ].map((pill, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center gap-2 py-3 px-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm font-semibold text-slate-800 shadow-sm hover:border-[#007AFF]/40 transition-colors"
            >
              <Hexagon size={13} className="text-[#007AFF] shrink-0 stroke-[2.2]" />
              <span className="truncate">{pill}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Actions & Pagination Dots */}
      <div className="w-full space-y-3 pt-4">
        <button
          onClick={onNext}
          className="w-full max-w-xs mx-auto py-3.5 px-6 rounded-full bg-[#007AFF] hover:bg-[#0062CC] active:scale-[0.98] text-white font-semibold text-sm shadow-[0_4px_16px_rgba(0,122,255,0.35)] transition-all flex items-center justify-center gap-2"
        >
          <span>Next</span>
          <ArrowRight size={16} />
        </button>

        <div className="flex items-center justify-between max-w-xs mx-auto text-xs text-slate-500 pt-1">
          <button
            onClick={onBack}
            className="hover:text-slate-900 font-medium transition-colors"
          >
            Back
          </button>

          {/* 5 Pagination dots with dot 2 active */}
          <div className="flex items-center gap-1.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === 1 ? 'w-4 bg-[#007AFF]' : 'w-1.5 bg-slate-300'
                }`}
              />
            ))}
          </div>

          <span className="w-8" />
        </div>
      </div>
    </div>
  );
}
