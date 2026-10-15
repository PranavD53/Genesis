import React, { useState } from 'react';
import { useVenture } from '../../context/VentureContext';
import { GlassPanel } from '../ui/GlassPanel';
import { Printer, SlidersHorizontal, ArrowRight, CheckCircle2, Flag } from 'lucide-react';

export const FinalVentureArtifact: React.FC = () => {
  const { venture, refineContext, setStage } = useVenture();
  const derived = venture.derivedInsights || {} as any;
  const [showRefinementModal, setShowRefinementModal] = useState(false);
  const [refineField, setRefineField] = useState('Target Customers');
  const [refineVal, setRefineVal] = useState('');

  const isDefaultDemo = venture.isDemoMode;

  const roadmapSteps = [
    {
      num: '01',
      title: 'VALIDATE',
      action: isDefaultDemo
        ? 'WhatsApp daily prep alert pilot with 10 venues'
        : `Pilot core value proposition with initial ${venture.targetCustomers?.primarySegment || 'target customers'}`,
      timeline: 'Month 1-3'
    },
    {
      num: '02',
      title: 'PILOT',
      action: isDefaultDemo
        ? 'Prove ₹25,000 monthly food savings per venue'
        : `Demonstrate quantifiable ROI: ${venture.solution.valueProposition || 'measured efficiency gains'}`,
      timeline: 'Month 4-6'
    },
    {
      num: '03',
      title: 'INTEGRATE',
      action: isDefaultDemo
        ? 'Petpooja & UrbanPiper POS webhook connectors'
        : `Automate core workflow connectors: ${venture.problem.currentWorkarounds ? `replace ${venture.problem.currentWorkarounds}` : 'seamless integration'}`,
      timeline: 'Month 7-9'
    },
    {
      num: '04',
      title: 'EXPAND',
      action: isDefaultDemo
        ? 'Scale to 100 paying venues across Tier-1 hubs'
        : `Scale to ${venture.financialProfile.baseVenueTarget || 100} paying customers across primary market`,
      timeline: 'Month 10-14'
    }
  ];

  const handleRefineSubmit = async () => {
    if (refineVal) {
      await refineContext(refineField, refineVal);
      setShowRefinementModal(false);
      setRefineVal('');
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-between pt-28 pb-20 px-6 print:pt-4 print:pb-4 print:min-h-0 print:px-0 bg-[#050505] dark:bg-[#050505] light:bg-[#F7F1E5] text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32]">
      <div className="w-full max-w-6xl mx-auto space-y-12 print:space-y-6 text-left">
        
        {/* PRINT ONLY: Executive Document Header */}
        <div className="hidden print:block border-b-2 border-gray-900 pb-4 mb-4">
          <div className="flex justify-between items-end">
            <div>
              <div className="text-xs uppercase tracking-widest text-indigo-700 font-bold">
                GENESIS VENTURE INTELLIGENCE BRIEF
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mt-1">
                {venture.startupDetails.name || 'Executive Venture Strategy'}
              </h1>
              <div className="text-xs text-gray-600 mt-0.5">
                Sector: {venture.startupDetails.industry || 'B2B SaaS / Technology'} • Stage: {venture.startupDetails.stage || 'Concept'}
              </div>
            </div>
            <div className="text-right text-xs text-gray-500">
              <span>Date: {new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
              <div className="text-[10px] text-gray-400">Confidential Founder Brief</div>
            </div>
          </div>
        </div>

        {/* Stage Header & Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 dark:border-white/10 light:border-[#E6D9C4] pb-6 print:pb-3">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#D6AA35] print:text-indigo-700">
              STAGE 07 / EXECUTION ROADMAP ARTIFACT
            </span>
            <h1 className="text-3xl font-medium tracking-tight text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32] print:text-gray-900 print:text-2xl">
              WHAT TO DO NEXT.
            </h1>
          </div>

          <div className="flex items-center gap-3 print:hidden">
            <button
              onClick={() => setShowRefinementModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-medium bg-[#0B0B0D] dark:bg-[#0B0B0D] light:bg-[#FFF9EE] border border-white/10 dark:border-white/10 light:border-[#E6D9C4] text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#58724A] hover:text-[#F5F5F5]"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#D6AA35]" />
              Refine Context
            </button>

            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-mono font-medium uppercase bg-[#B8A7FF] dark:bg-[#B8A7FF] light:bg-[#D6AA35] text-[#050505] dark:text-[#050505] light:text-[#304B32] shadow-xl transition-all hover:scale-105"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Export Artifact
            </button>
          </div>
        </div>

        {/* CONTINUOUS ROADMAP (01 VALIDATE -> 02 PILOT -> 03 INTEGRATE -> 04 EXPAND) */}
        <div className="space-y-4">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270] block">
            4-PHASE STRATEGIC EXECUTION PATHWAY
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 font-mono">
            {roadmapSteps.map((step, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#0B0B0D]/80 dark:bg-[#0B0B0D]/80 light:bg-[#FFF9EE]/80 border border-white/10 dark:border-white/10 light:border-[#E6D9C4] space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[9px] text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#D6AA35] mb-1">
                    <span>PHASE {step.num}</span>
                    <span>{step.timeline}</span>
                  </div>
                  <span className="text-xs font-bold text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32] uppercase block">{step.title}</span>
                  <p className="text-xs text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#58724A] leading-relaxed mt-2">{step.action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* IMMEDIATE FOUNDER ACTION ITEMS (Clean Vertical List) */}
        <div className="space-y-4 font-mono">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#D6AA35]">
              IMMEDIATE FOUNDER ACTION ITEMS
            </span>
            <span className="text-[9px] text-[#A7A7AD]">PRIORITY FOCUS</span>
          </div>

          <div className="space-y-3">
            {derived.nextActions.map((act, idx) => (
              <div key={idx} className="flex items-center gap-3 p-4 rounded-xl bg-[#050505] dark:bg-[#050505] light:bg-[#F7F1E5] border border-white/10 dark:border-white/10 light:border-[#E6D9C4] text-xs font-medium text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32]">
                <ArrowRight className="w-4 h-4 text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#D6AA35] shrink-0" />
                <span>{act}</span>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM NAVIGATION / START AGAIN */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10 dark:border-white/10 light:border-[#E6D9C4] print:hidden">
          <span className="text-xs font-mono text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270]">
            Complete Venture Intelligence Workflow Finished
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setStage('strategy')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-mono font-medium tracking-wider uppercase bg-[#0B0B0D] dark:bg-[#0B0B0D] light:bg-[#FFF9EE] border border-white/10 dark:border-white/10 light:border-[#E6D9C4] text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#D6AA35] hover:scale-105 transition-all shadow-md"
            >
              CONTINUOUS SIGNALS
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setStage('opening')}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-xs font-mono font-medium tracking-wider uppercase bg-[#B8A7FF] dark:bg-[#B8A7FF] light:bg-[#D6AA35] text-[#050505] dark:text-[#050505] light:text-[#304B32] shadow-xl transition-all hover:scale-105"
            >
              RETURN TO LANDING PAGE
            </button>
          </div>
        </div>

        {/* Refinement Modal */}
        {showRefinementModal && (
          <div className="fixed inset-0 z-50 bg-[#050505]/90 dark:bg-[#050505]/90 light:bg-[#F7F1E5]/90 backdrop-blur-md flex items-center justify-center p-4 print:hidden">
            <div className="w-full max-w-md bg-[#0B0B0D] dark:bg-[#0B0B0D] light:bg-[#FFF9EE] rounded-2xl p-6 border border-white/10 dark:border-white/10 light:border-[#E6D9C4] shadow-2xl space-y-4">
              <h3 className="text-base font-medium text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32]">Refine Venture Context</h3>
              <p className="text-xs text-[#A7A7AD]">
                Modify any attribute. Genesis will recalibrate downstream derived insights automatically.
              </p>

              <div>
                <label className="block text-xs font-mono text-[#A7A7AD] mb-1">Dimension to Refine</label>
                <select
                  value={refineField}
                  onChange={e => setRefineField(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#050505] dark:bg-[#050505] light:bg-[#F7F1E5] border border-white/10 text-xs font-mono text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32]"
                >
                  <option value="Target Customers">Target Customer Segment</option>
                  <option value="Problem Statement">Problem Statement</option>
                  <option value="Value Proposition">Value Proposition</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#A7A7AD] mb-1">New Context Update</label>
                <textarea
                  rows={3}
                  value={refineVal}
                  onChange={e => setRefineVal(e.target.value)}
                  placeholder="Enter updated detail..."
                  className="w-full p-3 rounded-xl bg-[#050505] dark:bg-[#050505] light:bg-[#F7F1E5] border border-white/10 text-xs font-mono text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32] focus:outline-none"
                />
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button
                  onClick={() => setShowRefinementModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-mono text-[#A7A7AD]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRefineSubmit}
                  className="px-4 py-2 rounded-xl text-xs font-mono font-medium bg-[#B8A7FF] dark:bg-[#B8A7FF] light:bg-[#D6AA35] text-[#050505] dark:text-[#050505] light:text-[#304B32]"
                >
                  Trigger Recalibration
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
