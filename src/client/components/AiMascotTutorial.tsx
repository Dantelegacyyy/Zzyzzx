import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Volume2,
  VolumeX,
  HelpCircle,
  X,
  Send,
  Zap,
  Bot,
} from 'lucide-react';

interface AiMascotTutorialProps {
  currentStep: string;
  stepIndex: number;
}

const STEP_TIPS: Record<
  string,
  {
    mascotMood: 'excited' | 'thoughtful' | 'secure' | 'smart';
    title: string;
    speech: string;
    proTip: string;
    hiddenFact: string;
  }
> = {
  HELLO: {
    mascotMood: 'excited',
    title: 'Welcome to Cerebro!',
    speech:
      'Greetings, Commander! I am Atlas, your AI Academic Guide. I will be with you throughout this 13-screen setup journey!',
    proTip:
      'Clicking "Begin Walkthrough" prepares your isolated Cloud SQL encryption keys.',
    hiddenFact:
      'Cerebro automatically synthesizes study vectors using Gemini 2.5 flash reasoning!',
  },
  WELCOME: {
    mascotMood: 'smart',
    title: 'System Architecture',
    speech:
      'Here you can explore our dual architecture: real-time student workspace on top, backed by high-velocity Cloud SQL and AEGIS protection.',
    proTip:
      'Your workspace includes both client-side speed and server-side PostgreSQL persistence.',
    hiddenFact:
      'All AI requests route securely through server-side proxies—keeping secrets 100% hidden!',
  },
  PRIVACY: {
    mascotMood: 'secure',
    title: 'AEGIS Data Shield',
    speech:
      'Your privacy is sacred! AEGIS Phase 2 guarantees HttpOnly session cookies and encrypted local databases.',
    proTip:
      'You own all your syllabus uploads and class notes. No data is sold or trained publicly.',
    hiddenFact: 'AEGIS uses military-grade AES-256-GCM encryption at rest.',
  },
  ACCOUNT: {
    mascotMood: 'smart',
    title: 'JWT Authentication',
    speech:
      'Let us set up your account credentials. We issue cryptographically signed JWT tokens stored safely in HttpOnly cookies.',
    proTip:
      'You can sign in using your university email or standard account credentials.',
    hiddenFact:
      'HttpOnly cookies prevent XSS script attacks from stealing your session!',
  },
  PROFILE: {
    mascotMood: 'excited',
    title: 'Personalizing Your Identity',
    speech:
      'What should Cerebro call you? Your profile name customizes your AI dashboard greetings and study vector schedule!',
    proTip:
      'Enter your preferred first name or academic title (e.g. Commander Titus).',
    hiddenFact:
      'The AI uses your name to personalize study motivations and daily schedules.',
  },
  UNIVERSITY: {
    mascotMood: 'smart',
    title: 'Institution Mapping',
    speech:
      'Select your campus or university! Cerebro pre-loads course catalogs, term dates, and Canvas LMS endpoints for your school.',
    proTip:
      'If your school is not listed, custom LMS endpoints can be entered in Settings later.',
    hiddenFact:
      'Cerebro supports over 450+ university grading algorithms and Canvas APIs.',
  },
  CANVAS_BRIDGE: {
    mascotMood: 'thoughtful',
    title: 'Canvas LMS Integration',
    speech:
      'Connect your Canvas API access token! This grants Cerebro real-time read access to your syllabus, assignments, and grades.',
    proTip:
      'Generate a token in Canvas under Account > Settings > New Access Token.',
    hiddenFact:
      'Canvas API tokens are encrypted in Cloud SQL and never exposed to the client browser.',
  },
  COURSES: {
    mascotMood: 'excited',
    title: 'Curating Active Courses',
    speech:
      'Select the subjects you are enrolled in this semester. Gemini 2.5 uses these exact subjects to design custom dashboard widgets!',
    proTip:
      'You can add STEM, Humanities, Computer Science, or custom courses anytime.',
    hiddenFact:
      'Each course gets a dedicated vector database namespace for rapid AI search.',
  },
  CONTINUOUS_SYNC: {
    mascotMood: 'secure',
    title: 'Background Sync Engine',
    speech:
      'Configure background polling! Cerebro can periodically pull new assignment deadlines and lecture slides while you sleep.',
    proTip:
      'Enable notifications so Atlas can alert you 24 hours before major exams.',
    hiddenFact:
      'Background sync uses low-latency Redis queues and scheduled tasks.',
  },
  CEREBRO_SIGNATURE: {
    mascotMood: 'excited',
    title: 'Aesthetic & Vibe Palette',
    speech:
      'Time for styling! Pick your preferred vibe (Focus, Code, Minimal, Creative) or let the AI Architect decide your theme!',
    proTip:
      'You can switch color palettes (Cyber Neon, Glass Aurora, OLED) on the fly anytime.',
    hiddenFact:
      'Theme preferences adjust particle canvas physics and glassmorphism levels.',
  },
  BUILD_WORKSPACE: {
    mascotMood: 'smart',
    title: 'Autonomous Workspace Build',
    speech:
      'Sit back while Cerebro AI Architect builds your personalized Screen 13 dashboard widgets and database schemas!',
    proTip: 'Watch the live initialization console log as components synthesize.',
    hiddenFact:
      'Cerebro generates layout mappings dynamically based on course difficulty!',
  },
  AEGIS_ACTIVATION: {
    mascotMood: 'secure',
    title: 'AEGIS Security Clearance',
    speech:
      'Final security clearance check! AEGIS verifies SSL handshakes, Cloud SQL connections, and token signatures.',
    proTip: 'This guarantees your workspace is 100% isolated and ready for action.',
    hiddenFact: 'Project AEGIS runs continuous automated verification passes.',
  },
  FINAL_WELCOME: {
    mascotMood: 'excited',
    title: 'Ready to Launch!',
    speech:
      'Congratulations, Commander! Your workspace is fully built and ready. Click "Enter Cerebro Workspace" to jump into Screen 13!',
    proTip:
      'You can re-run this 13-screen onboarding walkthrough anytime from Settings.',
    hiddenFact:
      'Your personalized dashboard will automatically refresh assignment priorities daily!',
  },
};

