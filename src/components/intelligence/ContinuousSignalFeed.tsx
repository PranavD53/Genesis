import React from 'react';
import { useVenture } from '../../context/VentureContext';
import { GlassPanel } from '../ui/GlassPanel';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const ContinuousSignalFeed: React.FC = () => {
  const { venture } = useVenture();
  const signals = venture.signals;

  return (
    <div className="w-full min-h-screen flex flex-col justify-center pt-24 pb-16 px-6 bg-[#030405] text-[#F4F6F8]">
      <div className="w-full max-w-5xl mx-auto space-y-8 text-left">
        
        {/* Primary Question */}
        <div className="space-y-2">
          <span className="text-[11px] font-medium uppercase tracking-widest text-[#8D96A5] block">
            INTELLIGENCE STREAM
          </span>
          <h1 className="text-3xl sm:text-4xl font-medium text-[#F4F6F8]">
            What is changing around this venture?
          </h1>
        </div>

        <p className="text-xs sm:text-sm text-[#C4CAD3] max-w-2xl leading-relaxed">
          Genesis continuously ingests market trends, competitor actions, and economic signals to alert you to relevant impacts without notification noise.
        </p>

        {/* Signal Items List */}
        <div className="space-y-4">
          {signals.map(sig => (
            <GlassPanel key={sig.id} padding="large" hoverEffect>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1B2A40] pb-4 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium uppercase tracking-wider text-[#3B82F6]">{sig.category}</span>
                    <span className="text-[#8D96A5] text-xs">•</span>
                    <span className="text-xs text-[#8D96A5]">{sig.timestamp}</span>
                  </div>
                  <h3 className="text-base font-medium text-[#F4F6F8] mt-1">
                    {sig.headline}
                  </h3>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#05070B] border border-[#2563EB]/30 mb-4">
                <span className="text-[#3B82F6] block font-medium text-xs mb-1">Venture Business Impact</span>
                <p className="text-xs text-[#F4F6F8]">{sig.relevanceImpact}</p>
              </div>

              <div className="pt-3 border-t border-[#1B2A40] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-[#3B82F6] font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Recommendation: {sig.suggestedAction}</span>
                </div>

                <button className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium bg-[#2563EB] hover:bg-[#123A7A] text-white self-end sm:self-auto">
                  Evaluate Impact
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </GlassPanel>
          ))}
        </div>
      </div>
    </div>
  );
};
