import React from 'react';

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  hoverEffect?: boolean;
  padding?: 'none' | 'small' | 'medium' | 'large';
  onClick?: () => void;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  className = '',
  glow = false,
  hoverEffect = false,
  padding = 'medium',
  onClick
}) => {
  const paddingClasses = {
    none: 'p-0',
    small: 'p-4',
    medium: 'p-6',
    large: 'p-8 lg:p-10'
  };

  return (
    <div
      onClick={onClick}
      className={`
        relative rounded-2xl transition-all duration-300
        bg-[#0B0B0D] dark:bg-[#0B0B0D] light:bg-[#FFF9EE]
        border border-white/10 dark:border-white/10 light:border-[#E6D9C4]
        shadow-xl shadow-black/30 dark:shadow-black/40 light:shadow-[#E6D9C4]/40
        ${paddingClasses[padding]}
        ${hoverEffect ? 'hover:-translate-y-0.5 hover:border-[#B8A7FF]/50 dark:hover:border-[#B8A7FF]/50 light:hover:border-[#D6AA35]/50 cursor-pointer' : ''}
        ${glow ? 'before:absolute before:inset-0 before:rounded-2xl before:-z-10 before:bg-[#B8A7FF]/10 dark:before:bg-[#B8A7FF]/10 light:before:bg-[#D6AA35]/10 before:blur-xl' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};
