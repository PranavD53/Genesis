import React from 'react';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export const GradientText: React.FC<GradientTextProps> = ({
  children,
  className = ''
}) => {
  return (
    <span className={`bg-gradient-to-r from-[#B8A7FF] via-[#E2D9F3] to-[#9180FF] dark:from-[#B8A7FF] dark:via-[#F5F5F5] dark:to-[#9180FF] light:from-[#65A30D] light:via-[#304B32] light:to-[#D6AA35] bg-clip-text text-transparent font-semibold ${className}`}>
      {children}
    </span>
  );
};

