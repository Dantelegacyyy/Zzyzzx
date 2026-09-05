import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const GREETINGS = [
  { text: 'Hello', lang: 'English' },
  { text: 'Hola', lang: 'Español' },
  { text: 'Bonjour', lang: 'Français' },
  { text: 'Ciao', lang: 'Italiano' },
  { text: 'Hallo', lang: 'Deutsch' },
  { text: 'こんにちは', lang: 'Japanese' },
  { text: '你好', lang: 'Chinese' },
  { text: 'नमस्ते', lang: 'Hindi' },
  { text: 'Olá', lang: 'Português' },
  { text: '안녕하세요', lang: 'Korean' },
  { text: 'مرحباً', lang: 'Arabic' },
  { text: 'Salve', lang: 'Latin' },
];

export interface ScreenHelloProps {
  onNext?: () => void;
  onBegin?: () => void;
}

export function ScreenHello({ onNext, onBegin }: ScreenHelloProps) {
  const [greetingIdx, setGreetingIdx] = useState(0);

  const handleAction = () => {
    if (onBegin) {
      onBegin();
    } else if (onNext) {
      onNext();
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setGreetingIdx((prev) => (prev + 1) % GREETINGS.length);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      id="screen-01-hello"
      className="fixed inset-0 z-50 w-screen h-screen bg-[#030712] text-white flex flex-col justify-between items-center px-4 sm:px-8 py-8 sm:py-12 overflow-hidden select-none selection:bg-cyan-900 selection:text-white"
    >
      {/* Deep Space Ambient Nebulae & Atmospheric Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-cyan-600/15 via-blue-600/10 to-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[550px] h-[350px] bg-indigo-950/25 rounded-full blur-[130px] pointer-events-none" />

      {/* Subtle Background Radial Grid Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.03)_0%,transparent_70%)] pointer-events-none" />

      {/* Top Header Step Label */}
      <header className="relative z-10 w-full max-w-4xl flex items-center justify-between pt-1 sm:pt-2">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-cyan-400 font-bold">01</span>
          <span className="text-slate-500">/</span>
          <span className="text-slate-400 font-medium uppercase tracking-wider">HELLO</span>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 tracking-wider">
          <Sparkles size={12} className="text-cyan-400/70" />
          <span>CEREBRO OS // LAUNCH GATE</span>
        </div>
      </header>

      {/* Center Stage: Animated 'Hello' & Cerebro Constellation Emblem */}
      <main className="relative z-10 my-auto flex flex-col items-center text-center max-w-xl mx-auto px-4 py-4 sm:py-6">
        {/* Multilingual Animated Hello Sequence */}
        <div className="h-16 sm:h-20 flex flex-col items-center justify-center mb-3 sm:mb-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={greetingIdx}
              initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="flex flex-col items-center"
            >
              <span className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 drop-shadow-[0_2px_20px_rgba(255,255,255,0.3)]">
                {GREETINGS[greetingIdx].text}
              </span>
              <span className="text-[10px] sm:text-xs font-mono tracking-widest text-cyan-400/80 uppercase mt-1.5">
                {GREETINGS[greetingIdx].lang}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Glowing 3D Wireframe Constellation 'C' Emblem */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center mb-5 sm:mb-6">
          {/* Animated Radial Pulse Rings */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/20 via-indigo-500/10 to-fuchsia-500/20 blur-2xl animate-pulse" />
          <div className="absolute inset-4 rounded-full border border-cyan-500/10 pointer-events-none" />

          {/* SVG Constellation 'C' Emblem */}
          <svg
            className="w-44 h-44 sm:w-52 sm:h-52 drop-shadow-[0_0_35px_rgba(6,182,212,0.6)]"
            viewBox="0 0 200 200"
            fill="none"
          >
            <defs>
              <linearGradient id="emblemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="50%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#e879f9" />
              </linearGradient>
              <filter id="emblemBloom">
                <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Background Ambient Stars */}
            <circle cx="40" cy="40" r="1.5" fill="#38bdf8" opacity="0.8" />
            <circle cx="160" cy="50" r="1.2" fill="#ffffff" opacity="0.7" />
            <circle cx="150" cy="150" r="1.5" fill="#e879f9" opacity="0.8" />
            <circle cx="90" cy="170" r="1.2" fill="#818cf8" opacity="0.7" />
            <circle cx="130" cy="110" r="1" fill="#ffffff" opacity="0.9" />

            {/* Main Glowing Constellation Arc */}
            <path
              d="M140 60 C120 35, 75 35, 55 65 C35 95, 35 125, 55 155 C75 185, 120 185, 140 160"
              stroke="url(#emblemGrad)"
              strokeWidth="9"
              strokeLinecap="round"
              filter="url(#emblemBloom)"
              opacity="0.95"
            />
            <path
              d="M140 60 C120 35, 75 35, 55 65 C35 95, 35 125, 55 155 C75 185, 120 185, 140 160"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.85"
            />

            {/* Geometric Constellation Web Struts */}
            <line x1="55" y1="65" x2="80" y2="85" stroke="#38bdf8" strokeWidth="1" opacity="0.45" />
            <line x1="45" y1="100" x2="80" y2="85" stroke="#818cf8" strokeWidth="1" opacity="0.45" />
            <line x1="45" y1="100" x2="80" y2="125" stroke="#c084fc" strokeWidth="1" opacity="0.45" />
            <line x1="55" y1="155" x2="80" y2="125" stroke="#e879f9" strokeWidth="1" opacity="0.45" />
            <line x1="140" y1="60" x2="110" y2="65" stroke="#38bdf8" strokeWidth="1" opacity="0.45" />
            <line x1="140" y1="160" x2="110" y2="155" stroke="#e879f9" strokeWidth="1" opacity="0.45" />

            {/* Sparkling Star Nodes */}
            {[
              { cx: 140, cy: 60 },
              { cx: 55, cy: 65 },
              { cx: 45, cy: 100 },
              { cx: 55, cy: 155 },
              { cx: 140, cy: 160 },
              { cx: 110, cy: 65 },
              { cx: 110, cy: 155 },
              { cx: 80, cy: 85 },
              { cx: 80, cy: 125 },
            ].map((pt, i) => (
              <g key={i}>
                <circle cx={pt.cx} cy={pt.cy} r="4.2" fill="#ffffff" filter="url(#emblemBloom)" />
                <circle cx={pt.cx} cy={pt.cy} r="2.2" fill="#38bdf8" />
              </g>
            ))}
          </svg>
        </div>

        {/* Cerebro Wordmark Typography */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-[0.28em] font-sans mb-2 drop-shadow-[0_2px_15px_rgba(255,255,255,0.25)]">
          C E R E B R O
        </h1>
        <p className="text-xs sm:text-sm font-mono font-semibold tracking-[0.22em] text-cyan-300 uppercase">
          YOUR ACADEMIC COMMAND CENTER
        </p>
      </main>

      {/* Bottom Action: Primary 'Begin' Action Button & Pagination */}
      <footer className="relative z-10 w-full max-w-sm mx-auto flex flex-col items-center space-y-4 pb-2">
        <button
          id="begin-onboarding-btn"
          type="button"
          onClick={handleAction}
          className="group w-full py-4 px-8 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 active:scale-[0.98] text-white font-extrabold text-sm sm:text-base shadow-[0_4px_30px_rgba(6,182,212,0.45)] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
        >
          <span>Begin</span>
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </button>

        {/* 5 Pagination Dots with dot 0 active */}
        <div className="flex items-center justify-center gap-1.5 pt-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === 0 ? 'w-5 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]' : 'w-1.5 bg-zinc-700'
              }`}
            />
          ))}
        </div>
      </footer>
    </div>
  );
}

export default ScreenHello;
