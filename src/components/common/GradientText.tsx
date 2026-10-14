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
    <span className={`text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#D6AA35] ${className}`}>
      {children}
    </span>
  );
};
