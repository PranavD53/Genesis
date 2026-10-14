import React from 'react';

/**
 * Animated Interactive Venture Intelligence Neural Canvas
 * Features levitating metric nodes, slow ring rotation, and calm central hub
 * Dark Theme: Black + White + Grey + Silver + Lilac
 * Light Theme: Cream + Beige + White + Lime Green + Lemon Yellow
 */
export const AnimatedVentureNeuralCanvas: React.FC = () => {
  return (
    <div className="relative w-full max-w-4xl mx-auto h-[420px] sm:h-[460px] rounded-3xl overflow-hidden mt-6 border border-white/10 dark:border-white/10 light:border-[#E6D9C4] bg-[#050505] dark:bg-[#050505] light:bg-[#FFF9EE] flex items-center justify-center p-6 shadow-2xl">
      
      {/* 1. Atmospheric Ambient Glow Orbs */}
      <div className="absolute top-10 left-12 w-72 h-72 rounded-full bg-[#B8A7FF]/15 dark:bg-[#B8A7FF]/15 light:bg-[#FACC15]/25 blur-3xl animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-10 right-12 w-80 h-80 rounded-full bg-[#9180FF]/15 dark:bg-[#9180FF]/15 light:bg-[#65A30D]/20 blur-3xl animate-pulse-slow pointer-events-none" />

      {/* 2. Concentric Animated Orbit Circles */}
      <div className="absolute w-[420px] h-[420px] rounded-full border border-dashed border-white/10 dark:border-white/10 light:border-[#65A30D]/20 animate-spin-slow opacity-40 pointer-events-none" />
      <div className="absolute w-[300px] h-[300px] rounded-full border border-white/15 dark:border-white/15 light:border-[#65A30D]/30 opacity-60 pointer-events-none" />
      <div className="absolute w-[190px] h-[190px] rounded-full border border-[#B8A7FF]/30 dark:border-[#B8A7FF]/30 light:border-[#FACC15]/40 opacity-70 pointer-events-none" />

      {/* 3. Connecting SVG Streams & Static Ambient Dots */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 460" fill="none">
        <path d="M 160 130 Q 400 230 640 130" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 6" className="text-[#B8A7FF]/40 dark:text-[#B8A7FF]/40 light:text-[#65A30D]/50" />
        <path d="M 160 330 Q 400 230 640 330" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 6" className="text-[#B8A7FF]/40 dark:text-[#B8A7FF]/40 light:text-[#FACC15]/60" />
        <path d="M 400 70 L 400 390" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-[#A7A7AD]/30 dark:text-[#A7A7AD]/30 light:text-[#304B32]/30" />
        
        {/* Ambient Static Dots */}
        <circle cx="280" cy="180" r="3" fill="currentColor" className="text-[#B8A7FF]/60 dark:text-[#B8A7FF]/60 light:text-[#65A30D]/60" />
        <circle cx="520" cy="180" r="3" fill="currentColor" className="text-[#B8A7FF]/60 dark:text-[#B8A7FF]/60 light:text-[#FACC15]/60" />
      </svg>

      {/* 4. Floating Animated Metric Badges */}
      
      {/* Node 1: Market TAM (Top Left Floating) */}
      <div className="absolute top-[16%] left-[8%] sm:left-[12%] p-3.5 rounded-2xl bg-[#0B0B0D]/90 dark:bg-[#0B0B0D]/90 light:bg-[#FFFFFF]/90 border border-white/10 dark:border-white/10 light:border-[#E6D9C4] shadow-xl backdrop-blur-md animate-float space-y-1 text-left">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#B8A7FF] dark:bg-[#B8A7FF] light:bg-[#65A30D]" />
          <span className="text-[9px] font-mono uppercase text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#65A30D]">MARKET TAM</span>
        </div>
        <div className="text-xs font-mono font-bold text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#1C3B2B]">₹28,500 Cr Target</div>
      </div>

      {/* Node 2: Unit Economics (Top Right Floating) */}
      <div className="absolute top-[16%] right-[8%] sm:right-[12%] p-3.5 rounded-2xl bg-[#0B0B0D]/90 dark:bg-[#0B0B0D]/90 light:bg-[#FFFFFF]/90 border border-white/10 dark:border-white/10 light:border-[#E6D9C4] shadow-xl backdrop-blur-md animate-float-delayed space-y-1 text-left">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#B8A7FF] dark:bg-[#B8A7FF] light:bg-[#FACC15]" />
          <span className="text-[9px] font-mono uppercase text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#65A30D]">REVENUE MODEL</span>
        </div>
        <div className="text-xs font-mono font-bold text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#1C3B2B]">₹7,500/mo SaaS Fee</div>
      </div>

      {/* Node 3: Break-Even (Bottom Left Floating) */}
      <div className="absolute bottom-[16%] left-[8%] sm:left-[12%] p-3.5 rounded-2xl bg-[#0B0B0D]/90 dark:bg-[#0B0B0D]/90 light:bg-[#FFFFFF]/90 border border-white/10 dark:border-white/10 light:border-[#E6D9C4] shadow-xl backdrop-blur-md animate-float-delayed space-y-1 text-left">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#B8A7FF] dark:bg-[#B8A7FF] light:bg-[#65A30D]" />
          <span className="text-[9px] font-mono uppercase text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#65A30D]">FINANCIAL RUNWAY</span>
        </div>
        <div className="text-xs font-mono font-bold text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#1C3B2B]">Break-Even Month 14</div>
      </div>

      {/* Node 4: Verdict (Bottom Right Floating) */}
      <div className="absolute bottom-[16%] right-[8%] sm:right-[12%] p-3.5 rounded-2xl bg-[#0B0B0D]/90 dark:bg-[#0B0B0D]/90 light:bg-[#FFFFFF]/90 border border-[#B8A7FF]/40 dark:border-[#B8A7FF]/40 light:border-[#FACC15]/60 shadow-xl backdrop-blur-md animate-float space-y-1 text-left">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#B8A7FF] dark:bg-[#B8A7FF] light:bg-[#FACC15]" />
          <span className="text-[9px] font-mono uppercase text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#65A30D]">VERDICT</span>
        </div>
        <div className="text-xs font-mono font-bold text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#1C3B2B]">PROMISING VENTURE</div>
      </div>

      {/* 5. Central Calm Genesis Focal Engine Core (No particles/emissions) */}
      <div className="relative z-10 w-36 h-36 rounded-full bg-[#050505] dark:bg-[#050505] light:bg-[#FFF9EE] border-2 border-[#B8A7FF] dark:border-[#B8A7FF] light:border-[#65A30D] shadow-2xl shadow-[#B8A7FF]/30 dark:shadow-[#B8A7FF]/30 light:shadow-[#FACC15]/30 flex flex-col items-center justify-center p-4 text-center transition-transform hover:scale-105 cursor-pointer">
        <div className="w-2.5 h-2.5 rounded-full bg-[#B8A7FF] dark:bg-[#B8A7FF] light:bg-[#FACC15] animate-pulse mb-2" />
        <span className="text-xs font-mono font-bold tracking-widest text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#1C3B2B]">
          GENESIS
        </span>
        <span className="text-[9px] font-mono uppercase tracking-widest text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#65A30D] mt-0.5">
          INTELLIGENCE
        </span>
      </div>

    </div>
  );
};

export const EternaCloudHeroVisual: React.FC = () => {
  return <AnimatedVentureNeuralCanvas />;
};

export const ConnectedArchitectureVisual: React.FC = () => {
  return (
    <div className="relative w-full max-w-4xl mx-auto p-8 rounded-3xl bg-[#0B0B0D]/80 dark:bg-[#0B0B0D]/80 light:bg-[#FFF9EE]/80 border border-white/10 dark:border-white/10 light:border-[#E6D9C4] backdrop-blur-xl">
      <div className="text-center mb-8">
        <span className="text-[10px] uppercase font-mono tracking-widest text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#65A30D]">
          SYSTEM ARCHITECTURE
        </span>
        <h3 className="text-xl font-medium text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32] mt-1">
          How Genesis Connects Your Venture
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left Inputs */}
        <div className="md:col-span-3 space-y-3">
          <div className="p-3 rounded-xl bg-[#050505] dark:bg-[#050505] light:bg-[#FFFFFF] border border-white/10 dark:border-white/10 light:border-[#E6D9C4] text-xs font-mono text-left transition-transform hover:-translate-y-0.5">
            <span className="text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270] block text-[9px]">INPUT 01</span>
            <span className="text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32]">FOUNDER IDEA & PROBLEM</span>
          </div>
          <div className="p-3 rounded-xl bg-[#050505] dark:bg-[#050505] light:bg-[#FFFFFF] border border-white/10 dark:border-white/10 light:border-[#E6D9C4] text-xs font-mono text-left transition-transform hover:-translate-y-0.5">
            <span className="text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270] block text-[9px]">INPUT 02</span>
            <span className="text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32]">TARGET CUSTOMER NEEDS</span>
          </div>
          <div className="p-3 rounded-xl bg-[#050505] dark:bg-[#050505] light:bg-[#FFFFFF] border border-white/10 dark:border-white/10 light:border-[#E6D9C4] text-xs font-mono text-left transition-transform hover:-translate-y-0.5">
            <span className="text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270] block text-[9px]">INPUT 03</span>
            <span className="text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32]">INITIAL CAPITAL & RUNWAY</span>
          </div>
        </div>

        {/* Center Convergence */}
        <div className="md:col-span-6 flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-b from-[#050505] to-[#0B0B0D] dark:from-[#050505] dark:to-[#0B0B0D] light:from-[#F7F1E5] light:to-[#FFF9EE] border border-[#B8A7FF]/30 dark:border-[#B8A7FF]/30 light:border-[#65A30D]/30 text-center relative shadow-xl">
          <div className="w-12 h-12 rounded-full bg-[#B8A7FF]/20 dark:bg-[#B8A7FF]/20 light:bg-[#FACC15]/20 border border-[#B8A7FF] dark:border-[#B8A7FF] light:border-[#65A30D] flex items-center justify-center mb-3">
            <div className="w-3 h-3 rounded-full bg-[#B8A7FF] dark:bg-[#B8A7FF] light:bg-[#65A30D] animate-pulse" />
          </div>
          <span className="text-xs font-mono tracking-widest text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#65A30D] block font-bold">
            GENESIS ENGINE
          </span>
          <h4 className="text-sm font-medium text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32] mt-1">
            Venture Synthesis & Signal Processing
          </h4>
          <div className="mt-4 grid grid-cols-3 gap-2 w-full text-[9px] font-mono text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#58724A]">
            <span className="p-1.5 rounded bg-white/5 dark:bg-white/5 light:bg-[#FFFFFF] border border-white/5 light:border-[#E6D9C4]">MARKET</span>
            <span className="p-1.5 rounded bg-white/5 dark:bg-white/5 light:bg-[#FFFFFF] border border-white/5 light:border-[#E6D9C4]">MODEL</span>
            <span className="p-1.5 rounded bg-white/5 dark:bg-white/5 light:bg-[#FFFFFF] border border-white/5 light:border-[#E6D9C4]">FINANCE</span>
          </div>
        </div>

        {/* Right Output */}
        <div className="md:col-span-3 space-y-3">
          <div className="p-3 rounded-xl bg-[#050505] dark:bg-[#050505] light:bg-[#FFFFFF] border border-[#B8A7FF]/40 dark:border-[#B8A7FF]/40 light:border-[#65A30D]/40 text-xs font-mono text-left transition-transform hover:-translate-y-0.5">
            <span className="text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#65A30D] block text-[9px] font-bold">OUTPUT 01</span>
            <span className="text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32]">STRATEGIC VERDICT</span>
          </div>
          <div className="p-3 rounded-xl bg-[#050505] dark:bg-[#050505] light:bg-[#FFFFFF] border border-[#B8A7FF]/40 dark:border-[#B8A7FF]/40 light:border-[#65A30D]/40 text-xs font-mono text-left transition-transform hover:-translate-y-0.5">
            <span className="text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#65A30D] block text-[9px] font-bold">OUTPUT 02</span>
            <span className="text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32]">EXECUTION ROADMAP</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const OrbitalSphereVisual: React.FC = () => {
  return (
    <div className="relative w-full max-w-[280px] aspect-square flex items-center justify-center">
      <div className="absolute inset-0 bg-[#B8A7FF]/10 dark:bg-[#B8A7FF]/10 light:bg-[#FACC15]/15 rounded-full blur-2xl pointer-events-none" />
      <svg className="w-full h-full animate-spin-slow opacity-60" viewBox="0 0 200 200" fill="none">
        <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" className="text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#65A30D]" />
        <ellipse cx="100" cy="100" rx="80" ry="30" stroke="currentColor" strokeWidth="1" className="text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#304B32]" />
        <ellipse cx="100" cy="100" rx="80" ry="55" stroke="currentColor" strokeWidth="1" className="text-[#74747B] dark:text-[#74747B] light:text-[#58724A]" />
        <ellipse cx="100" cy="100" rx="30" ry="80" stroke="currentColor" strokeWidth="1" className="text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#65A30D]" />
      </svg>
      <div className="absolute w-14 h-14 rounded-full bg-[#050505] dark:bg-[#050505] light:bg-[#FFF9EE] border border-[#B8A7FF] dark:border-[#B8A7FF] light:border-[#65A30D] text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32] shadow-2xl flex items-center justify-center font-medium text-xs">
        Venture
      </div>
    </div>
  );
};
