import React from 'react';
import { Shield, Lock } from 'lucide-react';

export function PrivacyScreen({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <div className="w-full h-full flex flex-col justify-between py-2 text-center text-white bg-[#050B18] rounded-3xl p-6 sm:p-8 shadow-2xl border border-blue-950/40 relative overflow-hidden transition-all">
      {/* Subtle Purple/Cyan Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-600/15 rounded-full blur-[90px] pointer-events-none" />

      {/* Top Header */}
      <div className="flex items-center justify-between text-xs font-mono font-bold tracking-wider text-[#38bdf8] uppercase mb-4 relative z-10">
        <span>03 DATA & PRIVACY</span>
      </div>

      {/* Center Hero */}
      <div className="my-auto flex flex-col items-center py-4 relative z-10">
        {/* Glowing Neon Purple Shield with Padlock */}
        <div className="relative w-24 h-24 flex items-center justify-center mb-6">
          <div className="absolute inset-0 bg-purple-500/25 rounded-3xl blur-xl animate-pulse" />
          
          <svg className="w-20 h-20 drop-shadow-[0_0_20px_rgba(168,85,247,0.8)]" viewBox="0 0 100 100" fill="none">
            <defs>
              <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="50%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#c084fc" />
              </linearGradient>
            </defs>
            <path
              d="M50 10 L85 24 V52 C85 74 50 92 50 92 C50 92 15 74 15 52 V24 L50 10 Z"
              stroke="url(#shieldGrad)"
              strokeWidth="4"
              fill="rgba(24, 10, 40, 0.6)"
            />
            {/* Inner accent ring */}
            <path
              d="M50 20 L76 30 V50 C76 68 50 82 50 82 C50 82 24 68 24 50 V30 L50 20 Z"
              stroke="#a855f7"
              strokeWidth="1.5"
              strokeDasharray="4 2"
              opacity="0.6"
            />
          </svg>

          <Lock size={28} className="absolute text-cyan-300 drop-shadow-[0_0_10px_rgba(56,189,248,0.9)]" />
        </div>

        {/* Headline */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight mb-6">
          Your data is private.<br />
          You're in control.
        </h2>

        {/* 3 Value Statements with Purple Hexagon/Shield Badges */}
        <div className="space-y-3.5 w-full max-w-sm text-left">
          {[
            "We only store what's needed to power Cerebro.",
            "You own your data.",
            "You decide what to connect.",
          ].map((text, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/[0.04] border border-white/[0.07] backdrop-blur-md"
            >
              <div className="w-7 h-7 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 shrink-0">
                <Shield size={14} />
              </div>
              <span className="text-xs sm:text-sm font-medium text-slate-200 leading-snug">
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="w-full space-y-3 pt-4 relative z-10">
        <div className="flex items-center justify-center gap-3 max-w-xs mx-auto">
          <button
            onClick={onBack}
            className="flex-1 py-3 px-4 rounded-full bg-white/10 hover:bg-white/15 text-slate-300 hover:text-white font-medium text-xs transition-colors"
          >
            Back
          </button>
          <button
            onClick={onNext}
            className="flex-1 py-3 px-6 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 active:scale-[0.98] text-white font-bold text-xs shadow-[0_4px_20px_rgba(147,51,234,0.4)] transition-all"
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
                i === 2 ? 'w-4 bg-purple-400' : 'w-1.5 bg-zinc-700'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
