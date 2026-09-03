import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  ShieldCheck,
  Sparkles,
  Zap,
  Volume2,
  VolumeX,
  MessageSquare,
  ChevronRight,
  ChevronLeft,
  X,
  Bot,
  CheckCircle2,
  Lock,
  Cpu,
  Layers,
  HelpCircle,
  Send,
} from 'lucide-react';

export interface AegisFeatureHighlight {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  securityNote: string;
  icon: React.ReactNode;
  badge: string;
}

const FEATURE_HIGHLIGHTS: AegisFeatureHighlight[] = [
  {
    id: 'aegis-shield',
    title: 'AEGIS Guardian Shield',
    subtitle: 'Zero-Leak Security Protocols',
    description:
      'AEGIS operates in Phase 2.5 owner-locked mode, enforcing HttpOnly session cookies, rate-limiting firewalls, and isolated server-side API key proxying.',
    securityNote: 'Military-grade AES-256-GCM encryption & Cloud SQL TLS sockets.',
    icon: <ShieldCheck className="text-cyan-400" size={22} />,
    badge: 'Security Phase 2.5',
  },
  {
    id: 'canvas-bridge',
    title: 'Canvas LMS Bridge',
    subtitle: 'Automated Syllabus & Assignment Ingestion',
    description:
      'Connects directly with Canvas API tokens to pull upcoming exam dates, homework deadlines, and grade analytics in real-time.',
    securityNote: 'Tokens are encrypted in Cloud SQL and never exposed to browser context.',
    icon: <Zap className="text-amber-400" size={22} />,
    badge: 'Real-time LMS Sync',
  },
  {
    id: 'ai-architect',
    title: 'Gemini 2.5 Dashboard Architect',
    subtitle: 'Autonomous Layout & Bento Grid Generator',
    description:
      'Generates customized layout grids (Bento Grid, Master 3-Column, Focus Mode) adapted to your course workload and study habits.',
    securityNote: 'Powered by Gemini 2.5 Flash reasoning via server-side endpoints.',
    icon: <Sparkles className="text-purple-400" size={22} />,
    badge: 'AI Curation Engine',
  },
  {
    id: 'smart-notes',
    title: 'Smart Note Studio',
    subtitle: 'Vector Search & AI Summary',
    description:
      'Turn raw lecture slides and documents into instant AI flashcards, vector summaries, and smart study guides.',
    securityNote: 'Vector indices are sandboxed per student profile.',
    icon: <Layers className="text-blue-400" size={22} />,
    badge: 'Academic Intelligence',
  },
  {
    id: 'view-mode',
    title: 'Student vs. Creator Mode',
    subtitle: 'Seamless Experience Switcher',
    description:
      'Switch between a clean, focused Student View and a Creator/Admin Telemetry view to monitor database health and API logs.',
    securityNote: 'Admin telemetry requires authenticated session validation.',
    icon: <Cpu className="text-emerald-400" size={22} />,
    badge: 'Developer Inspection',
  },
];

interface AegisGuardianCharacterProps {
  onDismiss?: () => void;
  autoTriggerStep?: string;
}

