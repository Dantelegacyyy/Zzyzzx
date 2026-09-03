import React from 'react';

export function SecondaryAction({
  onClick,
  children,
  className = '',
}: {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`min-h-[44px] px-8 py-3 rounded-full font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 transition-colors ${className}`}
    >
      {children}
    </button>
  );
}
