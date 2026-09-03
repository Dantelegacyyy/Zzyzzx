import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  Activity,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Server,
  Lock,
  Smartphone,
  Cpu,
  Layers,
  Zap,
  Globe,
  FileCheck,
  Database,
  Code,
  Sparkles,
} from 'lucide-react';

export function AegisSecurityDashboard() {
  const [activeTab, setActiveTab] = useState<'security' | 'stability' | 'operational' | 'appstore'>('security');
  const [loading, setLoading] = useState(false);

  const [securityData, setSecurityData] = useState<any>(null);
  const [stabilityData, setStabilityData] = useState<any>(null);
  const [operationalData, setOperationalData] = useState<any>(null);
  const [appStoreData, setAppStoreData] = useState<any>(null);

  const runAllAudits = async () => {
    setLoading(true);
    try {
      const [secRes, stabRes, opRes, storeRes] = await Promise.all([
        fetch('/api/aegis/audit'),
        fetch('/api/admin/stability'),
        fetch('/api/aegis/operational-tests'),
        fetch('/api/aegis/appstore-report'),
      ]);

      if (secRes.ok) setSecurityData(await secRes.ok && await secRes.json());
      if (stabRes.ok) setStabilityData(await stabRes.json());
      if (opRes.ok) setOperationalData(await opRes.json());
      if (storeRes.ok) setAppStoreData(await storeRes.json());
    } catch (err) {
      console.error('Failed to run AEGIS security audits:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runAllAudits();
  }, []);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="glass-panel rounded-3xl p-6 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="absolute -right-8 -bottom-8 w-64 h-64 bg-cyan-500/15 rounded-full blur-[90px] pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold tracking-wider uppercase mb-1">
            <ShieldCheck size={16} className="text-cyan-400 animate-pulse" />
            <span>AEGIS Guardian Security Center</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Security, Stability & Launch Audit</h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-0.5">
            Automated firewall monitoring, operational test suites, and App Store readiness verification.
          </p>
        </div>

        <button
          onClick={runAllAudits}
          disabled={loading}
          className="relative z-10 glass-button-primary px-4 py-2.5 rounded-2xl text-white font-bold text-xs flex items-center gap-2 shrink-0 self-start md:self-auto"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          <span>Execute Full System Test</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex glass-panel p-1.5 rounded-2xl text-xs font-semibold overflow-x-auto gap-1">
        <button
          onClick={() => setActiveTab('security')}
          className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'security'
              ? 'bg-cyan-500 text-zinc-950 font-bold shadow-[0_0_15px_rgba(34,211,238,0.4)]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <ShieldCheck size={14} />
          <span>AEGIS Security</span>
        </button>
        <button
          onClick={() => setActiveTab('stability')}
          className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'stability'
              ? 'bg-cyan-500 text-zinc-950 font-bold shadow-[0_0_15px_rgba(34,211,238,0.4)]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Activity size={14} />
          <span>Stability Test</span>
        </button>
        <button
          onClick={() => setActiveTab('operational')}
          className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'operational'
              ? 'bg-cyan-500 text-zinc-950 font-bold shadow-[0_0_15px_rgba(34,211,238,0.4)]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Zap size={14} />
          <span>Operational Test</span>
        </button>
        <button
          onClick={() => setActiveTab('appstore')}
          className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'appstore'
              ? 'bg-cyan-500 text-zinc-950 font-bold shadow-[0_0_15px_rgba(34,211,238,0.4)]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Smartphone size={14} />
          <span>App Store Report</span>
        </button>
      </div>

      {/* Tab 1: AEGIS Security Check & Firewalls */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          {securityData ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="glass-card p-5 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="text-slate-400 text-xs uppercase font-bold tracking-wider">Overall Security Score</span>
                    <div className="text-3xl font-extrabold text-cyan-300 mt-1">{securityData.overallSecurityScore}%</div>
                  </div>
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-2xl border border-cyan-500/40 flex items-center justify-center text-cyan-300 font-bold text-lg">
                    🛡️
                  </div>
                </div>

                <div className="glass-card p-5 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="text-slate-400 text-xs uppercase font-bold tracking-wider">Firewall Status</span>
                    <div className="text-lg font-extrabold text-emerald-400 mt-1 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      {securityData.firewallStatus}
                    </div>
                  </div>
                  <Lock size={28} className="text-emerald-400" />
                </div>

                <div className="glass-card p-5 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="text-slate-400 text-xs uppercase font-bold tracking-wider">AEGIS Kernel Mode</span>
                    <div className="text-sm font-extrabold text-purple-300 mt-1">{securityData.aegisMode}</div>
                  </div>
                  <Cpu size={28} className="text-purple-400" />
                </div>
              </div>

              {/* Individual Checks Table */}
              <div className="glass-panel rounded-3xl p-6">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-cyan-400" />
                  <span>Security Protocol & Isolation Audit Results</span>
                </h3>
                <div className="space-y-3">
                  {securityData.checks?.map((check: any, idx: number) => (
                    <div key={idx} className="p-3.5 glass-card rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white">{check.testName}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-slate-400 border border-white/10">
                            {check.category}
                          </span>
                        </div>
                        <p className="text-slate-300 text-[11px]">{check.details}</p>
                      </div>
                      <span className={`self-start sm:self-auto px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border shrink-0 ${
                        check.status === 'PASSED'
                          ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                          : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                      }`}>
                        {check.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="glass-panel p-8 rounded-3xl text-center text-slate-400 text-xs">
              Loading AEGIS Security Check...
            </div>
          )}
        </div>
      )}

      {/* Tab 2: System Stability Report */}
      {activeTab === 'stability' && (
        <div className="space-y-6">
          {stabilityData ? (
            <div className="glass-panel rounded-3xl p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-base font-bold text-white">System Health & Latency Stability</h3>
                  <p className="text-xs text-slate-400">Timestamp: {new Date(stabilityData.timestamp).toLocaleString()}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                  stabilityData.overall === 'STABLE'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                }`}>
                  Overall Status: {stabilityData.overall}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="glass-card p-4 rounded-2xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-white text-xs flex items-center gap-1.5">
                      <Database size={14} className="text-cyan-400" /> Cloud SQL (PostgreSQL)
                    </span>
                    <span className="text-[10px] font-bold text-emerald-400">{stabilityData.services?.cloudsql?.status}</span>
                  </div>
                  <div className="text-xs text-slate-300">Latency: {stabilityData.services?.cloudsql?.latencyMs ?? 0} ms</div>
                </div>

                <div className="glass-card p-4 rounded-2xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-white text-xs flex items-center gap-1.5">
                      <Sparkles size={14} className="text-amber-400" /> Gemini 2.5 Flash API
                    </span>
                    <span className="text-[10px] font-bold text-emerald-400">{stabilityData.services?.gemini?.status}</span>
                  </div>
                  <div className="text-xs text-slate-300">Latency: {stabilityData.services?.gemini?.latencyMs ?? 0} ms</div>
                </div>

                <div className="glass-card p-4 rounded-2xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-white text-xs flex items-center gap-1.5">
                      <Globe size={14} className="text-blue-400" /> Canvas LMS API
                    </span>
                    <span className="text-[10px] font-bold text-emerald-400">{stabilityData.services?.canvas?.status}</span>
                  </div>
                  <div className="text-xs text-slate-300">Latency: {stabilityData.services?.canvas?.latencyMs ?? 0} ms</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-panel p-8 rounded-3xl text-center text-slate-400 text-xs">
              Loading System Stability Report...
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Operational Feature Test Report */}
      {activeTab === 'operational' && (
        <div className="space-y-6">
          {operationalData ? (
            <div className="glass-panel rounded-3xl p-6">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <Zap size={16} className="text-amber-400" />
                <span>Operational Test Report Across Core Workspace Features</span>
              </h3>
              <div className="space-y-3">
                {operationalData.results?.map((res: any, idx: number) => (
                  <div key={idx} className="p-3.5 glass-card rounded-2xl flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-white">{res.featureName}</div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">{res.endpoint}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-300 font-mono text-[11px]">{res.latencyMs} ms</span>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                        {res.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="glass-panel p-8 rounded-3xl text-center text-slate-400 text-xs">
              Loading Operational Feature Tests...
            </div>
          )}
        </div>
      )}

      {/* Tab 4: App Store Launch Readiness Report */}
      {activeTab === 'appstore' && (
        <div className="space-y-6">
          {appStoreData ? (
            <div className="space-y-6">
              <div className="glass-card p-6 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">App Store Launch Readiness Score</span>
                  <div className="text-3xl font-extrabold text-cyan-300 mt-1">{appStoreData.overallReadinessScore}% Ready</div>
                </div>
                <span className="px-4 py-2 rounded-2xl text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  Status: {appStoreData.status}
                </span>
              </div>

              <div className="glass-panel rounded-3xl p-6">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <FileCheck size={16} className="text-cyan-400" />
                  <span>iOS App Store & Google Play Launch Checklist</span>
                </h3>

                <div className="space-y-3">
                  {appStoreData.checklist?.map((item: any, idx: number) => (
                    <div key={idx} className="p-4 glass-card rounded-2xl space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-sm">{item.requirement}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-slate-400">{item.targetStore}</span>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                            item.status === 'COMPLETED'
                              ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                              : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                          }`}>
                            {item.status}
                          </span>
                        </div>
                      </div>
                      <p className="text-slate-300 text-xs leading-relaxed">{item.guidance}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-panel p-8 rounded-3xl text-center text-slate-400 text-xs">
              Loading App Store Report...
            </div>
          )}
        </div>
      )}
    </div>
  );
}
