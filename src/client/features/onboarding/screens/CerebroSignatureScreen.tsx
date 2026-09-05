import React, { useState } from 'react';
import {
  LayoutGrid,
  Code,
  Target,
  Activity,
  Sparkles,
  Disc,
} from 'lucide-react';
import type { CerebroSignatureInput } from '../onboardingTypes';

// 12 Visual Style Dots (2 rows of 6)
const VISUAL_STYLES = [
  { id: 'slate', color: 'bg-slate-900' },
  { id: 'navy', color: 'bg-blue-900' },
  { id: 'purple', color: 'bg-purple-900' },
  { id: 'indigo', color: 'bg-indigo-600' },
  { id: 'cyan', color: 'bg-cyan-400' },
  { id: 'teal', color: 'bg-teal-500' },
  { id: 'emerald', color: 'bg-emerald-500' },
  { id: 'lime', color: 'bg-lime-500' },
  { id: 'yellow', color: 'bg-amber-400' },
  { id: 'gold', color: 'bg-yellow-600' },
  { id: 'orange', color: 'bg-orange-500' },
  { id: 'magenta', color: 'bg-pink-500' },
];

// 7 Accent Dots
const ACCENTS = [
  { id: 'blue', color: 'bg-blue-600' },
  { id: 'teal', color: 'bg-teal-400' },
  { id: 'green', color: 'bg-emerald-400' },
  { id: 'gold', color: 'bg-amber-400' },
  { id: 'orange', color: 'bg-orange-500' },
  { id: 'magenta', color: 'bg-fuchsia-500' },
  { id: 'purple', color: 'bg-purple-600' },
];

// 6 Vibe Icons
const VIBES = [
  { id: 'grid', label: 'Grid', icon: LayoutGrid },
  { id: 'code', label: 'Terminal', icon: Code },
  { id: 'target', label: 'Focus', icon: Target },
  { id: 'wave', label: 'Audio', icon: Activity },
  { id: 'zen', label: 'Zen', icon: Sparkles },
  { id: 'ring', label: 'Radar', icon: Disc },
];

export function CerebroSignatureScreen({
  onNext,
  onBack,
}: {
  onNext: (sig?: CerebroSignatureInput) => void;
  onBack: () => void;
}) {
  const [selectedStyle, setSelectedStyle] = useState(4); // cyan default
  const [selectedAccent, setSelectedAccent] = useState(0); // blue default
  const [selectedVibe, setSelectedVibe] = useState(0);

  return (
    <div className="w-full h-full flex flex-col justify-between py-2 text-center text-slate-900 bg-[#FAF3EB] rounded-3xl p-6 sm:p-8 shadow-2xl transition-all">
      {/* Top Header */}
      <div className="flex items-center justify-between text-xs font-mono font-bold tracking-wider text-fuchsia-600 uppercase mb-2">
        <span>10 CEREBRO SIGNATURE</span>
      </div>

      {/* Center Hero */}
      <div className="my-auto flex flex-col items-center py-1 max-w-sm mx-auto w-full">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight mb-5">
          Personalize your Cerebro.
        </h2>

        {/* Section 1: Choose your visual style */}
        <div className="w-full text-left mb-4">
          <p className="text-xs font-bold text-slate-700 mb-2.5">
            Choose your visual style
          </p>
          <div className="grid grid-cols-6 gap-3 justify-items-center">
            {VISUAL_STYLES.map((style, idx) => (
              <button
                key={style.id}
                type="button"
                onClick={() => setSelectedStyle(idx)}
                className={`w-7 h-7 rounded-full ${style.color} transition-transform ${
                  selectedStyle === idx
                    ? 'ring-2 ring-offset-2 ring-slate-800 scale-110'
                    : 'hover:scale-105 opacity-90'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Section 2: Choose your accent */}
        <div className="w-full text-left mb-4">
          <p className="text-xs font-bold text-slate-700 mb-2.5">
            Choose your accent
          </p>
          <div className="flex items-center justify-between px-1">
            {ACCENTS.map((accent, idx) => (
              <button
                key={accent.id}
                type="button"
                onClick={() => setSelectedAccent(idx)}
                className={`w-7 h-7 rounded-full ${accent.color} transition-transform ${
                  selectedAccent === idx
                    ? 'ring-2 ring-offset-2 ring-slate-800 scale-110'
                    : 'hover:scale-105 opacity-90'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Section 3: Choose your vibe */}
        <div className="w-full text-left mb-2">
          <p className="text-xs font-bold text-slate-700 mb-2.5">
            Choose your vibe
          </p>
          <div className="flex items-center justify-between gap-1.5">
            {VIBES.map((vibe, idx) => {
              const Icon = vibe.icon;
              return (
                <button
                  key={vibe.id}
                  type="button"
                  onClick={() => setSelectedVibe(idx)}
                  className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${
                    selectedVibe === idx
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm scale-105'
                      : 'bg-white/80 border-slate-300 text-slate-700 hover:bg-white'
                  }`}
                  title={vibe.label}
                >
                  <Icon size={16} />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="w-full space-y-3 pt-2">
        <div className="flex items-center justify-center gap-3 max-w-xs mx-auto">
          <button
            onClick={onBack}
            className="flex-1 py-3 px-4 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-700 font-semibold text-xs transition-colors"
          >
            Back
          </button>
          <button
            onClick={() =>
              onNext({
                preferredMode: 'DARK',
                density: 'RICH',
                navigationComfort: 'SIDE',
                accentPreference: 'VIBRANT',
                motionPreference: 'FULL',
                visualStyleIndex: selectedStyle,
                accentIndex: selectedAccent,
                vibeIndex: selectedVibe,
              })
            }
            className="flex-1 py-3 px-6 rounded-full bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 active:scale-[0.98] text-white font-bold text-xs shadow-[0_4px_20px_rgba(217,70,239,0.4)] transition-all"
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
                i === 4 ? 'w-4 bg-fuchsia-600' : 'w-1.5 bg-slate-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
