import React, { useState } from 'react';
import { useVenture } from '../../context/VentureContext';
import { GlassPanel } from '../ui/GlassPanel';
import { ArrowRight, ChevronDown, ChevronUp, Layers, RefreshCw, Zap } from 'lucide-react';

export const BusinessModelView: React.FC = () => {
  const { venture, setStage } = useVenture();
  const bm = venture.businessModel || {} as any;
  const derived = venture.derivedInsights || {} as any;
  const [showPricingDetails, setShowPricingDetails] = useState(true);

  const modelStream = [
    { step: '01', title: 'CUSTOMER', desc: venture.targetCustomers?.primarySegment || 'Target Customers' },
    { step: '02', title: 'PROBLEM', desc: venture.problem?.statement ? (venture.problem.statement.length > 50 ? venture.problem.statement.slice(0, 50) + '...' : venture.problem.statement) : 'Core Pain Point' },
    { step: '03', title: 'SOLUTION', desc: venture.solution?.proposedSolution ? (venture.solution.proposedSolution.length > 50 ? venture.solution.proposedSolution.slice(0, 50) + '...' : venture.solution.proposedSolution) : 'Solution Architecture' },
    { step: '04', title: 'VALUE', desc: venture.solution?.valueProposition || 'Quantifiable Value Proposition' },
    { step: '05', title: 'REVENUE', desc: venture.businessDNA?.coreAttributes?.primaryRevenueModel || 'Recurring Monetization Model' }
  ];

  return (
    <div className="w-full min-h-screen flex flex-col justify-between pt-28 pb-16 px-6 bg-[#050505] dark:bg-[#050505] light:bg-[#F7F1E5] text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32]">
      <div className="w-full max-w-6xl mx-auto space-y-12 text-left">
        
        {/* Stage Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#D6AA35]">
              STAGE 04 / BUSINESS MODEL STREAM
            </span>
            <span className="px-2 py-0.5 rounded text-[9px] font-mono uppercase bg-[#0B0B0D] dark:bg-[#0B0B0D] light:bg-[#FFF9EE] border border-white/10 dark:border-white/10 light:border-[#E6D9C4] text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270]">
              {venture.startupDetails.industry || 'RECURRING ENGINE'}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32]">
            HOW DOES VALUE BECOME SUSTAINABLE REVENUE?
          </h1>
        </div>

        {/* GENESIS MONETIZATION THESIS */}
        <GlassPanel padding="medium" className="border-[#B8A7FF]/30 dark:border-[#B8A7FF]/30 light:border-[#D6AA35]/30">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#D6AA35]">
              MONETIZATION THESIS
            </span>
            <span className="text-[9px] font-mono text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270]">
              [AI-derived]
            </span>
          </div>
          <p className="text-sm font-medium text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32] leading-relaxed">
            “{derived.monetizationFlow}”
          </p>
        </GlassPanel>

        {/* CONTINUOUS VALUE CREATION STREAM (CUSTOMER -> PROBLEM -> SOLUTION -> VALUE -> REVENUE) */}
        <div className="space-y-4">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270] block">
            VALUE CREATION PIPELINE
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {modelStream.map((item, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border flex flex-col justify-between space-y-3 transition-all ${
                  idx === 4
                    ? 'bg-[#B8A7FF] dark:bg-[#B8A7FF] light:bg-[#D6AA35] text-[#050505] font-mono border-transparent shadow-xl'
                    : 'bg-[#0B0B0D]/80 dark:bg-[#0B0B0D]/80 light:bg-[#FFF9EE]/80 border-white/10 dark:border-white/10 light:border-[#E6D9C4] text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32]'
                }`}
              >
                <div className="flex items-center justify-between text-[9px] font-mono opacity-80">
                  <span>STEP {item.step}</span>
                  {idx < 4 && <span>→</span>}
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold tracking-widest block">{item.title}</span>
                  <span className="text-xs font-mono font-medium block leading-snug mt-0.5">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SUPPORTING BUSINESS MODEL OPERATIONAL STRUCTURE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-4 rounded-2xl bg-[#0B0B0D]/60 dark:bg-[#0B0B0D]/60 light:bg-[#FFF9EE]/60 border border-white/5 dark:border-white/5 light:border-[#E6D9C4] space-y-2">
            <span className="text-[9px] uppercase text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#D6AA35]">CUSTOMER ACQUISITION & CHANNEL</span>
            <div className="text-sm font-medium text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32]">
              {venture.targetCustomers.buyerPersona ? `Direct Outreach to ${venture.targetCustomers.buyerPersona}` : 'Direct Founder Sales & Industry Ecosystems'}
            </div>
            <p className="text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#58724A] leading-relaxed">
              Targeted focus on {venture.targetCustomers.primarySegment || 'primary market segment'} to minimize initial acquisition cost.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#0B0B0D]/60 dark:bg-[#0B0B0D]/60 light:bg-[#FFF9EE]/60 border border-white/5 dark:border-white/5 light:border-[#E6D9C4] space-y-2">
            <span className="text-[9px] uppercase text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#D6AA35]">KEY RESOURCES & DIFFERENTIATOR</span>
            <div className="text-sm font-medium text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32]">
              {venture.solution.coreFeatures?.length ? venture.solution.coreFeatures[0] : 'Core Technology & Operational Engine'}
            </div>
            <p className="text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#58724A] leading-relaxed">
              {venture.solution.valueProposition || 'Continuous delivery of differentiated core value.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#0B0B0D]/60 dark:bg-[#0B0B0D]/60 light:bg-[#FFF9EE]/60 border border-white/5 dark:border-white/5 light:border-[#E6D9C4] space-y-2">
            <span className="text-[9px] uppercase text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#D6AA35]">PRICING & REVENUE MECHANICS</span>
            <div className="text-sm font-medium text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32]">
              {venture.businessDNA.coreAttributes.primaryRevenueModel || 'Recurring SaaS / Subscription'}
            </div>
            <p className="text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#58724A] leading-relaxed">
              {bm.summary || 'Scalable monetization aligned with demonstrable customer ROI.'}
            </p>
          </div>
        </div>

        {/* BOTTOM STAGE NAVIGATION */}
        <div className="flex justify-between items-center pt-8 border-t border-white/10 dark:border-white/10 light:border-[#E6D9C4]">
          <span className="text-xs font-mono text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270]">
            Stage 4 of 7 Complete
          </span>

          <button
            onClick={() => setStage('trans-fin')}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-xs font-mono font-medium tracking-wider uppercase bg-[#B8A7FF] dark:bg-[#B8A7FF] light:bg-[#D6AA35] text-[#050505] dark:text-[#050505] light:text-[#304B32] shadow-xl transition-all hover:scale-105"
          >
            CONTINUE TO FINANCIAL VIABILITY
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
