import React from 'react';
import { OnboardingFrame } from '../components/OnboardingFrame';
import { PrimaryAction } from '../components/PrimaryAction';
import { SecondaryAction } from '../components/SecondaryAction';
import { ShieldCheck, Check } from 'lucide-react';

export function AegisActivationScreen({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <OnboardingFrame>
      <div className="flex-1 flex flex-col justify-between py-2 w-full text-center">
        {/* Header Section */}
        <div>
          <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 text-[#FF9500] flex items-center justify-center mx-auto mb-4 shadow-sm">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight mb-2">
            Project AEGIS
          </h2>
          <p className="text-sm text-zinc-400 max-w-xs mx-auto leading-relaxed">
            Integrated security guardian providing isolated environment verification and privacy observation.
          </p>
        </div>

        {/* Grouped Security Specs Card */}
        <div className="my-auto py-3 space-y-3 text-left">
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
              <span className="text-xs font-medium text-zinc-400">AEGIS Operational Mode</span>
              <span className="text-xs font-semibold text-[#FF9500] bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                Phase 2 Dormant Seed
              </span>
            </div>

            <div className="space-y-2">
              {[
                'Read-Only evidence observer active',
                'Isolated, non-runtime, non-automated verifier',
                'Owner-Locked boundary parameters',
              ].map((stmt, i) => (
                <div key={i} className="flex items-center gap-3 text-xs text-zinc-300">
                  <div className="p-1 rounded-full bg-[#34C759]/20 text-[#34C759] shrink-0">
                    <Check size={12} className="stroke-[3]" />
                  </div>
                  <span>{stmt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="w-full space-y-2 pt-2">
          <PrimaryAction
            onClick={onNext}
            className="w-full bg-[#FF9500] hover:bg-[#E08300] shadow-[0_4px_20px_rgba(255,149,0,0.35)]"
          >
            Enable AEGIS Protection
          </PrimaryAction>
          <SecondaryAction onClick={onBack} className="w-full">
            Back
          </SecondaryAction>
        </div>
      </div>
    </OnboardingFrame>
  );
}


