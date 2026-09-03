import React, { useState, useEffect } from 'react';
import { OnboardingFrame } from '../components/OnboardingFrame';
import { PrimaryAction } from '../components/PrimaryAction';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, Sparkles } from 'lucide-react';

const GREETINGS = [
  { text: 'Hello', lang: 'English' },
  { text: 'Hola', lang: 'Spanish' },
  { text: 'Bonjour', lang: 'French' },
  { text: 'Ciao', lang: 'Italian' },
  { text: 'Hallo', lang: 'German' },
  { text: 'Aloha', lang: 'Hawaiian' },
  { text: '你好', lang: 'Chinese' },
  { text: 'こんにちは', lang: 'Japanese' },
  { text: 'Olá', lang: 'Portuguese' },
  { text: 'नमस्ते', lang: 'Hindi' },
  { text: '안녕하세요', lang: 'Korean' },
];

export function HelloScreen({ onNext }: { onNext: () => void }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % GREETINGS.length);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  const current = GREETINGS[index];

  return (
    <OnboardingFrame>
      <div className="flex-1 flex flex-col items-center justify-between py-4 text-center w-full min-h-[440px]">
        {/* Top Header Badge */}
        <div className="pt-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 p-0.5 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 mx-auto mb-3">
            <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center text-blue-400">
              <Sparkles size={26} />
            </div>
          </div>
          <span className="text-[11px] font-semibold tracking-widest uppercase text-blue-400 font-mono">
            Cerebro Setup Assistant
          </span>
        </div>

        {/* Center Animated Multi-Language Greeting Loop */}
        <div className="my-auto py-8 flex flex-col items-center justify-center min-h-[160px]">
          <AnimatePresence mode="wait">
            <motion.h1
              key={current.text}
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 1.05 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl sm:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-zinc-300 font-sans"
            >
              {current.text}
            </motion.h1>
          </AnimatePresence>
          <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest mt-3">
            {current.lang}
          </p>
        </div>

        {/* Bottom Action */}
        <div className="w-full pt-4 space-y-3">
          <div className="flex items-center justify-center gap-1.5 text-zinc-400 text-xs font-medium">
            <ChevronUp size={16} className="text-blue-400 animate-bounce" />
            <span>Click below to begin setup</span>
          </div>

          <PrimaryAction
            onClick={onNext}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 font-semibold"
          >
            Start Cerebro Setup
          </PrimaryAction>
        </div>
      </div>
    </OnboardingFrame>
  );
}


