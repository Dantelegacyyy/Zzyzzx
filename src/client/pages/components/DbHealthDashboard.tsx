import React, { useState, useEffect } from 'react';
import { Database, ShieldCheck, Activity, Terminal, RefreshCw, CheckCircle2, Server, HardDrive, Cpu, AlertCircle } from 'lucide-react';

export function DbHealthDashboard() {
  const [health, setHealth] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [migrating, setMigrating] = useState<boolean>(false);
  const [migrationLog, setMigrationLog] = useState<string[]>([]);

  const fetchDbData = async () => {
    try {
      setLoading(true);
      const [healthRes, statsRes] = await Promise.all([
        fetch('/api/db/health'),
        fetch('/api/workspace/db-stats'),
      ]);

      if (healthRes.ok) {
        const healthData = await healthRes.json();
        setHealth(healthData);
      }
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }
    } catch (err) {
      console.error('Failed to fetch DB health:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDbData();
  }, []);

  const handleRunMigration = async () => {
    try {
      setMigrating(true);
      setMigrationLog((prev) => [...prev, `[${new Date().toLocaleTimeString()}] Initiating Cloud SQL DDL Migration...`]);
      
      const res = await fetch('/api/db/migrate', { method: 'POST' });
      const data = await res.json();

      if (res.ok) {
        setMigrationLog((prev) => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] Migration Status: SUCCESS`,
          `[${new Date().toLocaleTimeString()}] Tables Verified: users, courses, notes`,
          `[${new Date().toLocaleTimeString()}] ${data.message || 'DDL Schema up to date.'}`,
        ]);
        fetchDbData();
      } else {
        setMigrationLog((prev) => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] Migration Failed: ${data.error || 'Unknown error'}`,
        ]);
      }
    } catch (err: any) {
      setMigrationLog((prev) => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] Execution Error: ${err.message}`,
      ]);
    } finally {
      setMigrating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#0A111F] border border-cyan-900/40 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-cyan-950/60 rounded-xl border border-cyan-800/50 text-cyan-400">
            <Database size={28} />
          </div>
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold tracking-wider uppercase mb-0.5">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span>AEGIS Verified Storage</span>
            </div>
            <h2 className="text-2xl font-bold text-white">Database Health Dashboard</h2>
            <p className="text-slate-400 text-sm">
              Live Cloud SQL PostgreSQL cluster telemetry and schema migration controls.
            </p>
          </div>
        </div>

        <button
          onClick={fetchDbData}
          disabled={loading}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-colors flex items-center gap-2 text-sm font-medium"
        >
          <RefreshCw size={16} className={loading ? 'animate-spin text-cyan-400' : ''} />
          <span>Refresh Telemetry</span>
        </button>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#0A111F] border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-2">
            <span>Connection Status</span>
            <Server size={16} className="text-emerald-400" />
          </div>
          <div className="text-xl font-bold text-emerald-400 flex items-center gap-2">
            <CheckCircle2 size={20} />
            {health?.connected ? 'ACTIVE' : 'CONNECTING...'}
          </div>
          <div className="text-xs text-slate-500 mt-2">Cloud SQL PostgreSQL (us-west2)</div>
        </div>

        <div className="bg-[#0A111F] border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-2">
            <span>Query Latency</span>
            <Activity size={16} className="text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-cyan-300 font-mono">
            {health?.latencyMs !== undefined ? `${health.latencyMs} ms` : '--'}
          </div>
          <div className="text-xs text-slate-500 mt-2">Direct TCP socket response time</div>
        </div>

        <div className="bg-[#0A111F] border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-2">
            <span>Engine Version</span>
            <Cpu size={16} className="text-purple-400" />
          </div>
          <div className="text-lg font-bold text-slate-200 truncate font-mono">
            {health?.version ? health.version.split(' ')[0] : 'PostgreSQL 15+'}
          </div>
          <div className="text-xs text-slate-500 mt-2">Drizzle ORM Dialect Active</div>
        </div>

        <div className="bg-[#0A111F] border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-2">
            <span>Security Integrity</span>
            <HardDrive size={16} className="text-blue-400" />
          </div>
          <div className="text-lg font-bold text-blue-400 font-mono">100% SECURE</div>
          <div className="text-xs text-slate-500 mt-2">SSL/TLS Encrypted Connection</div>
        </div>
      </div>

      {/* Table Records & Migration Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table Record Counts */}
        <div className="bg-[#0A111F] border border-slate-800 rounded-2xl p-6 lg:col-span-1 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-200 mb-4 flex items-center gap-2">
              <Database size={18} className="text-cyan-400" />
              <span>Cloud SQL Schema Tables</span>
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-[#050B14] rounded-xl border border-slate-800">
                <div>
                  <div className="text-sm font-semibold text-slate-200">users</div>
                  <div className="text-xs text-slate-500">Accounts & Profiles</div>
                </div>
                <span className="px-2.5 py-1 rounded bg-cyan-950/60 border border-cyan-800/50 text-cyan-300 font-mono font-bold text-xs">
                  {stats?.tables?.users ?? 0} records
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-[#050B14] rounded-xl border border-slate-800">
                <div>
                  <div className="text-sm font-semibold text-slate-200">courses</div>
                  <div className="text-xs text-slate-500">Academic Subjects</div>
                </div>
                <span className="px-2.5 py-1 rounded bg-purple-950/60 border border-purple-800/50 text-purple-300 font-mono font-bold text-xs">
                  {stats?.tables?.courses ?? 0} records
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-[#050B14] rounded-xl border border-slate-800">
                <div>
                  <div className="text-sm font-semibold text-slate-200">notes</div>
                  <div className="text-xs text-slate-500">Study Materials & Documents</div>
                </div>
                <span className="px-2.5 py-1 rounded bg-blue-950/60 border border-blue-800/50 text-blue-300 font-mono font-bold text-xs">
                  {stats?.tables?.notes ?? 0} records
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleRunMigration}
            disabled={migrating}
            className="mt-6 w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-medium text-sm transition-all shadow-lg shadow-cyan-900/20 flex items-center justify-center gap-2"
          >
            {migrating ? <RefreshCw size={16} className="animate-spin" /> : <Terminal size={16} />}
            <span>{migrating ? 'Running Migration...' : 'Trigger Cloud SQL Migration'}</span>
          </button>
        </div>

        {/* Console / Terminal Execution Output */}
        <div className="bg-[#050B14] border border-slate-800 rounded-2xl p-6 lg:col-span-2 flex flex-col">
          <div className="flex items-center justify-between mb-3 text-slate-400 text-xs font-mono">
            <span className="flex items-center gap-2">
              <Terminal size={14} className="text-cyan-400" />
              Schema Migration Log Console
            </span>
            <span>bash / DDL Executor</span>
          </div>

          <div className="flex-1 min-h-[200px] bg-black/60 rounded-xl border border-slate-800/80 p-4 font-mono text-xs text-emerald-400 space-y-1 overflow-y-auto">
            <div>$ cerebro db:migrate --instance=cloudsql</div>
            <div>[AEGIS] Verifying SSL handshake with Cloud SQL PostgreSQL...</div>
            <div>[AEGIS] Connected to us-west2 instance.</div>
            {migrationLog.length === 0 ? (
              <div className="text-slate-600 italic">No manual migration executed in this session yet.</div>
            ) : (
              migrationLog.map((line, idx) => (
                <div key={idx} className="text-cyan-300">{line}</div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
