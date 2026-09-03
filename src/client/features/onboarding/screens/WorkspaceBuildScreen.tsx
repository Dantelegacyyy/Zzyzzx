import React, { useEffect, useState } from 'react';
import { OnboardingFrame } from '../components/OnboardingFrame';
import { Smartphone, Check } from 'lucide-react';

export function WorkspaceBuildScreen({ onNext }: { onNext: () => void }) {
  const [completed, setCompleted] = useState(0);
  const tasks = [
    'Setting up Cerebro ID',
    'Configuring system privacy',
    'Connecting active courses',
    'Preparing workspace layout',
    'Finishing setup',
  ];

  useEffect(() => {
    const runTasks = async () => {
      for (let i = 0; i < tasks.length; i++) {
        await new Promise((r) => setTimeout(r, 650 + Math.random() * 250));
        setCompleted(i + 1);
      }
      setTimeout(onNext, 700);
    };
    runTasks();
  }, [onNext, tasks.length]);

  const percent = Math.min(100, Math.round((completed / tasks.length) * 100));

  return (
    <OnboardingFrame>
      <div className="flex-1 flex flex-col justify-between py-6 w-full text-center">
        {/* Apple-style Setup Header */}
        <div className="my-auto space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto shadow-xl">
            <Smartphone size={40} className="text-white animate-pulse" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight mb-2">
              Setting Up Your Cerebro...
            </h2>
            <p className="text-xs text-zinc-400 font-mono">
              {percent}% Completed
            </p>
          </div>

          {/* iOS Progress Bar */}
          <div className="w-64 max-w-xs mx-auto h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-300 ease-out rounded-full"
              style={{ width: `${percent}%` }}
            />
          </div>

          {/* Current Step Indicator */}
          <div className="text-xs text-zinc-400 font-medium h-6">
            {completed < tasks.length ? (
              <span>{tasks[completed]}</span>
            ) : (
              <span className="text-[#34C759] font-semibold flex items-center justify-center gap-1.5">
                <Check size={14} className="stroke-[3]" /> Setup Complete
              </span>
            )}
          </div>
        </div>

        <p className="text-[11px] text-zinc-600">
          This may take a few moments. Do not close this window.
        </p>
      </div>
    </OnboardingFrame>
  );
}


