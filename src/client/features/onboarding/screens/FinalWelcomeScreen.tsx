import React from 'react';

export function FinalWelcomeScreen({
  onEnter,
  name = 'Alex',
}: {
  onEnter: () => void;
  name?: string;
}) {
  const displayName = name.trim() || 'Alex';

  return (
    <div className="w-full h-full flex flex-col justify-between py-2 text-center text-white bg-[#040714] rounded-3xl p-6 sm:p-8 shadow-2xl border border-purple-950/40 relative overflow-hidden transition-all">
      {/* Ambient Cosmic Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-600/25 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-600/20 rounded-full blur-[90px] pointer-events-none" />

      {/* Top Header */}
      <div className="flex items-center justify-between text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase relative z-10">
        <span className="flex items-center gap-1.5">
          <span className="text-cyan-400 font-bold">13</span>
          <span className="text-slate-300">WELCOME TO CEREBRO</span>
        </span>
      </div>

      {/* Center Hero */}
      <div className="my-auto flex flex-col items-center py-4 relative z-10">
        {/* Constellation 'C' Orb */}
        <div className="relative w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center mb-4">
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse" />

          <svg className="w-36 h-36 sm:w-44 sm:h-44 drop-shadow-[0_0_30px_rgba(168,85,247,0.7)]" viewBox="0 0 200 200" fill="none">
            <defs>
              <linearGradient id="finalCGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="50%" stopColor="#c084fc" />
                <stop offset="100%" stopColor="#f43f5e" />
              </linearGradient>
              <filter id="finalGlow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Background Constellation Stars */}
            <circle cx="45" cy="45" r="1.5" fill="#ffffff" opacity="0.8" />
            <circle cx="155" cy="45" r="1.2" fill="#c084fc" opacity="0.8" />
            <circle cx="35" cy="115" r="1.5" fill="#38bdf8" opacity="0.7" />
            <circle cx="165" cy="135" r="1.5" fill="#f43f5e" opacity="0.8" />
            <circle cx="95" cy="175" r="1.2" fill="#818cf8" opacity="0.8" />

            {/* Glowing Main Arc */}
            <path
              d="M140 60 C120 35, 75 35, 55 65 C35 95, 35 125, 55 155 C75 185, 120 185, 140 160"
              stroke="url(#finalCGrad)"
              strokeWidth="9"
              strokeLinecap="round"
              filter="url(#finalGlow)"
              opacity="0.95"
            />
            <path
              d="M140 60 C120 35, 75 35, 55 65 C35 95, 35 125, 55 155 C75 185, 120 185, 140 160"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.85"
            />

            {/* Cross Lines */}
            <line x1="55" y1="65" x2="80" y2="85" stroke="#c084fc" strokeWidth="1" opacity="0.6" />
            <line x1="45" y1="100" x2="80" y2="85" stroke="#38bdf8" strokeWidth="1" opacity="0.6" />
            <line x1="45" y1="100" x2="80" y2="125" stroke="#818cf8" strokeWidth="1" opacity="0.6" />
            <line x1="55" y1="155" x2="80" y2="125" stroke="#f43f5e" strokeWidth="1" opacity="0.6" />

            {/* Star Nodes */}
            {[
              { cx: 140, cy: 60 },
              { cx: 98, cy: 43 },
              { cx: 55, cy: 65 },
              { cx: 42, cy: 110 },
              { cx: 55, cy: 155 },
              { cx: 98, cy: 177 },
              { cx: 140, cy: 160 },
              { cx: 80, cy: 85 },
              { cx: 80, cy: 125 },
            ].map((pt, i) => (
              <g key={i}>
                <circle cx={pt.cx} cy={pt.cy} r="4" fill="#ffffff" filter="url(#finalGlow)" />
                <circle cx={pt.cx} cy={pt.cy} r="2" fill="#c084fc" />
              </g>
            ))}
          </svg>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1">
          Welcome to Cerebro,
        </h2>
        <h3 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-300 to-pink-400 tracking-tight mb-3 drop-shadow-[0_2px_12px_rgba(192,132,252,0.4)]">
          {displayName}.
        </h3>
        <p className="text-sm sm:text-base text-slate-300 font-medium">
          Your Cerebro setup is complete.
        </p>
      </div>

      {/* Bottom Actions & Pagination */}
      <div className="w-full space-y-4 pt-2 relative z-10">
        <button
          onClick={onEnter}
          className="w-full max-w-xs mx-auto py-3.5 px-8 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 active:scale-[0.98] text-white font-bold text-sm shadow-[0_4px_25px_rgba(99,102,241,0.5)] transition-all"
        >
          Enter Cerebro
        </button>

        {/* Pagination Dots with dot 4 active */}
        <div className="flex items-center justify-center gap-1.5 pt-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === 4 ? 'w-4 bg-purple-400' : 'w-1.5 bg-zinc-700'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
