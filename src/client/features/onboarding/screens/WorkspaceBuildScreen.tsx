import React, { useEffect, useState } from 'react';
import { Check } from 'lucide-react';

const BUILD_STEPS = [
  'Applying Sentient Architect layout topology',
  'Binding enrolled courses to Canvas & Cloud SQL',
  'Calibrating chromatic luminescence & contrast',
  'Activating AEGIS Security Observer & audit log',
];

export function WorkspaceBuildScreen({ onNext }: { onNext: () => void }) {
  const [completedIndex, setCompletedIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCompletedIndex((prev) => {
        if (prev < BUILD_STEPS.length) {
          return prev + 1;
        }
        clearInterval(timer);
        setTimeout(onNext, 600);
        return prev;
      });
    }, 500);

    return () => clearInterval(timer);
  }, [onNext]);

  const percent = Math.min(
    100,
    Math.round(((completedIndex + 1) / (BUILD_STEPS.length + 1)) * 100)
  );

  return (
    <div className="w-full h-full flex flex-col justify-between py-2 text-center text-white bg-[#050B18] rounded-3xl p-6 sm:p-8 shadow-2xl border border-emerald-950/40 relative overflow-hidden transition-all">
      {/* Top Header */}
      <div className="flex items-center justify-between text-xs font-mono font-bold tracking-wider text-emerald-400 uppercase mb-2">
        <span>12 BUILDING YOUR CEREBRO</span>
      </div>

      {/* Center Hero */}
      <div className="my-auto flex flex-col items-center py-2 max-w-sm mx-auto w-full">
        {/* Glowing Neon Green Progress Gauge */}
        <div className="relative w-28 h-28 flex items-center justify-center mb-6">
          <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl animate-pulse" />

          {/* Circular SVG Gauge */}
          <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#064E3B"
              strokeWidth="6"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#10B981"
              strokeWidth="6"
              fill="transparent"
              strokeDasharray="251.2"
              strokeDashoffset={251.2 - (251.2 * percent) / 100}
              strokeLinecap="round"
              className="transition-all duration-300 ease-out drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]"
            />
          </svg>

          {/* Percentage in center */}
          <div className="absolute inset-0 flex items-center justify-center text-2xl font-black text-white font-mono tracking-tight">
            {percent}%
          </div>
        </div>

        {/* Real Checklist */}
        <div className="space-y-2.5 w-full text-left max-w-xs mb-6">
          {BUILD_STEPS.map((step, idx) => {
            const isDone = idx < completedIndex;
            return (
              <div
                key={idx}
                className={`flex items-center justify-between text-xs sm:text-sm font-medium transition-opacity ${
                  isDone ? 'text-slate-200 opacity-100' : 'text-slate-500 opacity-40'
                }`}
              >
                <span>{step}</span>
                <Check
                  size={15}
                  className={`stroke-[3] transition-all ${
                    isDone ? 'text-emerald-400 scale-100' : 'opacity-0 scale-50'
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* Glowing Almost There message */}
        <p className="text-base font-bold text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.8)] animate-pulse">
          Almost there...
        </p>
      </div>

      {/* Pagination Dots */}
      <div className="w-full pt-4">
        <div className="flex items-center justify-center gap-1.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === 3 ? 'w-4 bg-emerald-400' : 'w-1.5 bg-zinc-700'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
