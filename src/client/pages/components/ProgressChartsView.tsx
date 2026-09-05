import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  BarChart3,
  Calendar,
  Award,
  Clock,
  CheckCircle,
  Zap,
  BookOpen,
  ArrowUpRight,
  Flame,
  Target,
  Sparkles,
} from 'lucide-react';
import { api } from '../../lib/api';

interface DayStudy {
  day: string;
  hours: number;
  target: number;
}

interface CourseMastery {
  name: string;
  completion: number;
  grade: string;
  status: string;
}

export function ProgressChartsView() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'semester'>('week');
  const [weeklyData, setWeeklyData] = useState<DayStudy[]>([
    { day: 'Mon', hours: 4.5, target: 4.0 },
    { day: 'Tue', hours: 5.2, target: 4.0 },
    { day: 'Wed', hours: 3.8, target: 4.0 },
    { day: 'Thu', hours: 6.0, target: 4.5 },
    { day: 'Fri', hours: 4.0, target: 3.5 },
    { day: 'Sat', hours: 2.5, target: 2.0 },
    { day: 'Sun', hours: 5.0, target: 3.0 },
  ]);
  const [courseMastery, setCourseMastery] = useState<CourseMastery[]>([
    { name: 'CS 2110: Computer Science II', completion: 84, grade: 'A', status: 'Ahead of Pace' },
    { name: 'MATH 2940: Linear Algebra', completion: 91, grade: 'A+', status: 'Exam Ready' },
    { name: 'ECE 3100: Signals & Systems', completion: 76, grade: 'B+', status: 'Active Review' },
    { name: 'CS 4450: Computer Networks', completion: 88, grade: 'A', status: 'Assignments Done' },
  ]);
  const [streakDays, setStreakDays] = useState<number>(14);
  const [retentionScore, setRetentionScore] = useState<number>(94.2);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await api.get('/workspace/progress-stats');
        if (res.studyHoursWeekly) setWeeklyData(res.studyHoursWeekly);
        if (res.courseMastery) setCourseMastery(res.courseMastery);
        if (res.activeStreakDays) setStreakDays(res.activeStreakDays);
        if (res.retentionScore) setRetentionScore(res.retentionScore);
      } catch (err) {
        console.warn('Using calibrated progress stats fallback:', err);
      }
    };
    fetchProgress();
  }, []);

  const totalHours = weeklyData.reduce((acc, curr) => acc + curr.hours, 0);
  const maxHours = Math.max(...weeklyData.map((d) => Math.max(d.hours, d.target)), 7);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="glass-panel rounded-3xl p-6 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-emerald-500/15 rounded-full blur-[90px] pointer-events-none" />

        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold tracking-wider uppercase mb-1">
            <TrendingUp size={16} />
            <span>P3-33 Academic Velocity & Competency Tracking</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Academic Progress Charts</h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-0.5">
            Monitor real-time study volume, retention curves, and syllabus milestone completion.
          </p>
        </div>

        {/* Time Range Selector */}
        <div className="flex glass-input p-1 rounded-xl text-xs font-semibold shrink-0">
          <button
            onClick={() => setTimeRange('week')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              timeRange === 'week'
                ? 'bg-emerald-500 text-zinc-950 font-bold shadow-md shadow-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            This Week
          </button>
          <button
            onClick={() => setTimeRange('month')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              timeRange === 'month'
                ? 'bg-emerald-500 text-zinc-950 font-bold shadow-md shadow-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            This Month
          </button>
          <button
            onClick={() => setTimeRange('semester')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              timeRange === 'semester'
                ? 'bg-emerald-500 text-zinc-950 font-bold shadow-md shadow-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Semester
          </button>
        </div>
      </div>

      {/* Hero Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-semibold uppercase tracking-wider">Weekly Study Volume</span>
            <Clock size={16} className="text-cyan-400" />
          </div>
          <div className="text-3xl font-extrabold text-white tracking-tight">
            {totalHours.toFixed(1)} <span className="text-sm font-normal text-slate-400">hrs</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold mt-2">
            <ArrowUpRight size={14} />
            <span>+14.5% vs. previous week</span>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-semibold uppercase tracking-wider">Active Study Streak</span>
            <Flame size={16} className="text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-white tracking-tight">
            {streakDays} <span className="text-sm font-normal text-slate-400">Days</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold mt-2">
            <Zap size={14} />
            <span>Personal record unbroken</span>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-semibold uppercase tracking-wider">Memory Retention</span>
            <Target size={16} className="text-purple-400" />
          </div>
          <div className="text-3xl font-extrabold text-white tracking-tight">
            {retentionScore}%
          </div>
          <div className="flex items-center gap-1.5 text-xs text-purple-400 font-semibold mt-2">
            <Sparkles size={14} />
            <span>Spaced repetition calibrated</span>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-semibold uppercase tracking-wider">Milestones Passed</span>
            <Award size={16} className="text-blue-400" />
          </div>
          <div className="text-3xl font-extrabold text-white tracking-tight">
            28 <span className="text-sm font-normal text-slate-400">/ 32</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-blue-400 font-semibold mt-2">
            <CheckCircle size={14} />
            <span>87.5% syllabus completion</span>
          </div>
        </div>
      </div>

      {/* Main Charts Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Velocity Bar Chart */}
        <div className="lg:col-span-2 glass-panel rounded-3xl p-6 space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BarChart3 size={18} className="text-cyan-400" />
                <span>Daily Focus & Study Hours</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Bars represent actual tracked hours; dashed markers indicate personal target.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <div className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-sm bg-cyan-400" /> Tracked
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <span className="w-2.5 h-1 border-t-2 border-indigo-400 border-dashed" /> Target
              </div>
            </div>
          </div>

          {/* Interactive SVG Bar Graph */}
          <div className="h-64 w-full flex items-end justify-between gap-3 pt-6 pb-2 px-2">
            {weeklyData.map((d, i) => {
              const barHeightPct = (d.hours / maxHours) * 100;
              const targetHeightPct = (d.target / maxHours) * 100;
              const isSurpassed = d.hours >= d.target;

              return (
                <div key={i} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                  {/* Tooltip on Hover */}
                  <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 border border-slate-700 text-white text-[10px] font-mono py-1 px-2 rounded-md shadow-xl pointer-events-none whitespace-nowrap z-20">
                    {d.day}: {d.hours}h (Target: {d.target}h)
                  </div>

                  {/* Target line indicator */}
                  <div
                    className="absolute w-full border-t border-indigo-400 border-dashed opacity-60 pointer-events-none z-10"
                    style={{ bottom: `${targetHeightPct}%` }}
                  />

                  {/* Bar Column */}
                  <div className="w-full max-w-[48px] h-full flex items-end justify-center">
                    <div
                      className={`w-full rounded-t-xl transition-all duration-500 group-hover:brightness-110 ${
                        isSurpassed
                          ? 'bg-gradient-to-t from-cyan-600 to-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                          : 'bg-gradient-to-t from-slate-700 to-indigo-500'
                      }`}
                      style={{ height: `${barHeightPct}%` }}
                    />
                  </div>

                  {/* Label */}
                  <span className="text-xs font-semibold text-slate-400 mt-2 group-hover:text-cyan-300 transition-colors">
                    {d.day}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">{d.hours}h</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Course Mastery Progress Cards */}
        <div className="lg:col-span-1 glass-panel rounded-3xl p-6 space-y-4">
          <div className="pb-2 border-b border-white/10">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BookOpen size={18} className="text-indigo-400" />
              <span>Course Pacing & Mastery</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Syllabus progression synced with Canvas LMS</p>
          </div>

          <div className="space-y-4 pt-1">
            {courseMastery.map((course, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white truncate max-w-[190px]">
                    {course.name}
                  </span>
                  <span className="text-xs font-extrabold font-mono px-2 py-0.5 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    {course.grade}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>{course.status}</span>
                    <span className="font-semibold text-cyan-300">{course.completion}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 rounded-full"
                      style={{ width: `${course.completion}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button className="w-full py-2.5 px-4 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/30 text-indigo-200 font-semibold text-xs flex items-center justify-center gap-2 transition-all">
              <span>View Canvas Gradebook Sync</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
