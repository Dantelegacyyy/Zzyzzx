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
      <div className="bg-[#0A111F] border border-cyan-900/40 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold tracking-wider uppercase mb-1">
            <Activity size={16} className="animate-pulse" />
            <span>Real-time Telemetry</span>
          </div>
          <h2 className="text-2xl font-bold text-white">API Connection Logs</h2>
          <p className="text-slate-400 text-sm mt-0.5">
            Monitoring live HTTP requests, Cloud SQL database calls, and Gemini AI endpoints.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all flex items-center gap-2 ${
              autoRefresh
                ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800/50'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${autoRefresh ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
            {autoRefresh ? 'Live Streaming' : 'Paused'}
          </button>

          <button
            onClick={fetchLogs}
            disabled={loading}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-colors flex items-center gap-1 text-xs"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin text-cyan-400' : ''} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[#0A111F]/80 p-4 rounded-xl border border-slate-800">
        <div className="flex items-center gap-3">
          <Filter size={16} className="text-slate-400" />
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Filter By:</span>

          <select
            value={filterMethod}
            onChange={(e) => setFilterMethod(e.target.value)}
            className="bg-[#050B14] border border-slate-700 rounded-lg px-3 py-1 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
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
            className="bg-[#050B14] border border-slate-700 rounded-lg px-3 py-1 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            <option value="ALL">All Statuses</option>
            <option value="2XX">2xx Success</option>
            <option value="4XX">4xx Client Error</option>
            <option value="5XX">5xx Server Error</option>
          </select>
        </div>

        <div className="text-xs text-slate-400 font-mono">
          Showing <span className="text-cyan-400 font-bold">{filteredLogs.length}</span> of {logs.length} logged events
        </div>
      </div>

      {/* Log Stream Table */}
      <div className="bg-[#0A111F] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-[#050B14] border-b border-slate-800 text-xs font-mono text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Method</th>
                <th className="py-3 px-4">Endpoint Path</th>
                <th className="py-3 px-4">Latency</th>
                <th className="py-3 px-4">Client IP</th>
                <th className="py-3 px-4 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    <Terminal size={24} className="mx-auto mb-2 text-slate-600" />
                    No API connection events recorded yet. Perform an action to see real-time logs.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 whitespace-nowrap">{getStatusBadge(log.statusCode)}</td>
                    <td className="py-3 px-4 whitespace-nowrap">{getMethodBadge(log.method)}</td>
                    <td className="py-3 px-4 text-cyan-300 font-medium whitespace-nowrap">{log.path}</td>
                    <td className="py-3 px-4 text-slate-300 whitespace-nowrap">
                      <span className={`px-1.5 py-0.5 rounded ${log.durationMs > 200 ? 'bg-amber-500/10 text-amber-400' : 'bg-slate-800 text-slate-300'}`}>
                        {log.durationMs} ms
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-400 whitespace-nowrap">{log.clientIp}</td>
                    <td className="py-3 px-4 text-right text-slate-500 whitespace-nowrap">
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
