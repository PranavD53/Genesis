import React from 'react';
import { useVenture } from '../../context/VentureContext';
import { GlassPanel } from '../ui/GlassPanel';
import { ArrowRight, ShieldCheck, AlertTriangle, Award, CheckCircle2 } from 'lucide-react';

export const RiskOpportunityRadar: React.FC = () => {
  const { venture, setStage } = useVenture();
  const derived = venture.derivedInsights || {} as any;
  const risks = venture.riskOpportunity?.topRisks || [];

  return (
    <div className="w-full min-h-screen flex flex-col justify-between pt-28 pb-16 px-6 bg-[#050505] dark:bg-[#050505] light:bg-[#F7F1E5] text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32]">
      <div className="w-full max-w-6xl mx-auto space-y-12 text-left">
        
        {/* Stage Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#D6AA35]">
              STAGE 06 / STRATEGIC DECISION
            </span>
            <span className="px-2 py-0.5 rounded text-[9px] font-mono uppercase bg-[#B8A7FF]/20 text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#D6AA35] border border-[#B8A7FF]/30">
              VERDICT: {derived.verdict}
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-medium tracking-tight text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32]">
            STRATEGIC VERDICT: {derived.verdict}
          </h1>
        </div>

        {/* DECISION RATIONALE PANEL */}
        <GlassPanel padding="medium" className="border-[#B8A7FF]/30 dark:border-[#B8A7FF]/30 light:border-[#D6AA35]/30">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#D6AA35]">
              DECISION RATIONALE
            </span>
            <span className="text-[9px] font-mono text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270]">
              [Synthesis Conclusion]
            </span>
          </div>
          <p className="text-sm font-medium text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32] leading-relaxed">
            “{derived.verdictRationale}”
          </p>
        </GlassPanel>

        {/* CORE STRENGTHS & CRITICAL CONSTRAINTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          <div className="p-5 rounded-2xl bg-[#0B0B0D]/80 dark:bg-[#0B0B0D]/80 light:bg-[#FFF9EE]/80 border border-[#B8A7FF]/30 dark:border-[#B8A7FF]/30 light:border-[#D6AA35]/30 space-y-2">
            <div className="flex items-center gap-2 text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#D6AA35]">
              <Award className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">PRIMARY CORE STRENGTH</span>
            </div>
            <p className="text-sm font-medium text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32] leading-snug">
              {derived.keyStrength}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0B0B0D]/80 dark:bg-[#0B0B0D]/80 light:bg-[#FFF9EE]/80 border border-white/10 dark:border-white/10 light:border-[#E6D9C4] space-y-2">
            <div className="flex items-center gap-2 text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270]">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">CRITICAL OPERATIONAL CONSTRAINT</span>
            </div>
            <p className="text-sm font-medium text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32] leading-snug">
              {derived.keyConstraint}
            </p>
          </div>
        </div>

        {/* RISK & MITIGATION RADAR (Clean Vertical List, NO huge card grid) */}
        <div className="space-y-3 font-mono">
          <span className="text-[10px] uppercase tracking-widest text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270] block">
            RISK ASSESSMENT & SPECIFIC MITIGATIONS
          </span>

          <div className="space-y-3">
            {risks.map((risk, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#050505] dark:bg-[#050505] light:bg-[#F7F1E5] border border-white/10 dark:border-white/10 light:border-[#E6D9C4] flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                <div className="space-y-0.5 md:max-w-md">
                  <span className="text-[9px] uppercase text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#D6AA35]">RISK 0{idx + 1}</span>
                  <div className="font-medium text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32]">{risk.title}</div>
                </div>
                <div className="p-2.5 rounded-lg bg-white/5 dark:bg-white/5 light:bg-[#304B32]/10 border border-white/5 text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#58724A] text-left md:text-right">
                  <span className="text-[9px] text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#D6AA35] block font-bold">ACTIONABLE MITIGATION</span>
                  {risk.mitigation}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM STAGE NAVIGATION */}
        <div className="flex justify-between items-center pt-8 border-t border-white/10 dark:border-white/10 light:border-[#E6D9C4]">
          <span className="text-xs font-mono text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270]">
            Stage 6 of 7 Complete
          </span>

          <button
            onClick={() => setStage('trans-road')}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-xs font-mono font-medium tracking-wider uppercase bg-[#B8A7FF] dark:bg-[#B8A7FF] light:bg-[#D6AA35] text-[#050505] dark:text-[#050505] light:text-[#304B32] shadow-xl transition-all hover:scale-105"
          >
            CONTINUE TO EXECUTION ROADMAP
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
