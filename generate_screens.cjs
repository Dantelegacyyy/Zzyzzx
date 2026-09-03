const fs = require('fs');
const path = require('path');

const screens = {
  'HelloScreen.tsx': `
import React from 'react';
import { OnboardingFrame } from '../components/OnboardingFrame';
import { PrimaryAction } from '../components/PrimaryAction';
import { Brain } from 'lucide-react';

export function HelloScreen({ onNext }: { onNext: () => void }) {
  return (
    <OnboardingFrame theme="dark">
      <div className="flex flex-col items-center text-center space-y-12">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500/20 blur-[60px] rounded-full"></div>
          <Brain className="w-24 h-24 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)] relative z-10" />
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-medium tracking-wide text-white">Welcome to CEREBRO</h1>
          <p className="text-xl text-slate-400 font-light tracking-wide">Your academic command center.</p>
        </div>
        <PrimaryAction onClick={onNext} className="mt-8 bg-cyan-900/50 hover:bg-cyan-800 text-cyan-100 border border-cyan-700/50">Begin</PrimaryAction>
      </div>
    </OnboardingFrame>
  );
}
  `,
  'WelcomeScreen.tsx': `
import React from 'react';
import { OnboardingFrame } from '../components/OnboardingFrame';
import { PrimaryAction } from '../components/PrimaryAction';
import { SecondaryAction } from '../components/SecondaryAction';
import { BookOpen, Calendar, CheckSquare, Layers } from 'lucide-react';

export function WelcomeScreen({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  return (
    <OnboardingFrame theme="light">
      <div className="w-full max-w-lg mx-auto flex flex-col items-center">
        <h2 className="text-3xl font-medium text-slate-900 mb-4 text-center">All your knowledge.<br/>All your courses.<br/>All in one place.</h2>
        
        <div className="w-full space-y-6 my-12">
          {[
            { icon: <BookOpen />, title: "Study Smarter" },
            { icon: <Layers />, title: "Stay Organized" },
            { icon: <Calendar />, title: "Save Time" },
            { icon: <CheckSquare />, title: "Reach Your Goals" }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <div className="p-3 bg-slate-50 rounded-xl text-slate-700">{item.icon}</div>
              <span className="text-lg font-medium text-slate-800">{item.title}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-4 w-full">
          <SecondaryAction onClick={onBack} className="flex-1">Back</SecondaryAction>
          <PrimaryAction onClick={onNext} className="flex-1">Continue</PrimaryAction>
        </div>
      </div>
    </OnboardingFrame>
  );
}
  `,
  'PrivacyScreen.tsx': `
import React from 'react';
import { OnboardingFrame } from '../components/OnboardingFrame';
import { PrimaryAction } from '../components/PrimaryAction';
import { SecondaryAction } from '../components/SecondaryAction';
import { Shield } from 'lucide-react';

export function PrivacyScreen({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  return (
    <OnboardingFrame theme="light">
      <div className="w-full max-w-lg mx-auto flex flex-col items-center">
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8">
          <Shield className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-medium text-slate-900 mb-2 text-center">Your data is yours.</h2>
        <p className="text-xl text-slate-600 mb-12 text-center">You're in control.</p>

        <ul className="space-y-6 w-full mb-12">
          {[
            "We store only what is needed to power Cerebro.",
            "You own your data.",
            "You decide what to connect.",
            "Cerebro does not collect your school password.",
            "AI features operate only on permitted workspace context."
          ].map((stmt, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 shrink-0" />
              <span className="text-slate-700 text-lg leading-relaxed">{stmt}</span>
            </li>
          ))}
        </ul>

        <div className="flex gap-4 w-full">
          <SecondaryAction onClick={onBack} className="flex-1">Back</SecondaryAction>
          <PrimaryAction onClick={() => {
            // Persist privacy acknowledgement here
            onNext();
          }} className="flex-1">I Understand</PrimaryAction>
        </div>
      </div>
    </OnboardingFrame>
  );
}
  `,
  'AccountScreen.tsx': `
import React, { useState } from 'react';
import { OnboardingFrame } from '../components/OnboardingFrame';
import { PrimaryAction } from '../components/PrimaryAction';
import { SecondaryAction } from '../components/SecondaryAction';
import { auth } from '../../../lib/firebase';
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { api } from '../../../lib/api';

export function AccountScreen({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [mode, setMode] = useState<'signin' | 'signup'>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAuth = async (action: () => Promise<any>) => {
    try {
      setLoading(true);
      setError('');
      await action();
      onNext(); // Navigate forward once firebase auth succeeds
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = () => handleAuth(() => signInWithPopup(auth, new GoogleAuthProvider()));
  const handleEmailAuth = () => handleAuth(() => {
    return mode === 'signup' 
      ? createUserWithEmailAndPassword(auth, email, password)
      : signInWithEmailAndPassword(auth, email, password);
  });

  return (
    <OnboardingFrame theme="light">
      <div className="w-full max-w-sm mx-auto flex flex-col items-center text-center">
        <h2 className="text-3xl font-medium text-slate-900 mb-8">
          {mode === 'signup' ? 'Create Account' : 'Sign In'}
        </h2>
        
        {error && <div className="w-full p-3 mb-4 bg-red-50 text-red-700 text-sm rounded-lg">{error}</div>}

        <button 
          onClick={handleGoogle}
          disabled={loading}
          className="w-full min-h-[44px] flex items-center justify-center gap-3 bg-white border border-slate-200 text-slate-700 rounded-full font-medium hover:bg-slate-50 transition-colors mb-8 shadow-sm"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
          Continue with Google
        </button>

        <div className="w-full flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-slate-200"></div>
          <span className="text-sm text-slate-400 uppercase tracking-wider">or</span>
          <div className="flex-1 h-px bg-slate-200"></div>
        </div>

        <div className="w-full space-y-4 mb-8">
          <input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full min-h-[44px] px-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400"
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full min-h-[44px] px-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400"
          />
        </div>

        <PrimaryAction onClick={handleEmailAuth} className="w-full mb-4" disabled={loading || !email || !password}>
          {mode === 'signup' ? 'Create Account' : 'Sign In'}
        </PrimaryAction>

        <button 
          onClick={() => setMode(mode === 'signup' ? 'signin' : 'signup')}
          className="text-slate-500 text-sm hover:text-slate-800"
        >
          {mode === 'signup' ? 'Existing account? Sign In' : 'Need an account? Create one'}
        </button>
      </div>
    </OnboardingFrame>
  );
}
  `,
  'ProfileScreen.tsx': `
import React, { useState } from 'react';
import { OnboardingFrame } from '../components/OnboardingFrame';
import { PrimaryAction } from '../components/PrimaryAction';
import { SecondaryAction } from '../components/SecondaryAction';

export function ProfileScreen({ onNext, onBack }: { onNext: (data: any) => void; onBack: () => void }) {
  const [name, setName] = useState('');
  const [level, setLevel] = useState('');
  const [field, setField] = useState('');
  const [gradYear, setGradYear] = useState('');

  return (
    <OnboardingFrame theme="light">
      <div className="w-full max-w-md mx-auto">
        <h2 className="text-3xl font-medium text-slate-900 mb-8 text-center">Tell us about yourself</h2>
        
        <div className="space-y-5 mb-12">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Preferred Name</label>
            <input 
              type="text" 
              value={name} onChange={e => setName(e.target.value)}
              className="w-full min-h-[44px] px-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Academic Level</label>
            <select 
              value={level} onChange={e => setLevel(e.target.value)}
              className="w-full min-h-[44px] px-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400"
            >
              <option value="">Select level...</option>
              <option value="undergrad">Undergraduate</option>
              <option value="grad">Graduate</option>
              <option value="phd">PhD</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Field of Study</label>
            <input 
              type="text" 
              value={field} onChange={e => setField(e.target.value)}
              placeholder="e.g. Computer Science"
              className="w-full min-h-[44px] px-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Graduation Target Year <span className="text-slate-400 font-normal">(Optional)</span></label>
            <input 
              type="number" 
              value={gradYear} onChange={e => setGradYear(e.target.value)}
              placeholder="YYYY"
              className="w-full min-h-[44px] px-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400"
            />
          </div>
        </div>

        <div className="flex gap-4 w-full">
          <SecondaryAction onClick={onBack} className="flex-1">Back</SecondaryAction>
          <PrimaryAction 
            onClick={() => onNext({ name, level, field, gradYear })} 
            className="flex-1"
            disabled={!name || !level || !field}
          >Next</PrimaryAction>
        </div>
      </div>
    </OnboardingFrame>
  );
}
  `,
  'UniversityScreen.tsx': `
import React, { useState } from 'react';
import { OnboardingFrame } from '../components/OnboardingFrame';
import { PrimaryAction } from '../components/PrimaryAction';
import { SecondaryAction } from '../components/SecondaryAction';

export function UniversityScreen({ onNext, onBack }: { onNext: (uni: string) => void; onBack: () => void }) {
  const [search, setSearch] = useState('');
  
  return (
    <OnboardingFrame theme="light">
      <div className="w-full max-w-md mx-auto">
        <h2 className="text-3xl font-medium text-slate-900 mb-8 text-center">Where do you study?</h2>
        
        <div className="mb-12">
          <input 
            type="text" 
            placeholder="Search institution..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full min-h-[44px] px-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 mb-4 text-lg shadow-sm"
          />
          <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
            {/* Mocked list for UI feel, user types and we capture value */}
            <button 
              onClick={() => onNext('Other / Not Listed')}
              className="w-full min-h-[44px] px-4 py-3 text-left rounded-xl hover:bg-slate-100 text-slate-600 transition-colors"
            >
              Other / Not Listed
            </button>
          </div>
        </div>

        <div className="flex gap-4 w-full">
          <SecondaryAction onClick={onBack} className="flex-1">Back</SecondaryAction>
          <PrimaryAction onClick={() => onNext(search || 'Other')} className="flex-1" disabled={!search}>Next</PrimaryAction>
        </div>
      </div>
    </OnboardingFrame>
  );
}
  `,
  'CanvasBridgeScreen.tsx': `
import React from 'react';
import { OnboardingFrame } from '../components/OnboardingFrame';
import { PrimaryAction } from '../components/PrimaryAction';
import { SecondaryAction } from '../components/SecondaryAction';

export function CanvasBridgeScreen({ onNext, onBack }: { onNext: (connected: boolean) => void; onBack: () => void }) {
  return (
    <OnboardingFrame theme="light">
      <div className="w-full max-w-lg mx-auto flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-8 border border-red-100">
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>
        </div>
        
        <h2 className="text-3xl font-medium text-slate-900 mb-4 text-center">The Canvas Bridge</h2>
        <p className="text-lg text-slate-600 mb-10">Cerebro connects securely to your Canvas account.</p>

        <ul className="space-y-6 w-full text-left bg-white p-6 rounded-2xl border border-slate-100 shadow-sm mb-10">
          {[
            "We use official Canvas OAuth.",
            "We never see your school password.",
            "You control what we access.",
            "You can disconnect later."
          ].map((stmt, i) => (
            <li key={i} className="flex items-center gap-3 text-slate-700">
              <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {stmt}
            </li>
          ))}
        </ul>

        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <SecondaryAction onClick={onBack} className="flex-1 order-2 sm:order-1">Back</SecondaryAction>
          <SecondaryAction onClick={() => onNext(false)} className="flex-1 order-1 sm:order-2">Not now</SecondaryAction>
          <PrimaryAction onClick={() => onNext(true)} className="flex-1 bg-red-600 hover:bg-red-700 text-white order-3">Connect Canvas</PrimaryAction>
        </div>
      </div>
    </OnboardingFrame>
  );
}
  `,
  'CourseSelectionScreen.tsx': `
import React, { useState } from 'react';
import { OnboardingFrame } from '../components/OnboardingFrame';
import { PrimaryAction } from '../components/PrimaryAction';
import { SecondaryAction } from '../components/SecondaryAction';

export function CourseSelectionScreen({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [courses] = useState([
    { id: 1, name: "Advanced Robotics (CS-401)" },
    { id: 2, name: "Linear Algebra (MATH-202)" },
    { id: 3, name: "Quantum Physics (PHYS-301)" }
  ]);
  const [selected, setSelected] = useState<number[]>([]);

  const toggle = (id: number) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <OnboardingFrame theme="light">
      <div className="w-full max-w-md mx-auto">
        <h2 className="text-3xl font-medium text-slate-900 mb-8 text-center">Select Your Courses</h2>
        
        <div className="space-y-3 mb-10">
          {courses.map(course => (
            <button 
              key={course.id}
              onClick={() => toggle(course.id)}
              className={\`w-full text-left px-5 py-4 rounded-xl border transition-all \${
                selected.includes(course.id) 
                  ? 'border-blue-500 bg-blue-50/50 text-blue-900' 
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
              }\`}
            >
              <div className="flex items-center gap-3">
                <div className={\`w-5 h-5 rounded border flex items-center justify-center \${
                  selected.includes(course.id) ? 'bg-blue-500 border-blue-500 text-white' : 'border-slate-300'
                }\`}>
                  {selected.includes(course.id) && <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                </div>
                <span className="font-medium text-lg">{course.name}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="flex gap-4 w-full">
          <SecondaryAction onClick={onBack} className="flex-1">Back</SecondaryAction>
          <PrimaryAction onClick={onNext} className="flex-1" disabled={selected.length === 0}>Next</PrimaryAction>
        </div>
      </div>
    </OnboardingFrame>
  );
}
  `,
  'ContinuousSyncScreen.tsx': `
import React, { useState } from 'react';
import { OnboardingFrame } from '../components/OnboardingFrame';
import { PrimaryAction } from '../components/PrimaryAction';
import { SecondaryAction } from '../components/SecondaryAction';

export function ContinuousSyncScreen({ onNext, onBack }: { onNext: (sync: boolean) => void; onBack: () => void }) {
  const [sync, setSync] = useState(false);

  return (
    <OnboardingFrame theme="light">
      <div className="w-full max-w-lg mx-auto flex flex-col items-center">
        <h2 className="text-3xl font-medium text-slate-900 mb-10 text-center">Keep your courses in sync automatically.</h2>
        
        <div className="space-y-8 w-full bg-white p-8 rounded-3xl border border-slate-100 shadow-sm mb-10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-medium text-slate-900">Enable continuous sync</h3>
              <p className="text-slate-500 mt-1">Stays up to date in the background.</p>
            </div>
            <button 
              onClick={() => setSync(!sync)}
              className={\`w-14 h-8 rounded-full transition-colors relative \${sync ? 'bg-blue-500' : 'bg-slate-200'}\`}
            >
              <div className={\`absolute top-1 w-6 h-6 rounded-full bg-white transition-all shadow \${sync ? 'left-7' : 'left-1'}\`} />
            </button>
          </div>

          <div className="h-px bg-slate-100 w-full" />

          <ul className="space-y-4 text-slate-600">
            <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 shrink-0"/>new assignments & updates</li>
            <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 shrink-0"/>deadlines & announcements</li>
            <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 shrink-0"/>lecture materials & files when authorized</li>
            <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 shrink-0"/>grades/feedback only when provider scope allows</li>
          </ul>
        </div>

        <div className="flex gap-4 w-full">
          <SecondaryAction onClick={onBack} className="flex-1">Back</SecondaryAction>
          <PrimaryAction onClick={() => onNext(sync)} className="flex-1">Next</PrimaryAction>
        </div>
      </div>
    </OnboardingFrame>
  );
}
  `,
  'CerebroSignatureScreen.tsx': `
import React, { useState } from 'react';
import { OnboardingFrame } from '../components/OnboardingFrame';
import { PrimaryAction } from '../components/PrimaryAction';
import { SecondaryAction } from '../components/SecondaryAction';
import { CerebroSignatureInput } from '../onboardingTypes';

export function CerebroSignatureScreen({ onNext, onBack }: { onNext: (sig: CerebroSignatureInput) => void; onBack: () => void }) {
  const [sig, setSig] = useState<CerebroSignatureInput>({
    preferredMode: 'ADAPTIVE',
    density: 'BALANCED',
    navigationComfort: 'SIDE',
    accentPreference: 'SURPRISE_ME',
    motionPreference: 'FULL'
  });

  return (
    <OnboardingFrame theme="light">
      <div className="w-full max-w-lg mx-auto">
        <h2 className="text-3xl font-medium text-slate-900 mb-8 text-center">Cerebro Signature</h2>
        
        <div className="space-y-8 mb-10">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">Color Mode</label>
            <div className="flex gap-2">
              {['LIGHT', 'DARK', 'ADAPTIVE'].map(m => (
                <button key={m} onClick={() => setSig({...sig, preferredMode: m as any})} className={\`flex-1 py-2.5 rounded-xl border text-sm font-medium transition-colors \${sig.preferredMode === m ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'}\`}>{m}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">Density</label>
            <div className="flex gap-2">
              {['SIMPLE', 'BALANCED', 'RICH'].map(m => (
                <button key={m} onClick={() => setSig({...sig, density: m as any})} className={\`flex-1 py-2.5 rounded-xl border text-sm font-medium transition-colors \${sig.density === m ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'}\`}>{m}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">Vibe / Accent</label>
            <select 
              value={sig.accentPreference}
              onChange={e => setSig({...sig, accentPreference: e.target.value as any})}
              className="w-full min-h-[44px] px-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400"
            >
              <option value="SURPRISE_ME">Surprise Me</option>
              <option value="COOL">Cool / Technical</option>
              <option value="WARM">Warm / Organic</option>
              <option value="VIBRANT">Vibrant / Neon</option>
              <option value="MUTED">Muted / Academic</option>
              <option value="MONOCHROME">Monochrome / Minimalist</option>
            </select>
          </div>
        </div>

        <div className="flex gap-4 w-full">
          <SecondaryAction onClick={onBack} className="flex-1">Back</SecondaryAction>
          <PrimaryAction onClick={() => onNext(sig)} className="flex-1">Compose</PrimaryAction>
        </div>
      </div>
    </OnboardingFrame>
  );
}
  `,
  'WorkspaceBuildScreen.tsx': `
import React, { useEffect, useState } from 'react';
import { OnboardingFrame } from '../components/OnboardingFrame';
import { PrimaryAction } from '../components/PrimaryAction';

export function WorkspaceBuildScreen({ onNext }: { onNext: () => void }) {
  const [completed, setCompleted] = useState(0);
  const tasks = [
    "Creating your profile",
    "Securing your workspace",
    "Connecting selected courses",
    "Preparing your academic structure",
    "Composing your Cerebro Signature",
    "Building your Home"
  ];

  useEffect(() => {
    // Simulate real operations. In reality, these would await actual promises.
    const runTasks = async () => {
      for (let i = 0; i < tasks.length; i++) {
        await new Promise(r => setTimeout(r, 600 + Math.random() * 400));
        setCompleted(i + 1);
      }
      setTimeout(onNext, 1000);
    };
    runTasks();
  }, [onNext, tasks.length]);

  return (
    <OnboardingFrame theme="light">
      <div className="w-full max-w-md mx-auto text-center">
        <h2 className="text-3xl font-medium text-slate-900 mb-12">Building Your Cerebro</h2>
        
        <div className="space-y-4 mb-12 text-left bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          {tasks.map((task, i) => (
            <div key={i} className={\`flex items-center gap-4 transition-opacity duration-300 \${i <= completed ? 'opacity-100' : 'opacity-30'}\`}>
              <div className="w-6 h-6 flex items-center justify-center shrink-0">
                {i < completed ? (
                  <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : i === completed ? (
                  <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <div className="w-2 h-2 bg-slate-200 rounded-full" />
                )}
              </div>
              <span className={\`text-lg \${i < completed ? 'text-slate-800' : i === completed ? 'text-blue-600 font-medium' : 'text-slate-400'}\`}>
                {task}
              </span>
            </div>
          ))}
        </div>

        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 transition-all duration-500 ease-out" 
            style={{ width: \`\${(completed / tasks.length) * 100}%\` }}
          />
        </div>
      </div>
    </OnboardingFrame>
  );
}
  `,
  'AegisActivationScreen.tsx': `
import React from 'react';
import { OnboardingFrame } from '../components/OnboardingFrame';
import { PrimaryAction } from '../components/PrimaryAction';
import { SecondaryAction } from '../components/SecondaryAction';

export function AegisActivationScreen({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  return (
    <OnboardingFrame theme="dark">
      <div className="w-full max-w-lg mx-auto flex flex-col items-center text-center">
        <div className="mb-10 w-32 h-32 relative flex items-center justify-center">
           {/* Fallback styling if image fails to load */}
           <div className="absolute inset-0 bg-yellow-600/20 rounded-full blur-[40px]"></div>
           <img 
              src="/assets/brand/aegis-guardian-emblem.png" 
              alt="AEGIS Guardian" 
              className="w-full h-full object-contain relative z-10"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.innerHTML += '<div class="text-yellow-500 w-full h-full flex items-center justify-center border-2 border-yellow-500/50 rounded-full"><span class="text-xs">AEGIS</span></div>';
              }}
           />
        </div>
        
        <h3 className="text-yellow-600 font-semibold tracking-widest uppercase text-sm mb-3">AEGIS GUARDIAN</h3>
        <h2 className="text-4xl md:text-5xl font-medium text-white mb-6">Meet Your Guardian.</h2>
        
        <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-md">
          Adaptive Guardian Intelligence monitors your workspace integrity, synthesizes complex materials securely, and protects your data parameters.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full mt-4">
          <SecondaryAction onClick={onBack} className="text-slate-400 hover:text-white hover:bg-white/10">Back</SecondaryAction>
          <SecondaryAction onClick={onNext} className="text-slate-400 hover:text-white hover:bg-white/10">Learn more</SecondaryAction>
          <PrimaryAction onClick={onNext} className="bg-yellow-600 hover:bg-yellow-500 text-black border-transparent shadow-[0_0_20px_rgba(202,138,4,0.3)] flex-1">
            Activate AEGIS Guardian
          </PrimaryAction>
        </div>
      </div>
    </OnboardingFrame>
  );
}
  `,
  'FinalWelcomeScreen.tsx': `
import React from 'react';
import { OnboardingFrame } from '../components/OnboardingFrame';
import { PrimaryAction } from '../components/PrimaryAction';
import { Brain } from 'lucide-react';

export function FinalWelcomeScreen({ onEnter, name }: { onEnter: () => void; name: string }) {
  return (
    <OnboardingFrame theme="dark">
      <div className="flex flex-col items-center text-center space-y-12">
        <div className="relative">
          <div className="absolute inset-0 bg-cyan-500/30 blur-[80px] rounded-full"></div>
          <Brain className="w-24 h-24 text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.7)] relative z-10" />
        </div>
        <div className="space-y-4 max-w-xl">
          <h1 className="text-4xl md:text-5xl font-medium tracking-wide text-white">
            Welcome to Cerebro,<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{name || 'Commander'}</span>.
          </h1>
          <p className="text-xl text-slate-400 font-light tracking-wide mt-4">Your workspace is ready.</p>
        </div>
        <PrimaryAction onClick={onEnter} className="mt-8 px-12 py-4 text-lg bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_30px_rgba(8,145,178,0.4)]">
          Enter Cerebro
        </PrimaryAction>
      </div>
    </OnboardingFrame>
  );
}
  `,
};

for (const [filename, content] of Object.entries(screens)) {
  fs.writeFileSync(
    path.join(__dirname, 'src/client/features/onboarding/screens', filename),
    content.trim()
  );
}

console.log('Screens generated.');
