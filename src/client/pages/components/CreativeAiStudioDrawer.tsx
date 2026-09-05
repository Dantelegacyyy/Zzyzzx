import React, { useState } from 'react';
import {
  Brain,
  X,
  Sparkles,
  Layout,
  Palette,
  RefreshCw,
  Sliders,
  Cpu,
  BookOpen,
  Send,
  Zap,
  Activity,
  CheckCircle2,
  Lock,
} from 'lucide-react';

interface SentientArchitectDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  selectedCourses: string[];
  currentLayout: any;
  currentTheme: any;
  onApplyChanges: (layout: any, theme: any, widgets?: any) => void;
}

export function CreativeAiStudioDrawer({
  isOpen,
  onClose,
  userName,
  selectedCourses,
  currentLayout,
  currentTheme,
  onApplyChanges,
}: SentientArchitectDrawerProps) {
  const [selectedDirective, setSelectedDirective] = useState<string>('dir_exam_sprint');
  const [customPrompt, setCustomPrompt] = useState('');
  const [reDeliberating, setReDeliberating] = useState(false);
  const [architectFeedback, setArchitectFeedback] = useState<string | null>(null);
  const [deliberationLogs, setDeliberationLogs] = useState<string[]>([]);

  if (!isOpen) return null;

  const courses = selectedCourses && selectedCourses.length > 0
    ? selectedCourses
    : ['Data Structures', 'Discrete Mathematics', 'Algorithms'];

  const DIRECTIVES = [
    {
      id: 'dir_exam_sprint',
      title: 'Exam Sprint Mode',
      desc: 'Maximizes upcoming deadlines, quick formulas, and active syllabus checklists.',
      badge: 'High Velocity',
    },
    {
      id: 'dir_deep_code',
      title: 'Deep Coding Terminal',
      desc: 'Expands code sandbox, compiler HUD, and data structure visualizers.',
      badge: 'Technical',
    },
    {
      id: 'dir_math_proof',
      title: 'Math & Theory Proofs',
      desc: 'Dual-pane layout with LaTeX ledger, truth table generator, and recurrence tracer.',
      badge: 'Analytical',
    },
    {
      id: 'dir_command_deck',
      title: 'NASA Command Deck',
      desc: 'Maximum density multi-pane cockpit visualizing all courses and Canvas streams simultaneously.',
      badge: 'Cockpit',
    },
    {
      id: 'dir_night_shift',
      title: 'Late Night Eye-Safe',
      desc: 'Applies deep OLED black, zero blue light, and relaxed card breathing room.',
      badge: 'Wellness',
    },
    {
      id: 'dir_zen_minimal',
      title: 'Zen Minimalist',
      desc: 'Single-stream focus layout eliminating non-essential widgets for deep reading.',
      badge: 'Focus',
    },
  ];

  const handleSendDirective = async (directiveId?: string) => {
    const activeDir = directiveId || selectedDirective;
    setReDeliberating(true);

    try {
      const res = await fetch('/api/ai/architect/directive', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          directive: activeDir,
          customInstruction: customPrompt,
          selectedCourses: courses,
          userName: userName || 'Alex',
        }),
      });

      const data = await res.json();
      if (data.success) {
        setArchitectFeedback(data.sentientRationale);
        setDeliberationLogs(data.sentientLogs || []);
        onApplyChanges(data.activeLayout, data.activeTheme, data.courseWidgets);
      }
    } catch (err) {
      console.warn('[Sentient Architect Note]: Fast update engaged', err);
    } finally {
      setReDeliberating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-lg bg-zinc-950 border-l border-cyan-500/30 text-slate-100 flex flex-col h-full shadow-[0_0_60px_rgba(6,182,212,0.3)] animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-zinc-900/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400 shadow-md">
              <Brain size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-white tracking-tight">
                  Dashboard Architect HUD
                </h3>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-full">
                  AETHER ACTIVE
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Autonomous Layout & Chromatic Management
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Backend Confidentiality Badge */}
        <div className="px-5 py-2.5 bg-purple-950/30 border-b border-purple-500/20 flex items-center justify-between text-xs text-purple-300 font-mono">
          <div className="flex items-center gap-2">
            <Lock size={12} className="text-purple-400" />
            <span>Layout & Color Memory Mind: Backend Managed</span>
          </div>
          <span className="text-[10px] text-purple-400">120+ Layouts</span>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar">
          {/* Active Topology State Card */}
          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-mono">CURRENT DEPLOYED ARCHITECTURE</span>
              <span className="text-cyan-400 font-mono font-bold">
                {currentLayout?.gridDensity || 'Dense'}
              </span>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-300 shrink-0">
                <Layout size={16} />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">
                  {currentLayout?.name || 'Asymmetric Focus Terminal'}
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  {currentLayout?.description || 'Optimized for high-throughput academic workflows.'}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
              <div className="flex items-center gap-2">
                <Palette size={13} className="text-purple-400" />
                <span className="text-slate-300 font-medium">
                  {currentTheme?.name || 'Dark Synth Luminescence'}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div
                  className="w-3.5 h-3.5 rounded-full border border-white/30"
                  style={{ backgroundColor: currentTheme?.primaryAccent || '#06B6D4' }}
                />
                <div
                  className="w-3.5 h-3.5 rounded-full border border-white/30"
                  style={{ backgroundColor: currentTheme?.secondaryAccent || '#8B5CF6' }}
                />
              </div>
            </div>
          </div>

          {/* Architect Telemetry & Rationale Feed */}
          {architectFeedback && (
            <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-cyan-300 font-mono font-bold">
                <Cpu size={14} />
                <span>Architect Deliberation Rationale:</span>
              </div>
              <p className="leading-relaxed text-slate-200 font-sans">
                {architectFeedback}
              </p>
            </div>
          )}

          {/* Directives Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Sliders size={13} className="text-purple-400" />
                <span>Issue Directive to Architect</span>
              </span>
              <span className="text-[10px] text-slate-500">Autonomous Execution</span>
            </div>

            <p className="text-xs text-slate-400">
              Select a directive or tell Aether how to optimize your dashboard. The Sentient Architect will autonomously query the backend layout and color library to recalibrate your space.
            </p>

            <div className="grid grid-cols-1 gap-2">
              {DIRECTIVES.map((d) => {
                const isSelected = selectedDirective === d.id;
                return (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => {
                      setSelectedDirective(d.id);
                      handleSendDirective(d.id);
                    }}
                    disabled={reDeliberating}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'bg-cyan-500/15 border-cyan-500/60 shadow-[0_0_20px_rgba(6,182,212,0.2)]'
                        : 'bg-zinc-900/60 border-white/10 hover:bg-zinc-900 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold ${isSelected ? 'text-cyan-300' : 'text-white'}`}>
                        {d.title}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded-full">
                        {d.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                      {d.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Instruction to Architect */}
          <div className="space-y-2">
            <label className="block text-xs font-mono text-slate-300 font-semibold">
              Custom Architectural Instruction:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="e.g. Prioritize CS 201 Data Structures AVL balancing..."
                className="flex-1 bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/60"
              />
              <button
                type="button"
                onClick={() => handleSendDirective()}
                disabled={reDeliberating}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center gap-1.5 shrink-0 disabled:opacity-50"
              >
                {reDeliberating ? (
                  <RefreshCw size={13} className="animate-spin" />
                ) : (
                  <Send size={13} />
                )}
                <span>Direct</span>
              </button>
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-white/10 bg-zinc-900/40 flex items-center justify-between">
          <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
            <Activity size={12} className="text-emerald-400" />
            <span>Continuous Adaptation: Online</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
