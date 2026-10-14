import React from 'react';
import { useVenture } from '../../context/VentureContext';
import { GlassPanel } from '../ui/GlassPanel';
import { ArrowRight, Target, ShieldAlert, Award } from 'lucide-react';

export const CompetitorMatrixView: React.FC = () => {
  const { venture, setStage } = useVenture();
  const comp = venture.competitorAnalysis;
  const derived = venture.derivedInsights;

  return (
    <div className="w-full min-h-screen flex flex-col justify-between pt-28 pb-16 px-6 bg-[#050505] dark:bg-[#050505] light:bg-[#F7F1E5] text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32]">
      <div className="w-full max-w-6xl mx-auto space-y-12 text-left">
        
        {/* Stage Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#D6AA35]">
              STAGE 03 / COMPETITIVE LANDSCAPE
            </span>
            <span className="px-2 py-0.5 rounded text-[9px] font-mono uppercase bg-[#0B0B0D] dark:bg-[#0B0B0D] light:bg-[#FFF9EE] border border-white/10 dark:border-white/10 light:border-[#E6D9C4] text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270]">
              SPATIAL POSITIONING
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32]">
            WHERE DOES YOUR VENTURE DIFFERENTIATE?
          </h1>
        </div>

        {/* GENESIS POSITIONING THESIS */}
        <GlassPanel padding="medium" className="border-[#B8A7FF]/30 dark:border-[#B8A7FF]/30 light:border-[#D6AA35]/30">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#D6AA35]">
              GENESIS POSITIONING THESIS
            </span>
            <span className="text-[9px] font-mono text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270]">
              [AI-derived]
            </span>
          </div>
          <p className="text-sm font-medium text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32] leading-relaxed">
            “{derived.positioningGap}”
          </p>
        </GlassPanel>

        {/* SPATIAL POSITIONING QUADRANT */}
        <GlassPanel padding="large" className="space-y-6">
          <div className="flex items-center justify-between text-[9px] font-mono uppercase tracking-widest text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270]">
            <span>HIGH KITCHEN SPECIALIZATION</span>
            <span>PREDICTIVE ACCURACY</span>
          </div>

          <div className="relative min-h-[260px] bg-[#0B0B0D]/80 dark:bg-[#0B0B0D]/80 light:bg-[#FFF9EE]/80 rounded-2xl border border-white/10 dark:border-white/10 light:border-[#E6D9C4] p-8 flex items-center justify-between">
            {/* Axis Line */}
            <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-white/10 dark:bg-white/10 light:bg-[#304B32]/10 -translate-y-1/2" />

            {/* Basic POS Tools */}
            <div className="relative z-10 p-4 rounded-xl bg-[#050505] dark:bg-[#050505] light:bg-[#F7F1E5] border border-white/10 dark:border-white/10 light:border-[#E6D9C4] text-center w-48 space-y-1">
              <span className="text-[9px] font-mono uppercase text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270] block">Basic POS Tools</span>
              <span className="text-xs font-mono font-medium text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32] block">Reactive Stock Logging</span>
              <span className="text-[9px] text-[#A7A7AD] block">Petpooja, Toast Module</span>
            </div>

            {/* Genesis Position (WasteWise) */}
            <div className="relative z-10 p-5 rounded-xl bg-[#B8A7FF] dark:bg-[#B8A7FF] light:bg-[#D6AA35] text-[#050505] dark:text-[#050505] light:text-[#304B32] shadow-2xl text-center w-56 transform -translate-y-4 space-y-1">
              <span className="text-[9px] font-mono uppercase font-bold tracking-widest block opacity-80">GENESIS POSITION</span>
              <span className="text-sm font-mono font-bold block">Predictive Prep Guidance</span>
              <span className="text-[10px] font-mono block opacity-90">0% Hardware Overhead</span>
            </div>

            {/* Enterprise ERPs */}
            <div className="relative z-10 p-4 rounded-xl bg-[#050505] dark:bg-[#050505] light:bg-[#F7F1E5] border border-white/10 dark:border-white/10 light:border-[#E6D9C4] text-center w-48 space-y-1">
              <span className="text-[9px] font-mono uppercase text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270] block">Enterprise ERPs</span>
              <span className="text-xs font-mono font-medium text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32] block">High Cost & Complexity</span>
              <span className="text-[9px] text-[#A7A7AD] block">Oracle MICROS, SAP</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[9px] font-mono uppercase tracking-widest text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270]">
            <span>GENERIC STOCK COUNTING</span>
            <span>HIGH HARDWARE COST</span>
          </div>
        </GlassPanel>

        {/* COMPETITIVE ADVANTAGE & DIFFERENTIATION BREAKDOWN */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-4 rounded-2xl bg-[#0B0B0D]/60 dark:bg-[#0B0B0D]/60 light:bg-[#FFF9EE]/60 border border-white/5 dark:border-white/5 light:border-[#E6D9C4] space-y-1 text-left">
            <span className="text-[9px] font-mono uppercase text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#D6AA35] block">CORE UNFAIR ADVANTAGE</span>
            <h4 className="text-sm font-medium text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32]">POS Webhook Integration</h4>
            <p className="text-[#A7A7AD] leading-relaxed">Auto-syncs order velocity with ingredient degradation without manual kitchen entry.</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#0B0B0D]/60 dark:bg-[#0B0B0D]/60 light:bg-[#FFF9EE]/60 border border-white/5 dark:border-white/5 light:border-[#E6D9C4] space-y-1 text-left">
            <span className="text-[9px] font-mono uppercase text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#D6AA35] block">OPERATIONAL SIMPLICITY</span>
            <h4 className="text-sm font-medium text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32]">WhatsApp Daily Prep Alert</h4>
            <p className="text-[#A7A7AD] leading-relaxed">Delivers 1-tap morning prep guidance straight to the head chef's phone.</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#0B0B0D]/60 dark:bg-[#0B0B0D]/60 light:bg-[#FFF9EE]/60 border border-white/5 dark:border-white/5 light:border-[#E6D9C4] space-y-1 text-left">
            <span className="text-[9px] font-mono uppercase text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#D6AA35] block">ROI SPEED</span>
            <h4 className="text-sm font-medium text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32]">30-Day Payback Guarantee</h4>
            <p className="text-[#A7A7AD] leading-relaxed">Proves ₹25,000 monthly ingredient savings within first month of deployment.</p>
          </div>
        </div>

        {/* BOTTOM STAGE NAVIGATION */}
        <div className="flex justify-between items-center pt-8 border-t border-white/10 dark:border-white/10 light:border-[#E6D9C4]">
          <span className="text-xs font-mono text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270]">
            Stage 3 of 7 Complete
          </span>

          <button
            onClick={() => setStage('trans-bm')}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-xs font-mono font-medium tracking-wider uppercase bg-[#B8A7FF] dark:bg-[#B8A7FF] light:bg-[#D6AA35] text-[#050505] dark:text-[#050505] light:text-[#304B32] shadow-xl transition-all hover:scale-105"
          >
            CONTINUE TO BUSINESS MODEL STREAM
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
