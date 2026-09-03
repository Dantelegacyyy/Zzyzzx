import React, { useState, useEffect } from 'react';
import { Activity, RefreshCw, Filter, CheckCircle2, AlertTriangle, XCircle, Database, Server, Terminal, Clock } from 'lucide-react';

export interface ApiLog {
  id: string;
  timestamp: string;
  method: string;
  path: string;
  statusCode: number;
  durationMs: number;
  clientIp: string;
  statusText: string;
}

export function ApiLogsView() {
  const [logs, setLogs] = useState<ApiLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filterMethod, setFilterMethod] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [autoRefresh, setAutoRefresh] = useState<boolean>(true);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/logs');
      if (res.ok) {
        const data = await res.json();
        setLogs(data.logs || []);
      }
    } catch (err) {
      console.error('Failed to fetch API logs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(fetchLogs, 3000);
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const filteredLogs = logs.filter((log) => {
    if (filterMethod !== 'ALL' && log.method !== filterMethod) return false;
    if (filterStatus === '2XX' && (log.statusCode < 200 || log.statusCode >= 300)) return false;
    if (filterStatus === '4XX' && (log.statusCode < 400 || log.statusCode >= 500)) return false;
    if (filterStatus === '5XX' && log.statusCode < 500) return false;
    return true;
  });

  const getStatusBadge = (code: number) => {
    if (code >= 200 && code < 300) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <CheckCircle2 size={12} /> {code} OK
        </span>
      );
    }
    if (code >= 400 && code < 500) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <AlertTriangle size={12} /> {code} Bad Req
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
        <XCircle size={12} /> {code} Err
      </span>
    );
  };

  const getMethodBadge = (method: string) => {
    const colors: Record<string, string> = {
      GET: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
      POST: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      PUT: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      DELETE: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    };
    return (
      <span
        className={`px-2 py-0.5 rounded text-xs font-mono font-bold border ${colors[method] || 'bg-slate-800 text-slate-300 border-slate-700'}`}
      >
        {method}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel rounded-3xl p-6 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="absolute -right-8 -bottom-8 w-64 h-64 bg-cyan-500/15 rounded-full blur-[90px] pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold tracking-wider uppercase mb-1">
            <Activity size={16} className="animate-pulse" />
            <span>Real-time Telemetry Engine</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">API Connection & Endpoint Logs</h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-0.5">
            Monitoring live HTTP requests, Cloud SQL database queries, and Gemini 2.5 API traffic.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-2 ${
              autoRefresh
                ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                : 'glass-pill text-slate-400'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${autoRefresh ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
            {autoRefresh ? 'Live Streaming' : 'Paused'}
          </button>

          <button
            onClick={fetchLogs}
            disabled={loading}
            className="glass-pill px-3.5 py-2 text-slate-200 hover:text-white rounded-xl transition-all flex items-center gap-1.5 text-xs font-semibold"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin text-cyan-400' : ''} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 glass-panel p-4 rounded-2xl">
        <div className="flex items-center gap-3">
          <Filter size={16} className="text-slate-400" />
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Filter By:</span>

          <select
            value={filterMethod}
            onChange={(e) => setFilterMethod(e.target.value)}
            className="glass-input rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none"
          >
            <option value="ALL">All Methods</option>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="glass-input rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="2XX">2xx Success</option>
            <option value="4XX">4xx Client Error</option>
            <option value="5XX">5xx Server Error</option>
          </select>
        </div>

        <div className="text-xs text-slate-400 font-mono">
          Showing <span className="text-cyan-300 font-bold">{filteredLogs.length}</span> of {logs.length} logged events
        </div>
      </div>

      {/* Log Stream Table */}
      <div className="glass-panel rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-black/30 border-b border-white/10 text-xs font-mono text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5">Method</th>
                <th className="py-3.5 px-5">Endpoint Path</th>
                <th className="py-3.5 px-5">Latency</th>
                <th className="py-3.5 px-5">Client IP</th>
                <th className="py-3.5 px-5 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono text-xs">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <Terminal size={24} className="mx-auto mb-2 text-slate-500" />
                    No API connection events recorded yet. Perform an action to see real-time logs.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 px-5 whitespace-nowrap">{getStatusBadge(log.statusCode)}</td>
                    <td className="py-3.5 px-5 whitespace-nowrap">{getMethodBadge(log.method)}</td>
                    <td className="py-3.5 px-5 text-cyan-300 font-semibold whitespace-nowrap">{log.path}</td>
                    <td className="py-3.5 px-5 text-slate-300 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded-full border ${
                        log.durationMs > 200 
                          ? 'bg-amber-500/15 text-amber-300 border-amber-500/30' 
                          : 'bg-white/10 text-slate-200 border-white/10'
                      }`}>
                        {log.durationMs} ms
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-slate-400 whitespace-nowrap">{log.clientIp}</td>
                    <td className="py-3.5 px-5 text-right text-slate-400 whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
