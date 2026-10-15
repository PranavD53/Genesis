import React, { useState } from 'react';
import { useVenture } from '../../context/VentureContext';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { VentureEvolutionStage } from '../../types/venture';
import {
  Sun,
  Moon,
  Sparkles,
  Home,
  Menu,
  X,
  User as UserIcon,
  LogOut,
  Settings,
  ChevronDown
} from 'lucide-react';
import { isSupabaseConfigured } from '../../services/api';

export const FloatingNavBar: React.FC = () => {
  const { currentStage, setStage, venture, resetVenture } = useVenture();
  const { theme, toggleTheme } = useTheme();
  const { user, openAuthModal, openAccountSettings, signOut } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    resetVenture('opening');
  };

  const isLandingPage = currentStage === 'opening';
  const userDisplayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Founder';
  const userInitial = userDisplayName.charAt(0).toUpperCase();

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

  const handleStartVenture = () => {
    if (!user) {
      openAuthModal('register', () => {
        resetVenture('input-1');
      });
      return;
    }
    resetVenture('input-1');
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
    <header className="fixed top-4 sm:top-6 left-0 right-0 z-50 px-4 sm:px-8 flex justify-center print:hidden">
      <div className="w-full max-w-6xl bg-[#0B0B0D]/95 dark:bg-[#0B0B0D]/95 light:bg-[#FFFDF7]/95 backdrop-blur-2xl rounded-full px-5 sm:px-7 py-3 sm:py-3.5 shadow-[0_16px_50px_rgba(0,0,0,0.65)] border border-white/20 dark:border-white/20 light:border-[#D6AA35]/40 flex items-center justify-between transition-all duration-300 ring-1 ring-white/10">
        
        {/* Brand Identity */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setStage('opening')}
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-[#74747B] via-[#B8A7FF] to-[#9180FF] dark:from-[#74747B] dark:to-[#B8A7FF] light:from-[#304B32] light:to-[#D6AA35] p-[2.5px] shadow-lg group-hover:scale-105 transition-transform shrink-0">
              <div className="w-full h-full bg-[#050505] dark:bg-[#050505] light:bg-[#FFF9EE] rounded-full flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-[#B8A7FF] dark:bg-[#B8A7FF] light:bg-[#D6AA35] animate-pulse" />
              </div>
            </div>
            <div className="text-left">
              <span className="font-bold text-sm sm:text-base text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#1C3B2B] tracking-tight leading-none block">
                GENESIS
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono font-medium text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#8C6D15] block mt-0.5">
                Venture Intelligence
              </span>
            </div>
          </button>

          {/* Active Venture Badge (Internal Workspace only) */}
          {!isLandingPage && venture.startupDetails.name && (
            <div className="hidden md:flex items-center gap-2 pl-2">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-[#050505] dark:bg-[#050505] light:bg-[#F7F1E5] text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#304B32] border border-white/10 dark:border-white/10 light:border-[#E6D9C4]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B8A7FF] dark:bg-[#B8A7FF] light:bg-[#D6AA35] animate-pulse" />
                <span className="max-w-[120px] truncate">{venture.startupDetails.name}</span>
              </div>
              {isSupabaseConfigured() && (
                <span className="hidden xl:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono text-[#65A30D] bg-[#65A30D]/10 border border-[#65A30D]/20">
                  Synced
                </span>
              )}
            </div>
          )}
        </div>

        {/* PUBLIC LANDING PAGE NAVIGATION (How Genesis Works, Intelligence, Workflow, About) */}
        {isLandingPage ? (
          <nav className="hidden lg:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('workflow')}
              className="text-xs sm:text-sm font-semibold text-[#D1D1D6] dark:text-[#D1D1D6] light:text-[#2A4330] hover:text-[#B8A7FF] dark:hover:text-[#B8A7FF] light:hover:text-[#8C6D15] transition-colors"
            >
              How Genesis Works
            </button>
            <button
              onClick={() => scrollToSection('capabilities')}
              className="text-xs sm:text-sm font-semibold text-[#D1D1D6] dark:text-[#D1D1D6] light:text-[#2A4330] hover:text-[#B8A7FF] dark:hover:text-[#B8A7FF] light:hover:text-[#8C6D15] transition-colors"
            >
              Intelligence
            </button>
            <button
              onClick={() => scrollToSection('architecture')}
              className="text-xs sm:text-sm font-semibold text-[#D1D1D6] dark:text-[#D1D1D6] light:text-[#2A4330] hover:text-[#B8A7FF] dark:hover:text-[#B8A7FF] light:hover:text-[#8C6D15] transition-colors"
            >
              Workflow
            </button>
            <button
              onClick={() => scrollToSection('contrast')}
              className="text-xs sm:text-sm font-semibold text-[#D1D1D6] dark:text-[#D1D1D6] light:text-[#2A4330] hover:text-[#B8A7FF] dark:hover:text-[#B8A7FF] light:hover:text-[#8C6D15] transition-colors"
            >
              About
            </button>
          </nav>
        ) : (
          /* INTERNAL WORKSPACE STAGE INDICATOR (Clear, prominent) */
          <div className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#050505]/90 dark:bg-[#050505]/90 light:bg-[#F7F1E5] border border-white/15 dark:border-white/15 light:border-[#E6D9C4] shadow-inner">
            <span className="text-xs font-mono font-bold text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#D6AA35] tracking-wider uppercase">
              {getStageLabel(currentStage)}
            </span>
          </div>
        )}

        {/* Right Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270] hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-[#E6D9C4] transition-colors"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-[#B8A7FF]" /> : <Moon className="w-4 h-4 text-[#304B32]" />}
          </button>

          {/* Authentication State & Actions (Desktop) */}
          {user ? (
            <div className="hidden sm:flex items-center gap-2.5 pl-3 border-l border-white/20 dark:border-white/20 light:border-[#E6D9C4]">
              {/* Account Settings Trigger */}
              <button
                onClick={openAccountSettings}
                className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 dark:bg-white/10 dark:hover:bg-white/20 light:bg-[#F7F1E5] light:hover:bg-[#E6D9C4] border border-white/20 dark:border-white/20 light:border-[#E6D9C4] transition-all group shadow-sm"
                title="Account Settings & Profile"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#B8A7FF] via-[#A792FF] to-[#9180FF] flex items-center justify-center text-xs font-bold text-black uppercase shrink-0 shadow">
                  {userInitial}
                </div>
                <span className="max-w-[120px] truncate text-xs sm:text-sm font-semibold text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#1C3B2B]">
                  {userDisplayName}
                </span>
                <Settings className="w-4 h-4 text-[#A7A7AD] group-hover:rotate-45 transition-transform" />
              </button>

              {/* Prominent Clear Sign Out Button */}
              <button
                onClick={handleSignOut}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold text-red-400 hover:text-red-300 bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 transition-all shadow-sm"
                title="Sign Out of Account"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2.5 pl-3 border-l border-white/20 dark:border-white/20 light:border-[#E6D9C4]">
              <button
                onClick={() => openAuthModal('signin')}
                className="px-4 py-2 rounded-full text-sm sm:text-base font-bold text-white dark:text-white light:text-[#1C3B2B] hover:text-[#B8A7FF] hover:bg-white/10 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => openAuthModal('register')}
                className="px-5 py-2 rounded-full text-sm sm:text-base font-bold bg-[#B8A7FF] text-[#050505] hover:bg-[#c9bcff] shadow-lg shadow-[#B8A7FF]/25 border border-[#B8A7FF]/60 hover:scale-105 active:scale-95 transition-all"
              >
                Register
              </button>
            </div>
          )}

          {/* Primary Action Button */}
          {isLandingPage ? (
            <button
              onClick={handleStartVenture}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-mono font-bold tracking-wider uppercase bg-gradient-to-r from-[#B8A7FF] via-[#A792FF] to-[#8C76FF] dark:from-[#B8A7FF] dark:to-[#8C76FF] light:from-[#D6AA35] light:to-[#B58A18] text-[#050505] dark:text-[#050505] light:text-[#1C3B2B] shadow-xl hover:scale-105 active:scale-95 transition-all shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" />
              START VENTURE
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setStage('strategy')}
                className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-mono font-medium text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270] hover:text-[#B8A7FF] dark:hover:text-[#B8A7FF] light:hover:text-[#D6AA35] transition-colors"
                title="Continuous Signal Feed"
              >
                Signals
              </button>

              <button
                onClick={() => setStage('opening')}
                className="p-2 rounded-full text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270] hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-[#E6D9C4] transition-colors"
                title="Exit to Landing Page"
              >
                <Home className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Drawer for Mobile */}
          <button
            onClick={() => setDrawerOpen(!drawerOpen)}
            className="lg:hidden p-2 rounded-full text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270]"
          >
            {drawerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <div className="lg:hidden absolute top-18 right-6 w-72 bg-[#0B0B0D] dark:bg-[#0B0B0D] light:bg-[#FFF9EE] rounded-3xl p-5 shadow-2xl border border-white/15 dark:border-white/15 light:border-[#E6D9C4] space-y-4 z-50 animate-in fade-in slide-in-from-top-4">
          
          {/* Auth in Mobile Drawer */}
          <div className="pb-3 border-b border-white/10 dark:border-white/10 light:border-[#E6D9C4]">
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#B8A7FF] to-[#9180FF] flex items-center justify-center text-xs font-bold text-black uppercase shrink-0">
                      {userInitial}
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-bold text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32] truncate">{userDisplayName}</p>
                      <p className="text-[10px] text-[#74747B] truncate">{user.email}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => {
                      setDrawerOpen(false);
                      openAccountSettings();
                    }}
                    className="py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold text-center text-[#F5F5F5] bg-white/10 border border-white/15 flex items-center justify-center gap-1.5 hover:bg-white/15 transition-all"
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </button>
                  <button
                    onClick={async () => {
                      setDrawerOpen(false);
                      await handleSignOut();
                    }}
                    className="py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold text-center text-red-400 bg-red-500/15 border border-red-500/30 flex items-center justify-center gap-1.5 hover:bg-red-500/25 transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => { openAuthModal('signin'); setDrawerOpen(false); }}
                  className="px-4 py-2.5 rounded-xl text-sm font-bold text-center text-white dark:text-white light:text-[#304B32] bg-white/10 dark:bg-white/10 light:bg-[#F7F1E5] border border-white/15 dark:border-white/15 light:border-[#E6D9C4] hover:bg-white/15 transition-all"
                >
                  Sign In
                </button>
                <button
                  onClick={() => { openAuthModal('register'); setDrawerOpen(false); }}
                  className="px-4 py-2.5 rounded-xl text-sm font-bold text-center bg-[#B8A7FF] text-[#050505] shadow-md border border-[#B8A7FF] hover:bg-[#c9bcff] transition-all"
                >
                  Register
                </button>
              </div>
            )}
          </div>

          <div className="text-[10px] font-mono uppercase tracking-widest text-[#74747B] dark:text-[#74747B] light:text-[#7D9270] px-1">Navigation</div>
          
          {isLandingPage ? (
            <div className="space-y-1">
              <button onClick={() => { scrollToSection('workflow'); setDrawerOpen(false); }} className="block w-full text-left px-3 py-2 text-xs font-medium text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#304B32] hover:bg-white/5 rounded-lg">How Genesis Works</button>
              <button onClick={() => { scrollToSection('capabilities'); setDrawerOpen(false); }} className="block w-full text-left px-3 py-2 text-xs font-medium text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#304B32] hover:bg-white/5 rounded-lg">Intelligence</button>
              <button onClick={() => { scrollToSection('architecture'); setDrawerOpen(false); }} className="block w-full text-left px-3 py-2 text-xs font-medium text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#304B32] hover:bg-white/5 rounded-lg">Workflow</button>
              <button onClick={() => { scrollToSection('contrast'); setDrawerOpen(false); }} className="block w-full text-left px-3 py-2 text-xs font-medium text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#304B32] hover:bg-white/5 rounded-lg">About</button>
            </div>
          ) : (
            <div className="px-3 py-2 text-xs font-mono font-bold text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#D6AA35]">
              {getStageLabel(currentStage)}
            </div>
          )}

          <div className="pt-2 border-t border-white/10 dark:border-white/10 light:border-[#E6D9C4]">
            <button
              onClick={() => {
                setDrawerOpen(false);
                handleStartVenture();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-2xl text-xs font-mono font-bold tracking-wider uppercase bg-[#B8A7FF] text-[#050505]"
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
