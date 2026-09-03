import React, { useState, useEffect } from 'react';
import { Sparkles, Brain, Layout, CheckSquare, Code, Cpu, RefreshCw, Zap, ArrowRight, BookOpen, Layers, Shield } from 'lucide-react';

export function CustomAiInterface({
  userCourses = ['Data Structures', 'Discrete Mathematics', 'Algorithms'],
  userName = 'Alex',
  visualStyle = 'Dark Synth',
}: {
  userCourses?: string[];
  userName?: string;
  visualStyle?: string;
}) {
  const [curatedData, setCuratedData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [promptInput, setPromptInput] = useState<string>('');
  const [vibe, setVibe] = useState<string>('Focus');

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
      }
    } catch (err) {
      console.error('Failed to curate AI dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCuratedDashboard();
  }, [vibe]);

  return (
    <div className="space-y-8">
      {/* AI Curation Header */}
      <div className="bg-gradient-to-r from-[#0A111F] via-[#0D192E] to-[#050B14] border border-cyan-900/50 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-300 text-xs font-semibold tracking-wider uppercase">
              <Sparkles size={14} className="text-cyan-400 animate-spin" />
              <span>Gemini 2.5 Academic Curation Engine</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              AI Workspace Curation Center
            </h2>
            <p className="text-slate-400 text-sm max-w-xl">
              Cerebro dynamically builds your dashboard widgets, study paths, and code synthesis tools based on your enrolled subjects ({userCourses.join(', ')}).
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="flex bg-[#050B14] p-1 rounded-xl border border-slate-800 text-xs">
              {['Focus', 'Code', 'Minimal', 'Creative'].map((v) => (
                <button
                  key={v}
                  onClick={() => setVibe(v)}
                  className={`px-3 py-1.5 rounded-lg transition-all font-medium ${
                    vibe === v
                      ? 'bg-cyan-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>

            <button
              onClick={fetchCuratedDashboard}
              disabled={loading}
              className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-xs rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-cyan-900/30"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              <span>Re-Curate Workspace</span>
            </button>
          </div>
        </div>
      </div>

      {/* AI Curation Live Output */}
      {loading ? (
        <div className="bg-[#0A111F] border border-cyan-900/30 rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin" />
            <Brain size={24} className="text-cyan-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="text-slate-300 font-medium text-sm animate-pulse">
            Gemini is analyzing {userCourses.length} courses and composing custom widgets...
          </p>
        </div>
      ) : curatedData ? (
        <div className="space-y-6">
          {/* Greeting Banner & Selected Design Concept */}
          <div className="bg-[#0A111F] border border-cyan-900/40 rounded-2xl p-6 shadow-xl relative overflow-hidden space-y-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-cyan-950 rounded-xl border border-cyan-800 text-cyan-400">
                <Brain size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{curatedData.greeting}</h3>
                <p className="text-sm text-slate-400 mt-1">{curatedData.academicFocus}</p>
              </div>
            </div>

            {/* Design Library Pulled Concepts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800/80">
              {curatedData.selectedLayoutConcept && (
                <div className="p-3 bg-[#050B14] rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">
                      Pulled From 100+ Layout Library
                    </div>
                    <div className="font-bold text-white mt-0.5">{curatedData.selectedLayoutConcept.name}</div>
                    <div className="text-slate-400 text-[11px] truncate max-w-xs">{curatedData.selectedLayoutConcept.description}</div>
                  </div>
                  <span className="px-2 py-1 bg-cyan-950 text-cyan-300 rounded font-mono text-[10px] border border-cyan-800">
                    {curatedData.selectedLayoutConcept.category}
                  </span>
                </div>
              )}

              {curatedData.selectedColorScheme && (
                <div className="p-3 bg-[#050B14] rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-pink-400 tracking-wider">
                      Pulled From 250+ Color Schemes Library
                    </div>
                    <div className="font-bold text-white mt-0.5">{curatedData.selectedColorScheme.name}</div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: curatedData.selectedColorScheme.primaryAccent }} />
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: curatedData.selectedColorScheme.secondaryAccent }} />
                      <span className="text-[10px] text-slate-400">{curatedData.selectedColorScheme.category}</span>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-purple-950 text-purple-300 rounded font-mono text-[10px] border border-purple-800">
                    250+ Palette Pool
                  </span>
                </div>
              )}
            </div>
          </div>


          {/* Curated Bento Grid Widgets */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {curatedData.widgets?.map((widget: any) => (
              <div
                key={widget.id}
                className="bg-[#0A111F] border border-slate-800 hover:border-cyan-800/60 rounded-2xl p-6 transition-all shadow-lg hover:shadow-cyan-950/20 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider bg-cyan-950/80 px-2.5 py-1 rounded-md border border-cyan-900/60">
                      {widget.type}
                    </span>
                    <Sparkles size={16} className="text-slate-600 group-hover:text-cyan-400 transition-colors" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">{widget.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">{widget.description}</p>

                  {/* Course list items if applicable */}
                  {widget.items && Array.isArray(widget.items) && (
                    <div className="space-y-2 mt-3">
                      {widget.items.map((item: any, idx: number) => (
                        <div
                          key={idx}
                          className="p-2.5 bg-[#050B14] rounded-lg border border-slate-800 text-xs text-slate-300 flex items-center justify-between"
                        >
                          <span className="font-medium">{typeof item === 'string' ? item : item.title}</span>
                          {item.priority && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                              {item.priority}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-cyan-400 font-medium">
                  <span>Open AI Assistant</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

          {/* AI Focus Areas Section */}
          {curatedData.focusAreas && Array.isArray(curatedData.focusAreas) && (
            <div className="bg-[#0A111F] border border-slate-800 rounded-2xl p-6">
              <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4 flex items-center gap-2">
                <BookOpen size={16} className="text-cyan-400" />
                <span>AI Course Focus Areas & Target Topics</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {curatedData.focusAreas.map((area: any, idx: number) => (
                  <div key={idx} className="p-4 bg-[#050B14] rounded-xl border border-slate-800 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-white text-sm">{area.courseName}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                          area.priorityLevel === 'CRITICAL'
                            ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                            : area.priorityLevel === 'HIGH'
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                            : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        }`}>
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

          {/* AI Weekly Study Vector Schedule */}
          {curatedData.studyVectorSchedule && Array.isArray(curatedData.studyVectorSchedule) && (
            <div className="bg-[#0A111F] border border-slate-800 rounded-2xl p-6">
              <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Zap size={16} className="text-yellow-400" />
                <span>Weekly AI Study Vector Allocation</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {curatedData.studyVectorSchedule.map((vec: any, idx: number) => (
                  <div key={idx} className="p-3 bg-[#050B14] rounded-xl border border-slate-800 text-xs flex items-center justify-between">
                    <div>
                      <span className="text-cyan-400 font-bold block">{vec.day} • {vec.subject}</span>
                      <span className="text-slate-400">{vec.activity}</span>
                    </div>
                    <span className="px-2 py-1 bg-slate-800 text-slate-300 font-mono text-[10px] rounded">
                      {vec.durationMinutes}m
                    </span>
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