export const AiMascotTutorial: React.FC<AiMascotTutorialProps> = ({
  currentStep,
  stepIndex,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [activeTab, setActiveTab] = useState<'speech' | 'qa'>('speech');
  const [chatMessages, setChatMessages] = useState<
    Array<{ sender: 'user' | 'atlas'; text: string }>
  >([
    {
      sender: 'atlas',
      text: 'Hi there! I am Atlas, your interactive AI Mascot. Ask me anything about this step or Cerebro features!',
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [thinking, setThinking] = useState(false);

  const currentInfo = STEP_TIPS[currentStep] || STEP_TIPS['HELLO'];

  // Simulate audio speech effect toggle
  const toggleAudio = () => {
    const next = !audioEnabled;
    setAudioEnabled(next);
    if (next && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentInfo.speech);
      utterance.pitch = 1.2;
      utterance.rate = 1.05;
      window.speechSynthesis.speak(utterance);
    } else if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  const handleAskAtlas = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;

    const query = inputQuery;
    setChatMessages((prev) => [...prev, { sender: 'user', text: query }]);
    setInputQuery('');
    setThinking(true);

    setTimeout(() => {
      let responseText =
        'That is a great question! Cerebro uses Gemini 2.5 to analyze your course syllabi, build smart study vectors, and keep your Canvas assignments synchronized.';

      if (query.toLowerCase().includes('canvas')) {
        responseText =
          'Canvas LMS connection lets Cerebro fetch your assignments and syllabus directly. Your API token is encrypted with AES-256-GCM.';
      } else if (query.toLowerCase().includes('aegis') || query.toLowerCase().includes('security')) {
        responseText =
          'AEGIS is our security framework. It isolates user sessions, enforces HttpOnly cookies, and protects Cloud SQL databases.';
      } else if (query.toLowerCase().includes('screen 13') || query.toLowerCase().includes('dashboard')) {
        responseText =
          'Screen 13 is your final personalized AI Workspace! It features dynamic Bento widgets, custom color palettes, and AI study schedules.';
      } else if (query.toLowerCase().includes('cloud sql') || query.toLowerCase().includes('database')) {
        responseText =
          'Cloud SQL PostgreSQL is our enterprise persistence layer where your notes, user profiles, and course records live permanently.';
      }

      setChatMessages((prev) => [...prev, { sender: 'atlas', text: responseText }]);
      setThinking(false);
    }, 600);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 glass-button-primary p-3.5 rounded-full text-cyan-300 shadow-[0_0_25px_rgba(6,182,212,0.5)] flex items-center gap-2 group animate-bounce"
        title="Open Atlas AI Mascot Assistant"
      >
        <div className="w-8 h-8 rounded-full bg-cyan-400/20 border border-cyan-400 flex items-center justify-center text-cyan-300 font-bold text-xs">
          🤖
        </div>
        <span className="text-xs font-bold text-white pr-1 hidden sm:inline">
          Atlas AI Assistant
        </span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full px-4 sm:px-0">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="glass-panel rounded-3xl border border-cyan-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden"
      >
        {/* Mascot Header */}
        <div className="p-3.5 bg-gradient-to-r from-cyan-950/80 via-blue-950/80 to-purple-950/80 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {/* Animated Mascot Character Avatar */}
            <div className="relative">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-600 p-0.5 shadow-md shadow-cyan-500/30">
                <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center text-cyan-300 font-extrabold text-sm relative overflow-hidden">
                  <Bot size={20} className="text-cyan-400 animate-pulse" />
                </div>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 border-2 border-zinc-950 rounded-full animate-ping" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white tracking-tight">
                  Atlas AI Mascot
                </span>
                <span className="text-[9px] font-mono font-extrabold px-1.5 py-0.2 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  Step {stepIndex}/13
                </span>
              </div>
              <p className="text-[10px] text-slate-300 truncate max-w-[170px]">
                {currentInfo.title}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={toggleAudio}
              className={`p-1.5 rounded-lg transition-colors ${
                audioEnabled
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
              title={audioEnabled ? 'Mute Speech' : 'Enable Voice Audio Speech'}
            >
              {audioEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
            </button>
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg"
            >
              {isMinimized ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Mascot Body */}
        {!isMinimized && (
          <div className="p-4 space-y-3.5 text-xs">
            {/* Tab switch */}
            <div className="flex glass-input p-1 rounded-xl text-[11px] font-semibold">
              <button
                onClick={() => setActiveTab('speech')}
                className={`flex-1 py-1 rounded-lg transition-all flex items-center justify-center gap-1 ${
                  activeTab === 'speech'
                    ? 'bg-cyan-500 text-zinc-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sparkles size={12} />
                <span>Mascot Hints</span>
              </button>
              <button
                onClick={() => setActiveTab('qa')}
                className={`flex-1 py-1 rounded-lg transition-all flex items-center justify-center gap-1 ${
                  activeTab === 'qa'
                    ? 'bg-cyan-500 text-zinc-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <HelpCircle size={12} />
                <span>Ask Atlas</span>
              </button>
            </div>

            {activeTab === 'speech' ? (
              <div className="space-y-3">
                {/* Speech bubble */}
                <div className="relative p-3 bg-cyan-950/40 border border-cyan-500/30 rounded-2xl text-slate-200 leading-relaxed text-xs shadow-inner">
                  <div className="flex items-center gap-1.5 text-cyan-300 font-bold text-[11px] mb-1">
                    <Zap size={12} className="text-amber-400" />
                    <span>Step Guidance:</span>
                  </div>
                  <p>{currentInfo.speech}</p>
                </div>

                {/* Pro Tip Box */}
                <div className="p-2.5 glass-card rounded-xl border-l-2 border-l-cyan-400 text-[11px]">
                  <span className="font-bold text-cyan-300 uppercase tracking-wider block text-[9px] mb-0.5">
                    Pro-Tip
                  </span>
                  <p className="text-slate-300">{currentInfo.proTip}</p>
                </div>

                {/* Hidden Fact */}
                <div className="p-2.5 glass-input rounded-xl text-[11px] text-slate-400 flex items-start gap-2">
                  <Sparkles size={13} className="text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-purple-300 block text-[9px] uppercase">
                      Under the Hood
                    </span>
                    <p className="text-slate-300">{currentInfo.hiddenFact}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {/* Q&A Message History */}
                <div className="h-40 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                  {chatMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-2xl max-w-[85%] text-xs ${
                        msg.sender === 'user'
                          ? 'bg-cyan-600 text-white ml-auto font-medium rounded-tr-none'
                          : 'glass-card text-slate-200 mr-auto rounded-tl-none border-cyan-500/20'
                      }`}
                    >
                      {msg.text}
                    </div>
                  ))}
                  {thinking && (
                    <div className="glass-card p-2.5 rounded-2xl mr-auto text-xs text-cyan-400 animate-pulse">
                      Atlas is thinking...
                    </div>
                  )}
                </div>

                {/* Q&A Input */}
                <form onSubmit={handleAskAtlas} className="flex gap-2">
                  <input
                    type="text"
                    value={inputQuery}
                    onChange={(e) => setInputQuery(e.target.value)}
                    placeholder="Ask Atlas about this step..."
                    className="flex-1 glass-input rounded-xl px-3 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="glass-button-primary p-2 rounded-xl text-white hover:text-cyan-200"
                  >
                    <Send size={14} />
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};
