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
import { OnboardingGallery } from '../pages/components/OnboardingGallery';
import { AegisSecurityDashboard } from '../pages/components/AegisSecurityDashboard';
import { ToastProvider } from '../components/Toast';
import { InteractiveBackground, ThemeType } from '../components/InteractiveBackground';
import { UserFeedbackWidget } from '../components/UserFeedbackWidget';
import { AegisGuardianCharacter } from '../components/AegisGuardianCharacter';
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

const DashboardHome = () => (
  <div className="space-y-8">
    {/* Hero Glass Section */}
    <section className="glass-panel rounded-3xl p-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none text-cyan-400">
        <Home size={180} />
      </div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold mb-3">
          <Brain size={14} className="text-cyan-400 animate-pulse" />
          <span>Cerebro Workspace v2.5 • Glass Engine</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2 tracking-tight">
          Good morning, Commander.
        </h2>
        <p className="text-slate-300 mb-6 text-sm sm:text-base max-w-xl">
          Your integrated academic intelligence workspace is synced and operational.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mb-8">
          <div className="flex-1 relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Ask Cerebro or search your workspace..."
              className="glass-input w-full rounded-xl pl-12 pr-4 py-3 text-slate-100 text-sm placeholder:text-slate-400 focus:outline-none"
            />
          </div>
          <button className="glass-button-primary px-6 py-3 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 shrink-0">
            <Plus size={18} />
            <span>New Action</span>
          </button>
        </div>

        {/* Quick Actions Glass Pills */}
        <div className="flex gap-2.5 flex-wrap">
          <button className="glass-pill hover:border-cyan-500/40 text-slate-200 hover:text-white py-2 px-4 rounded-xl text-xs font-semibold transition-all flex items-center gap-2">
            <Zap size={14} className="text-amber-400" /> Quick Sync Canvas
          </button>
          <button className="glass-pill hover:border-cyan-500/40 text-slate-200 hover:text-white py-2 px-4 rounded-xl text-xs font-semibold transition-all flex items-center gap-2">
            <FileText size={14} className="text-cyan-400" /> New Smart Note
          </button>
          <button className="glass-pill hover:border-cyan-500/40 text-slate-200 hover:text-white py-2 px-4 rounded-xl text-xs font-semibold transition-all flex items-center gap-2">
            <BookOpen size={14} className="text-blue-400" /> Browse Enrolled Courses
          </button>
        </div>
      </div>
    </section>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* AEGIS Status Logging Glass Card */}
      <section className="md:col-span-1">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
          <Shield size={18} className="text-cyan-400" /> AEGIS Security Status
        </h3>
        <div className="glass-card rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-xs text-slate-400 font-medium">System Integrity</span>
            <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full">
              100% VERIFIED
            </span>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3 text-xs">
              <div className="w-2 h-2 mt-1 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <div className="flex-1">
                <p className="text-slate-200 font-semibold">Cloud SQL (PostgreSQL)</p>
                <p className="text-[11px] text-slate-400">Instance active in us-west2</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-xs">
              <div className="w-2 h-2 mt-1 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
              <div className="flex-1">
                <p className="text-slate-200 font-semibold">Firebase Auth & Tokens</p>
                <p className="text-[11px] text-slate-400">OAuth & Admin SDK verified</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-xs">
              <div className="w-2 h-2 mt-1 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
              <div className="flex-1">
                <p className="text-slate-200 font-semibold">Drizzle ORM & Schema</p>
                <p className="text-[11px] text-slate-400">PostgreSQL tables active</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Knowledge Base Glass Cards */}
      <section className="md:col-span-2">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
          <Book size={18} className="text-purple-400" /> Knowledge Base & Docs
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="glass-card rounded-2xl p-5 group cursor-pointer">
            <h4 className="text-slate-100 font-semibold text-sm mb-1 group-hover:text-cyan-300 transition-colors flex items-center justify-between">
              <span>Getting Started Guide</span>
              <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
            </h4>
            <p className="text-xs text-slate-400">Learn the basics of Cerebro workspace and command inputs.</p>
          </div>
          <div className="glass-card rounded-2xl p-5 group cursor-pointer">
            <h4 className="text-slate-100 font-semibold text-sm mb-1 group-hover:text-cyan-300 transition-colors flex items-center justify-between">
              <span>Canvas LMS Integrations</span>
              <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
            </h4>
            <p className="text-xs text-slate-400">Troubleshoot your LMS syncing and course assignments.</p>
          </div>
          <div className="glass-card rounded-2xl p-5 group cursor-pointer">
            <h4 className="text-slate-100 font-semibold text-sm mb-1 group-hover:text-cyan-300 transition-colors flex items-center justify-between">
              <span>Smart Note Studio</span>
              <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
            </h4>
            <p className="text-xs text-slate-400">How to use AI generation within your documents.</p>
          </div>
          <div className="glass-card rounded-2xl p-5 group cursor-pointer">
            <h4 className="text-slate-100 font-semibold text-sm mb-1 group-hover:text-cyan-300 transition-colors flex items-center justify-between">
              <span>System Architecture</span>
              <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
            </h4>
            <p className="text-xs text-slate-400">Deep dive into the AEGIS security framework and database.</p>
          </div>
        </div>
      </section>
    </div>
  </div>
);

const AppNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Mode state: Student View vs Developer/Admin Mode
  const [viewMode, setViewMode] = useState<'student' | 'creator'>('student');
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('cyan');

  const allNavItems = [
    { id: 'home', label: 'Home', path: '/', icon: <Home size={20} />, role: 'all' },
    {
      id: 'ai-curation',
      label: 'AI Dashboard (Screen 13)',
      path: '/ai-curation',
      icon: <Brain size={20} />,
      role: 'all',
    },
    {
      id: 'onboarding-gallery',
      label: '13-Screen Showcase',
      path: '/onboarding-gallery',
      icon: <Layers size={20} />,
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
      role: 'all',
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

          <div className="flex items-center gap-3">
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

            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-cyan-300">
              <Zap size={14} className="text-amber-400" />
              <span>Canvas Sync: Active</span>
            </div>
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
                  <Route path="/" element={<DashboardHome />} />
                  <Route
                    path="/ai-curation"
                    element={
                      <CustomAiInterface
                        onThemeChange={(newTheme) => setCurrentTheme(newTheme)}
                      />
                    }
                  />
                  <Route path="/onboarding-gallery" element={<OnboardingGallery />} />
                  <Route path="/courses" element={<CoursesView />} />
                  <Route path="/notes" element={<NotesView />} />
                  <Route path="/aegis-security" element={<AegisSecurityDashboard />} />
                  <Route path="/db-health" element={<DbHealthDashboard />} />
                  <Route path="/api-logs" element={<ApiLogsView />} />
                  <Route path="/settings" element={<SettingsView />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* User Feedback Widget & Aegis Guardian Character Overlay */}
        <UserFeedbackWidget />
        <AegisGuardianCharacter />
      </main>
    </div>
  );
};

export function MainDashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Aperture />;

  return (
    <ToastProvider>
      <BrowserRouter>
        <AppNavigation />
      </BrowserRouter>
    </ToastProvider>
  );
}
