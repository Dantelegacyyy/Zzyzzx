import React from 'react';

export function PrimaryAction({
  onClick,
  children,
  className = '',
  disabled = false,
}: {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`min-h-[44px] px-8 py-3 rounded-full font-medium tracking-wide transition-all ${
        disabled
          ? 'opacity-50 cursor-not-allowed bg-slate-300 text-slate-500'
          : 'bg-slate-900 text-white hover:bg-slate-800 shadow-md hover:shadow-lg active:scale-[0.98]'
      } ${className}`}
    >
      {children}
    </button>
  );
}
