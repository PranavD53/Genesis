import React from 'react';

export const AmbientGlow: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden print:hidden">
      {/* Top Subtle Lilac / Yellow Halo */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#B8A7FF]/10 dark:bg-[#B8A7FF]/10 light:bg-[#D6AA35]/10 rounded-full blur-[160px]" />
      
      {/* Corner Atmosphere */}
      <div className="absolute top-1/3 -left-40 w-[600px] h-[600px] bg-[#9180FF]/10 dark:bg-[#9180FF]/10 light:bg-[#58724A]/10 rounded-full blur-[180px]" />
    </div>
  );
};
