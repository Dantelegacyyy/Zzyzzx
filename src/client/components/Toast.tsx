/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useCallback } from 'react';

type ToastType = 'info' | 'success' | 'error' | 'aegis';

interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  addToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType>({ addToast: () => {} });

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`
              px-4 py-3 rounded-xl shadow-2xl border backdrop-blur-md flex items-center gap-3 transition-all animate-in slide-in-from-right-4
              ${toast.type === 'success' ? 'bg-emerald-950/90 border-emerald-900/50 text-emerald-50' : ''}
              ${toast.type === 'error' ? 'bg-red-950/90 border-red-900/50 text-red-50' : ''}
              ${toast.type === 'info' ? 'bg-slate-900/90 border-slate-700/50 text-slate-50' : ''}
              ${toast.type === 'aegis' ? 'bg-cyan-950/90 border-cyan-800/50 text-cyan-50 shadow-cyan-900/20' : ''}
            `}
          >
            {toast.type === 'aegis' && (
              <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
            )}
            {toast.type === 'success' && (
              <span className="text-emerald-400">✓</span>
            )}
            {toast.type === 'error' && <span className="text-red-400">⚠</span>}
            <span className="text-sm font-medium tracking-wide">
              {toast.message}
            </span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
