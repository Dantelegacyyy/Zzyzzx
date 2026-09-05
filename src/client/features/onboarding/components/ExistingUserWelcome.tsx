import React from 'react';
import { Brain, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface ExistingUserWelcomeProps {
  userName?: string;
  school?: string;
  onEnter: () => void;
}

export function ExistingUserWelcome({
  userName = 'Student',
  school,
  onEnter,
}: ExistingUserWelcomeProps) {
  const displayName = userName.trim() || 'Student';

  return (
    <div
      id="cerebro-existing-user-launch"
      className="fixed inset-0 z-50 w-screen h-screen bg-[#030712] text-white flex flex-col justify-between items-center p-6 sm:p-12 overflow-hidden selection:bg-cyan-900 selection:text-cyan-100"
    >
      {/* Deep Space Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-600/15 via-blue-600/10 to-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[500px] h-[350px] bg-indigo-950/30 rounded-full blur-[120px] pointer-events-none" />

      {/* Oversized Subtle Background Cerebro Emblem Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.035] pointer-events-none select-none">
        <svg className="w-[850px] h-[850px] text-cyan-400" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" />
          <path
            d="M140 60 C120 35, 75 35, 55 65 C35 95, 35 125, 55 155 C75 185, 120 185, 140 160"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Top Header Wordmark */}
      <header className="relative z-10 w-full max-w-4xl flex items-center justify-between pt-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center text-cyan-400">
              <Brain size={22} />
            </div>
          </div>
          <span className="text-xl font-black tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-300 to-purple-400">
            CEREBRO
          </span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-cyan-300">
          <ShieldCheck size={14} className="text-cyan-400" />
          <span>Verified Session</span>
        </div>
      </header>

      {/* Center Hero Launch Experience */}
      <main className="relative z-10 my-auto flex flex-col items-center text-center max-w-xl mx-auto px-4 py-6">
        {/* Constellation 'C' Emblem */}
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center mb-6">
          <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-2xl animate-pulse" />
          <svg className="w-24 h-24 sm:w-32 sm:h-32 drop-shadow-[0_0_25px_rgba(6,182,212,0.6)]" viewBox="0 0 200 200" fill="none">
            <defs>
              <linearGradient id="welcomeBackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="50%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#c084fc" />
              </linearGradient>
            </defs>

            {/* Glowing Celestial Arc */}
            <path
              d="M140 60 C120 35, 75 35, 55 65 C35 95, 35 125, 55 155 C75 185, 120 185, 140 160"
              stroke="url(#welcomeBackGrad)"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <path
              d="M140 60 C120 35, 75 35, 55 65 C35 95, 35 125, 55 155 C75 185, 120 185, 140 160"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.9"
            />

            {/* Stars & Nodes */}
            {[
              { cx: 140, cy: 60 },
              { cx: 98, cy: 43 },
              { cx: 55, cy: 65 },
              { cx: 42, cy: 110 },
              { cx: 55, cy: 155 },
              { cx: 98, cy: 177 },
              { cx: 140, cy: 160 },
            ].map((pt, i) => (
              <circle key={i} cx={pt.cx} cy={pt.cy} r="3.5" fill="#ffffff" />
            ))}
          </svg>
        </div>

        {/* Personalized Welcome Typography */}
        <p className="text-xs font-mono font-bold tracking-[0.2em] text-cyan-400 uppercase mb-2 flex items-center gap-2">
          <Sparkles size={14} />
          <span>ACADEMIC WORKSPACE READY</span>
        </p>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-3">
          Welcome Back,
        </h1>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-300 to-purple-400 tracking-tight mb-4 drop-shadow-[0_2px_20px_rgba(6,182,212,0.3)]">
          {displayName}
        </h2>

        {school && (
          <p className="text-xs sm:text-sm font-semibold text-slate-400 mb-6 px-4 py-1 rounded-full bg-white/[0.04] border border-white/10">
            {school}
          </p>
        )}

        <p className="text-sm sm:text-base text-slate-300 max-w-md font-medium leading-relaxed mb-8">
          Your courses, synced notes, assignments, and knowledge graphs are ready to open.
        </p>

        {/* Primary Action Button */}
        <button
          id="enter-cerebro-welcome-back-btn"
          type="button"
          onClick={onEnter}
          className="group px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 active:scale-[0.98] text-white font-extrabold text-sm sm:text-base shadow-[0_4px_30px_rgba(6,182,212,0.4)] transition-all flex items-center gap-3 cursor-pointer"
        >
          <span>Enter Cerebro</span>
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </button>
      </main>

      {/* Minimalist Footer */}
      <footer className="relative z-10 w-full max-w-4xl flex items-center justify-between text-[11px] font-mono text-slate-500 pb-2">
        <span>CEREBRO OS // LAUNCH GATE</span>
        <span>STANDALONE BOOT SEQUENCE</span>
      </footer>
    </div>
  );
}
