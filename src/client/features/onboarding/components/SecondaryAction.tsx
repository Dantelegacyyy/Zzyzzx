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
      className={`min-h-[50px] px-8 py-3.5 rounded-full font-semibold text-base text-[#007AFF] hover:bg-[#007AFF]/10 active:bg-[#007AFF]/20 transition-all duration-200 ${className}`}
    >
      {children}
    </button>
  );
}


