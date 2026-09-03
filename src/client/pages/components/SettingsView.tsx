import React, { useState, useEffect } from 'react';
import { api } from '../../lib/api';
import { useToast } from '../../components/Toast';

export const SettingsView = () => {
  const { addToast } = useToast();
  const [canvasConnected, setCanvasConnected] = useState(false);
  const [isConnectingCanvas, setIsConnectingCanvas] = useState(false);
  const [canvasToken, setCanvasToken] = useState('');
  const [userInfo, setUserInfo] = useState<{ email?: string; subjectId?: string; role?: string } | null>(null);

  useEffect(() => {
    api
      .get('/canvas/status')
      .then((res) => setCanvasConnected(res.connected))
      .catch(console.error);

    api
      .get('/auth/me')
      .then((res) => {
        if (res.user) setUserInfo(res.user);
      })
      .catch(console.error);
  }, []);

  const handleConnectCanvas = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canvasToken.trim()) return;
    try {
      addToast('Validating token and securing via AEGIS...', 'info');
      await api.post('/canvas/token', { token: canvasToken });
      setCanvasConnected(true);
      setIsConnectingCanvas(false);
      setCanvasToken('');
      addToast('Canvas connected successfully. Token encrypted.', 'success');
    } catch (error) {
      addToast('Failed to connect Canvas. Check your token.', 'error');
    }
  };

  const handleDisconnectCanvas = async () => {
    try {
      await api.delete('/canvas/token');
      setCanvasConnected(false);
      addToast('Canvas disconnected.', 'info');
    } catch (error) {
      console.error(error);
      addToast('Failed to disconnect Canvas.', 'error');
    }
  };

  const signOut = async () => {
    try {
      await api.post('/auth/logout', {});
      addToast('Signed out. HttpOnly session cleared.', 'info');
      window.location.reload();
    } catch (error) {
      console.error('Logout error:', error);
      window.location.reload();
    }
  };

  const resetOnboarding = async () => {
    try {
      await api.post('/auth/reset-onboarding', {});
      addToast('Onboarding reset. Session token updated.', 'info');
      window.location.reload();
    } catch (error) {
      console.error('Reset onboarding error:', error);
    }
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight mb-2">
          System Settings & Connections
        </h2>
        <p className="text-xs text-slate-400 font-mono">Managed by AEGIS Protocol • Cerebro Core</p>
      </div>

      <section className="glass-panel rounded-3xl overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h3 className="text-base font-bold text-slate-100 mb-0.5">
            Account Profile & JWT Session
          </h3>
          <p className="text-xs text-slate-400">
            Secure HttpOnly cookie session management
          </p>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Email Address
              </p>
              <p className="text-sm text-cyan-300 font-mono mt-1 font-semibold">{userInfo?.email || 'commander@cerebro.edu'}</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
              HttpOnly JWT Active
            </span>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Account Subject ID</p>
              <p className="text-xs font-mono text-slate-300 mt-1">
                {userInfo?.subjectId || 'SUBJECT_ID_ACTIVE'}
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-white/10 text-slate-200 text-xs font-mono border border-white/10">
              {userInfo?.role || 'STUDENT'}
            </span>
          </div>
          <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
            <button
              onClick={signOut}
              className="text-xs text-rose-400 hover:text-rose-300 font-semibold transition-colors"
            >
              Sign out of session (Clear HttpOnly Cookie)
            </button>
            <button
              onClick={resetOnboarding}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
            >
              Re-run Onboarding Flow
            </button>
          </div>
        </div>
      </section>

      <section className="glass-panel rounded-3xl overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h3 className="text-base font-bold text-slate-100 mb-0.5">
            Academic Integrations
          </h3>
          <p className="text-xs text-slate-400">
            Connect external academic sources and LMS APIs
          </p>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 font-bold">
                C
              </div>
              <div>
                <p className="text-sm font-bold text-white">Canvas LMS Sync</p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {canvasConnected ? 'Connected & syncing active' : 'Not connected'}
                </p>
              </div>
            </div>
            {canvasConnected ? (
              <button
                onClick={handleDisconnectCanvas}
                className="glass-pill px-4 py-2 rounded-xl text-rose-400 hover:text-rose-300 font-semibold text-xs transition-all"
              >
                Disconnect
              </button>
            ) : (
              <button
                onClick={() => setIsConnectingCanvas(!isConnectingCanvas)}
                className="glass-button-primary px-4 py-2 rounded-xl text-white font-semibold text-xs transition-all"
              >
                {isConnectingCanvas ? 'Cancel' : 'Connect'}
              </button>
            )}
          </div>

          {isConnectingCanvas && !canvasConnected && (
            <form
              onSubmit={handleConnectCanvas}
              className="mt-4 p-4 glass-card rounded-2xl"
            >
              <label className="block text-xs font-semibold text-slate-200 mb-2">
                Canvas Access Token
              </label>
              <div className="flex gap-3">
                <input
                  type="password"
                  required
                  value={canvasToken}
                  onChange={(e) => setCanvasToken(e.target.value)}
                  className="flex-1 glass-input rounded-xl px-3.5 py-2.5 text-slate-100 text-xs placeholder:text-slate-500"
                  placeholder="Enter your Canvas API token"
                />
                <button
                  type="submit"
                  className="glass-button-primary px-4 py-2.5 rounded-xl text-white font-semibold text-xs"
                >
                  Save Token
                </button>
              </div>
              <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                Generate this in Canvas under Account {'>'} Settings {'>'} New Access Token. Your token is encrypted at rest using AES-256-GCM.
              </p>
            </form>
          )}
        </div>
      </section>

      <section className="glass-panel rounded-3xl overflow-hidden border-rose-500/20">
        <div className="p-6">
          <h3 className="text-base font-bold text-rose-400 mb-1">Danger Zone</h3>
          <p className="text-xs text-slate-400 mb-6">
            Permanently delete your account and all associated academic data.
          </p>
          <button className="px-4 py-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 font-semibold text-xs transition-all">
            Delete Account Data
          </button>
        </div>
      </section>
    </div>
  );
};
