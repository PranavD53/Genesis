import React, { useEffect } from 'react';

interface TransitionScreenProps {
  label: string;
  quote?: string;
  onComplete: () => void;
  durationMs?: number;
}

export const TransitionScreen: React.FC<TransitionScreenProps> = ({
  label,
  onComplete,
  durationMs = 600
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, durationMs);
    return () => clearTimeout(timer);
  }, [onComplete, durationMs]);

  return (
    <div className="fixed inset-0 z-50 bg-[#050505] dark:bg-[#050505] light:bg-[#F7F1E5] flex flex-col items-center justify-center p-6 text-center transition-opacity duration-300">
      {/* Background Soft Glow */}
      <div className="absolute w-[300px] h-[300px] bg-[#B8A7FF]/10 dark:bg-[#B8A7FF]/10 light:bg-[#FACC15]/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Fast Pulsing Engine Core Indicator */}
      <div className="relative mb-6 w-14 h-14 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-[#B8A7FF]/40 dark:border-[#B8A7FF]/40 light:border-[#65A30D]/40 animate-spin-slow" />
        <div className="w-4 h-4 rounded-full bg-[#B8A7FF] dark:bg-[#B8A7FF] light:bg-[#65A30D] animate-ping" />
      </div>

      {/* Short 2-5 Word AI Status Line */}
      <h2 className="text-sm font-mono font-medium uppercase tracking-widest text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#1C3B2B]">
        {label}
      </h2>
    </div>
  );
};
