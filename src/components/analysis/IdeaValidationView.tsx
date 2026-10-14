import React from 'react';
import { useVenture } from '../../context/VentureContext';
import { GlassPanel } from '../ui/GlassPanel';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const IdeaValidationView: React.FC = () => {
  const { venture, setStage } = useVenture();
  const derived = venture.derivedInsights;

  return (
    <div className="w-full min-h-screen flex flex-col justify-center pt-24 pb-16 px-6 bg-[#030405] text-[#F4F6F8]">
      <div className="w-full max-w-5xl mx-auto space-y-8 text-left">
        <div className="space-y-2">
          <span className="text-[11px] font-medium uppercase tracking-widest text-[#8D96A5] block">
            CONCEPT VALIDATION
          </span>
          <h1 className="text-3xl sm:text-4xl font-medium text-[#F4F6F8]">
            Does this concept hold initial weight?
          </h1>
          <p className="text-base text-[#3B82F6] font-medium pt-1">
            “{derived.problemInsight}”
          </p>
        </div>

        <GlassPanel padding="large" className="border-[#1B2A40] space-y-4">
          <span className="text-xs font-medium uppercase tracking-wider text-[#8D96A5] block">
            Key Validation Observations
          </span>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#080C14] border border-[#1B2A40]">
              <CheckCircle2 className="w-4 h-4 text-[#3B82F6] shrink-0 mt-0.5" />
              <span className="text-xs text-[#C4CAD3]">{derived.keyStrength}</span>
            </div>
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#080C14] border border-[#1B2A40]">
              <CheckCircle2 className="w-4 h-4 text-[#3B82F6] shrink-0 mt-0.5" />
              <span className="text-xs text-[#C4CAD3]">Target customer is easily identifiable and localized in urban hubs.</span>
            </div>
          </div>
        </GlassPanel>

        <div className="flex justify-end pt-4 border-t border-[#1B2A40]">
          <button
            onClick={() => setStage('trans-mkt')}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-medium bg-[#2563EB] hover:bg-[#123A7A] text-white shadow-lg shadow-[#2563EB]/20 transition-all hover:scale-105"
          >
            EXAMINE MARKET OPPORTUNITY
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
