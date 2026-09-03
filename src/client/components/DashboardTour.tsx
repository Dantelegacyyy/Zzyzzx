import React, { useState, useEffect } from 'react';
import { Joyride, Step, STATUS, CallBackProps } from 'react-joyride';
import { HelpCircle, Sparkles, Play } from 'lucide-react';

interface DashboardTourProps {
  runOnMount?: boolean;
}

export const DashboardTour: React.FC<DashboardTourProps> = ({ runOnMount = false }) => {
  const [run, setRun] = useState<boolean>(false);

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('cerebro_dashboard_tour_seen');
    if (!hasSeenTour || runOnMount) {
      // Delay slightly to allow DOM widgets to finish rendering
      const timer = setTimeout(() => {
        setRun(true);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [runOnMount]);

  const steps: Step[] = [
    {
      target: '[data-tour="curation-header"]',
      content: (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
            <Sparkles size={16} />
            <span>AI Workspace Curation Engine</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Welcome to your customized Cerebro AI Workspace! Gemini 2.5 dynamically analyzes your enrolled subjects and builds tailor-made study dashboards.
          </p>
        </div>
      ),
      disableBeacon: true,
      placement: 'bottom',
    },
    {
      target: '[data-tour="vibe-switcher"]',
      content: (
        <div className="space-y-2">
          <h4 className="font-bold text-white text-sm">Personalized Design Vibes</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Switch between <b>Focus</b>, <b>Code</b>, <b>Minimal</b>, and <b>Creative</b> vibes. Click "Re-Curate Workspace" anytime to regenerate your dashboard layout!
          </p>
        </div>
      ),
      placement: 'bottom',
    },
    {
      target: '[data-tour="design-concepts"]',
      content: (
        <div className="space-y-2">
          <h4 className="font-bold text-cyan-400 text-sm">100+ Layouts & 250+ Color Schemes</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            The AI matches layout schemas (Bento Grids, Split Views, Command Decks) and color palettes pulled directly from Cerebro&apos;s design library and persists them to your user profile.
          </p>
        </div>
      ),
      placement: 'bottom',
    },
    {
      target: '[data-tour="curated-widgets"]',
      content: (
        <div className="space-y-2">
          <h4 className="font-bold text-white text-sm">Dynamic Academic Widgets</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Interactive widgets composed specifically for your active subjects (e.g. Data Structures, Algorithms) with automated priority tags and quick-launch AI assistants.
          </p>
        </div>
      ),
      placement: 'top',
    },
    {
      target: '[data-tour="study-vectors"]',
      content: (
        <div className="space-y-2">
          <h4 className="font-bold text-yellow-400 text-sm">Weekly Study Vector Schedules</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Automated study time allocations and topic breakdowns to maximize recall and prepare for upcoming assignments.
          </p>
        </div>
      ),
      placement: 'top',
    },
  ];

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];
    if (finishedStatuses.includes(status)) {
      setRun(false);
      localStorage.setItem('cerebro_dashboard_tour_seen', 'true');
    }
  };

  const startTourManual = () => {
    setRun(true);
  };

  return (
    <>
      <Joyride
        steps={steps}
        run={run}
        continuous
        showSkipButton
        showProgress
        callback={handleJoyrideCallback}
        styles={{
          options: {
            arrowColor: '#0A111F',
            backgroundColor: '#0A111F',
            overlayColor: 'rgba(5, 11, 20, 0.82)',
            primaryColor: '#06b6d4',
            textColor: '#e2e8f0',
            width: 360,
            zIndex: 10000,
          },
          tooltip: {
            borderRadius: '16px',
            border: '1px solid rgba(6, 182, 212, 0.3)',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 8px 10px -6px rgba(0, 0, 0, 0.5)',
            padding: '20px',
          },
          buttonNext: {
            backgroundColor: '#0891b2',
            borderRadius: '8px',
            color: '#ffffff',
            fontSize: '12px',
            fontWeight: '600',
            padding: '8px 16px',
            outline: 'none',
          },
          buttonBack: {
            color: '#94a3b8',
            marginRight: '10px',
            fontSize: '12px',
          },
          buttonSkip: {
            color: '#64748b',
            fontSize: '12px',
          },
        }}
        locale={{
          last: 'Complete Tour',
          skip: 'Skip Tour',
        }}
      />

      <button
        onClick={startTourManual}
        className="px-3 py-1.5 bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-800/60 text-cyan-300 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 shadow-md hover:border-cyan-500"
        title="Start AI Dashboard Tour"
      >
        <HelpCircle size={14} className="text-cyan-400" />
        <span>Take Dashboard Tour</span>
      </button>
    </>
  );
};
