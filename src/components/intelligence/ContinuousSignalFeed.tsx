import React from 'react';
import { useVenture } from '../../context/VentureContext';
import { GlassPanel } from '../ui/GlassPanel';
import { ArrowRight, CheckCircle2, ArrowLeft } from 'lucide-react';

export const ContinuousSignalFeed: React.FC = () => {
  const { venture, setStage } = useVenture();
  const signals = venture.signals || [];

  return (
    <div className="w-full min-h-screen flex flex-col justify-between pt-28 pb-20 px-6 bg-[#050505] dark:bg-[#050505] light:bg-[#F7F1E5] text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32] transition-colors duration-300">
      <div className="w-full max-w-5xl mx-auto space-y-8 text-left">
        
        {/* Navigation & Stage Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 dark:border-white/10 light:border-[#E6D9C4] pb-6">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#D6AA35] block">
              CONTINUOUS INTELLIGENCE FEED
            </span>
            <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32]">
              What is changing around this venture?
            </h1>
          </div>

          <button
            onClick={() => setStage('roadmap')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-medium bg-[#0B0B0D] dark:bg-[#0B0B0D] light:bg-[#FFF9EE] border border-white/10 dark:border-white/10 light:border-[#E6D9C4] text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270] hover:text-[#F5F5F5] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Roadmap
          </button>
        </div>

        <p className="text-xs sm:text-sm text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#58724A] max-w-2xl leading-relaxed font-mono">
          Genesis continuously ingests market trends, competitor movements, and macro signals to alert founders to strategic impacts without notification noise.
        </p>

        {/* Signal Items List */}
        <div className="space-y-4">
          {signals.map(sig => (
            <GlassPanel key={sig.id} padding="large" hoverEffect className="space-y-4 font-mono">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 dark:border-white/10 light:border-[#E6D9C4] pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#D6AA35]">
                    {sig.category}
                  </span>
                  <span className="text-[#74747B] text-xs">•</span>
                  <span className="text-xs text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270]">{sig.timestamp}</span>
                </div>
              </div>

              <h3 className="text-base font-medium text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32]">
                {sig.headline}
              </h3>

              <div className="p-3.5 rounded-xl bg-[#050505] dark:bg-[#050505] light:bg-[#F7F1E5] border border-[#B8A7FF]/30 dark:border-[#B8A7FF]/30 light:border-[#D6AA35]/30">
                <span className="text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#D6AA35] block font-bold text-xs mb-1 uppercase tracking-wider">
                  Venture Impact Assessment
                </span>
                <p className="text-xs text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32] leading-relaxed">
                  {sig.relevanceImpact}
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#D6AA35]">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Recommendation: {sig.suggestedAction}</span>
                </div>
              </div>
            </GlassPanel>
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-white/10 dark:border-white/10 light:border-[#E6D9C4]">
          <button
            onClick={() => setStage('roadmap')}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-mono font-medium text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270] hover:text-[#F5F5F5]"
          >
            <ArrowLeft className="w-4 h-4" />
            RETURN TO ROADMAP
          </button>

          <button
            onClick={() => setStage('opening')}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-xs font-mono font-medium tracking-wider uppercase bg-[#B8A7FF] dark:bg-[#B8A7FF] light:bg-[#D6AA35] text-[#050505] dark:text-[#050505] light:text-[#304B32] shadow-xl transition-all hover:scale-105"
          >
            LANDING PAGE
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

