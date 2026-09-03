import React, { useEffect, useState } from 'react';
import { OnboardingFrame } from '../components/OnboardingFrame';
import { PrimaryAction } from '../components/PrimaryAction';

export function WorkspaceBuildScreen({ onNext }: { onNext: () => void }) {
  const [completed, setCompleted] = useState(0);
  const tasks = [
    'Creating your profile',
    'Securing your workspace',
    'Connecting selected courses',
    'Preparing your academic structure',
    'Composing your Cerebro Signature',
    'Building your Home',
  ];

  useEffect(() => {
    // Simulate real operations. In reality, these would await actual promises.
    const runTasks = async () => {
      for (let i = 0; i < tasks.length; i++) {
        await new Promise((r) => setTimeout(r, 600 + Math.random() * 400));
        setCompleted(i + 1);
      }
      setTimeout(onNext, 1000);
    };
    runTasks();
  }, [onNext, tasks.length]);

  return (
    <OnboardingFrame theme="light">
      <div className="w-full max-w-md mx-auto text-center">
        <h2 className="text-3xl font-medium text-slate-900 mb-12">
          Building Your Cerebro
        </h2>

        <div className="space-y-4 mb-12 text-left bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          {tasks.map((task, i) => (
            <div
              key={i}
              className={`flex items-center gap-4 transition-opacity duration-300 ${i <= completed ? 'opacity-100' : 'opacity-30'}`}
            >
              <div className="w-6 h-6 flex items-center justify-center shrink-0">
                {i < completed ? (
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : i === completed ? (
                  <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <div className="w-2 h-2 bg-slate-200 rounded-full" />
                )}
              </div>
              <span
                className={`text-lg ${i < completed ? 'text-slate-800' : i === completed ? 'text-blue-600 font-medium' : 'text-slate-400'}`}
              >
                {task}
              </span>
            </div>
          ))}
        </div>

        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-500 ease-out"
            style={{ width: `${(completed / tasks.length) * 100}%` }}
          />
        </div>
      </div>
    </OnboardingFrame>
  );
}
