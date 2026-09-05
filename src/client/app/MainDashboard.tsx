import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CoursesView } from '../pages/components/CoursesView';
import { NotesView } from '../pages/components/NotesView';
import { SettingsView } from '../pages/components/SettingsView';
import { DbHealthDashboard } from '../pages/components/DbHealthDashboard';
import { ApiLogsView } from '../pages/components/ApiLogsView';
import { CustomAiInterface } from '../pages/components/CustomAiInterface';
import { AegisSecurityDashboard } from '../pages/components/AegisSecurityDashboard';
import { HomeView } from '../pages/components/HomeView';
import { KnowledgeGraphView } from '../pages/components/KnowledgeGraphView';
import { ProgressChartsView } from '../pages/components/ProgressChartsView';
import { VoiceNotesView } from '../pages/components/VoiceNotesView';
import { SmartSearchModal } from '../pages/components/SmartSearchModal';
import { ToastProvider } from '../components/Toast';
import { InteractiveBackground, ThemeType } from '../components/InteractiveBackground';
import { HealthDiagnosticsModal } from '../components/HealthDiagnosticsModal';
import {
  Home,
  BookOpen,
  FileText,
  Settings,
  Search,
  Plus,
  Shield,
  Zap,
  Book,
  ArrowRight,
  Brain,
  Activity,
  Database,
  Layers,
  UserCheck,
  Code2,
  Sparkles,
  Network,
  TrendingUp,
  Mic,
  Play,
  LogOut,
} from 'lucide-react';

const Aperture = () => (
  <div className="min-h-screen bg-[#030712] flex flex-col items-center justify-center relative overflow-hidden">
    <div className="absolute inset-0 bg-cyan-900/10 blur-[100px] rounded-full w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    <div className="relative z-10 flex flex-col items-center">
      <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin mb-8" />
      <h1 className="text-3xl font-bold tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
        CEREBRO
      </h1>
      <p className="text-xs font-mono text-slate-400 mt-2">Loading Academic Intelligence Engine...</p>
    </div>
  </div>
);


interface MainDashboardProps {
  user?: any;
  onSignOut?: () => void;
  initialDashboardConfig?: any;
}