export const AegisGuardianCharacter: React.FC<AegisGuardianCharacterProps> = ({
  onDismiss,
  autoTriggerStep,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [currentFeatureIdx, setCurrentFeatureIdx] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showAskBox, setShowAskBox] = useState(false);
  const [userQuery, setUserQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isThinking, setIsThinking] = useState(false);

  const activeFeature = FEATURE_HIGHLIGHTS[currentFeatureIdx];

  // Trigger speech animation when feature changes
  useEffect(() => {
    const speakTimer = setTimeout(() => setIsSpeaking(true), 50);
    const stopTimer = setTimeout(() => setIsSpeaking(false), 2450);
    return () => {
      clearTimeout(speakTimer);
      clearTimeout(stopTimer);
    };
  }, [currentFeatureIdx]);

  const handleNext = () => {
    if (currentFeatureIdx < FEATURE_HIGHLIGHTS.length - 1) {
      setCurrentFeatureIdx((prev) => prev + 1);
    } else {
      setCurrentFeatureIdx(0);
    }
  };

  const handlePrev = () => {
    if (currentFeatureIdx > 0) {
      setCurrentFeatureIdx((prev) => prev - 1);
    } else {
      setCurrentFeatureIdx(FEATURE_HIGHLIGHTS.length - 1);
    }
  };

  const handleAskAegis = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery.trim()) return;

    setIsThinking(true);
    setAiResponse(null);

    setTimeout(() => {
      setIsThinking(false);
      setAiResponse(
        `[AEGIS Guardian Protocol]: Regarding "${userQuery}" — Cerebro operates with 100% server-side isolation. All Canvas sync calls and Gemini 2.5 AI requests are protected under AEGIS Phase 2.5 security rules!`
      );
    }, 1000);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="w-[340px] sm:w-[380px] glass-panel bg-zinc-950/90 border border-cyan-500/30 rounded-3xl p-5 shadow-[0_20px_50px_rgba(6,182,212,0.25)] backdrop-blur-2xl pointer-events-auto relative mb-3 overflow-hidden"
          >
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Guardian Top Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 relative z-10">
              <div className="flex items-center gap-2.5">
                {/* Animated Guardian Avatar Icon */}
                <div className="relative">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-md shadow-cyan-500/30 flex items-center justify-center">
                    <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center text-cyan-400">
                      <Shield size={18} className="animate-pulse" />
                    </div>
                  </div>
                  {isSpeaking && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-ping" />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white tracking-wide">
                      AEGIS Guardian
                    </span>
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      ACTIVE
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400">Feature Walkthrough Overlay</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                  title={isMuted ? 'Unmute Guardian' : 'Mute Guardian'}
                >
                  {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} className="text-cyan-400" />}
                </button>
                <button
                  onClick={() => setShowAskBox(!showAskBox)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    showAskBox
                      ? 'text-cyan-400 bg-cyan-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                  title="Ask Aegis Guardian"
                >
                  <MessageSquare size={14} />
                </button>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                  title="Minimize Guardian"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Feature Content Body */}
            {!showAskBox ? (
              <div className="mt-3 space-y-3 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20">
                    {activeFeature.badge}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {currentFeatureIdx + 1} / {FEATURE_HIGHLIGHTS.length}
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 shrink-0">
                    {activeFeature.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white leading-tight">
                      {activeFeature.title}
                    </h4>
                    <p className="text-[11px] text-cyan-300/80 font-medium mt-0.5">
                      {activeFeature.subtitle}
                    </p>
                  </div>
                </div>

                {/* Speech Bubble */}
                <div className="p-3 rounded-2xl bg-cyan-950/40 border border-cyan-500/20 text-xs text-slate-200 leading-relaxed relative">
                  <p>{activeFeature.description}</p>
                  <div className="mt-2 pt-2 border-t border-cyan-500/10 flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono">
                    <Lock size={12} className="shrink-0" />
                    <span>{activeFeature.securityNote}</span>
                  </div>
                </div>

                {/* Navigation Controls */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex gap-1">
                    {FEATURE_HIGHLIGHTS.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentFeatureIdx(idx)}
                        className={`h-1.5 rounded-full transition-all ${
                          idx === currentFeatureIdx
                            ? 'w-5 bg-cyan-400'
                            : 'w-1.5 bg-slate-700 hover:bg-slate-500'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={handlePrev}
                      className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all text-xs"
                    >
                      <ChevronLeft size={14} />
                    </button>
                    <button
                      onClick={handleNext}
                      className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-zinc-950 font-bold transition-all text-xs flex items-center gap-1 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                    >
                      <span>Next</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Quick Ask Aegis Box */
              <div className="mt-3 space-y-3 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <HelpCircle size={14} className="text-cyan-400" /> Ask AEGIS Guardian
                  </span>
                  <button
                    onClick={() => setShowAskBox(false)}
                    className="text-[10px] text-slate-400 hover:text-white underline"
                  >
                    Back to Highlights
                  </button>
                </div>

                <form onSubmit={handleAskAegis} className="space-y-2">
                  <div className="relative">
                    <input
                      type="text"
                      value={userQuery}
                      onChange={(e) => setUserQuery(e.target.value)}
                      placeholder="Ask about security, features, or Canvas sync..."
                      className="glass-input w-full rounded-xl pl-3 pr-10 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none"
                    />
                    <button
                      type="submit"
                      disabled={isThinking}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-cyan-400 hover:text-cyan-300 disabled:opacity-50"
                    >
                      <Send size={12} />
                    </button>
                  </div>
                </form>

                {isThinking && (
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-400 animate-pulse flex items-center gap-2">
                    <Bot size={14} className="text-cyan-400 animate-spin" />
                    <span>AEGIS Guardian evaluating query...</span>
                  </div>
                )}

                {aiResponse && (
                  <div className="p-3 rounded-2xl bg-cyan-950/50 border border-cyan-500/30 text-xs text-slate-200 leading-relaxed font-sans">
                    {aiResponse}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Badge Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className="pointer-events-auto px-4 py-2.5 rounded-full bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-cyan-500/40 text-white font-bold text-xs flex items-center gap-2.5 shadow-[0_10px_30px_rgba(6,182,212,0.3)] hover:border-cyan-400 transition-all group"
      >
        <div className="relative">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 flex items-center justify-center">
            <div className="w-full h-full bg-zinc-950 rounded-[6px] flex items-center justify-center text-cyan-400">
              <Shield size={12} className="group-hover:rotate-12 transition-transform" />
            </div>
          </div>
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
        </div>
        <span className="tracking-wide">AEGIS Guardian</span>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
          Guide
        </span>
      </motion.button>
    </div>
  );
};
