import React, { useState, useEffect } from 'react';
import { api } from '../../lib/api';
import { useToast } from '../../components/Toast';

export const SettingsView = () => {
  const { addToast } = useToast();
  const [canvasConnected, setCanvasConnected] = useState(false);
  const [isConnectingCanvas, setIsConnectingCanvas] = useState(false);
  const [canvasToken, setCanvasToken] = useState('');

  useEffect(() => {
    api
      .get('/canvas/status')
      .then((res) => setCanvasConnected(res.connected))
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

  const signOut = () => {
    localStorage.removeItem('onboardingStarted');
    window.location.reload();
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-wide mb-6">
          Settings
        </h2>
      </div>

      <section className="bg-[#0A111F] rounded-2xl border border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-slate-800">
          <h3 className="text-lg font-medium text-slate-200 mb-1">
            Account Profile
          </h3>
          <p className="text-sm text-slate-500">
            Manage your identity and authentication
          </p>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-slate-300">
                Email Address
              </p>
              <p className="text-sm text-slate-500 mt-1">Student Mode</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-900/20 text-emerald-400 text-xs font-medium border border-emerald-900/30">
              Verified
            </span>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-slate-300">Account ID</p>
              <p className="text-xs font-mono text-slate-500 mt-1">
                LOCAL_SUBJECT_ID
              </p>
            </div>
          </div>
          <div className="pt-4 border-t border-slate-800">
            <button
              onClick={signOut}
              className="text-sm text-red-400 hover:text-red-300 font-medium transition-colors"
            >
              Sign out of all devices
            </button>
          </div>
        </div>
      </section>

      <section className="bg-[#0A111F] rounded-2xl border border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-slate-800">
          <h3 className="text-lg font-medium text-slate-200 mb-1">
            Integrations
          </h3>
          <p className="text-sm text-slate-500">
            Connect external academic sources
          </p>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded bg-red-900/20 border border-red-900/30 flex items-center justify-center text-red-500 font-bold">
                C
              </div>
              <div>
                <p className="text-sm font-medium text-slate-300">Canvas LMS</p>
                <p className="text-xs text-slate-500 mt-1">
                  {canvasConnected ? 'Connected & syncing' : 'Not connected'}
                </p>
              </div>
            </div>
            {canvasConnected ? (
              <button
                onClick={handleDisconnectCanvas}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-red-400 font-medium text-sm transition-colors"
              >
                Disconnect
              </button>
            ) : (
              <button
                onClick={() => setIsConnectingCanvas(!isConnectingCanvas)}
                className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-sm transition-colors shadow-lg shadow-cyan-900/20"
              >
                {isConnectingCanvas ? 'Cancel' : 'Connect'}
              </button>
            )}
          </div>

          {isConnectingCanvas && !canvasConnected && (
            <form
              onSubmit={handleConnectCanvas}
              className="mt-4 p-4 bg-[#050B14] rounded-xl border border-cyan-900/30"
            >
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Canvas Access Token
              </label>
              <div className="flex gap-3">
                <input
                  type="password"
                  required
                  value={canvasToken}
                  onChange={(e) => setCanvasToken(e.target.value)}
                  className="flex-1 bg-[#0A111F] border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors text-sm"
                  placeholder="Enter your Canvas API token"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-sm transition-colors"
                >
                  Save
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-3">
                You can generate this in Canvas under Account {'>'} Settings{' '}
                {'>'} New Access Token. Your token is encrypted at rest using
                AES-256-GCM.
              </p>
            </form>
          )}
        </div>
      </section>

      <section className="bg-[#0A111F] rounded-2xl border border-red-900/30 overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-medium text-red-400 mb-2">Danger Zone</h3>
          <p className="text-sm text-slate-500 mb-6">
            Permanently delete your account and all associated academic data.
          </p>
          <button className="px-4 py-2 rounded-lg bg-red-900/20 hover:bg-red-900/40 border border-red-900/50 text-red-400 font-medium text-sm transition-colors">
            Delete Account
          </button>
        </div>
      </section>
    </div>
  );
};
