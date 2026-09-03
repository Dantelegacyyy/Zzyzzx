import React from 'react';
import { OnboardingFrame } from '../components/OnboardingFrame';
import { PrimaryAction } from '../components/PrimaryAction';
import { SecondaryAction } from '../components/SecondaryAction';
import { Smartphone, BookOpen, Calendar, ChevronRight, Zap } from 'lucide-react';

export function WelcomeScreen({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <OnboardingFrame>
      <div className="flex-1 flex flex-col justify-between py-2 w-full text-center">
        {/* Top iOS Header Section */}
        <div>
          <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 text-[#007AFF] flex items-center justify-center mx-auto mb-4 shadow-sm">
            <Zap size={32} />
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight mb-2">
            Quick Start
          </h2>
          <p className="text-sm text-zinc-400 max-w-xs mx-auto leading-relaxed">
            Bring your academic profile, courses, and schedules directly into your Cerebro workspace.
          </p>
        </div>

        {/* Middle Grouped iOS List Cards */}
        <div className="space-y-3 my-auto py-4">
          {[
            {
              icon: <BookOpen size={20} className="text-[#007AFF]" />,
              title: 'Automated Canvas Import',
              desc: 'Sync active courses, assignments & announcements',
            },
            {
              icon: <Calendar size={20} className="text-[#34C759]" />,
              title: 'Neural Schedule Vector',
              desc: 'AI-synthesized academic calendar & deadlines',
            },
            {
              icon: <Smartphone size={20} className="text-[#AF52DE]" />,
              title: 'Cross-Device Command Center',
              desc: 'Access your workspace seamlessly everywhere',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="w-full flex items-center justify-between p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-left transition-all hover:bg-zinc-800/90"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-2.5 rounded-xl bg-zinc-800 border border-zinc-700/50">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">{item.desc}</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-zinc-500 shrink-0" />
            </div>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="w-full space-y-2 pt-2">
          <PrimaryAction onClick={onNext} className="w-full">
            Continue
          </PrimaryAction>
          <SecondaryAction onClick={onBack} className="w-full">
            Set Up Manually
          </SecondaryAction>
        </div>
      </div>
    </OnboardingFrame>
  );
}


