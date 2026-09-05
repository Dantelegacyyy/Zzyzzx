import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Trash2, Copy, Check } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  copied: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
    copied: false,
  };

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[UI Error Boundary Captured]:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  private handleClearStorageAndReload = () => {
    try {
      localStorage.removeItem('cerebro_onboarding_step');
      localStorage.removeItem('cerebro_active_tab');
      // Ensure onboarding is marked complete so reload goes straight to dashboard
      localStorage.setItem('cerebro_onboarding_complete', 'true');
    } catch (e) {
      console.error(e);
    }
    window.location.reload();
  };

  private handleCopyError = () => {
    const details = `Error: ${this.state.error?.message}\nStack: ${this.state.error?.stack}\nComponent: ${this.state.errorInfo?.componentStack}`;
    navigator.clipboard?.writeText(details);
    this.setState({ copied: true });
    setTimeout(() => this.setState({ copied: false }), 2000);
  };

  public override render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="min-h-screen bg-[#030712] flex flex-col items-center justify-center text-white p-6 font-sans selection:bg-red-500/20">
          <div className="max-w-lg w-full bg-zinc-950/90 border border-red-500/30 p-8 rounded-3xl shadow-[0_20px_50px_rgba(239,68,68,0.15)] backdrop-blur-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                <AlertTriangle size={22} />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white tracking-tight">
                  Application Exception Caught
                </h1>
                <p className="text-xs text-zinc-400 font-mono">
                  AEGIS Resilient Recovery Subsystem
                </p>
              </div>
            </div>

            <p className="text-zinc-300 text-xs sm:text-sm mb-4 leading-relaxed">
              The application encountered a component-level exception. You can recover immediately by retrying or clearing local session cache.
            </p>

            {this.state.error && (
              <div className="bg-black/60 border border-white/10 p-4 rounded-xl overflow-x-auto text-xs font-mono text-red-300 mb-6 max-h-36">
                <div className="font-bold mb-1">{this.state.error.name}: {this.state.error.message}</div>
                <div className="text-[10px] text-zinc-500">{this.state.error.stack?.split('\n').slice(0, 3).join('\n')}</div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={this.handleReset}
                className="flex-1 py-2.5 px-4 bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <RefreshCw size={14} />
                <span>Retry Component</span>
              </button>

              <button
                onClick={this.handleClearStorageAndReload}
                className="flex-1 py-2.5 px-4 bg-white/10 hover:bg-white/15 text-white font-medium text-xs rounded-xl flex items-center justify-center gap-2 transition-colors border border-white/10"
              >
                <Trash2 size={14} className="text-amber-400" />
                <span>Reset Cache & Reload</span>
              </button>

              <button
                onClick={this.handleCopyError}
                className="py-2.5 px-3 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white rounded-xl transition-colors border border-white/5"
                title="Copy Error Stack"
              >
                {this.state.copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
