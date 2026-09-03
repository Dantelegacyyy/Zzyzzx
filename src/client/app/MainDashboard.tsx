import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { CoursesView } from '../pages/components/CoursesView';
import { NotesView } from '../pages/components/NotesView';
import { SettingsView } from '../pages/components/SettingsView';
import { DbHealthDashboard } from '../pages/components/DbHealthDashboard';
import { ApiLogsView } from '../pages/components/ApiLogsView';
import { CustomAiInterface } from '../pages/components/CustomAiInterface';
import { OnboardingGallery } from '../pages/components/OnboardingGallery';
import { ToastProvider } from '../components/Toast';
import { Home, BookOpen, FileText, Settings, Search, Plus, Shield, Zap, Book, ArrowRight, Brain, Activity, Database, Layers } from 'lucide-react';

const Aperture = () => (
  <div className="min-h-screen bg-[#050B14] flex flex-col items-center justify-center relative overflow-hidden">
    <div className="absolute inset-0 bg-cyan-900/10 blur-[100px] rounded-full w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
    <div className="relative z-10 flex flex-col items-center">
      <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin mb-8"></div>
      <h1 className="text-3xl font-bold tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
        CEREBRO
      </h1>
    </div>
  </div>
);

const DashboardHome = () => (
  <div className="space-y-8">
    <section className="bg-gradient-to-br from-[#0A111F] to-[#050B14] rounded-2xl p-8 border border-cyan-900/40 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none text-cyan-400">
        <Home size={160} />
      </div>
      <div className="relative z-10">
        <h2 className="text-3xl font-bold text-white mb-2">Good morning.</h2>
        <p className="text-slate-400 mb-6">What are you working on today?</p>
        <div className="flex gap-4 max-w-2xl mb-8">
          <div className="flex-1 relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              size={20}
            />
            <input
              type="text"
              placeholder="Ask Cerebro or search your workspace..."
              className="w-full bg-[#050B14] border border-slate-700 rounded-lg pl-12 pr-4 py-3 text-slate-200 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
            />
          </div>
          <button className="px-6 py-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium transition-colors flex items-center gap-2 shadow-lg shadow-cyan-900/20">
            <Plus size={20} />
            <span>Add</span>
          </button>
        </div>
        
        {/* Quick Actions */}
        <div className="flex gap-3 flex-wrap">
          <button className="bg-slate-800/50 hover:bg-cyan-900/40 border border-slate-700 hover:border-cyan-700 text-slate-300 py-2 px-4 rounded-full text-sm font-medium transition-all flex items-center gap-2">
            <Zap size={16} className="text-yellow-500" /> Quick Sync Canvas
          </button>
          <button className="bg-slate-800/50 hover:bg-cyan-900/40 border border-slate-700 hover:border-cyan-700 text-slate-300 py-2 px-4 rounded-full text-sm font-medium transition-all flex items-center gap-2">
            <FileText size={16} className="text-cyan-400" /> New Note
          </button>
          <button className="bg-slate-800/50 hover:bg-cyan-900/40 border border-slate-700 hover:border-cyan-700 text-slate-300 py-2 px-4 rounded-full text-sm font-medium transition-all flex items-center gap-2">
            <BookOpen size={16} className="text-blue-400" /> Browse Courses
          </button>
        </div>
      </div>
    </section>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* AEGIS Status Logging */}
      <section className="md:col-span-1">
        <h3 className="text-lg font-medium text-slate-300 mb-4 border-b border-slate-800 pb-2 flex items-center gap-2">
          <Shield size={20} className="text-cyan-500" /> AEGIS Status
        </h3>
        <div className="bg-[#0A111F] rounded-xl border border-slate-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-slate-400">System Integrity</span>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">100% SECURE</span>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3 text-sm">
              <div className="w-2 h-2 mt-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <div className="flex-1">
                <p className="text-slate-300">Cloud SQL (PostgreSQL)</p>
                <p className="text-xs text-slate-500">Instance active in us-west2</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <div className="w-2 h-2 mt-1.5 rounded-full bg-cyan-500" />
              <div className="flex-1">
                <p className="text-slate-300">Firebase Auth & Tokens</p>
                <p className="text-xs text-slate-500">OAuth & Admin SDK verified</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <div className="w-2 h-2 mt-1.5 rounded-full bg-blue-500" />
              <div className="flex-1">
                <p className="text-slate-300">Drizzle ORM & Schema</p>
                <p className="text-xs text-slate-500">PostgreSQL tables active</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Knowledge Base */}
      <section className="md:col-span-2">
        <h3 className="text-lg font-medium text-slate-300 mb-4 border-b border-slate-800 pb-2 flex items-center gap-2">
          <Book size={20} className="text-purple-400" /> Knowledge Base
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-[#0A111F] hover:bg-slate-800/50 transition-colors cursor-pointer rounded-xl border border-slate-800 p-5 group">
            <h4 className="text-slate-200 font-medium mb-1 group-hover:text-cyan-400 transition-colors flex items-center justify-between">
              Getting Started Guide <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </h4>
            <p className="text-xs text-slate-500">Learn the basics of Cerebro workspace and command inputs.</p>
          </div>
          <div className="bg-[#0A111F] hover:bg-slate-800/50 transition-colors cursor-pointer rounded-xl border border-slate-800 p-5 group">
            <h4 className="text-slate-200 font-medium mb-1 group-hover:text-cyan-400 transition-colors flex items-center justify-between">
              Canvas Integrations <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </h4>
            <p className="text-xs text-slate-500">Troubleshoot your LMS syncing and assignments.</p>
          </div>
          <div className="bg-[#0A111F] hover:bg-slate-800/50 transition-colors cursor-pointer rounded-xl border border-slate-800 p-5 group">
            <h4 className="text-slate-200 font-medium mb-1 group-hover:text-cyan-400 transition-colors flex items-center justify-between">
              Smart Notes <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </h4>
            <p className="text-xs text-slate-500">How to use AI generation within your documents.</p>
          </div>
          <div className="bg-[#0A111F] hover:bg-slate-800/50 transition-colors cursor-pointer rounded-xl border border-slate-800 p-5 group">
            <h4 className="text-slate-200 font-medium mb-1 group-hover:text-cyan-400 transition-colors flex items-center justify-between">
              System Architecture <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </h4>
            <p className="text-xs text-slate-500">Deep dive into the AEGIS security framework.</p>
          </div>
        </div>
      </section>
    </div>
  </div>
);

const AppNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { id: 'home', label: 'Home', path: '/', icon: <Home size={20} /> },
    {
      id: 'ai-curation',
      label: 'AI Dashboard (Screen 13)',
      path: '/ai-curation',
      icon: <Brain size={20} />,
    },
    {
      id: 'onboarding-gallery',
      label: '13-Screen Showcase',
      path: '/onboarding-gallery',
      icon: <Layers size={20} />,
    },
    {
      id: 'courses',
      label: 'Courses',
      path: '/courses',
      icon: <BookOpen size={20} />,
    },
    {
      id: 'notes',
      label: 'Notes',
      path: '/notes',
      icon: <FileText size={20} />,
    },
    {
      id: 'db-health',
      label: 'Database Health',
      path: '/db-health',
      icon: <Database size={20} />,
    },
    {
      id: 'api-logs',
      label: 'API Connection Logs',
      path: '/api-logs',
      icon: <Activity size={20} />,
    },
    {
      id: 'settings',
      label: 'Settings',
      path: '/settings',
      icon: <Settings size={20} />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#050B14] text-slate-300 font-sans selection:bg-cyan-900 selection:text-cyan-100 flex overflow-hidden">
      <aside className="w-20 lg:w-64 border-r border-cyan-900/30 bg-[#0A111F] flex flex-col justify-between transition-all duration-300">
        <div>
          <div className="h-20 flex items-center justify-center lg:justify-start lg:px-6 border-b border-cyan-900/30">
            <span className="hidden lg:block ml-3 text-2xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              CEREBRO
            </span>
            <span className="lg:hidden text-2xl font-bold text-cyan-400">
              C
            </span>
          </div>

          <nav className="mt-6 flex flex-col gap-1.5 px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-xs lg:text-sm ${
                  location.pathname === item.path
                    ? 'bg-cyan-900/30 text-cyan-400 border border-cyan-800/60 font-semibold shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
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
      </aside>

      <main className="flex-1 flex flex-col relative overflow-hidden">
        <header className="h-20 border-b border-cyan-900/30 bg-[#050B14]/80 backdrop-blur-md flex items-center justify-between px-6 z-10">
          <h1 className="text-xl font-medium tracking-wide text-cyan-50">
            {navItems.find((i) => i.path === location.pathname)?.label ||
              'Workspace'}
          </h1>
        </header>

        <div className="flex-1 overflow-auto p-6 md:p-8 relative">
          <div className="max-w-6xl mx-auto relative z-10">
            <Routes>
              <Route path="/" element={<DashboardHome />} />
              <Route path="/ai-curation" element={<CustomAiInterface />} />
              <Route path="/onboarding-gallery" element={<OnboardingGallery />} />
              <Route path="/courses" element={<CoursesView />} />
              <Route path="/notes" element={<NotesView />} />
              <Route path="/db-health" element={<DbHealthDashboard />} />
              <Route path="/api-logs" element={<ApiLogsView />} />
              <Route path="/settings" element={<SettingsView />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
};

export function MainDashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating initial load time for Cerebro Core
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
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

