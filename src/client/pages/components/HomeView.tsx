import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home,
  Brain,
  Search,
  Plus,
  Zap,
  FileText,
  BookOpen,
  Shield,
  Book,
  ArrowRight,
  Monitor,
  Tablet,
  Smartphone,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Sparkles,
  Wifi,
  Battery,
  ChevronRight,
  TrendingUp,
  Mic,
  Network,
  Palette,
  Layout,
  Sliders,
  CheckCircle2,
  Code2,
} from 'lucide-react';
import { CreativeAiStudioDrawer } from './CreativeAiStudioDrawer';

const DEFAULT_COURSES = [
  {
    id: 'widget_course_1',
    courseName: 'Data Structures',
    code: 'CS 201',
    credits: 4,
    priority: 'HIGH',
    specializedTool: 'Live Binary Tree Visualizer & Code Sandbox',
    nextAssignment: 'AVL Tree & Heap Balancing Implementation',
    dueText: 'Due in 2 days (11:59 PM)',
    completionPercent: 82,
    gradeEstimate: '96% (A)',
  },
  {
    id: 'widget_course_2',
    courseName: 'Discrete Mathematics',
    code: 'MATH 240',
    credits: 3,
    priority: 'HIGH',
    specializedTool: 'LaTeX Formula Sheet & Truth Table Generator',
    nextAssignment: 'Induction Proofs & Recurrence Relations',
    dueText: 'Due in 3 days',
    completionPercent: 74,
    gradeEstimate: '92% (A-)',
  },
  {
    id: 'widget_course_3',
    courseName: 'Algorithms',
    code: 'CS 310',
    credits: 4,
    priority: 'NORMAL',
    specializedTool: 'Big-O Complexity Tracer & Graph Pathfinder',
    nextAssignment: 'Dijkstra & Dynamic Programming Lab',
    dueText: 'Due Friday',
    completionPercent: 68,
    gradeEstimate: '94% (A)',
  },
];

