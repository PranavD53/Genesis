import React from 'react';
import { useVenture } from '../../context/VentureContext';
import { GlassPanel } from '../ui/GlassPanel';
import { ArrowRight, TrendingUp, Target, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const MarketAnalysisView: React.FC = () => {
  const { venture, setStage } = useVenture();
  const mkt = venture.marketAnalysis;

  return (
    <div className="w-full min-h-screen flex flex-col justify-between pt-28 pb-16 px-6 bg-[#050505] dark:bg-[#050505] light:bg-[#F7F1E5] text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32]">
      <div className="w-full max-w-6xl mx-auto space-y-12 text-left">
        
        {/* Stage Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#D6AA35]">
              STAGE 02 / MARKET INTELLIGENCE
            </span>
            <span className="px-2 py-0.5 rounded text-[9px] font-mono uppercase bg-[#0B0B0D] dark:bg-[#0B0B0D] light:bg-[#FFF9EE] border border-white/10 dark:border-white/10 light:border-[#E6D9C4] text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270]">
              {venture.startupDetails.industry || 'FoodTech / SaaS'}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32]">
            IS THERE ENOUGH OPPORTUNITY HERE?
          </h1>
        </div>

        {/* GENESIS SIGNAL & MARKET INSIGHT */}
        <GlassPanel padding="medium" className="border-[#B8A7FF]/30 dark:border-[#B8A7FF]/30 light:border-[#D6AA35]/30">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#D6AA35]">
              GENESIS MARKET SIGNAL
            </span>
            <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/10 text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270]">
              [AI-derived]
            </span>
          </div>
          <p className="text-sm font-medium text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32] leading-relaxed">
            “Demand is expanding as commercial raw ingredient inflation rises 12%. The strongest opening is the underserved independent casual dining segment.”
          </p>
        </GlassPanel>

        {/* COMPOSED MARKET SIZING ROW (TAM / SAM / SOM with Source Labels) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-[#0B0B0D]/80 dark:bg-[#0B0B0D]/80 light:bg-[#FFF9EE]/80 border border-white/10 dark:border-white/10 light:border-[#E6D9C4] space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270]">TAM (TOTAL ADDRESSABLE)</span>
              <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-[#A7A7AD]">[Estimated]</span>
            </div>
            <div className="text-2xl font-mono font-medium text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32]">{mkt.tam}</div>
            <p className="text-[10px] text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#58724A]">Global & Regional Commercial Food Waste Management Market</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#0B0B0D]/80 dark:bg-[#0B0B0D]/80 light:bg-[#FFF9EE]/80 border border-white/10 dark:border-white/10 light:border-[#E6D9C4] space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#D6AA35]">SAM (SERVICEABLE ADDRESSABLE)</span>
              <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-[#B8A7FF]/20 text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#D6AA35]">[Reported]</span>
            </div>
            <div className="text-2xl font-mono font-medium text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32]">{mkt.sam}</div>
            <p className="text-[10px] text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#58724A]">Independent Casual Dining Restaurants (Urban Metros)</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#0B0B0D]/80 dark:bg-[#0B0B0D]/80 light:bg-[#FFF9EE]/80 border border-white/10 dark:border-white/10 light:border-[#E6D9C4] space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270]">SOM (OBTAINABLE MARKET)</span>
              <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-[#A7A7AD]">[Projected]</span>
            </div>
            <div className="text-2xl font-mono font-medium text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32]">{mkt.som}</div>
            <p className="text-[10px] text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#58724A]">First 100 Initial Paying Venues Target</p>
          </div>
        </div>

        {/* VISUAL ANALYTICS: MARKET GROWTH & POSITIONING */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Market Growth Trajectory Chart */}
          <GlassPanel padding="large">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#A7A7AD] flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#D6AA35]" />
                Market Trajectory & Demand Signal
              </h3>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/10 text-[#A7A7AD]">
                [Projected CAGR 18.4%]
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex items-end justify-between h-36 pt-4 border-b border-white/10 dark:border-white/10 light:border-[#E6D9C4] pb-2">
                <div className="w-16 bg-white/10 dark:bg-white/10 light:bg-[#304B32]/10 h-14 rounded-t text-center text-[10px] font-mono pt-1 text-[#A7A7AD]">2024<br/>₹420Cr</div>
                <div className="w-16 bg-white/20 dark:bg-white/20 light:bg-[#304B32]/20 h-24 rounded-t text-center text-[10px] font-mono pt-1 text-[#A7A7AD]">2025<br/>₹1,200Cr</div>
                <div className="w-16 bg-[#B8A7FF] dark:bg-[#B8A7FF] light:bg-[#D6AA35] text-[#050505] dark:text-[#050505] light:text-[#304B32] h-32 rounded-t text-center text-[10px] font-mono font-medium pt-1">2026<br/>₹4,200Cr</div>
              </div>
              <p className="text-xs text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#58724A]">
                Primary demand driver: High food COGS inflation forcing independent venue operators to adopt software control.
              </p>
            </div>
          </GlassPanel>

          {/* Competitor & Market Entry Opportunity Breakdown */}
          <GlassPanel padding="large">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#A7A7AD] flex items-center gap-2">
                <Target className="w-4 h-4 text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#D6AA35]" />
                Market Entry & Competitor Landscape
              </h3>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/10 text-[#A7A7AD]">
                [Reported]
              </span>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-[#050505] dark:bg-[#050505] light:bg-[#F7F1E5] border border-white/10 dark:border-white/10 light:border-[#E6D9C4]">
                <span className="text-[9px] text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270] block">DIRECT COMPETITION</span>
                <span className="text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32] font-medium block">
                  Petpooja Inventory, Toast POS Stock Module
                </span>
                <span className="text-[10px] text-[#A7A7AD] block mt-0.5">Limitation: Reactive post-shift logging rather than daily chef prep alerts.</span>
              </div>

              <div className="p-3 rounded-xl bg-[#050505] dark:bg-[#050505] light:bg-[#F7F1E5] border border-white/10 dark:border-white/10 light:border-[#E6D9C4]">
                <span className="text-[9px] text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270] block">INDIRECT COMPETITION</span>
                <span className="text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32] font-medium block">
                  Enterprise ERPs (Oracle MICROS, SAP Business One)
                </span>
                <span className="text-[10px] text-[#A7A7AD] block mt-0.5">Limitation: Expensive hardware overhead and complex UI unsuitable for local kitchens.</span>
              </div>
            </div>
          </GlassPanel>
        </div>

        {/* BOTTOM STAGE NAVIGATION */}
        <div className="flex justify-between items-center pt-8 border-t border-white/10 dark:border-white/10 light:border-[#E6D9C4]">
          <span className="text-xs font-mono text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270]">
            Stage 2 of 7 Complete
          </span>

          <button
            onClick={() => setStage('trans-comp')}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-xs font-mono font-medium tracking-wider uppercase bg-[#B8A7FF] dark:bg-[#B8A7FF] light:bg-[#D6AA35] text-[#050505] dark:text-[#050505] light:text-[#304B32] shadow-xl transition-all hover:scale-105"
          >
            CONTINUE TO COMPETITOR MATRIX
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
