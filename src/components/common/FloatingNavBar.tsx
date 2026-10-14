import React, { useState } from 'react';
import { useVenture } from '../../context/VentureContext';
import { useTheme } from '../../context/ThemeContext';
import { VentureEvolutionStage } from '../../types/venture';
import {
  Sun,
  Moon,
  Sparkles,
  RotateCcw,
  Home,
  Menu,
  X
} from 'lucide-react';

export const FloatingNavBar: React.FC = () => {
  const { currentStage, setStage, venture, loadDemoVenture } = useVenture();
  const { theme, toggleTheme } = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isLandingPage = currentStage === 'opening';

  // Helper to map current stage to human stage label
  const getStageLabel = (stage: VentureEvolutionStage) => {
    switch (stage) {
      case 'input-1':
      case 'input-2':
      case 'input-3':
      case 'input-4':
        return 'Venture Input Flow';
      case 'dna':
        return 'Stage 1: Business DNA';
      case 'market':
        return 'Stage 2: Market Intelligence';
      case 'competitor':
        return 'Stage 3: Competitive Landscape';
      case 'business':
        return 'Stage 4: Business Model Stream';
      case 'financial':
        return 'Stage 5: Financial Viability';
      case 'decisions':
        return 'Stage 6: Strategic Decision';
      case 'roadmap':
        return 'Stage 7: Execution Roadmap';
      case 'strategy':
        return 'Continuous Signal Feed';
      default:
        return 'Venture Intelligence';
    }
  };

  const scrollToSection = (id: string) => {
    if (!isLandingPage) {
      setStage('opening');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-5 left-0 right-0 z-50 px-6 sm:px-12 flex justify-center">
      <div className="w-full max-w-6xl bg-[#0B0B0D]/90 dark:bg-[#0B0B0D]/90 light:bg-[#FFF9EE]/90 backdrop-blur-xl rounded-full px-6 py-2.5 shadow-2xl border border-white/10 dark:border-white/10 light:border-[#E6D9C4] flex items-center justify-between transition-all duration-300">
        
        {/* Brand Identity */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setStage('opening')}
            className="flex items-center gap-2.5 group focus:outline-none"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#74747B] via-[#B8A7FF] to-[#9180FF] dark:from-[#74747B] dark:to-[#B8A7FF] light:from-[#304B32] light:to-[#D6AA35] p-[2px] shadow-md group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#050505] dark:bg-[#050505] light:bg-[#FFF9EE] rounded-full flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#B8A7FF] dark:bg-[#B8A7FF] light:bg-[#D6AA35] animate-pulse" />
              </div>
            </div>
            <div className="text-left">
              <span className="font-medium text-xs sm:text-sm text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32] tracking-tight leading-none block">
                GENESIS
              </span>
              <span className="text-[10px] font-normal text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270] block -mt-0.5">
                Venture Intelligence
              </span>
            </div>
          </button>

          {/* Active Venture Badge (Internal Workspace only) */}
          {!isLandingPage && venture.startupDetails.name && (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-normal bg-[#050505] dark:bg-[#050505] light:bg-[#F7F1E5] text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#304B32] border border-white/10 dark:border-white/10 light:border-[#E6D9C4]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8A7FF] dark:bg-[#B8A7FF] light:bg-[#D6AA35] animate-pulse" />
              {venture.startupDetails.name}
            </div>
          )}
        </div>

        {/* PUBLIC LANDING PAGE NAVIGATION (How Genesis Works, Intelligence, Workflow, About) */}
        {isLandingPage ? (
          <nav className="hidden lg:flex items-center gap-7">
            <button
              onClick={() => scrollToSection('workflow')}
              className="text-xs font-medium text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270] hover:text-[#F5F5F5] dark:hover:text-[#F5F5F5] light:hover:text-[#304B32] transition-colors"
            >
              How Genesis Works
            </button>
            <button
              onClick={() => scrollToSection('capabilities')}
              className="text-xs font-medium text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270] hover:text-[#F5F5F5] dark:hover:text-[#F5F5F5] light:hover:text-[#304B32] transition-colors"
            >
              Intelligence
            </button>
            <button
              onClick={() => scrollToSection('architecture')}
              className="text-xs font-medium text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270] hover:text-[#F5F5F5] dark:hover:text-[#F5F5F5] light:hover:text-[#304B32] transition-colors"
            >
              Workflow
            </button>
            <button
              onClick={() => scrollToSection('contrast')}
              className="text-xs font-medium text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270] hover:text-[#F5F5F5] dark:hover:text-[#F5F5F5] light:hover:text-[#304B32] transition-colors"
            >
              About
            </button>
          </nav>
        ) : (
          /* INTERNAL WORKSPACE STAGE INDICATOR (Subtle, focused, NO future stage links menu!) */
          <div className="hidden md:flex items-center gap-2 px-4 py-1 rounded-full bg-[#050505]/80 dark:bg-[#050505]/80 light:bg-[#F7F1E5] border border-white/10 dark:border-white/10 light:border-[#E6D9C4]">
            <span className="text-[11px] font-mono text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#D6AA35] tracking-wider uppercase">
              {getStageLabel(currentStage)}
            </span>
          </div>
        )}

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-full text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270] hover:bg-white/5 dark:hover:bg-white/5 light:hover:bg-[#E6D9C4] transition-colors"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-[#B8A7FF]" /> : <Moon className="w-4 h-4 text-[#304B32]" />}
          </button>

          {isLandingPage ? (
            <button
              onClick={() => setStage('input-1')}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium bg-[#B8A7FF] dark:bg-[#B8A7FF] light:bg-[#D6AA35] text-[#050505] dark:text-[#050505] light:text-[#304B32] shadow-md transition-all hover:scale-105"
            >
              <Sparkles className="w-3.5 h-3.5" />
              START YOUR VENTURE
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={loadDemoVenture}
                className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270] hover:text-[#F5F5F5] dark:hover:text-[#F5F5F5] light:hover:text-[#304B32] transition-colors"
                title="Reload WasteWise Systems Sample Data"
              >
                <RotateCcw className="w-3 h-3" />
                Sample
              </button>

              <button
                onClick={() => setStage('opening')}
                className="p-1.5 rounded-full text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270] hover:bg-white/5 dark:hover:bg-white/5 light:hover:bg-[#E6D9C4] transition-colors"
                title="Exit to Landing Page"
              >
                <Home className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Drawer for Mobile */}
          <button
            onClick={() => setDrawerOpen(!drawerOpen)}
            className="lg:hidden p-1.5 rounded-full text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270]"
          >
            {drawerOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <div className="lg:hidden absolute top-16 right-6 w-64 bg-[#0B0B0D] dark:bg-[#0B0B0D] light:bg-[#FFF9EE] rounded-2xl p-4 shadow-2xl border border-white/10 dark:border-white/10 light:border-[#E6D9C4] space-y-2 z-50">
          <div className="text-[10px] font-mono uppercase tracking-widest text-[#74747B] dark:text-[#74747B] light:text-[#7D9270] px-2 mb-1">Navigation</div>
          
          {isLandingPage ? (
            <>
              <button onClick={() => { scrollToSection('workflow'); setDrawerOpen(false); }} className="block w-full text-left px-3 py-2 text-xs text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#304B32]">How Genesis Works</button>
              <button onClick={() => { scrollToSection('capabilities'); setDrawerOpen(false); }} className="block w-full text-left px-3 py-2 text-xs text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#304B32]">Intelligence</button>
              <button onClick={() => { scrollToSection('architecture'); setDrawerOpen(false); }} className="block w-full text-left px-3 py-2 text-xs text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#304B32]">Workflow</button>
              <button onClick={() => { scrollToSection('contrast'); setDrawerOpen(false); }} className="block w-full text-left px-3 py-2 text-xs text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#304B32]">About</button>
            </>
          ) : (
            <div className="px-3 py-2 text-xs font-mono text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#D6AA35]">
              {getStageLabel(currentStage)}
            </div>
          )}

          <div className="pt-2 border-t border-white/10 dark:border-white/10 light:border-[#E6D9C4]">
            <button
              onClick={() => {
                setStage('input-1');
                setDrawerOpen(false);
              }}
              className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-xs font-medium text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#D6AA35]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Start Your Venture
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
