import React from 'react';

export const FlowingLinesBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-25">
      <svg
        className="w-full h-full min-h-[100vh]"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M-100,650 C300,450 600,750 900,500 C1200,250 1400,600 1600,400"
          stroke="currentColor"
          className="text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#D6AA35]"
          strokeWidth="1.2"
          fill="none"
        />
        <path
          d="M-100,680 C300,480 600,780 900,530 C1200,280 1400,630 1600,430"
          stroke="currentColor"
          className="text-[#9180FF] dark:text-[#9180FF] light:text-[#58724A]"
          strokeWidth="1"
          strokeDasharray="4 4"
          fill="none"
        />
        <path
          d="M-100,710 C320,500 620,800 920,550 C1220,300 1420,650 1620,450"
          stroke="currentColor"
          className="text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#D6AA35]"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    </div>
  );
};
