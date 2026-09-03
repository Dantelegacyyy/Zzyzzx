import React, { useState } from 'react';
import { Sparkles, ArrowRight, ArrowLeft, Check, Layers, Shield, Database, Brain, Lock, User, School, CheckSquare, RefreshCw, Palette, Grid, Star } from 'lucide-react';

export function OnboardingGallery() {
  const [activeScreen, setActiveScreen] = useState<number>(1);

  const screens = [
    { id: 1, title: '01 HELLO', category: 'Branding', bg: 'bg-[#050B14]', theme: 'dark' },
    { id: 2, title: '02 WELCOME TO CEREBRO', category: 'Overview', bg: 'bg-white text-slate-900', theme: 'light' },
    { id: 3, title: '03 DATA & PRIVACY', category: 'Security', bg: 'bg-[#0B0F19]', theme: 'dark' },
    { id: 4, title: '04 CREATE ACCOUNT', category: 'Auth', bg: 'bg-[#F4F3F8] text-slate-900', theme: 'light' },
    { id: 5, title: '05 PROFILE', category: 'User', bg: 'bg-[#0F0A1C]', theme: 'dark' },
    { id: 6, title: '06 UNIVERSITY', category: 'Institution', bg: 'bg-[#E3F2ED] text-slate-900', theme: 'light' },
    { id: 7, title: '07 CANVAS BRIDGE', category: 'OAuth', bg: 'bg-[#180A0A]', theme: 'dark' },
    { id: 8, title: '08 SELECT COURSES', category: 'Sync', bg: 'bg-white text-slate-900', theme: 'light' },
    { id: 9, title: '09 CONTINUOUS SYNC', category: 'Automated', bg: 'bg-[#0A181C]', theme: 'dark' },
    { id: 10, title: '10 SIGNATURE', category: 'Styling', bg: 'bg-[#F9F5EE] text-slate-900', theme: 'light' },
    { id: 11, title: '11 BUILDING CEREBRO', category: 'Processing', bg: 'bg-[#0A111F]', theme: 'dark' },
    { id: 12, title: '12 FINAL WELCOME', category: 'Completion', bg: 'bg-gradient-to-b from-[#0A111F] via-[#120A2A] to-[#050B14]', theme: 'dark' },
    { id: 13, title: '13 AI CUSTOMIZED DASHBOARD', category: 'Destination', bg: 'bg-[#050B14]', theme: 'dark' },
  ];

  return (
    <div className="space-y-8">
      {/* Gallery Header */}
      <div className="bg-[#0A111F] border border-cyan-900/40 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold tracking-wider uppercase mb-1">
            <Layers size={16} />
            <span>Exact Visual Replica</span>
          </div>
          <h2 className="text-2xl font-bold text-white">13-Screen Cerebro Experience Navigator</h2>
          <p className="text-slate-400 text-sm mt-0.5">
            Explore the 12 onboarding cards from the master design blueprint leading into Screen 13 (AI Customized Dashboard).
          </p>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
          <span className="text-xs font-semibold text-slate-400 mr-2">Jump to:</span>
          {screens.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveScreen(s.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                activeScreen === s.id
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {s.id < 10 ? `0${s.id}` : s.id}
            </button>
          ))}
        </div>
      </div>

      {/* Screen Render Box */}
      <div className="bg-[#0A111F] border border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[500px] relative overflow-hidden shadow-2xl">
        {/* Render Card Mockup based on activeScreen */}
        {activeScreen === 1 && (
          <div className="w-full max-w-md bg-[#050B14] border border-cyan-900/50 rounded-3xl p-8 text-center text-white space-y-8 shadow-2xl relative">
            <div className="text-xs font-mono text-cyan-400 text-left">01 HELLO</div>
            <div className="relative my-6 flex justify-center">
              <div className="w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl absolute" />
              <div className="w-24 h-24 rounded-full border-2 border-cyan-400/80 flex items-center justify-center text-3xl font-extrabold text-cyan-300 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]">
                C
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                C E R E B R O
              </h3>
              <p className="text-xs text-slate-400 tracking-wider uppercase mt-2">YOUR ACADEMIC COMMAND CENTER</p>
            </div>
            <button
              onClick={() => setActiveScreen(2)}
              className="w-full py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-purple-900/30 transition-all"
            >
              Begin
            </button>
            <div className="flex justify-center gap-1.5 text-cyan-500 text-xs">•••••</div>
          </div>
        )}

        {activeScreen === 2 && (
          <div className="w-full max-w-md bg-white text-slate-900 rounded-3xl p-8 text-center space-y-6 shadow-2xl border border-slate-200">
            <div className="text-xs font-mono text-blue-600 text-left font-bold">02 WELCOME TO CEREBRO</div>
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl mx-auto flex items-center justify-center">
              <Brain size={32} />
            </div>
            <h3 className="text-xl font-bold leading-tight">
              All your knowledge.<br />All your courses.<br />All in one place.
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs font-medium">
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center gap-1">⬡ Study Smarter</div>
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center gap-1">⬡ Stay Organized</div>
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center gap-1">⬡ Save Time</div>
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center gap-1">⬡ Reach Your Goals</div>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setActiveScreen(1)} className="flex-1 py-2.5 rounded-full border border-slate-300 text-slate-700 font-medium text-xs">Back</button>
              <button onClick={() => setActiveScreen(3)} className="flex-1 py-2.5 rounded-full bg-blue-600 text-white font-bold text-xs">Next</button>
            </div>
          </div>
        )}

        {activeScreen === 3 && (
          <div className="w-full max-w-md bg-[#0B0F19] text-white rounded-3xl p-8 text-center space-y-6 shadow-2xl border border-purple-900/40">
            <div className="text-xs font-mono text-purple-400 text-left font-bold">03 DATA & PRIVACY</div>
            <div className="w-16 h-16 bg-purple-950/60 text-purple-400 rounded-2xl mx-auto flex items-center justify-center border border-purple-800">
              <Lock size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold">Your data is private.<br />You're in control.</h3>
            </div>
            <div className="space-y-2 text-xs text-slate-300 text-left">
              <div className="p-3 bg-[#050B14] rounded-xl border border-slate-800 flex items-center gap-2">
                <Shield size={16} className="text-purple-400 flex-shrink-0" />
                <span>We only store what's needed to power Cerebro.</span>
              </div>
              <div className="p-3 bg-[#050B14] rounded-xl border border-slate-800 flex items-center gap-2">
                <Shield size={16} className="text-purple-400 flex-shrink-0" />
                <span>You own your data.</span>
              </div>
              <div className="p-3 bg-[#050B14] rounded-xl border border-slate-800 flex items-center gap-2">
                <Shield size={16} className="text-purple-400 flex-shrink-0" />
                <span>You decide what to connect.</span>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setActiveScreen(2)} className="flex-1 py-2.5 rounded-full border border-slate-700 text-slate-300 text-xs">Back</button>
              <button onClick={() => setActiveScreen(4)} className="flex-1 py-2.5 rounded-full bg-purple-600 text-white font-bold text-xs">Next</button>
            </div>
          </div>
        )}

        {activeScreen === 4 && (
          <div className="w-full max-w-md bg-[#F4F3F8] text-slate-900 rounded-3xl p-8 space-y-5 shadow-2xl border border-slate-200">
            <div className="text-xs font-mono text-blue-600 font-bold">04 CREATE ACCOUNT / SIGN IN</div>
            <h3 className="text-xl font-bold">Let's get you started.</h3>
            <button className="w-full py-2.5 bg-white border border-slate-300 rounded-xl font-medium text-xs flex items-center justify-center gap-2 shadow-sm">
              <span className="font-bold text-blue-600">G</span> Continue with Google
            </button>
            <div className="text-center text-xs text-slate-400 font-medium my-2">or</div>
            <div className="space-y-3 text-xs">
              <input type="email" placeholder="you@example.com" className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-slate-800" />
              <input type="password" value="••••••••••••" readOnly className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-slate-800" />
            </div>
            <button onClick={() => setActiveScreen(5)} className="w-full py-3 rounded-full bg-purple-600 text-white font-bold text-xs shadow-md">Create Account</button>
          </div>
        )}

        {activeScreen === 5 && (
          <div className="w-full max-w-md bg-[#0F0A1C] text-white rounded-3xl p-8 space-y-5 shadow-2xl border border-purple-900/40">
            <div className="text-xs font-mono text-purple-400 font-bold">05 PROFILE</div>
            <div className="w-16 h-16 bg-purple-900/40 text-purple-300 rounded-full mx-auto flex items-center justify-center border border-purple-700">
              <User size={32} />
            </div>
            <h3 className="text-xl font-bold text-center">Tell us about you.</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Preferred Name</label>
                <input type="text" value="Alex" readOnly className="w-full p-2.5 rounded-xl bg-[#050B14] border border-slate-800 text-white" />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Academic Level</label>
                <select className="w-full p-2.5 rounded-xl bg-[#050B14] border border-slate-800 text-white">
                  <option>Undergraduate</option>
                </select>
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Field of Study</label>
                <select className="w-full p-2.5 rounded-xl bg-[#050B14] border border-slate-800 text-white">
                  <option>Computer Science</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setActiveScreen(4)} className="flex-1 py-2.5 rounded-full border border-slate-700 text-slate-300 text-xs">Back</button>
              <button onClick={() => setActiveScreen(6)} className="flex-1 py-2.5 rounded-full bg-blue-600 text-white font-bold text-xs">Next</button>
            </div>
          </div>
        )}

        {activeScreen === 6 && (
          <div className="w-full max-w-md bg-[#E3F2ED] text-slate-900 rounded-3xl p-8 space-y-4 shadow-2xl border border-teal-200">
            <div className="text-xs font-mono text-teal-700 font-bold">06 UNIVERSITY</div>
            <h3 className="text-xl font-bold">Where do you study?</h3>
            <input type="text" placeholder="Search your institution" className="w-full p-2.5 bg-white rounded-xl border border-teal-200 text-xs" />
            <div className="space-y-2 text-xs font-medium">
              <div className="p-2.5 bg-white rounded-xl border border-teal-100 flex items-center justify-between">
                <span>🔴 Stanford University</span>
              </div>
              <div className="p-2.5 bg-white rounded-xl border border-teal-100 flex items-center justify-between">
                <span>🟣 MIT</span>
              </div>
              <div className="p-2.5 bg-white rounded-xl border border-teal-100 flex items-center justify-between">
                <span>🔵 UC Berkeley</span>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setActiveScreen(5)} className="flex-1 py-2.5 rounded-full border border-slate-300 text-slate-700 text-xs">Back</button>
              <button onClick={() => setActiveScreen(7)} className="flex-1 py-2.5 rounded-full bg-purple-600 text-white font-bold text-xs">Next</button>
            </div>
          </div>
        )}

        {activeScreen === 7 && (
          <div className="w-full max-w-md bg-[#180A0A] text-white rounded-3xl p-8 text-center space-y-5 shadow-2xl border border-rose-900/50">
            <div className="text-xs font-mono text-rose-500 text-left font-bold">07 CANVAS PERMISSION BRIDGE</div>
            <div className="w-16 h-16 bg-rose-950 text-rose-500 rounded-full mx-auto flex items-center justify-center border border-rose-800">
              <Star size={32} />
            </div>
            <h3 className="text-xl font-bold">Securely connect Canvas.</h3>
            <div className="space-y-2 text-xs text-slate-300 text-left">
              <div className="flex items-center gap-2">☑ We use official Canvas OAuth.</div>
              <div className="flex items-center gap-2">☑ We never see your password.</div>
              <div className="flex items-center gap-2">☑ You control what we access.</div>
            </div>
            <button onClick={() => setActiveScreen(8)} className="w-full py-3 rounded-full bg-rose-600 text-white font-bold text-xs shadow-lg shadow-rose-950">Connect Canvas</button>
            <button onClick={() => setActiveScreen(8)} className="text-xs text-slate-500 hover:text-slate-300">Not now</button>
          </div>
        )}

        {activeScreen === 8 && (
          <div className="w-full max-w-md bg-white text-slate-900 rounded-3xl p-8 space-y-5 shadow-2xl border border-slate-200">
            <div className="text-xs font-mono text-blue-600 font-bold">08 SELECT YOUR COURSES</div>
            <h3 className="text-xl font-bold">Choose the courses you want to sync.</h3>
            <div className="space-y-2 text-xs font-medium">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-2 text-blue-900 font-semibold">☑ Data Structures</div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-2 text-blue-900 font-semibold">☑ Discrete Mathematics</div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-2 text-blue-900 font-semibold">☑ Algorithms</div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2 text-slate-600">☐ Operating Systems</div>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setActiveScreen(7)} className="flex-1 py-2.5 rounded-full border border-slate-300 text-slate-700 text-xs">Back</button>
              <button onClick={() => setActiveScreen(9)} className="flex-1 py-2.5 rounded-full bg-blue-600 text-white font-bold text-xs">Next</button>
            </div>
          </div>
        )}

        {activeScreen === 9 && (
          <div className="w-full max-w-md bg-[#0A181C] text-white rounded-3xl p-8 space-y-5 shadow-2xl border border-cyan-900/50">
            <div className="text-xs font-mono text-cyan-400 font-bold">09 CONTINUOUS SYNC</div>
            <div className="w-16 h-16 bg-cyan-950 text-cyan-400 rounded-full mx-auto flex items-center justify-center border border-cyan-800">
              <RefreshCw size={32} />
            </div>
            <h3 className="text-xl font-bold text-center">Keep your courses in sync automatically.</h3>
            <div className="space-y-2 text-xs text-slate-300">
              <div>→ New assignments & updates</div>
              <div>→ Deadlines & announcements</div>
              <div>→ Lecture materials & files</div>
            </div>
            <div className="flex items-center justify-between p-3 bg-[#050B14] rounded-xl border border-slate-800 text-xs">
              <span>Enable continuous sync</span>
              <span className="px-2 py-1 bg-cyan-500 text-slate-950 font-bold rounded-full">ON</span>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setActiveScreen(8)} className="flex-1 py-2.5 rounded-full border border-slate-700 text-slate-300 text-xs">Back</button>
              <button onClick={() => setActiveScreen(10)} className="flex-1 py-2.5 rounded-full bg-cyan-600 text-white font-bold text-xs">Next</button>
            </div>
          </div>
        )}

        {activeScreen === 10 && (
          <div className="w-full max-w-md bg-[#F9F5EE] text-slate-900 rounded-3xl p-8 space-y-5 shadow-2xl border border-amber-200">
            <div className="text-xs font-mono text-amber-700 font-bold">10 CEREBRO SIGNATURE</div>
            <h3 className="text-xl font-bold">Personalize your Cerebro.</h3>
            <div className="space-y-3 text-xs">
              <div>
                <span className="font-semibold block mb-1">Choose your visual style</span>
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-cyan-500 ring-2 ring-cyan-600" />
                  <div className="w-6 h-6 rounded-full bg-purple-500" />
                  <div className="w-6 h-6 rounded-full bg-rose-500" />
                  <div className="w-6 h-6 rounded-full bg-amber-500" />
                </div>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setActiveScreen(9)} className="flex-1 py-2.5 rounded-full border border-slate-300 text-slate-700 text-xs">Back</button>
              <button onClick={() => setActiveScreen(11)} className="flex-1 py-2.5 rounded-full bg-pink-600 text-white font-bold text-xs">Next</button>
            </div>
          </div>
        )}

        {activeScreen === 11 && (
          <div className="w-full max-w-md bg-[#0A111F] text-white rounded-3xl p-8 space-y-6 shadow-2xl border border-cyan-900/50 text-center">
            <div className="text-xs font-mono text-cyan-400 text-left font-bold">11 BUILDING YOUR CEREBRO</div>
            <div className="w-24 h-24 rounded-full border-4 border-cyan-500 border-t-transparent mx-auto flex items-center justify-center font-extrabold text-2xl text-cyan-300 animate-pulse">
              98%
            </div>
            <div className="space-y-2 text-xs text-slate-300 text-left">
              <div>Creating your profile ✓</div>
              <div>Securing your workspace ✓</div>
              <div>Connecting selected courses ✓</div>
              <div>Preparing academic structure ✓</div>
              <div>Composing Cerebro Signature ✓</div>
              <div>Building your Home ✓</div>
            </div>
            <button onClick={() => setActiveScreen(12)} className="w-full py-3 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-xs shadow-lg">Almost there...</button>
          </div>
        )}

        {activeScreen === 12 && (
          <div className="w-full max-w-md bg-gradient-to-b from-[#0A111F] via-[#120A2A] to-[#050B14] text-white rounded-3xl p-8 space-y-8 shadow-2xl border border-purple-900/50 text-center">
            <div className="text-xs font-mono text-purple-400 text-left font-bold">12 WELCOME TO CEREBRO</div>
            <div className="w-24 h-24 rounded-full border-2 border-purple-400/80 mx-auto flex items-center justify-center text-3xl font-extrabold text-purple-300 drop-shadow-[0_0_20px_rgba(168,85,247,0.8)]">
              C
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                Welcome to Cerebro, Alex.
              </h3>
              <p className="text-xs text-slate-400 mt-2">Your workspace is ready.</p>
            </div>
            <button
              onClick={() => setActiveScreen(13)}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-sm shadow-xl shadow-purple-900/40 hover:scale-[1.02] transition-transform"
            >
              Enter Cerebro (Screen 13)
            </button>
          </div>
        )}

        {activeScreen === 13 && (
          <div className="w-full max-w-2xl bg-[#050B14] text-white rounded-3xl p-8 space-y-6 shadow-2xl border border-cyan-500/40">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-cyan-400 font-bold">13 AI CUSTOMIZED DASHBOARD</span>
              <span className="px-2.5 py-1 bg-cyan-950 text-cyan-300 text-[10px] font-bold rounded-full border border-cyan-800">
                LIVE DESTINATION
              </span>
            </div>
            <div className="p-4 bg-[#0A111F] rounded-2xl border border-cyan-900/50 flex items-center gap-3">
              <Brain size={28} className="text-cyan-400" />
              <div>
                <h4 className="text-lg font-bold">Welcome Alex! Your AI Customized Workspace is Live</h4>
                <p className="text-xs text-slate-400">Tailored specifically for Data Structures, Discrete Mathematics & Algorithms.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-4 bg-[#0A111F] rounded-xl border border-slate-800">
                <span className="font-bold text-cyan-400 block mb-1">Integrated Courses</span>
                <p className="text-slate-400">Data Structures, Discrete Math, Algorithms</p>
              </div>
              <div className="p-4 bg-[#0A111F] rounded-xl border border-slate-800">
                <span className="font-bold text-purple-400 block mb-1">AI Assistant Vibe</span>
                <p className="text-slate-400">Focus Mode / Code Synthesis Active</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
