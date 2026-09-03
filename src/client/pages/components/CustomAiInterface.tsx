import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Brain,
  Layout,
  CheckSquare,
  Code,
  Cpu,
  RefreshCw,
  Zap,
  ArrowRight,
  BookOpen,
  Layers,
  Palette,
  Plus,
  Trash2,
  Clock,
  CheckCircle2,
  Sliders,
  Eye,
  SlidersHorizontal,
} from 'lucide-react';
import { DashboardTour } from '../../components/DashboardTour';
import { ThemeType } from '../../components/InteractiveBackground';
import { useToast } from '../../components/Toast';

export function CustomAiInterface({
  userCourses = ['Data Structures', 'Discrete Mathematics', 'Algorithms'],
  userName = 'Alex',
  visualStyle = 'Dark Synth',
  onThemeChange,
}: {
  userCourses?: string[];
  userName?: string;
  visualStyle?: string;
  onThemeChange?: (theme: ThemeType) => void;
}) {
  const [curatedData, setCuratedData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [promptInput, setPromptInput] = useState<string>('');
  const [vibe, setVibe] = useState<string>('Focus');
  const [builderMode, setBuilderMode] = useState<'ai' | 'manual'>('ai');
  const [selectedScheme, setSelectedScheme] = useState<ThemeType>('cyan');
  const [selectedLayout, setSelectedLayout] = useState<string>('bento');
  const [widgets, setWidgets] = useState<any[]>([]);

  // Focus Pomodoro Timer Widget State
  const [timerSeconds, setTimerSeconds] = useState(1500);
  const [timerRunning, setTimerRunning] = useState(false);

  // Scratchpad Widget State
  const [scratchpad, setScratchpad] = useState('// Cerebro AI Quick Scratchpad\n// Write notes or code snippets here...');

  const { showToast } = useToast();

  useEffect(() => {
    let interval: any = null;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => setTimerSeconds((s) => s - 1), 1000);
    } else if (timerSeconds === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  const fetchCuratedDashboard = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/ai/curate-dashboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: userName,
          courses: userCourses,
          visualStyle,
          vibe,
          customInstruction: promptInput,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setCuratedData(data.config);
        if (data.config?.widgets) {
          setWidgets(data.config.widgets);
        }
      }
    } catch (err) {
      console.error('Failed to curate AI dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCuratedDashboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vibe]);

  const handleApplyTheme = (theme: ThemeType) => {
    setSelectedScheme(theme);
    if (onThemeChange) {
      onThemeChange(theme);
    }
    showToast(`Applied ${theme.toUpperCase()} Color Scheme!`, 'info');
  };

  const addCustomWidget = (type: string) => {
    const newW = {
      id: `w_custom_${Date.now()}`,
      title: type === 'timer' ? 'Focus Alpha Wave Timer' : type === 'code' ? 'Code & Syntax Debugger' : 'Canvas Deadline Radar',
      type: type.toUpperCase(),
      description: 'Custom dynamic widget added by user.',
    };
    setWidgets((prev) => [newW, ...prev]);
    showToast('Dynamic widget added to your layout!', 'success');
  };

  const removeWidget = (id: string) => {
    setWidgets((prev) => prev.filter((w) => w.id !== id));
    showToast('Widget removed', 'info');
  };

  return (
    <div className="space-y-8">
      {/* AI Curation Header */}
      <div
        data-tour="curation-header"
        className="glass-panel rounded-3xl p-6 relative overflow-hidden space-y-4"
      >
        <div className="absolute -right-8 -bottom-8 w-64 h-64 bg-cyan-500/15 rounded-full blur-[90px] pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold tracking-wider uppercase">
              <Sparkles size={14} className="text-cyan-400 animate-spin" />
              <span>Gemini 2.5 Autonomous AI Architect</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              AI Workspace Curation & Customizer
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed">
              Let the AI Architect autonomously decide your layout and unique color scheme based on enrolled subjects ({userCourses.join(', ')}), or customize it yourself!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <DashboardTour />

            {/* AI Decision vs Manual Customizer Toggle */}
            <div className="flex glass-input p-1 rounded-2xl text-xs font-semibold">
              <button
                onClick={() => setBuilderMode('ai')}
                className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                  builderMode === 'ai'
                    ? 'bg-cyan-500 text-zinc-950 font-bold shadow-[0_0_15px_rgba(34,211,238,0.4)]'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Brain size={13} />
                <span>AI Architect</span>
              </button>
              <button
                onClick={() => setBuilderMode('manual')}
                className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                  builderMode === 'manual'
                    ? 'bg-cyan-500 text-zinc-950 font-bold shadow-[0_0_15px_rgba(34,211,238,0.4)]'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <SlidersHorizontal size={13} />
                <span>Manual Studio</span>
              </button>
            </div>

            <button
              onClick={fetchCuratedDashboard}
              disabled={loading}
              className="glass-button-primary px-4 py-2.5 text-white font-semibold text-xs rounded-2xl transition-all flex items-center gap-2"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              <span>Re-Synthesize</span>
            </button>
          </div>
        </div>

        {/* Color Scheme & Layout Customizer Panel */}
        {builderMode === 'manual' && (
          <div className="pt-4 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 animate-fadeIn">
            {/* Color Scheme Picker */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <Palette size={14} className="text-cyan-400" />
                <span>Select Unique Color Scheme</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'cyan', label: 'Cyber Cyan', color: 'bg-cyan-400' },
                  { id: 'emerald', label: 'Emerald Academic', color: 'bg-emerald-400' },
                  { id: 'amethyst', label: 'Royal Amethyst', color: 'bg-purple-400' },
                  { id: 'gold', label: 'Solar Cyber Gold', color: 'bg-amber-400' },
                  { id: 'oled', label: 'Midnight OLED', color: 'bg-slate-300' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleApplyTheme(s.id as ThemeType)}
                    className={`p-2.5 rounded-2xl border text-xs font-bold flex items-center gap-2 transition-all ${
                      selectedScheme === s.id
                        ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-md'
                        : 'glass-input text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className={`w-3 h-3 rounded-full ${s.color} shrink-0`} />
                    <span className="truncate">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Layout Grid Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <Layout size={14} className="text-blue-400" />
                <span>Select Layout Grid Mapping</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'bento', label: 'Dynamic Bento Grid' },
                  { id: 'master', label: 'Master 3-Column' },
                  { id: 'minimal', label: 'Minimalist Focus' },
                  { id: 'modular', label: 'Modular Flow' },
                ].map((l) => (
                  <button
                    key={l.id}
                    onClick={() => {
                      setSelectedLayout(l.id);
                      showToast(`Switched layout to ${l.label}!`, 'info');
                    }}
                    className={`p-2.5 rounded-2xl border text-xs font-bold transition-all ${
                      selectedLayout === l.id
                        ? 'bg-blue-500/20 border-blue-400 text-white'
                        : 'glass-input text-slate-400 hover:text-white'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Dynamic Widgets Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 glass-panel p-4 rounded-2xl">
        <div className="flex items-center gap-2">
          <Sliders size={16} className="text-cyan-400" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">Dynamic Widgets Controls:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => addCustomWidget('timer')}
            className="glass-pill px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-200 hover:text-white flex items-center gap-1.5"
          >
            <Plus size={13} className="text-amber-400" /> + Focus Timer Widget
          </button>
          <button
            onClick={() => addCustomWidget('code')}
            className="glass-pill px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-200 hover:text-white flex items-center gap-1.5"
          >
            <Plus size={13} className="text-cyan-400" /> + Code Scratchpad Widget
          </button>
        </div>
      </div>

      {/* Live Output & Widgets Area */}
      {loading ? (
        <div className="glass-panel rounded-3xl p-12 text-center flex flex-col items-center justify-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin" />
            <Brain size={24} className="text-cyan-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="text-slate-200 font-medium text-xs sm:text-sm animate-pulse">
            Gemini AI Architect is mapping your layout grid & color palette...
          </p>
        </div>
      ) : curatedData ? (
        <div className="space-y-6">
          {/* Greeting Banner & Selected Design Concept */}
          <div className="glass-card rounded-3xl p-6 shadow-xl relative overflow-hidden space-y-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-cyan-500/10 rounded-2xl border border-cyan-500/20 text-cyan-400">
                <Brain size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">{curatedData.greeting}</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">{curatedData.academicFocus}</p>
              </div>
            </div>

            {/* Design Library Pulled Concepts */}
            <div data-tour="design-concepts" className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
              {curatedData.selectedLayoutConcept && (
                <div className="p-3.5 glass-input rounded-2xl flex items-center justify-between text-xs">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">
                      Pulled From 100+ Layout Library
                    </div>
                    <div className="font-bold text-white mt-0.5">{curatedData.selectedLayoutConcept.name}</div>
                    <div className="text-slate-400 text-[11px] truncate max-w-xs">{curatedData.selectedLayoutConcept.description}</div>
                  </div>
                  <span className="px-2.5 py-1 bg-cyan-500/15 text-cyan-300 rounded-full font-mono text-[10px] border border-cyan-500/30">
                    {curatedData.selectedLayoutConcept.category}
                  </span>
                </div>
              )}

              {curatedData.selectedColorScheme && (
                <div className="p-3.5 glass-input rounded-2xl flex items-center justify-between text-xs">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-purple-400 tracking-wider">
                      Pulled From 250+ Color Schemes Library
                    </div>
                    <div className="font-bold text-white mt-0.5">{curatedData.selectedColorScheme.name}</div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: curatedData.selectedColorScheme.primaryAccent }} />
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: curatedData.selectedColorScheme.secondaryAccent }} />
                      <span className="text-[10px] text-slate-400">{curatedData.selectedColorScheme.category}</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 bg-purple-500/15 text-purple-300 rounded-full font-mono text-[10px] border border-purple-500/30">
                    250+ Palette Pool
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Dynamic Interactive Widgets Grid */}
          <div
            data-tour="curated-widgets"
            className={`grid gap-6 ${
              selectedLayout === 'master'
                ? 'grid-cols-1 lg:grid-cols-3'
                : selectedLayout === 'minimal'
                ? 'grid-cols-1 md:grid-cols-2'
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            }`}
          >
            {/* Interactive Focus Timer Widget */}
            <div className="glass-card rounded-2xl p-6 relative group border-cyan-500/30">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider bg-amber-500/15 border border-amber-500/30 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Clock size={12} /> Focus Alpha Waves
                </span>
                <span className="text-[10px] text-slate-400">Interactive</span>
              </div>
              <h4 className="text-base font-bold text-white mb-2">Deep Study Pomodoro</h4>
              <div className="py-4 text-center bg-black/40 rounded-2xl border border-white/10 my-3">
                <div className="text-3xl font-mono font-bold text-cyan-300 tracking-wider">
                  {Math.floor(timerSeconds / 60)}:{('0' + (timerSeconds % 60)).slice(-2)}
                </div>
                <p className="text-[10px] text-slate-400 mt-1">Target: Discrete Mathematics Study</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setTimerRunning(!timerRunning)}
                  className="flex-1 py-2 glass-button-primary rounded-xl text-xs font-bold text-white"
                >
                  {timerRunning ? 'Pause' : 'Start Focus'}
                </button>
                <button
                  onClick={() => {
                    setTimerSeconds(1500);
                    setTimerRunning(false);
                  }}
                  className="px-3 py-2 glass-pill rounded-xl text-xs font-bold text-slate-300"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Interactive Scratchpad Widget */}
            <div className="glass-card rounded-2xl p-6 relative group border-blue-500/30">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider bg-cyan-500/15 border border-cyan-500/30 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Code size={12} /> AI Code Pad
                </span>
                <span className="text-[10px] text-slate-400">Editable</span>
              </div>
              <h4 className="text-base font-bold text-white mb-2">Smart Notes & Code</h4>
              <textarea
                value={scratchpad}
                onChange={(e) => setScratchpad(e.target.value)}
                rows={4}
                className="w-full glass-input rounded-xl p-3 font-mono text-xs text-slate-200 focus:outline-none resize-none my-2"
              />
            </div>

            {/* AI Curated Widgets */}
            {widgets.map((widget: any) => (
              <div
                key={widget.id}
                className="glass-card rounded-2xl p-6 transition-all flex flex-col justify-between group relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider bg-cyan-500/15 border border-cyan-500/30 px-2.5 py-1 rounded-full">
                      {widget.type}
                    </span>
                    <button
                      onClick={() => removeWidget(widget.id)}
                      className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                      title="Remove Widget"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <h4 className="text-base font-bold text-white mb-2 tracking-tight">{widget.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{widget.description}</p>

                  {widget.items && Array.isArray(widget.items) && (
                    <div className="space-y-2 mt-3">
                      {widget.items.map((item: any, idx: number) => (
                        <div
                          key={idx}
                          className="p-2.5 glass-input rounded-xl text-xs text-slate-200 flex items-center justify-between"
                        >
                          <span className="font-medium">{typeof item === 'string' ? item : item.title}</span>
                          {item.priority && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30">
                              {item.priority}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-cyan-400 font-semibold">
                  <span>Open AI Assistant</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

          {/* AI Focus Areas Section */}
          {curatedData.focusAreas && Array.isArray(curatedData.focusAreas) && (
            <div className="glass-panel rounded-3xl p-6">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4 flex items-center gap-2">
                <BookOpen size={16} className="text-cyan-400" />
                <span>AI Course Focus Areas & Target Topics</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {curatedData.focusAreas.map((area: any, idx: number) => (
                  <div key={idx} className="p-4 glass-card rounded-2xl flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-white text-sm">{area.courseName}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            area.priorityLevel === 'CRITICAL'
                              ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                              : area.priorityLevel === 'HIGH'
                              ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                              : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                          }`}
                        >
                          {area.priorityLevel}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mb-3">{area.weeklyHours} hrs/week recommended</div>
                      <div className="space-y-1.5 mb-3">
                        {area.keyTopics?.map((topic: string, tIdx: number) => (
                          <div key={tIdx} className="text-xs text-slate-300 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                            <span>{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
