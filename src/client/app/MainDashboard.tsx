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
import { ToastProvider } from '../components/Toast';
import { Home, BookOpen, FileText, Settings, Search, Plus } from 'lucide-react';

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
        <div className="flex gap-4 max-w-2xl">
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
      </div>
    </section>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <section>
        <h3 className="text-lg font-medium text-slate-300 mb-4 border-b border-slate-800 pb-2">
          Continue
        </h3>
        <div className="bg-[#0A111F] rounded-xl border border-slate-800 p-6 flex flex-col items-center justify-center text-slate-500 min-h-[120px]">
          <BookOpen size={24} className="mb-2 opacity-50" />
          <span className="text-sm">Your recent work will appear here.</span>
        </div>
      </section>
      <section>
        <h3 className="text-lg font-medium text-slate-300 mb-4 border-b border-slate-800 pb-2">
          Next
        </h3>
        <div className="bg-[#0A111F] rounded-xl border border-slate-800 p-6 flex flex-col items-center justify-center text-slate-500 min-h-[120px]">
          <FileText size={24} className="mb-2 opacity-50" />
          <span className="text-sm">Nothing urgent yet.</span>
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
          <nav className="mt-8 flex flex-col gap-2 px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-cyan-900/20 text-cyan-400 border border-cyan-900/50'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                }`}
              >
                <div className="flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <span className="hidden lg:block font-medium">
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
              <Route path="/courses" element={<CoursesView />} />
              <Route path="/notes" element={<NotesView />} />
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
    }, 1000);
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
