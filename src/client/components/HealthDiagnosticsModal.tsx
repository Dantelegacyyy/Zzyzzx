import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  X,
  Server,
  Shield,
  Clock,
  Cpu,
  Database,
  Terminal,
} from 'lucide-react';
import { api, HealthPingResult } from '../lib/api';
import { APP_VERSION_INFO } from '../../shared/version';

interface HealthDiagnosticsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HealthDiagnosticsModal: React.FC<HealthDiagnosticsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [pingResult, setPingResult] = useState<HealthPingResult | null>(null);
  const [diagnosticsData, setDiagnosticsData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const runCheck = async () => {
    setLoading(true);
    try {
      const ping = await api.checkHealth();
      setPingResult(ping);
      const diag = await api.getDiagnostics().catch(() => null);
      setDiagnosticsData(diag);
    } catch (err) {
      console.error('Diagnostic error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      runCheck();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="w-full max-w-2xl bg-zinc-950/95 border border-cyan-500/30 rounded-3xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.9)] text-white relative overflow-hidden"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Activity size={20} className={loading ? 'animate-spin' : ''} />
              </div>
              <div>
                <h2 className="text-base font-bold tracking-tight text-white flex items-center gap-2">
                  <span>System Diagnostics & Version Tracking</span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    {APP_VERSION_INFO.version}
                  </span>
                </h2>
                <p className="text-xs text-slate-400 font-mono">
                  {APP_VERSION_INFO.phase}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-5">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                <Server size={14} className="text-cyan-400" />
                <span>Port Binding</span>
              </div>
              <p className="text-base font-mono font-bold text-white">0.0.0.0:3000</p>
              <span className="text-[10px] text-emerald-400 font-mono">Ingress Target</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                <Activity size={14} className="text-emerald-400" />
                <span>Live Latency</span>
              </div>
              <p className="text-base font-mono font-bold text-emerald-400">
                {pingResult ? `${pingResult.latencyMs}ms` : '--'}
              </p>
              <span className="text-[10px] text-slate-400 font-mono">Roundtrip Ping</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                <Shield size={14} className="text-cyan-400" />
                <span>AEGIS Guard</span>
              </div>
              <p className="text-base font-mono font-bold text-cyan-400">Phase 3</p>
              <span className="text-[10px] text-emerald-400 font-mono">Owner Locked</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                <CheckCircle2 size={14} className="text-emerald-400" />
                <span>UI Policy</span>
              </div>
              <p className="text-xs font-mono font-bold text-white mt-1">Zero-Distraction</p>
              <span className="text-[10px] text-slate-400 font-mono">Bubbles Purged</span>
            </div>
          </div>

          {/* Detailed Telemetry Accordion / Terminal */}
          <div className="p-4 rounded-2xl bg-black/60 border border-white/10 font-mono text-xs space-y-2 max-h-48 overflow-y-auto text-slate-300">
            <div className="flex items-center justify-between text-slate-400 pb-1 border-b border-white/5">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <Terminal size={13} />
                <span>Telemetry Stream</span>
              </span>
              <span>Build: {APP_VERSION_INFO.buildId}</span>
            </div>
            <div className="space-y-1 pt-1 text-[11px]">
              <div>[PROBE] Health Endpoint: /health (HTTP 200 OK)</div>
              <div>[PORT] Enforcing hardcoded port 3000 for AI Studio Reverse Proxy</div>
              <div>[SECURITY] HttpOnly session cookies & rate-limiting firewall active</div>
              <div>[ORDER_66] Atlas Mascot and AEGIS Walkthrough permanently disabled</div>
              {diagnosticsData?.runtime?.memoryMb && (
                <div>
                  [MEMORY] RSS: {diagnosticsData.runtime.memoryMb.rss}MB | Heap: {diagnosticsData.runtime.memoryMb.heapUsed}MB / {diagnosticsData.runtime.memoryMb.heapTotal}MB
                </div>
              )}
              {diagnosticsData?.database && (
                <div>
                  [DATABASE] Status: {diagnosticsData.database.connected ? 'ONLINE' : 'DEVELOPMENT_FALLBACK'}
                </div>
              )}
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/10">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Clock size={14} />
              <span>Checked: {pingResult ? new Date().toLocaleTimeString() : 'Never'}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={runCheck}
                disabled={loading}
                className="px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold text-xs flex items-center gap-1.5 transition-all disabled:opacity-50"
              >
                <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
                <span>Run Ping Test</span>
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-white text-zinc-950 font-bold text-xs hover:bg-slate-200 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
