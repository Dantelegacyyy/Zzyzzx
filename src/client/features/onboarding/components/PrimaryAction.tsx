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
      className={`min-h-[50px] px-8 py-3.5 rounded-full font-semibold text-base tracking-tight transition-all duration-200 shadow-md ${
        disabled
          ? 'opacity-30 cursor-not-allowed bg-zinc-800 text-zinc-500 border border-zinc-700/50'
          : 'bg-[#007AFF] hover:bg-[#0062CC] active:scale-[0.98] text-white shadow-[0_4px_20px_rgba(0,122,255,0.35)] hover:shadow-[0_6px_24px_rgba(0,122,255,0.5)]'
      } ${className}`}
    >
      {children}
    </button>
  );
}