const AppNavigation = ({ user, onSignOut, initialDashboardConfig }: MainDashboardProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Mode state: Student View vs Developer/Admin Mode
  const [viewMode, setViewMode] = useState<'student' | 'creator'>('student');
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('cyan');
  const [showDiagnostics, setShowDiagnostics] = useState<boolean>(false);
  const [showSmartSearch, setShowSmartSearch] = useState<boolean>(false);

  // Global hotkey: Cmd+K / Ctrl+K opens Smart Search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowSmartSearch((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const allNavItems = [
    { id: 'home', label: 'Home', path: '/', icon: <Home size={20} />, role: 'all' },
    {
      id: 'ai-curation',
      label: 'AI Dashboard',
      path: '/ai-curation',
      icon: <Brain size={20} />,
      role: 'all',
    },
    {
      id: 'knowledge-graph',
      label: 'Knowledge Graph',
      path: '/knowledge-graph',
      icon: <Network size={20} />,
      role: 'all',
    },
    {
      id: 'progress-charts',
      label: 'Progress Charts',
      path: '/progress-charts',
      icon: <TrendingUp size={20} />,
      role: 'all',
    },
    {
      id: 'voice-notes',
      label: 'Voice Notes',
      path: '/voice-notes',
      icon: <Mic size={20} />,
      role: 'all',
    },
    {
      id: 'courses',
      label: 'Courses',
      path: '/courses',
      icon: <BookOpen size={20} />,
      role: 'all',
    },
    {
      id: 'notes',
      label: 'Notes',
      path: '/notes',
      icon: <FileText size={20} />,
      role: 'all',
    },
    {
      id: 'aegis-security',
      label: 'AEGIS Security & Audit',
      path: '/aegis-security',
      icon: <Shield size={20} />,
      role: 'creator',
    },
    {
      id: 'db-health',
      label: 'Database Health',
      path: '/db-health',
      icon: <Database size={20} />,
      role: 'creator',
    },
    {
      id: 'api-logs',
      label: 'API Connection Logs',
      path: '/api-logs',
      icon: <Activity size={20} />,
      role: 'creator',
    },
    {
      id: 'settings',
      label: 'Settings',
      path: '/settings',
      icon: <Settings size={20} />,
      role: 'all',
    },
  ];

  const visibleNavItems = allNavItems.filter(
    (item) => viewMode === 'creator' || item.role === 'all'
  );

  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 font-sans selection:bg-cyan-900 selection:text-cyan-100 flex overflow-hidden relative">
      {/* Interactive Background Canvas */}
      <InteractiveBackground theme={currentTheme} />

      {/* Glass Sidebar */}
      <aside className="w-20 lg:w-64 border-r border-white/10 bg-zinc-950/80 backdrop-blur-2xl flex flex-col justify-between transition-all duration-300 relative z-20">
        <div>
          <div className="h-20 flex items-center justify-center lg:justify-start lg:px-6 border-b border-white/10">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/20 shrink-0">
              <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center text-cyan-400">
                <Brain size={22} />
              </div>
            </div>
            <span className="hidden lg:block ml-3 text-xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
              CEREBRO
            </span>
          </div>

          <nav className="mt-6 flex flex-col gap-1.5 px-3">
            {visibleNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-xs lg:text-sm ${
                  location.pathname === item.path
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/10 text-cyan-300 border border-cyan-500/30 font-semibold shadow-[0_0_20px_rgba(6,182,212,0.15)]'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-white/5 border border-transparent'
                }`}
              >
                <div className="flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <span className="hidden lg:block font-medium truncate">
                  {item.label}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* View Mode Indicator Footer in Sidebar */}
        <div className="p-4 border-t border-white/10 hidden lg:block">
          <div className="glass-card p-3 rounded-2xl text-xs space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400 font-bold uppercase tracking-wider">Active Mode:</span>
              <span className={`font-extrabold px-2 py-0.5 rounded-full border ${
                viewMode === 'student'
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
                  : 'bg-purple-500/20 text-purple-300 border-purple-500/30'
              }`}>
                {viewMode === 'student' ? 'Student View' : 'Creator / Admin'}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 leading-tight">
              {viewMode === 'student'
                ? 'Showing exact view an enrolled student experiences.'
                : 'Showing full infrastructure DB health & telemetry logs.'}
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content View with Glass Header */}
      <main className="flex-1 flex flex-col relative overflow-hidden z-10">
        <header className="h-20 border-b border-white/10 bg-zinc-950/60 backdrop-blur-2xl flex items-center justify-between px-6 z-20">
          <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
            <span>
              {allNavItems.find((i) => i.path === location.pathname)?.label ||
                'Workspace'}
            </span>
          </h1>

          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Quick Smart Search Trigger */}
            {/* Smart Search Trigger */}
            <button
              onClick={() => setShowSmartSearch(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl glass-input text-xs text-slate-300 hover:text-white hover:border-cyan-500/40 transition-all cursor-pointer"
              title="Search across all academic assets (Cmd+K)"
            >
              <Search size={14} className="text-cyan-400" />
              <span className="hidden md:inline">Smart Search</span>
              <kbd className="hidden sm:inline px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-mono text-slate-300">⌘K</kbd>
            </button>

            {/* View Mode Switcher Badge */}
            <div className="flex glass-input p-1 rounded-2xl text-xs font-semibold">
              <button
                onClick={() => setViewMode('student')}
                className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                  viewMode === 'student'
                    ? 'bg-cyan-500 text-zinc-950 font-bold shadow-[0_0_15px_rgba(34,211,238,0.4)]'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Switch to Student Experience View"
              >
                <UserCheck size={14} />
                <span className="hidden sm:inline">Student View</span>
              </button>
              <button
                onClick={() => setViewMode('creator')}
                className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                  viewMode === 'creator'
                    ? 'bg-purple-500 text-white font-bold shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Switch to Creator / Admin Telemetry View"
              >
                <Code2 size={14} />
                <span className="hidden sm:inline">Creator Admin</span>
              </button>
            </div>

            {/* Version Tracking & Live Health Diagnostic Trigger */}
            <button
              onClick={() => setShowDiagnostics(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-xs font-mono text-cyan-300 transition-all hover:scale-105"
              title="System Diagnostics & Version Tracking (Port 3000)"
            >
              <Activity size={13} className="text-emerald-400" />
              <span className="font-bold">v3.0.0-READY</span>
              <span className="hidden sm:inline text-[10px] text-emerald-400 font-semibold">• 3000 OK</span>
            </button>

            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-cyan-300">
              <Zap size={14} className="text-amber-400" />
              <span>Canvas Sync: Active</span>
            </div>

            {onSignOut && (
              <button
                type="button"
                onClick={onSignOut}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-red-500/15 border border-white/10 hover:border-red-500/30 text-xs font-semibold text-slate-300 hover:text-red-200 transition-all cursor-pointer"
                title="Sign out and return to Launch Gate"
              >
                <LogOut size={13} className="text-rose-400" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            )}
          </div>
        </header>

        {/* Page Container with Framer Motion Route Transitions */}
        <div className="flex-1 overflow-auto p-6 md:p-8 relative custom-scrollbar">
          <div className="max-w-6xl mx-auto relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.99 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
              >
                <Routes location={location}>
                  <Route
                    path="/"
                    element={
                      <HomeView
                        onOpenSearch={() => setShowSmartSearch(true)}
                        user={user}
                        initialDashboardConfig={initialDashboardConfig}
                      />
                    }
                  />
                  <Route
                    path="/ai-curation"
                    element={
                      <CustomAiInterface
                        onThemeChange={(newTheme) => setCurrentTheme(newTheme)}
                      />
                    }
                  />
                  <Route path="/knowledge-graph" element={<KnowledgeGraphView />} />
                  <Route path="/progress-charts" element={<ProgressChartsView />} />
                  <Route path="/voice-notes" element={<VoiceNotesView />} />
                  <Route path="/courses" element={<CoursesView />} />
                  <Route path="/notes" element={<NotesView />} />
                  <Route
                    path="/aegis-security"
                    element={<AegisSecurityDashboard isMasterProfile={viewMode === 'creator'} />}
                  />
                  <Route path="/db-health" element={<DbHealthDashboard />} />
                  <Route path="/api-logs" element={<ApiLogsView />} />
                  <Route path="/settings" element={<SettingsView />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Smart Search Results Modal */}
        <SmartSearchModal
          isOpen={showSmartSearch}
          onClose={() => setShowSmartSearch(false)}
          onSelectResult={(item) => {
            if (item.category === 'Course') navigate('/courses');
            else if (item.category === 'Note') navigate('/notes');
            else navigate('/knowledge-graph');
          }}
        />

        {/* System Diagnostics & Version Tracking Modal */}
        <HealthDiagnosticsModal
          isOpen={showDiagnostics}
          onClose={() => setShowDiagnostics(false)}
        />
      </main>
    </div>
  );
};

export function MainDashboard(props: MainDashboardProps = {}) {
  return (
    <ToastProvider>
      <BrowserRouter>
        <AppNavigation {...props} />
      </BrowserRouter>
    </ToastProvider>
  );
}
