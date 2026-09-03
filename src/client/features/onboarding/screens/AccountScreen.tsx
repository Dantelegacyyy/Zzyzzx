import React, { useState } from 'react';
import { OnboardingFrame } from '../components/OnboardingFrame';
import { PrimaryAction } from '../components/PrimaryAction';
import { SecondaryAction } from '../components/SecondaryAction';
import { KeyRound, Mail, Lock, ChevronRight } from 'lucide-react';

export function AccountScreen({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const [mode, setMode] = useState<'signin' | 'signup'>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAuth = async () => {
    try {
      setLoading(true);
      setError('');
      await new Promise((res) => setTimeout(res, 500));
      onNext();
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <OnboardingFrame>
      <div className="flex-1 flex flex-col justify-between py-2 w-full text-center">
        {/* Header Section */}
        <div>
          <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 text-[#007AFF] flex items-center justify-center mx-auto mb-4 shadow-sm">
            <KeyRound size={32} />
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight mb-2">
            Cerebro ID
          </h2>
          <p className="text-sm text-zinc-400 max-w-xs mx-auto leading-relaxed">
            {mode === 'signup'
              ? 'Create a Cerebro ID to store your courses and schedules securely.'
              : 'Sign in with your Cerebro ID to access your workspace.'}
          </p>
        </div>

        {error && (
          <div className="w-full p-3 bg-red-950/80 border border-red-800 text-red-300 text-xs rounded-xl my-2">
            {error}
          </div>
        )}

        {/* Grouped iOS Form Container */}
        <div className="my-auto py-4 space-y-4">
          <button
            onClick={handleAuth}
            disabled={loading}
            className="w-full min-h-[50px] flex items-center justify-center gap-3 bg-zinc-900 border border-zinc-800 text-white rounded-2xl font-medium hover:bg-zinc-800 transition-all shadow-sm active:scale-[0.98]"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-zinc-800" />
            <span className="text-[10px] font-mono uppercase text-zinc-500 tracking-widest">
              OR EMAIL
            </span>
            <div className="flex-1 h-px bg-zinc-800" />
          </div>

          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl overflow-hidden divide-y divide-zinc-800/80 text-left">
            <div className="flex items-center px-4 py-3 gap-3">
              <Mail size={18} className="text-zinc-500 shrink-0" />
              <input
                type="email"
                placeholder="Academic Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent text-white focus:outline-none text-sm placeholder-zinc-500"
              />
            </div>
            <div className="flex items-center px-4 py-3 gap-3">
              <Lock size={18} className="text-zinc-500 shrink-0" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent text-white focus:outline-none text-sm placeholder-zinc-500"
              />
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="w-full space-y-2 pt-2">
          <PrimaryAction
            onClick={handleAuth}
            className="w-full"
            disabled={loading || !email || !password}
          >
            {mode === 'signup' ? 'Create Cerebro ID' : 'Sign In'}
          </PrimaryAction>

          <button
            onClick={() => setMode(mode === 'signup' ? 'signin' : 'signup')}
            className="text-[#007AFF] hover:underline text-xs font-medium pt-1"
          >
            {mode === 'signup'
              ? 'Already have a Cerebro ID?'
              : "Don't have a Cerebro ID?"}
          </button>
        </div>
      </div>
    </OnboardingFrame>
  );
}


