/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Brain,
  Shield,
  BookOpen,
  Calendar,
  Search,
  Menu,
  User,
  FileText,
  CheckSquare,
  Layers,
} from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#050B14] text-slate-300 font-sans selection:bg-cyan-900 selection:text-cyan-100 flex overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-20 lg:w-64 border-r border-cyan-900/30 bg-[#0A111F] flex flex-col justify-between transition-all duration-300">
        <div>
          {/* Logo Area */}
          <div className="h-20 flex items-center justify-center lg:justify-start lg:px-6 border-b border-cyan-900/30">
            <Brain className="w-10 h-10 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
            <span className="hidden lg:block ml-3 text-2xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              CEREBRO
            </span>
          </div>

          {/* Nav Links */}
          <nav className="mt-8 flex flex-col gap-2 px-3">
            <NavItem icon={<Layers />} label="Command Center" active />
            <NavItem icon={<BookOpen />} label="Courses" />
            <NavItem icon={<FileText />} label="Study Materials" />
            <NavItem icon={<CheckSquare />} label="Assignments" />
            <NavItem icon={<Calendar />} label="Deadlines" />
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="mb-6 px-3 flex flex-col gap-2">
          <NavItem
            icon={<Shield className="text-blue-400" />}
            label="AEGIS Guardian"
          />
          <NavItem icon={<User />} label="Profile (Canvas)" />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Top Header */}
        <header className="h-20 border-b border-cyan-900/30 bg-[#050B14]/80 backdrop-blur-md flex items-center justify-between px-6 z-10">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 text-slate-400 hover:text-cyan-400 transition-colors">
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-medium tracking-wide text-cyan-50">
              Workspace Overview
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search resources..."
                className="bg-[#0A111F] border border-cyan-900/50 rounded-full py-1.5 pl-9 pr-4 text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all w-64 text-slate-200 placeholder:text-slate-600"
              />
            </div>

            {/* AEGIS Status Badge */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/40 border border-blue-900/50 shadow-[0_0_10px_rgba(59,130,246,0.1)]">
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
              <span className="text-xs font-semibold tracking-wider text-blue-300">
                AEGIS ACTIVE
              </span>
            </div>
          </div>
        </header>

        {/* Workspace Canvas (Ready for Phase 1) */}
        <div className="flex-1 overflow-auto p-6 md:p-8 relative">
          {/* Background decorative elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-cyan-900/5 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="max-w-6xl mx-auto space-y-8 relative z-10">
            {/* Welcome Banner */}
            <section className="relative overflow-hidden rounded-2xl border border-cyan-900/40 bg-gradient-to-br from-[#0A111F] to-[#050B14] p-8 shadow-2xl">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Brain className="w-48 h-48 text-cyan-400" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Welcome to{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  Cerebro
                </span>
              </h2>
              <p className="text-slate-400 max-w-2xl text-lg leading-relaxed mb-8">
                Your AI-powered academic command center is ready. Awaiting Phase
                1 initialization to connect Canvas, organize courses, and
                synthesize your study materials.
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-2.5 rounded-lg bg-cyan-950/50 border border-cyan-700/50 text-cyan-300 font-medium hover:bg-cyan-900/50 hover:text-cyan-200 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(34,211,238,0.15)] hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                  <User className="w-4 h-4" />
                  Connect Canvas Account
                </button>
                <button className="px-6 py-2.5 rounded-lg bg-[#0A111F] border border-slate-800 text-slate-300 font-medium hover:bg-slate-900 transition-all flex items-center gap-2">
                  Upload Phase 1 Documents
                </button>
              </div>
            </section>

            {/* Quick Status Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatusCard
                icon={<BookOpen className="text-emerald-400" />}
                title="Courses Synced"
                value="0"
                subtitle="Awaiting Canvas Integration"
              />
              <StatusCard
                icon={<Layers className="text-purple-400" />}
                title="Knowledge Nodes"
                value="0"
                subtitle="PDFs, Notes, Lectures"
              />
              <StatusCard
                icon={<Shield className="text-blue-400" />}
                title="AEGIS Integrity"
                value="100%"
                subtitle="System secure. No threats detected."
                glow="shadow-[0_0_15px_rgba(59,130,246,0.1)]"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Helper Components
function NavItem({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 w-full group
        ${
          active
            ? 'bg-cyan-950/40 text-cyan-300 border border-cyan-900/50 shadow-[inset_0_0_20px_rgba(34,211,238,0.05)]'
            : 'text-slate-400 hover:bg-[#0F172A] hover:text-slate-200 border border-transparent'
        }`}
    >
      <div
        className={`${active ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'} transition-colors`}
      >
        {icon}
      </div>
      <span className="hidden lg:block font-medium text-sm tracking-wide">
        {label}
      </span>
    </button>
  );
}

function StatusCard({
  icon,
  title,
  value,
  subtitle,
  glow = '',
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
  glow?: string;
}) {
  return (
    <div
      className={`bg-[#0A111F] border border-slate-800/80 rounded-2xl p-6 flex flex-col gap-4 ${glow}`}
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
          {icon}
        </div>
        <h3 className="text-sm font-medium text-slate-400 tracking-wide">
          {title}
        </h3>
      </div>
      <div>
        <div className="text-3xl font-bold text-slate-100">{value}</div>
        <div className="text-xs text-slate-500 mt-1">{subtitle}</div>
      </div>
    </div>
  );
}
