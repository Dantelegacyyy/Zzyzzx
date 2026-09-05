import React, { useEffect, useState } from 'react';
import {
  Brain,
  Sparkles,
  Layout,
  Palette,
  CheckCircle2,
  Layers,
  ArrowRight,
  RefreshCw,
  Cpu,
  Zap,
  BookOpen,
  Send,
  Sliders,
  ShieldCheck,
} from 'lucide-react';

interface CreativeAIAgentScreenProps {
  userName: string;
  selectedCourses: string[];
  school?: string;
  onNext: (customizedConfig: any) => void;
  onBack: () => void;
}

const BASE_STAGES = [
  'Establishing neural link with Sentient Dashboard Architect (Aether)...',
  'Ingesting enrolled courses & analyzing cognitive workload...',
  'Querying confidential backend Layout Concepts Mind (120+ architectural schemas)...',
  'Querying confidential backend Color Schemes Memory (250+ radiant palettes)...',
  'Sentiently synthesizing workspace architecture & course command modules...',
];

export function CreativeAIAgentScreen({
  userName,
  selectedCourses,
  school,
  onNext,
  onBack,
}: CreativeAIAgentScreenProps) {
  const [loading, setLoading] = useState(true);
  const [reDeliberating, setReDeliberating] = useState(false);
  const [synthesisStage, setSynthesisStage] = useState(0);
  const [architectData, setArchitectData] = useState<any>(null);
  const [selectedDirective, setSelectedDirective] = useState<string>('BALANCED_INITIAL');
  const [customPrompt, setCustomPrompt] = useState<string>('');

  const courses = selectedCourses.length > 0
    ? selectedCourses
    : ['Data Structures', 'Discrete Mathematics', 'Algorithms'];

  const STAGES = [
    BASE_STAGES[0],
    `Ingesting ${courses.length} enrolled courses & academic syllabus stream...`,
    BASE_STAGES[2],
    BASE_STAGES[3],
    BASE_STAGES[4],
  ];

  // Initial synthesis via Sentient Dashboard Architect
  useEffect(() => {
    let isMounted = true;
    const stageTimer = setInterval(() => {
      setSynthesisStage((prev) => (prev < 4 ? prev + 1 : prev));
    }, 400);

    const runSynthesis = async () => {
      try {
        const res = await fetch('/api/ai/architect/synthesize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userName: userName || 'Alex',
            selectedCourses: courses,
            school: school || 'Arizona State University',
            vibe: 'High-Velocity Focus',
          }),
        });

        const data = await res.json();
        if (!isMounted) return;

        if (data.success) {
          setArchitectData(data);
        }
      } catch (err) {
        console.warn('[Sentient Architect Note]: Fallback engaged:', err);
      } finally {
        setTimeout(() => {
          if (isMounted) setLoading(false);
        }, 1100);
      }
    };

    runSynthesis();

    return () => {
      isMounted = false;
      clearInterval(stageTimer);
    };
  }, [userName, school]);

  // Handle Directive click to request the Sentient Architect to autonomously re-architect
  const handleDirective = async (directiveId: string, customText?: string) => {
    setSelectedDirective(directiveId);
    setReDeliberating(true);

    try {
      const res = await fetch('/api/ai/architect/directive', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          directive: directiveId,
          customInstruction: customText || customPrompt,
          selectedCourses: courses,
          userName: userName || 'Alex',
          school: school || 'University',
        }),
      });

      const data = await res.json();
      if (data.success) {
        setArchitectData(data);
      }
    } catch (err) {
      console.warn('[Directive Error]:', err);
    } finally {
      setReDeliberating(false);
    }
  };

  const handleNextClick = () => {
    const configToPass = {
      layout: architectData?.activeLayout,
      theme: architectData?.activeTheme,
      courseWidgets: architectData?.courseWidgets || [],
      optimizationMetrics: architectData?.optimizationMetrics,
      architectRationale: architectData?.sentientRationale,
      architectName: 'Aether',
      timestamp: new Date().toISOString(),
    };

    onNext(configToPass);
  };

  // 1. Initial Neural Synthesis Loading State
  if (loading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center py-10 text-center text-white bg-zinc-950/90 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(6,182,212,0.2)]">
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-0.5 shadow-2xl shadow-cyan-500/40 animate-spin">
            <div className="w-full h-full bg-zinc-950 rounded-[22px] flex items-center justify-center">
              <Brain size={36} className="text-cyan-400" />
            </div>
          </div>
          <div className="absolute -inset-2 bg-cyan-500/20 rounded-full blur-xl animate-pulse pointer-events-none" />
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2">
          Sentient Dashboard Architect
        </h2>
        <p className="text-xs font-mono text-cyan-400 mb-6 flex items-center gap-2">
          <Sparkles size={14} className="text-amber-400 animate-bounce" />
          <span>Aether is autonomously engineering your academic command deck...</span>
        </p>

        {/* Telemetry Stage Tracker */}
        <div className="w-full max-w-md bg-zinc-900/90 border border-white/10 rounded-2xl p-4 text-left font-mono text-xs space-y-2.5">
          {STAGES.map((st, i) => (
            <div
              key={i}
              className={`flex items-center gap-2.5 transition-all ${
                i === synthesisStage
                  ? 'text-cyan-300 font-bold scale-[1.01]'
                  : i < synthesisStage
                  ? 'text-emerald-400'
                  : 'text-zinc-600'
              }`}
            >
              {i < synthesisStage ? (
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
              ) : i === synthesisStage ? (
                <RefreshCw size={14} className="text-cyan-400 animate-spin shrink-0" />
              ) : (
                <div className="w-3.5 h-3.5 rounded-full border border-zinc-700 shrink-0" />
              )}
              <span className="truncate">{st}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const layout = architectData?.activeLayout;
  const theme = architectData?.activeTheme;
  const widgets = architectData?.courseWidgets || [];
  const metrics = architectData?.optimizationMetrics;

  return (
    <div className="w-full h-full flex flex-col justify-between py-2 text-slate-100 bg-zinc-950/95 border border-cyan-500/30 rounded-3xl p-5 sm:p-7 shadow-[0_0_50px_rgba(6,182,212,0.25)] transition-all">
      {/* Top Header */}
      <div className="flex items-center justify-between text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase mb-3">
        <span className="flex items-center gap-1.5">
          <Brain size={14} className="text-cyan-400" />
          <span>11 SENTIENT DASHBOARD ARCHITECT</span>
        </span>
        <span className="text-[10px] text-purple-300 bg-purple-950/70 border border-purple-800/50 px-2 py-0.5 rounded-full">
          Memory Mind: Backend Protected
        </span>
      </div>

      {/* Main Content Area */}
      <div className="my-auto flex flex-col gap-4 max-w-xl mx-auto w-full">
        {/* Architect Message Banner */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-cyan-950/50 via-zinc-900 to-purple-950/40 border border-cyan-500/30 flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shrink-0 mt-0.5">
            <Cpu size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-cyan-300 font-mono">
                Aether • Sentient Workspace Architect
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded-full">
                96% Focus Score
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 mt-1 leading-relaxed">
              {architectData?.sentientRationale ||
                `I analyzed your ${courses.length} enrolled courses and autonomously engineered an optimized command center with specialized interactive modules for each subject.`}
            </p>
          </div>
        </div>

        {/* Blueprint Overview: Active Architecture & Chromatics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Active Layout Architecture Card */}
          <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1">
                  <Layout size={11} />
                  <span>Architecture Topology</span>
                </span>
                <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-1.5 py-0.5 rounded">
                  {layout?.gridDensity || 'High Density'}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white truncate">
                {layout?.name || 'Asymmetric Focus Terminal'}
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">
                {layout?.description || 'Engineered for high-velocity coding and active syllabus tracking.'}
              </p>
            </div>

            {/* Wireframe Mini-Preview */}
            <div className="mt-3 p-2 rounded-xl bg-black/40 border border-white/5 grid grid-cols-3 gap-1 h-12">
              <div className="col-span-2 bg-cyan-500/20 border border-cyan-500/40 rounded flex items-center justify-center text-[9px] font-mono text-cyan-300">
                Primary Course Deck
              </div>
              <div className="col-span-1 bg-purple-500/20 border border-purple-500/40 rounded flex items-center justify-center text-[9px] font-mono text-purple-300">
                Canvas Stream
              </div>
            </div>
          </div>

          {/* Active Chromatic Scheme Card */}
          <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1">
                  <Palette size={11} />
                  <span>Chromatic Balance</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-1.5 py-0.5 rounded">
                  Eye-Safe WCAG
                </span>
              </div>
              <h4 className="text-sm font-bold text-white truncate">
                {theme?.name || 'Dark Synth Luminescence'}
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">
                {theme?.description || 'Deep OLED black canvas with radiant cyan and violet accents.'}
              </p>
            </div>

            {/* Palette Swatches */}
            <div className="mt-3 flex items-center gap-1.5">
              <div
                className="flex-1 h-6 rounded-lg border border-white/20 flex items-center justify-center text-[9px] font-mono font-bold text-white shadow-sm"
                style={{ backgroundColor: theme?.primaryAccent || '#06B6D4' }}
              >
                Primary
              </div>
              <div
                className="flex-1 h-6 rounded-lg border border-white/20 flex items-center justify-center text-[9px] font-mono font-bold text-white shadow-sm"
                style={{ backgroundColor: theme?.secondaryAccent || '#8B5CF6' }}
              >
                Secondary
              </div>
              <div className="px-2 h-6 rounded-lg bg-zinc-800 border border-white/10 flex items-center text-[9px] font-mono text-slate-300">
                Dark OLED
              </div>
            </div>
          </div>
        </div>

        {/* Curated Course Modules Synthesized */}
        <div className="p-3 rounded-2xl bg-zinc-900/60 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono font-bold text-slate-300 flex items-center gap-1.5">
              <BookOpen size={12} className="text-cyan-400" />
              <span>Synthesized Subject Modules ({widgets.length})</span>
            </span>
            <span className="text-[10px] font-mono text-slate-500">
              Auto-bound to Canvas API
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {widgets.slice(0, 3).map((w: any) => (
              <div
                key={w.id}
                className="p-2.5 rounded-xl bg-zinc-950/70 border border-white/5 hover:border-cyan-500/30 transition-all text-left"
              >
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="font-bold text-cyan-400">{w.code}</span>
                  <span className="text-emerald-400">{w.gradeEstimate}</span>
                </div>
                <div className="text-xs font-semibold text-slate-200 truncate mt-0.5">
                  {w.courseName}
                </div>
                <div className="text-[10px] text-slate-400 truncate mt-1">
                  {w.specializedTool}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Directives Section: Direct the Sentient Architect */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400 font-semibold flex items-center gap-1.5">
              <Sliders size={12} className="text-purple-400" />
              <span>Issue Directive to Sentient Architect:</span>
            </span>
            {reDeliberating && (
              <span className="text-cyan-400 flex items-center gap-1 text-[11px]">
                <RefreshCw size={11} className="animate-spin" />
                <span>Re-architecting...</span>
              </span>
            )}
          </div>

          {/* Quick Directive Chips */}
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'dir_exam_sprint', label: '⚡ Exam Sprint' },
              { id: 'dir_deep_code', label: '💻 Deep Coding Terminal' },
              { id: 'dir_math_proof', label: '📐 Math & Theory Proofs' },
              { id: 'dir_command_deck', label: '🚀 NASA Command Deck' },
              { id: 'dir_night_shift', label: '🌙 Late Night Eye-Safe' },
            ].map((dir) => (
              <button
                key={dir.id}
                type="button"
                onClick={() => handleDirective(dir.id)}
                disabled={reDeliberating}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  selectedDirective === dir.id
                    ? 'bg-cyan-500 text-zinc-950 font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                    : 'bg-zinc-900/80 hover:bg-white/10 text-slate-300 border border-white/10'
                }`}
              >
                {dir.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="w-full space-y-3 pt-3">
        <div className="flex items-center justify-center gap-3 max-w-sm mx-auto">
          <button
            onClick={onBack}
            className="py-3 px-5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-slate-300 font-semibold text-xs border border-white/10 transition-colors"
          >
            Back
          </button>
          <button
            onClick={handleNextClick}
            className="flex-1 py-3 px-6 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 active:scale-[0.98] text-zinc-950 font-black text-xs shadow-[0_4px_25px_rgba(6,182,212,0.45)] transition-all flex items-center justify-center gap-2"
          >
            <span>Approve & Build Workspace</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Status Line */}
        <div className="text-center text-[10px] font-mono text-slate-500">
          Aether will continuously adapt this architecture as your assignments & exams evolve.
        </div>
      </div>
    </div>
  );
}