export function HomeView({
  onOpenSearch,
  user,
  initialDashboardConfig,
}: {
  onOpenSearch?: () => void;
  user?: any;
  initialDashboardConfig?: any;
}) {
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  // AI Architect & Customization State
  const [currentLayout, setCurrentLayout] = useState<any>(
    initialDashboardConfig?.layout || {
      id: 'layout_bento_classic',
      name: 'Classic Academic Bento Grid',
      category: 'bento-grid',
      gridDensity: 'balanced',
      description: 'Balanced multi-column asymmetric layout designed for comprehensive course monitoring.',
    }
  );

  const [currentTheme, setCurrentTheme] = useState<any>(
    initialDashboardConfig?.theme || {
      id: 'theme_dark_synth',
      name: 'Dark Synth Neon',
      category: 'Dark',
      primaryAccent: '#22d3ee',
      secondaryAccent: '#a855f7',
      glowColor: '#06b6d4',
    }
  );

  const [courseWidgets, setCourseWidgets] = useState<any[]>(
    initialDashboardConfig?.courseWidgets || DEFAULT_COURSES
  );

  const [isStudioOpen, setIsStudioOpen] = useState(false);

  // Auto-set optimal zoom based on device mode for perfect proportional fitting
  const handleDeviceChange = (mode: 'desktop' | 'tablet' | 'mobile') => {
    setDeviceMode(mode);
    if (mode === 'desktop') setZoomLevel(100);
    else if (mode === 'tablet') setZoomLevel(85);
    else if (mode === 'mobile') setZoomLevel(75);
  };

  const scaleRatio = zoomLevel / 100;

  const handleApplyCustomizations = (newLayout: any, newTheme: any, newWidgets?: any) => {
    if (newLayout) setCurrentLayout(newLayout);
    if (newTheme) setCurrentTheme(newTheme);
    if (newWidgets) setCourseWidgets(newWidgets);
  };

  return (
    <div className="space-y-6">
      {/* Sizing Rendition Control Bar & AI Customization Trigger */}
      <div className="glass-panel rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 border border-cyan-500/20 shadow-lg shadow-cyan-950/20">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shadow-md transition-all"
            style={{
              backgroundColor: `${currentTheme.primaryAccent}20`,
              border: `1px solid ${currentTheme.primaryAccent}40`,
              color: currentTheme.primaryAccent,
            }}
          >
            <Brain size={18} className="animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Nova Creative AI • Customized Dashboard
              </span>
              <span
                className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase"
                style={{
                  backgroundColor: `${currentTheme.primaryAccent}25`,
                  color: currentTheme.primaryAccent,
                }}
              >
                {currentLayout.category}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 flex items-center gap-2">
              <span>Theme: <strong className="text-white">{currentTheme.name}</strong></span>
              <span>•</span>
              <span>Layout: <strong className="text-white">{currentLayout.name}</strong></span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* AI Architect Studio Button */}
          <button
            onClick={() => setIsStudioOpen(true)}
            className="py-2 px-3.5 rounded-xl font-bold text-xs text-white shadow-md transition-all flex items-center gap-1.5 hover:scale-105 cursor-pointer"
            style={{
              background: `linear-gradient(135deg, ${currentTheme.primaryAccent}dd, ${currentTheme.secondaryAccent || '#3b82f6'}dd)`,
              boxShadow: `0 4px 18px ${currentTheme.primaryAccent}40`,
            }}
            title="Open AI Studio to customize layout concept and color scheme"
          >
            <Sparkles size={14} />
            <span>Customize with AI</span>
          </button>

          {/* Device Switcher Pills */}
          <div className="flex glass-input p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => handleDeviceChange('desktop')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                deviceMode === 'desktop'
                  ? 'bg-cyan-500 text-zinc-950 font-bold shadow-md shadow-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Desktop View (100% Proportional)"
            >
              <Monitor size={14} />
              <span className="hidden sm:inline">Desktop</span>
            </button>
            <button
              onClick={() => handleDeviceChange('tablet')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                deviceMode === 'tablet'
                  ? 'bg-cyan-500 text-zinc-950 font-bold shadow-md shadow-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="iPad Pro Tablet Frame (768px)"
            >
              <Tablet size={14} />
              <span className="hidden sm:inline">Tablet</span>
            </button>
            <button
              onClick={() => handleDeviceChange('mobile')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                deviceMode === 'mobile'
                  ? 'bg-cyan-500 text-zinc-950 font-bold shadow-md shadow-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="iPhone Mobile Frame (390px)"
            >
              <Smartphone size={14} />
              <span className="hidden sm:inline">Mobile</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sizing Stage Container */}
      <div className="w-full flex justify-center items-start overflow-x-auto py-2">
        {deviceMode === 'desktop' ? (
          <div
            className="w-full transition-all duration-300"
            style={{
              transform: `scale(${scaleRatio})`,
              transformOrigin: 'top center',
            }}
          >
            <HomeDashboardContent
              onOpenSearch={onOpenSearch}
              user={user}
              currentLayout={currentLayout}
              currentTheme={currentTheme}
              courseWidgets={courseWidgets}
              onOpenStudio={() => setIsStudioOpen(true)}
            />
          </div>
        ) : deviceMode === 'tablet' ? (
          /* Tablet iPad Device Frame */
          <div className="flex flex-col items-center">
            <div className="text-[11px] font-mono text-cyan-400 mb-2 flex items-center gap-1.5">
              <span>iPad Pro Tablet Frame (768px)</span>
              <span className="text-slate-500">• Relative Focus Scaled</span>
            </div>
            <div
              className="w-[768px] rounded-[36px] bg-zinc-950 border-[10px] border-zinc-800 shadow-[0_25px_80px_rgba(0,0,0,0.85)] overflow-hidden transition-all duration-300"
              style={{
                transform: `scale(${scaleRatio})`,
                transformOrigin: 'top center',
              }}
            >
              <div className="h-7 bg-zinc-900/90 px-6 flex items-center justify-between text-[11px] text-slate-400 font-mono select-none">
                <span>9:41 AM</span>
                <div className="flex items-center gap-2">
                  <Wifi size={12} />
                  <Battery size={13} />
                </div>
              </div>
              <div className="p-6 max-h-[880px] overflow-y-auto custom-scrollbar">
                <HomeDashboardContent
                  isCompact={true}
                  onOpenSearch={onOpenSearch}
                  user={user}
                  currentLayout={currentLayout}
                  currentTheme={currentTheme}
                  courseWidgets={courseWidgets}
                  onOpenStudio={() => setIsStudioOpen(true)}
                />
              </div>
            </div>
          </div>
        ) : (
          /* Mobile Phone iPhone Device Frame */
          <div className="flex flex-col items-center">
            <div className="text-[11px] font-mono text-cyan-400 mb-2 flex items-center gap-1.5">
              <span>iPhone 15 Frame (390px)</span>
              <span className="text-slate-500">• Proportional Zoom</span>
            </div>
            <div
              className="w-[390px] rounded-[48px] bg-zinc-950 border-[10px] border-zinc-800 shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden transition-all duration-300"
              style={{
                transform: `scale(${scaleRatio})`,
                transformOrigin: 'top center',
              }}
            >
              <div className="h-10 bg-zinc-900/90 px-6 flex items-center justify-between text-[11px] text-slate-300 font-mono select-none relative">
                <span className="font-semibold">9:41</span>
                <div className="w-24 h-5 bg-black rounded-full absolute left-1/2 -translate-x-1/2 top-2 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-900 ml-auto mr-2" />
                </div>
                <div className="flex items-center gap-1.5">
                  <Wifi size={12} />
                  <Battery size={13} />
                </div>
              </div>
              <div className="p-4 max-h-[760px] overflow-y-auto custom-scrollbar">
                <HomeDashboardContent
                  isCompact={true}
                  isMobile={true}
                  onOpenSearch={onOpenSearch}
                  user={user}
                  currentLayout={currentLayout}
                  currentTheme={currentTheme}
                  courseWidgets={courseWidgets}
                  onOpenStudio={() => setIsStudioOpen(true)}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* AI Studio Drawer */}
      <CreativeAiStudioDrawer
        isOpen={isStudioOpen}
        onClose={() => setIsStudioOpen(false)}
        userName={user?.name || 'Alex'}
        selectedCourses={courseWidgets.map((cw) => cw.courseName)}
        currentLayout={currentLayout}
        currentTheme={currentTheme}
        onApplyChanges={handleApplyCustomizations}
      />
    </div>
  );
}

// Inner Home Dashboard Content (dynamically adapted to current layout and theme)
function HomeDashboardContent({
  isCompact = false,
  isMobile = false,
  onOpenSearch,
  user,
  currentLayout,
  currentTheme,
  courseWidgets,
  onOpenStudio,
}: {
  isCompact?: boolean;
  isMobile?: boolean;
  onOpenSearch?: () => void;
  user?: any;
  currentLayout: any;
  currentTheme: any;
  courseWidgets: any[];
  onOpenStudio: () => void;
}) {
  const navigate = useNavigate();
  const userName = user?.name || 'Alex';

  return (
    <div className="space-y-6 w-full text-slate-100">
      {/* Hero Glass Section with Creative AI Glow Accent */}
      <section
        className="glass-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden transition-all duration-300"
        style={{
          borderColor: `${currentTheme.primaryAccent}33`,
          boxShadow: `0 10px 40px ${currentTheme.primaryAccent}15`,
        }}
      >
        {/* Luminous accents */}
        <div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-[100px] pointer-events-none opacity-40"
          style={{ backgroundColor: currentTheme.primaryAccent }}
        />
        <div
          className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full blur-[100px] pointer-events-none opacity-30"
          style={{ backgroundColor: currentTheme.secondaryAccent || '#8b5cf6' }}
        />

        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold"
              style={{
                backgroundColor: `${currentTheme.primaryAccent}20`,
                border: `1px solid ${currentTheme.primaryAccent}40`,
                color: currentTheme.primaryAccent,
              }}
            >
              <Sparkles size={14} className="animate-pulse" />
              <span>Optimized by Nova • {currentLayout.name}</span>
            </div>

            <button
              onClick={onOpenStudio}
              className="text-xs font-mono font-bold hover:underline transition-all flex items-center gap-1.5"
              style={{ color: currentTheme.primaryAccent }}
            >
              <span>Switch Concept ({currentLayout.category})</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl sm:text-4xl'} font-extrabold text-white mb-2 tracking-tight`}>
            Good morning, {userName}.
          </h2>
          <p className="text-slate-300 mb-6 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Your workspace is customized for your enrolled courses with active Canvas LMS synchronization, Cloud SQL, and AEGIS Sentinel.
          </p>

          <div className={`flex ${isMobile ? 'flex-col' : 'flex-col sm:flex-row'} gap-3 max-w-2xl mb-6`}>
            <div
              onClick={onOpenSearch}
              className="flex-1 relative cursor-pointer group"
            >
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform"
                size={16}
                style={{ color: currentTheme.primaryAccent }}
              />
              <input
                type="text"
                readOnly
                placeholder="Ask Cerebro or search course materials... (Press ⌘K)"
                onClick={onOpenSearch}
                className="glass-input w-full rounded-xl pl-10 pr-4 py-2.5 text-slate-100 text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none cursor-pointer"
              />
            </div>
            <button
              onClick={onOpenSearch}
              className="px-5 py-2.5 rounded-xl text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shrink-0 transition-all cursor-pointer"
              style={{
                background: `linear-gradient(135deg, ${currentTheme.primaryAccent}, ${currentTheme.secondaryAccent || '#3b82f6'})`,
                boxShadow: `0 4px 15px ${currentTheme.primaryAccent}30`,
              }}
            >
              <Search size={16} />
              <span>Smart Search</span>
            </button>
          </div>

          {/* Quick Navigation Pills */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => navigate('/knowledge-graph')}
              className="glass-pill hover:border-cyan-500/40 text-cyan-300 hover:text-white py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5"
            >
              <Network size={13} className="text-cyan-400" /> Knowledge Graph
            </button>
            <button
              onClick={() => navigate('/progress-charts')}
              className="glass-pill hover:border-emerald-500/40 text-emerald-300 hover:text-white py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5"
            >
              <TrendingUp size={13} className="text-emerald-400" /> Progress Charts
            </button>
            <button
              onClick={() => navigate('/voice-notes')}
              className="glass-pill hover:border-rose-500/40 text-rose-300 hover:text-white py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5"
            >
              <Mic size={13} className="text-rose-400" /> Voice Notes
            </button>
            <button
              onClick={() => navigate('/notes')}
              className="glass-pill hover:border-cyan-500/40 text-slate-200 hover:text-white py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5"
            >
              <FileText size={13} className="text-cyan-400" /> Notes Vault
            </button>
          </div>
        </div>
      </section>

      {/* DYNAMIC COURSE MODULES SECTION (Customized by Creative AI Agent) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen size={16} style={{ color: currentTheme.primaryAccent }} />
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-200">
              Active Enrolled Course Command Modules ({courseWidgets.length})
            </h3>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 font-semibold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Canvas Synced
          </span>
        </div>

        {/* Dynamic Multi-Course Cards Grid */}
        <div className={`grid ${isMobile ? 'grid-cols-1' : isCompact ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'} gap-4`}>
          {courseWidgets.map((course: any, idx: number) => (
            <div
              key={course.id || idx}
              className="glass-card rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-3 relative overflow-hidden group hover:scale-[1.01] transition-all"
              style={{
                borderColor: `${currentTheme.primaryAccent}25`,
              }}
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span
                    className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md"
                    style={{
                      backgroundColor: `${currentTheme.primaryAccent}20`,
                      color: currentTheme.primaryAccent,
                    }}
                  >
                    {course.code}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
                    {course.gradeEstimate || '95% (A)'}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {course.courseName}
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-2">
                  {course.specializedTool}
                </p>
              </div>

              {/* Progress & Next Task */}
              <div className="space-y-2 pt-2 border-t border-white/5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 truncate max-w-[170px]">{course.nextAssignment}</span>
                  <span className="text-amber-400 font-mono text-[10px] shrink-0 font-semibold">{course.dueText}</span>
                </div>
                <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${course.completionPercent || 75}%`,
                      backgroundColor: currentTheme.primaryAccent,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Academic Intelligence Portal & Security Section */}
      <div className={`grid ${isMobile ? 'grid-cols-1' : isCompact ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'} gap-6`}>
        {/* AEGIS Status Logging Glass Card */}
        <section className={isCompact ? 'w-full' : 'md:col-span-1'}>
          <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
            <Shield size={16} className="text-cyan-400" /> AEGIS Security Status
          </h3>
          <div className="glass-card rounded-2xl p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs text-slate-400 font-medium">System Integrity</span>
              <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                100% VERIFIED
              </span>
            </div>
            <div className="space-y-2.5">
              <div className="flex items-start gap-3 text-xs">
                <div className="w-2 h-2 mt-1 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)] shrink-0" />
                <div className="flex-1">
                  <p className="text-slate-200 font-semibold">Cloud SQL (PostgreSQL)</p>
                  <p className="text-[10px] text-slate-400">Instance active in us-west2</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-xs">
                <div className="w-2 h-2 mt-1 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] shrink-0" />
                <div className="flex-1">
                  <p className="text-slate-200 font-semibold">Firebase Auth & Tokens</p>
                  <p className="text-[10px] text-slate-400">OAuth & Admin SDK verified</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-xs">
                <div className="w-2 h-2 mt-1 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)] shrink-0" />
                <div className="flex-1">
                  <p className="text-slate-200 font-semibold">Creative AI Agent Engine</p>
                  <p className="text-[10px] text-slate-400">Nova Architect live</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Academic Intelligence Portals */}
        <section className={isCompact ? 'w-full' : 'md:col-span-2'}>
          <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
            <Sparkles size={16} className="text-cyan-400" /> Academic Intelligence Portals
          </h3>
          <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'} gap-3.5`}>
            <div
              onClick={() => navigate('/knowledge-graph')}
              className="glass-card rounded-2xl p-4 sm:p-5 group cursor-pointer hover:border-cyan-500/40 transition-all"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="p-1 rounded-lg bg-cyan-500/10 text-cyan-400"><Network size={16} /></span>
                <span className="text-[10px] font-mono text-cyan-400">P3-15</span>
              </div>
              <h4 className="text-slate-100 font-semibold text-xs sm:text-sm mb-1 group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                <span>Knowledge Graph</span>
                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Interactive synaptic concept mapping and prerequisite mastery trees.
              </p>
            </div>

            <div
              onClick={() => navigate('/progress-charts')}
              className="glass-card rounded-2xl p-4 sm:p-5 group cursor-pointer hover:border-emerald-500/40 transition-all"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="p-1 rounded-lg bg-emerald-500/10 text-emerald-400"><TrendingUp size={16} /></span>
                <span className="text-[10px] font-mono text-emerald-400">P3-33</span>
              </div>
              <h4 className="text-slate-100 font-semibold text-xs sm:text-sm mb-1 group-hover:text-emerald-300 transition-colors flex items-center justify-between">
                <span>Progress & Velocity Charts</span>
                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-emerald-400" />
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Track weekly study hours, course retention curves, and milestone pacing.
              </p>
            </div>

            <div
              onClick={() => navigate('/voice-notes')}
              className="glass-card rounded-2xl p-4 sm:p-5 group cursor-pointer hover:border-rose-500/40 transition-all"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="p-1 rounded-lg bg-rose-500/10 text-rose-400"><Mic size={16} /></span>
                <span className="text-[10px] font-mono text-rose-400">P3-17</span>
              </div>
              <h4 className="text-slate-100 font-semibold text-xs sm:text-sm mb-1 group-hover:text-rose-300 transition-colors flex items-center justify-between">
                <span>Voice Notes Recording Studio</span>
                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-rose-400" />
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Record audio, visualize waveforms, and auto-transcribe lecture insights.
              </p>
            </div>

            <div
              onClick={() => navigate('/startup-walkthrough')}
              className="glass-card rounded-2xl p-4 sm:p-5 group cursor-pointer hover:border-purple-500/40 transition-all"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="p-1 rounded-lg bg-purple-500/10 text-purple-400"><Sparkles size={16} /></span>
                <span className="text-[10px] font-mono text-purple-400">Walkthrough</span>
              </div>
              <h4 className="text-slate-100 font-semibold text-xs sm:text-sm mb-1 group-hover:text-purple-300 transition-colors flex items-center justify-between">
                <span>12-Screen Artwork Walkthrough</span>
                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-purple-400" />
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Explore the complete original conceptual artwork flow and screen stages.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
