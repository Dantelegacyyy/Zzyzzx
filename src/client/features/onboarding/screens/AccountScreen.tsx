import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

export function AccountScreen({
  onNext,
  onExistingUserComplete,
  onBack,
}: {
  onNext: (user: any) => void;
  onExistingUserComplete: (user: any) => void;
  onBack: () => void;
}) {
  const [mode, setMode] = useState<'signup' | 'signin'>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg(null);

    const targetEmail = email.trim() || (mode === 'signin' ? 'alex.returning@asu.edu' : 'alex@asu.edu');

    try {
      setLoading(true);
      const endpoint = mode === 'signup' ? '/api/auth/register' : '/api/auth/login';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: targetEmail,
          password: password || 'SecureAcademicPass123!',
          name: targetEmail.split('@')[0],
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      const user = data.user;
      if (user?.onboardingComplete) {
        // Existing user with completed onboarding -> immediately exit onboarding to Welcome Back screen
        onExistingUserComplete(user);
      } else {
        // New user or incomplete onboarding -> proceed to Screen 05 (Profile)
        onNext(user);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      setLoading(true);
      setErrorMsg(null);
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim() || 'alex.google@asu.edu',
          name: 'Alex',
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Google authentication failed');

      const user = data.user;
      if (user?.onboardingComplete) {
        onExistingUserComplete(user);
      } else {
        onNext(user);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Google login error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between py-2 text-center text-slate-900 bg-[#FAFBFD] rounded-3xl p-6 sm:p-8 shadow-2xl transition-all">
      {/* Top Header */}
      <div className="flex items-center justify-between text-xs font-mono font-bold tracking-wider text-[#007AFF] uppercase mb-3">
        <span>04 CREATE ACCOUNT / SIGN IN</span>
      </div>

      {/* Center Hero Content */}
      <div className="my-auto flex flex-col items-center py-2 max-w-sm mx-auto w-full">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight mb-4">
          {mode === 'signup' ? "Let's get you started." : 'Welcome back.'}
        </h2>

        {errorMsg && (
          <div className="w-full mb-3 p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 text-left">
            <AlertCircle size={15} className="shrink-0 text-red-500" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Continue with Google Button */}
        <button
          type="button"
          onClick={handleGoogleAuth}
          disabled={loading}
          className="w-full py-3 px-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-3 text-xs sm:text-sm font-semibold text-slate-700 active:scale-[0.99] mb-4 cursor-pointer"
        >
          {/* Google SVG G Icon */}
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.9c2.28-2.1 3.6-5.2 3.6-9.14z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.9-3.05c-1.08.72-2.45 1.16-4.03 1.16-3.1 0-5.74-2.1-6.68-4.92H1.2v3.15C3.25 21.46 7.34 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.32 14.28c-.24-.72-.37-1.49-.37-2.28s.13-1.56.37-2.28V6.57H1.2C.43 8.1 0 9.99 0 12s.43 3.9 1.2 5.43l4.12-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.25 2.54 1.2 6.57l4.12 3.15c.94-2.82 3.58-4.92 6.68-4.92z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 w-full my-2">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-xs text-slate-400 font-medium">or</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        {/* Inputs */}
        <form onSubmit={handleSubmit} className="w-full space-y-3 mt-2 text-left">
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={mode === 'signup' ? 'you@university.edu' : 'alex.returning@asu.edu'}
              className="w-full py-2.5 px-3.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 shadow-inner"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full py-2.5 px-3.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 shadow-inner pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 active:scale-[0.98] text-white font-bold text-xs sm:text-sm shadow-[0_4px_20px_rgba(99,102,241,0.4)] transition-all flex items-center justify-center cursor-pointer"
            >
              {loading
                ? 'Verifying...'
                : mode === 'signup'
                ? 'Create Account'
                : 'Sign In'}
            </button>
          </div>
        </form>

        <button
          type="button"
          onClick={() => {
            setMode(mode === 'signup' ? 'signin' : 'signup');
            setErrorMsg(null);
          }}
          className="text-xs text-indigo-600 hover:underline font-medium mt-3 cursor-pointer"
        >
          {mode === 'signup'
            ? 'Already have an account? Sign in'
            : "Don't have an account? Create one"}
        </button>
      </div>

      {/* Bottom Actions & Pagination Dots */}
      <div className="w-full space-y-2 pt-2">
        <div className="flex items-center justify-between max-w-xs mx-auto text-xs text-slate-500">
          <button
            onClick={onBack}
            className="hover:text-slate-900 font-medium transition-colors cursor-pointer"
          >
            Back
          </button>

          {/* Pagination Dots with dot 3 active */}
          <div className="flex items-center gap-1.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === 3 ? 'w-4 bg-indigo-500' : 'w-1.5 bg-slate-300'
                }`}
              />
            ))}
          </div>

          <span className="w-8" />
        </div>
      </div>
    </div>
  );
}
