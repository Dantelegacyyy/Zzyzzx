import React, { useState } from 'react';
import { OnboardingFrame } from '../components/OnboardingFrame';
import { PrimaryAction } from '../components/PrimaryAction';

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
      // Mocking auth delay
      await new Promise((res) => setTimeout(res, 500));
      onNext();
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <OnboardingFrame theme="light">
      <div className="w-full max-w-sm mx-auto flex flex-col items-center text-center">
        <h2 className="text-3xl font-medium text-slate-900 mb-8">
          {mode === 'signup' ? 'Create Account' : 'Sign In'}
        </h2>

        {error && (
          <div className="w-full p-3 mb-4 bg-red-50 text-red-700 text-sm rounded-lg">
            {error}
          </div>
        )}

        <button
          onClick={handleAuth}
          disabled={loading}
          className="w-full min-h-[44px] flex items-center justify-center gap-3 bg-white border border-slate-200 text-slate-700 rounded-full font-medium hover:bg-slate-50 transition-colors mb-8 shadow-sm"
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
          Continue with Google
        </button>

        <div className="w-full flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-slate-200"></div>
          <span className="text-sm text-slate-400 uppercase tracking-wider">
            or
          </span>
          <div className="flex-1 h-px bg-slate-200"></div>
        </div>

        <div className="w-full space-y-4 mb-8">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full min-h-[44px] px-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full min-h-[44px] px-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400"
          />
        </div>

        <PrimaryAction
          onClick={handleAuth}
          className="w-full mb-4"
          disabled={loading || !email || !password}
        >
          {mode === 'signup' ? 'Create Account' : 'Sign In'}
        </PrimaryAction>

        <button
          onClick={() => setMode(mode === 'signup' ? 'signin' : 'signup')}
          className="text-slate-500 text-sm hover:text-slate-800"
        >
          {mode === 'signup'
            ? 'Existing account? Sign In'
            : 'Need an account? Create one'}
        </button>
      </div>
    </OnboardingFrame>
  );
}
