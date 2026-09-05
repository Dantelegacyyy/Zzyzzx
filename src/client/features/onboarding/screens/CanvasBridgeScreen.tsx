import React from 'react';
import { Check } from 'lucide-react';

export function CanvasBridgeScreen({
  onNext,
  onBack,
}: {
  onNext: (connected?: boolean) => void;
  onBack: () => void;
}) {
  return (
    <div className="w-full h-full flex flex-col justify-between py-2 text-center text-white bg-[#050B18] rounded-3xl p-6 sm:p-8 shadow-2xl border border-red-950/40 relative overflow-hidden transition-all">
      {/* Top Header */}
      <div className="flex items-center justify-between text-xs font-mono font-bold tracking-wider uppercase mb-3">
        <span className="flex items-center gap-2">
          <span className="text-red-500 font-extrabold text-sm">07</span>
          <span className="text-slate-300">CANVAS PERMISSION BRIDGE</span>
        </span>
      </div>

      {/* Center Hero */}
      <div className="my-auto flex flex-col items-center py-2 max-w-sm mx-auto w-full">
        {/* Canvas Segmented Red Emblem */}
        <div className="relative w-20 h-20 flex items-center justify-center mb-5">
          <div className="absolute inset-0 bg-red-600/20 rounded-full blur-xl animate-pulse" />
          
          <svg className="w-16 h-16 drop-shadow-[0_0_15px_rgba(239,68,68,0.7)]" viewBox="0 0 100 100" fill="none">
            {/* 8 segmented petals forming the classic Canvas LMS circular flower */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <circle
                key={i}
                cx="50"
                cy="22"
                r="7"
                fill="#EF4444"
                transform={`rotate(${angle} 50 50)`}
              />
            ))}
            <circle cx="50" cy="50" r="12" fill="#DC2626" />
            <circle cx="50" cy="50" r="6" fill="#F87171" />
          </svg>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-5">
          Securely connect Canvas.
        </h2>

        {/* 3 bullet points with red checkmarks */}
        <div className="space-y-3 w-full text-left mb-6">
          {[
            'We use official Canvas OAuth.',
            'We never see your password.',
            'You control what we access.',
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
              <div className="w-5 h-5 rounded-md bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0">
                <Check size={13} className="stroke-[3]" />
              </div>
              <span className="font-medium">{item}</span>
            </div>
          ))}
        </div>

        {/* Big Red Connect Canvas Button */}
        <button
          type="button"
          onClick={() => onNext(true)}
          className="w-full py-3.5 px-6 rounded-2xl bg-[#E63946] hover:bg-[#D62839] active:scale-[0.98] text-white font-bold text-sm shadow-[0_4px_25px_rgba(230,57,70,0.45)] transition-all mb-3"
        >
          Connect Canvas
        </button>

        <button
          type="button"
          onClick={() => onNext(false)}
          className="text-xs text-slate-400 hover:text-white transition-colors py-1"
        >
          Not now
        </button>
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
            onClick={() => onNext(false)}
            className="flex-1 py-3 px-6 rounded-full bg-red-700/80 hover:bg-red-600 active:scale-[0.98] text-white font-bold text-xs transition-all"
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
                i === 1 ? 'w-4 bg-red-500' : 'w-1.5 bg-zinc-700'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
