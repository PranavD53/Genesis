import React, { useState } from 'react';
import { useVenture } from '../../context/VentureContext';
import { GlassPanel } from '../ui/GlassPanel';
import { ArrowRight, ChevronDown, ChevronUp, TrendingUp, DollarSign } from 'lucide-react';

export const FinancialScenariosView: React.FC = () => {
  const { venture, setStage } = useVenture();
  const fin = venture.financialProfile || {} as any;
  const derived = venture.derivedInsights || {} as any;
  const [showAlternativeScenarios, setShowAlternativeScenarios] = useState(true);

  return (
    <div className="w-full min-h-screen flex flex-col justify-between pt-28 pb-16 px-6 bg-[#050505] dark:bg-[#050505] light:bg-[#F7F1E5] text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32]">
      <div className="w-full max-w-6xl mx-auto space-y-12 text-left">
        
        {/* Stage Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#D6AA35]">
              STAGE 05 / FINANCIAL VIABILITY
            </span>
            <span className="px-2 py-0.5 rounded text-[9px] font-mono uppercase bg-[#0B0B0D] dark:bg-[#0B0B0D] light:bg-[#FFF9EE] border border-white/10 dark:border-white/10 light:border-[#E6D9C4] text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270]">
              CAPITAL & BREAK-EVEN ECONOMICS
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32]">
            CAN THE VENTURE ECONOMICS SUSTAIN ITSELF?
          </h1>
        </div>

        {/* GENESIS ECONOMIC OUTLOOK */}
        <GlassPanel padding="medium" className="border-[#B8A7FF]/30 dark:border-[#B8A7FF]/30 light:border-[#D6AA35]/30">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#D6AA35]">
              GENESIS ECONOMIC OUTLOOK
            </span>
            <span className="text-[9px] font-mono text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270]">
              [AI-derived]
            </span>
          </div>
          <p className="text-sm font-medium text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32] leading-relaxed">
            “{derived.economicOutlook} {derived.baseRunway}”
          </p>
        </GlassPanel>

        {/* COMPOSED INFORMATION ROW FOR KEY METRICS (NO equal card grid) */}
        <div className="flex flex-wrap items-center justify-between gap-6 p-6 rounded-2xl bg-[#0B0B0D]/80 dark:bg-[#0B0B0D]/80 light:bg-[#FFF9EE]/80 border border-white/10 dark:border-white/10 light:border-[#E6D9C4] font-mono">
          <div className="space-y-1">
            <span className="text-[9px] uppercase tracking-widest text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270] block">
              INITIAL CAPITAL <span className="text-[8px] opacity-70">[Estimated]</span>
            </span>
            <span className="text-2xl font-bold text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32]">
              {fin.capitalRequired || '₹45 Lakhs'}
            </span>
          </div>

          <div className="h-10 w-[1px] bg-white/10 hidden sm:block" />

          <div className="space-y-1">
            <span className="text-[9px] uppercase tracking-widest text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#D6AA35] block">
              TARGET RUNWAY <span className="text-[8px] opacity-70">[Projected]</span>
            </span>
            <span className="text-2xl font-bold text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#D6AA35]">
              {fin.baseRunway || '12 Months'}
            </span>
          </div>

          <div className="h-10 w-[1px] bg-white/10 hidden sm:block" />

          <div className="space-y-1">
            <span className="text-[9px] uppercase tracking-widest text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270] block">
              TARGET CUSTOMERS <span className="text-[8px] opacity-70">[Target]</span>
            </span>
            <span className="text-2xl font-bold text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32]">
              {fin.baseVenueTarget || 100} Units
            </span>
          </div>

          <div className="h-10 w-[1px] bg-white/10 hidden sm:block" />

          <div className="space-y-1">
            <span className="text-[9px] uppercase tracking-widest text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270] block">
              EST. BREAK-EVEN <span className="text-[8px] opacity-70">[Estimated]</span>
            </span>
            <span className="text-2xl font-bold text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32]">
              {fin.scenarios?.[1]?.breakEvenMonths ? `Month ${fin.scenarios[1].breakEvenMonths}` : 'Month 14'}
            </span>
          </div>
        </div>

        {/* DOMINATING VISUAL TRAJECTORY CHART (Revenue vs OpEx Break-Even Curve) */}
        <GlassPanel padding="large">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#A7A7AD] flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#D6AA35]" />
              Revenue vs Operating Cost Trajectory
            </h3>
            <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/10 text-[#A7A7AD]">
              [Projected Simulation]
            </span>
          </div>

          <div className="relative h-48 bg-[#050505] dark:bg-[#050505] light:bg-[#F7F1E5] rounded-2xl border border-white/10 dark:border-white/10 light:border-[#E6D9C4] p-6 flex flex-col justify-between font-mono">
            <div className="flex justify-between text-[10px] text-[#A7A7AD] border-b border-white/10 pb-2">
              <span>Month 01 (Seed ₹45L)</span>
              <span>Month 06 (Pilot 20 Venues)</span>
              <span className="text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#D6AA35] font-bold">Month 14 (Break-Even)</span>
              <span>Month 24 (100 Venues Scale)</span>
            </div>

            {/* Trajectory Bar Visual */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-[#A7A7AD]">Monthly Revenue (MRR)</span>
                <span className="font-bold text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#D6AA35]">₹6,25,000 / mo</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-[#B8A7FF] dark:bg-[#B8A7FF] light:bg-[#D6AA35] w-[62%]" />
              </div>

              <div className="flex items-center justify-between text-[10px]">
                <span className="text-[#A7A7AD]">Monthly Operating Cost (OpEx)</span>
                <span className="font-bold text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32]">₹5,80,000 / mo</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-white/40 dark:bg-white/40 light:bg-[#304B32]/40 w-[55%]" />
              </div>
            </div>

            <div className="flex justify-between text-xs text-[#A7A7AD] pt-2">
              <span>Burn Rate: ₹3.75L / mo</span>
              <span className="font-medium text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32]">Net Cash-Flow Positive at Month 14</span>
            </div>
          </div>

          {/* THREE FINANCIAL SCENARIOS BREAKDOWN */}
          {showAlternativeScenarios && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 font-mono text-xs">
              {fin.scenarios.map(scen => (
                <div key={scen.name} className="p-4 rounded-xl bg-[#050505] dark:bg-[#050505] light:bg-[#F7F1E5] border border-white/10 dark:border-white/10 light:border-[#E6D9C4] space-y-1">
                  <span className="text-[10px] font-bold text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#D6AA35] uppercase block">{scen.name} Scenario</span>
                  <div className="text-sm font-medium text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32]">{scen.growth}</div>
                  <div className="text-[10px] text-[#A7A7AD]">Break-Even: Month {scen.breakEvenMonths}</div>
                </div>
              ))}
            </div>
          )}
        </GlassPanel>

        {/* BOTTOM STAGE NAVIGATION */}
        <div className="flex justify-between items-center pt-8 border-t border-white/10 dark:border-white/10 light:border-[#E6D9C4]">
          <span className="text-xs font-mono text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270]">
            Stage 5 of 7 Complete
          </span>

          <button
            onClick={() => setStage('trans-via')}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-xs font-mono font-medium tracking-wider uppercase bg-[#B8A7FF] dark:bg-[#B8A7FF] light:bg-[#D6AA35] text-[#050505] dark:text-[#050505] light:text-[#304B32] shadow-xl transition-all hover:scale-105"
          >
            CONTINUE TO STRATEGIC DECISION
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
