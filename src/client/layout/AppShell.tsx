import React from 'react';

export const AppShell: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="min-h-screen bg-[#050B14] text-slate-300 font-sans selection:bg-cyan-900 selection:text-cyan-100 flex overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-20 lg:w-64 border-r border-cyan-900/30 bg-[#0A111F] flex flex-col justify-between transition-all duration-300">
        <div>
          {/* Logo Area */}
          <div className="h-20 flex items-center justify-center lg:justify-start lg:px-6 border-b border-cyan-900/30">
            <span className="hidden lg:block ml-3 text-2xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              CEREBRO
            </span>
          </div>

          {/* Nav Links */}
          <nav className="mt-8 flex flex-col gap-2 px-3">
            {/* To be populated */}
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Top Header */}
        <header className="h-20 border-b border-cyan-900/30 bg-[#050B14]/80 backdrop-blur-md flex items-center justify-between px-6 z-10">
          <h1 className="text-xl font-medium tracking-wide text-cyan-50">
            Workspace
          </h1>
        </header>

        {/* Workspace Canvas */}
        <div className="flex-1 overflow-auto p-6 md:p-8 relative">
          <div className="max-w-6xl mx-auto relative z-10">{children}</div>
        </div>
      </main>
    </div>
  );
};
