import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public override render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="min-h-screen bg-[#050B14] flex flex-col items-center justify-center text-white p-6 font-sans">
          <div className="max-w-md w-full bg-slate-900/50 border border-red-500/20 p-8 rounded-2xl shadow-xl backdrop-blur-xl">
            <h1 className="text-2xl font-medium text-red-400 mb-4">
              System Error
            </h1>
            <p className="text-slate-400 text-sm mb-6">
              A critical error occurred in the UI.
            </p>
            {this.state.error && (
              <div className="bg-black/50 p-4 rounded-lg overflow-x-auto text-xs font-mono text-red-300 mb-6">
                {this.state.error.message}
              </div>
            )}
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 bg-white text-black font-medium rounded-xl hover:bg-slate-200 transition-colors"
            >
              Restart Session
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
