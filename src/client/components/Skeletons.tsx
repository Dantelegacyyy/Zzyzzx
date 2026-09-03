import React from 'react';

export const CourseSkeleton = () => {
  return (
    <div className="bg-[#0A111F] rounded-xl border border-slate-800/80 p-6 animate-pulse space-y-4">
      <div className="flex justify-between items-center">
        <div className="h-5 w-16 bg-cyan-900/30 rounded" />
        <div className="h-4 w-12 bg-slate-800 rounded" />
      </div>
      <div className="h-6 w-3/4 bg-slate-800 rounded" />
      <div className="h-4 w-1/2 bg-slate-800/60 rounded" />
    </div>
  );
};

export const NoteSkeleton = () => {
  return (
    <div className="bg-[#0A111F] rounded-xl border border-slate-800/80 p-6 animate-pulse space-y-3">
      <div className="flex justify-between items-center">
        <div className="h-5 w-2/3 bg-slate-800 rounded" />
        <div className="h-4 w-16 bg-slate-800/60 rounded" />
      </div>
      <div className="h-4 w-full bg-slate-800/40 rounded" />
      <div className="h-4 w-4/5 bg-slate-800/40 rounded" />
    </div>
  );
};

export const DashboardSkeleton = () => {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="bg-[#0A111F] rounded-2xl p-8 border border-slate-800 space-y-4">
        <div className="h-8 w-48 bg-slate-800 rounded" />
        <div className="h-4 w-64 bg-slate-800/60 rounded" />
        <div className="h-12 w-full bg-[#050B14] rounded-lg border border-slate-800" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-[#0A111F] rounded-xl border border-slate-800 p-6 h-48 space-y-4">
          <div className="h-5 w-28 bg-slate-800 rounded" />
          <div className="h-4 w-full bg-slate-800/40 rounded" />
          <div className="h-4 w-3/4 bg-slate-800/40 rounded" />
        </div>
        <div className="md:col-span-2 bg-[#0A111F] rounded-xl border border-slate-800 p-6 h-48 space-y-4">
          <div className="h-5 w-32 bg-slate-800 rounded" />
          <div className="grid grid-cols-2 gap-4">
            <div className="h-16 bg-slate-800/40 rounded-lg" />
            <div className="h-16 bg-slate-800/40 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};
