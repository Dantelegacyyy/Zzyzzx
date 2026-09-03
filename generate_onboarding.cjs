const fs = require('fs');
const path = require('path');

const dirs = [
  'src/client/features/onboarding',
  'src/client/features/onboarding/screens',
  'src/client/features/onboarding/components',
  'src/server/workspace-composer',
  'src/shared/workspace-composer',
];

dirs.forEach((d) => fs.mkdirSync(path.join(__dirname, d), { recursive: true }));

const files = {
  'src/client/features/onboarding/onboardingTypes.ts': `
export type OnboardingStep =
  | "HELLO"
  | "WELCOME"
  | "PRIVACY"
  | "ACCOUNT"
  | "PROFILE"
  | "UNIVERSITY"
  | "CANVAS_BRIDGE"
  | "COURSES"
  | "CONTINUOUS_SYNC"
  | "CEREBRO_SIGNATURE"
  | "BUILD_WORKSPACE"
  | "AEGIS_ACTIVATION"
  | "FINAL_WELCOME"
  | "COMPLETE";

export interface OnboardingStateRecord {
  ownerSubjectId: string;
  currentStep: OnboardingStep;
  completedSteps: readonly OnboardingStep[];
  setupCompletedAt: string | null;
  updatedAt: string;
}

export interface CerebroSignatureInput {
  preferredMode: "LIGHT" | "DARK" | "ADAPTIVE";
  density: "SIMPLE" | "BALANCED" | "RICH";
  navigationComfort: "TOP" | "SIDE" | "ADAPTIVE";
  accentPreference:
    | "COOL"
    | "WARM"
    | "VIBRANT"
    | "MUTED"
    | "MONOCHROME"
    | "SURPRISE_ME";
  motionPreference: "FULL" | "REDUCED";
}
`,
  'src/client/features/onboarding/components/OnboardingFrame.tsx': `
import React from 'react';

export function OnboardingFrame({
  children,
  theme = 'light'
}: {
  children: React.ReactNode;
  theme?: 'light' | 'dark';
}) {
  const isDark = theme === 'dark';
  return (
    <div className={\`min-h-screen flex flex-col \${isDark ? 'bg-[#050B14] text-slate-200' : 'bg-slate-50 text-slate-900'} font-sans overflow-x-hidden selection:bg-cyan-900 selection:text-cyan-100\`}>
      <main className="flex-1 flex flex-col items-center justify-center relative p-6 w-full max-w-4xl mx-auto">
        {children}
      </main>
    </div>
  );
}
`,
  'src/client/features/onboarding/components/PrimaryAction.tsx': `
import React from 'react';

export function PrimaryAction({
  onClick,
  children,
  className = '',
  disabled = false,
}: {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={\`min-h-[44px] px-8 py-3 rounded-full font-medium tracking-wide transition-all \${
        disabled ? 'opacity-50 cursor-not-allowed bg-slate-300 text-slate-500' : 'bg-slate-900 text-white hover:bg-slate-800 shadow-md hover:shadow-lg active:scale-[0.98]'
      } \${className}\`}
    >
      {children}
    </button>
  );
}
`,
  'src/client/features/onboarding/components/SecondaryAction.tsx': `
import React from 'react';

export function SecondaryAction({
  onClick,
  children,
  className = ''
}: {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={\`min-h-[44px] px-8 py-3 rounded-full font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 transition-colors \${className}\`}
    >
      {children}
    </button>
  );
}
`,
};

Object.keys(files).forEach((f) => {
  fs.writeFileSync(path.join(__dirname, f), files[f].trim());
});

console.log('Generated base onboarding files');
