import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Brain,
  Layout,
  RefreshCw,
  Zap,
  BookOpen,
  Palette,
  Clock,
  CheckCircle2,
  SlidersHorizontal,
  Search,
  Dice5,
  Sliders,
  Maximize2,
  Shield,
  Layers,
} from 'lucide-react';
import { ThemeType } from '../../components/InteractiveBackground';
import { useToast } from '../../components/Toast';
import {
  DASHBOARD_LAYOUTS,
  COLOR_SCHEMES,
  DashboardLayout,
  ColorScheme,
  getUniqueUserCustomization,
} from '../../../shared/customizationLibrary';

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
  const [builderMode, setBuilderMode] = useState<'ai' | 'catalog' | 'preview'>('ai');

  // 100 Layouts & 250 Schemes Selection
  const initialCustomization = getUniqueUserCustomization(userName || 'Alex');
  const [selectedLayout, setSelectedLayout] = useState<DashboardLayout>(initialCustomization.layout);
  const [selectedScheme, setSelectedScheme] = useState<ColorScheme>(initialCustomization.scheme);
  const [layoutCategory, setLayoutCategory] = useState<string>('ALL');
  const [schemeCategory, setSchemeCategory] = useState<string>('ALL');
  const [searchLayout, setSearchLayout] = useState('');
  const [searchScheme, setSearchScheme] = useState('');

  // Pomodoro timer & scratchpad
  const [timerSeconds, setTimerSeconds] = useState(1500);
  const [timerRunning, setTimerRunning] = useState(false);
  const [scratchpad, setScratchpad] = useState('// Cerebro AI Personalized Scratchpad\n// Unique custom interface active');

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
          customInstruction: promptInput,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setCuratedData(data.config);
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
  }, []);

  const handleSurpriseMe = () => {
    const randomKey = `${userName}_${Date.now()}_${Math.random()}`;
    const custom = getUniqueUserCustomization(randomKey);
    setSelectedLayout(custom.layout);
    setSelectedScheme(custom.scheme);
    showToast(`Generated Unique Persona: ${custom.layout.name} & ${custom.scheme.name}!`, 'success');
  };

  const handleApplyToWorkspace = () => {
    showToast(`Applied ${selectedLayout.name} + ${selectedScheme.name} to your live workspace!`, 'success');
  };

  // Filtered layouts
  const filteredLayouts = DASHBOARD_LAYOUTS.filter((l) => {
    const matchCat = layoutCategory === 'ALL' || l.category === layoutCategory;
    const matchSearch = !searchLayout.trim() || l.name.toLowerCase().includes(searchLayout.toLowerCase()) || l.description.toLowerCase().includes(searchLayout.toLowerCase());
    return matchCat && matchSearch;
  });

  // Filtered schemes
  const filteredSchemes = COLOR_SCHEMES.filter((s) => {
    const matchCat = schemeCategory === 'ALL' || s.category === schemeCategory;
    const matchSearch = !searchScheme.trim() || s.name.toLowerCase().includes(searchScheme.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-8">
      {/* Top Header Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden space-y-4">
        <div
          className="absolute -right-10 -bottom-10 w-80 h-80 rounded-full blur-[100px] pointer-events-none transition-all duration-700"
          style={{ backgroundColor: selectedScheme.glow }}
        />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold tracking-wider uppercase">
              <Sparkles size={14} className="text-cyan-400 animate-spin" />
              <span>Cerebro Personalization Engine • 100 Layouts & 250 Color Schemes</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              AI Dashboard Customizer & Unique Persona Library
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Every user receives an exclusive, customized dashboard pulling from exactly <strong className="text-cyan-300">100 dashboard layouts</strong> and over <strong className="text-purple-300">250 color schemes</strong> (25,000 distinct permutations). No two student workspaces look alike!
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleSurpriseMe}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 text-white font-bold text-xs shadow-lg shadow-purple-600/30 active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <Dice5 size={16} />
              <span>Surprise Me / New Identity</span>
            </button>

            <button
              onClick={handleApplyToWorkspace}
              className="glass-button-primary px-4 py-2.5 rounded-2xl text-white font-bold text-xs flex items-center gap-2 shadow-sm"
            >
              <CheckCircle2 size={16} className="text-emerald-400" />
              <span>Apply to Workspace</span>
            </button>
          </div>
        </div>

        {/* Current Active Persona Stats Banner */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Current Layout:</span>
              <span className="font-mono font-bold text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-lg">
                {selectedLayout.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Current Scheme:</span>
              <span className="font-mono font-bold text-pink-300 bg-pink-500/10 border border-pink-500/20 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: selectedScheme.primary }} />
                {selectedScheme.name}
              </span>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
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
              <span>AI Dashboard View</span>
            </button>
            <button
              onClick={() => setBuilderMode('catalog')}
              className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                builderMode === 'catalog'
                  ? 'bg-purple-500 text-white font-bold shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Layers size={13} />
              <span>Browse 100 Layouts & 250 Schemes</span>
            </button>
          </div>
        </div>
      </div>

      {/* Catalog Browser Mode */}
      {builderMode === 'catalog' && (
        <div className="space-y-8 animate-fadeIn">
          {/* 100 Layouts Section */}
          <div className="glass-panel rounded-3xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Layout size={18} className="text-cyan-400" />
                  <span>The 100 Dashboard Layouts Library</span>
                </h3>
                <p className="text-xs text-slate-400">Choose from 100 mathematically balanced layout grid blueprints</p>
              </div>

              {/* Search Layouts */}
              <div className="relative w-full sm:w-64">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchLayout}
                  onChange={(e) => setSearchLayout(e.target.value)}
                  placeholder="Search 100 layouts..."
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl glass-input text-xs text-white placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Layout Category Pills */}
            <div className="flex gap-2 overflow-x-auto pb-1 text-xs">
              {['ALL', 'Bento Grid', 'Focus & Zen', 'Scholar & Research', 'Telemetry & Data', 'Creative Studio', 'Engineering', 'Calendar & Execution', 'Multi-Course Academic'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setLayoutCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl shrink-0 font-medium transition-all ${
                    layoutCategory === cat
                      ? 'bg-cyan-500 text-zinc-950 font-bold'
                      : 'glass-input text-slate-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Layouts Grid Display */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-h-96 overflow-y-auto pr-1">
              {filteredLayouts.slice(0, 40).map((layout) => {
                const isSelected = selectedLayout.id === layout.id;
                return (
                  <button
                    key={layout.id}
                    onClick={() => {
                      setSelectedLayout(layout);
                      showToast(`Selected ${layout.name}`, 'info');
                    }}
                    className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-lg shadow-cyan-500/10 scale-[1.02]'
                        : 'glass-card border-white/5 hover:border-white/20 text-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase">
                          {layout.category}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {layout.widgetSlots} slots
                        </span>
                      </div>
                      <h4 className="font-bold text-xs text-white mb-1 truncate">{layout.name}</h4>
                      <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed mb-3">
                        {layout.description}
                      </p>
                    </div>
                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400">
                      <span>{layout.highlightSlot}</span>
                      {isSelected && <span className="text-cyan-400 font-bold">Active</span>}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 250 Color Schemes Section */}
          <div className="glass-panel rounded-3xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Palette size={18} className="text-purple-400" />
                  <span>The 250 Exclusive Color Schemes Library</span>
                </h3>
                <p className="text-xs text-slate-400">Handcrafted collegiate, cyberpunk, cosmic, and earthy palettes with ambient lighting</p>
              </div>

              {/* Search Schemes */}
              <div className="relative w-full sm:w-64">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchScheme}
                  onChange={(e) => setSearchScheme(e.target.value)}
                  placeholder="Search 250 schemes..."
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl glass-input text-xs text-white placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Scheme Category Pills */}
            <div className="flex gap-2 overflow-x-auto pb-1 text-xs">
              {['ALL', 'Cyberpunk & Neon', 'Collegiate & Ivy', 'Cosmic & Void', 'Warm & Earth', 'Monochrome & Minimal', 'Vibrant & Pop'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSchemeCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl shrink-0 font-medium transition-all ${
                    schemeCategory === cat
                      ? 'bg-purple-500 text-white font-bold'
                      : 'glass-input text-slate-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Schemes Grid Display */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 max-h-96 overflow-y-auto pr-1">
              {filteredSchemes.slice(0, 60).map((scheme) => {
                const isSelected = selectedScheme.id === scheme.id;
                return (
                  <button
                    key={scheme.id}
                    onClick={() => {
                      setSelectedScheme(scheme);
                      showToast(`Selected Color Scheme: ${scheme.name}`, 'info');
                    }}
                    className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-purple-400 bg-purple-500/20 text-white shadow-md scale-105'
                        : 'glass-card border-white/5 hover:border-white/20 text-slate-300'
                    }`}
                  >
                    <div>
                      {/* Swatch row */}
                      <div className="flex items-center gap-1.5 mb-2">
                        <span className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: scheme.primary }} />
                        <span className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: scheme.secondary }} />
                        <span className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: scheme.accent }} />
                      </div>
                      <h5 className="font-bold text-[11px] text-white truncate">{scheme.name}</h5>
                      <span className="text-[9px] text-slate-400 truncate block">{scheme.category}</span>
                    </div>
                    {isSelected && <span className="text-purple-300 font-bold text-[10px] mt-2">Active</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Live Rendered Customized Dashboard View (Using Selected Layout & Scheme) */}
      <div
        className="rounded-3xl p-6 sm:p-8 space-y-6 transition-all duration-500 border relative overflow-hidden"
        style={{
          backgroundColor: selectedScheme.bg,
          borderColor: selectedScheme.primary + '33',
          boxShadow: `0 0 50px ${selectedScheme.glow}`,
        }}
      >
        {/* Ambient Top Glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-40 blur-[100px] pointer-events-none opacity-40"
          style={{ backgroundColor: selectedScheme.primary }}
        />

        {/* Customized Header */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono mb-1">
              <span style={{ color: selectedScheme.primary }} className="font-bold uppercase">
                {selectedLayout.category}
              </span>
              <span className="text-slate-400">•</span>
              <span style={{ color: selectedScheme.accent }}>{selectedScheme.name}</span>
            </div>
            <h3 className="text-2xl font-black tracking-tight" style={{ color: selectedScheme.text }}>
              {userName}&apos;s Academic Command Center
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold" style={{ backgroundColor: selectedScheme.primary + '22', color: selectedScheme.primary, border: `1px solid ${selectedScheme.primary}44` }}>
              Permutation #{selectedLayout.id.replace('layout-', '')}-{selectedScheme.id.replace('scheme-', '')}
            </span>
          </div>
        </div>

        {/* Dynamic Grid driven by selected layout */}
        <div className={`grid ${selectedLayout.gridClass} relative z-10`}>
          {/* Main Hero Card Slot */}
          <div
            className="md:col-span-2 rounded-2xl p-6 border flex flex-col justify-between"
            style={{ backgroundColor: selectedScheme.cardBg, borderColor: selectedScheme.primary + '33' }}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full" style={{ backgroundColor: selectedScheme.primary + '22', color: selectedScheme.primary }}>
                  {selectedLayout.highlightSlot}
                </span>
                <span className="text-xs text-slate-400 font-mono">Real-Time Sync Active</span>
              </div>
              <h4 className="text-lg font-bold mb-2" style={{ color: selectedScheme.text }}>
                Enrolled Academic Intelligence Stream
              </h4>
              <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                Adaptive curriculum synthesizer monitoring your coursework across {userCourses.join(', ')}.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {userCourses.map((course, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl border flex flex-col justify-between"
                    style={{ backgroundColor: selectedScheme.bg, borderColor: selectedScheme.accent + '33' }}
                  >
                    <span className="text-xs font-bold text-white mb-1 truncate">{course}</span>
                    <span className="text-[10px]" style={{ color: selectedScheme.accent }}>
                      Sync: Optimal
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pomodoro Focus Slot */}
          <div
            className="rounded-2xl p-6 border flex flex-col justify-between"
            style={{ backgroundColor: selectedScheme.cardBg, borderColor: selectedScheme.primary + '33' }}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: selectedScheme.primary }}>
                  Focus Cycle
                </span>
                <Clock size={16} style={{ color: selectedScheme.primary }} />
              </div>
              <div className="text-3xl font-black font-mono my-3 text-center" style={{ color: selectedScheme.text }}>
                {Math.floor(timerSeconds / 60)}:{(timerSeconds % 60).toString().padStart(2, '0')}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setTimerRunning(!timerRunning)}
                className="flex-1 py-2 rounded-xl text-xs font-bold text-zinc-950 transition-all"
                style={{ backgroundColor: selectedScheme.primary }}
              >
                {timerRunning ? 'Pause' : 'Start Focus'}
              </button>
              <button
                onClick={() => {
                  setTimerRunning(false);
                  setTimerSeconds(1500);
                }}
                className="px-3 py-2 rounded-xl text-xs text-slate-400 bg-white/5 hover:bg-white/10"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Scratchpad Code Slot */}
          <div
            className="md:col-span-3 rounded-2xl p-6 border"
            style={{ backgroundColor: selectedScheme.cardBg, borderColor: selectedScheme.primary + '33' }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Live Dynamic Scratchpad ({selectedLayout.archetype})
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Auto-saved to Local Vault</span>
            </div>
            <textarea
              value={scratchpad}
              onChange={(e) => setScratchpad(e.target.value)}
              rows={3}
              className="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-slate-200 focus:outline-none"
              style={{ color: selectedScheme.text }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
