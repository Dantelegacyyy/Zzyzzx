import React from 'react';

export interface OnboardingSkeletonProps {
  variant?: 'card' | 'fullscreen' | 'modal';
  stepNumber?: number;
  stepLabel?: string;
  hasEmblem?: boolean;
}

export function OnboardingSkeleton({
  variant = 'card',
  stepNumber,
  stepLabel,
  hasEmblem = true,
}: OnboardingSkeletonProps) {
  const isFullScreen = variant === 'fullscreen';

  return (
    <div
      id="onboarding-ui-skeleton"
      className={`relative w-full ${
        isFullScreen ? 'min-h-screen bg-[#030712] p-8 sm:p-12 flex flex-col justify-between items-center' : 'p-6 sm:p-8 rounded-3xl bg-[#040714] border border-white/5 shadow-2xl flex flex-col justify-between'
      } overflow-hidden select-none animate-pulse`}
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Top Header Step Skeleton */}
      <header className="relative z-10 w-full flex items-center justify-between">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
          <div className="w-2 h-2 rounded-full bg-cyan-400/40" />
          <div className="h-3 w-6 bg-cyan-400/30 rounded" />
          <span className="text-zinc-600 text-xs">/</span>
          <div className="h-3 w-16 bg-zinc-700/40 rounded" />
        </div>
        <div className="h-3 w-28 bg-white/5 rounded-full" />
      </header>

      {/* Center Main Skeleton Area */}
      <main className="relative z-10 my-auto py-8 w-full max-w-md mx-auto flex flex-col items-center text-center">
        {hasEmblem && (
          <div className="w-20 h-20 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 mb-6 flex items-center justify-center shadow-lg shadow-cyan-500/5">
            <div className="w-10 h-10 rounded-full bg-cyan-400/20" />
          </div>
        )}

        {/* Title skeleton */}
        <div className="h-8 w-56 sm:w-72 bg-gradient-to-r from-white/10 to-white/5 rounded-lg mb-3" />
        {/* Subtitle skeleton */}
        <div className="h-4 w-72 sm:w-96 bg-white/5 rounded-md mb-8 max-w-full" />

        {/* Dynamic Card / Input Placeholders */}
        <div className="w-full space-y-3">
          <div className="h-14 w-full rounded-2xl bg-white/[0.03] border border-white/5 flex items-center px-4 gap-3">
            <div className="w-6 h-6 rounded-lg bg-white/5" />
            <div className="h-4 w-40 bg-white/5 rounded" />
          </div>
          <div className="h-14 w-full rounded-2xl bg-white/[0.03] border border-white/5 flex items-center px-4 gap-3">
            <div className="w-6 h-6 rounded-lg bg-white/5" />
            <div className="h-4 w-48 bg-white/5 rounded" />
          </div>
          <div className="h-14 w-full rounded-2xl bg-white/[0.03] border border-white/5 flex items-center px-4 gap-3">
            <div className="w-6 h-6 rounded-lg bg-white/5" />
            <div className="h-4 w-32 bg-white/5 rounded" />
          </div>
        </div>
      </main>

      {/* Bottom Action & Pagination Skeleton */}
      <footer className="relative z-10 w-full max-w-sm mx-auto flex flex-col items-center space-y-4 pt-4">
        <div className="h-12 w-full rounded-full bg-gradient-to-r from-cyan-500/20 via-blue-600/20 to-purple-600/20 border border-cyan-500/30" />
        <div className="flex items-center justify-center gap-1.5 pt-1">
          <div className="w-5 h-1.5 rounded-full bg-cyan-400/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
        </div>
      </footer>
    </div>
  );
}

export default OnboardingSkeleton;
