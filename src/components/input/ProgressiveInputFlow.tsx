import React from 'react';
import { useVenture } from '../../context/VentureContext';
import { ArrowRight, ArrowLeft, Sparkles, CheckCircle2 } from 'lucide-react';

interface ProgressiveInputStepProps {
  stepIndex: 1 | 2 | 3 | 4;
}

export const ProgressiveInputStep: React.FC<ProgressiveInputStepProps> = ({ stepIndex }) => {
  const {
    venture,
    updateStartupDetails,
    updateProblem,
    updateSolution,
    updateTargetCustomers,
    setStage,
    submitInitialFlow
  } = useVenture();

  const handleNext = () => {
    if (stepIndex === 1) setStage('trans-1');
    if (stepIndex === 2) setStage('trans-2');
    if (stepIndex === 3) setStage('trans-3');
    if (stepIndex === 4) {
      setStage('trans-dna');
      submitInitialFlow();
    }
  };

  const handleBack = () => {
    if (stepIndex === 1) setStage('opening');
    if (stepIndex === 2) setStage('input-1');
    if (stepIndex === 3) setStage('input-2');
    if (stepIndex === 4) setStage('input-3');
  };

  const stepTitles = [
    'Venture Identity',
    'Problem & Alternatives',
    'Solution & Differentiation',
    'Customer & Operational Context'
  ];

  return (
    <div className="w-full min-h-screen flex flex-col justify-center pt-28 pb-16 px-4 sm:px-6 bg-[#050505] dark:bg-[#050505] light:bg-[#F7F1E5] text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32]">
      <div className="w-full max-w-2xl mx-auto space-y-8 text-left">
        
        {/* Visual Workflow Stepper Bar */}
        <div className="space-y-3 p-4 rounded-2xl bg-[#0B0B0D]/80 dark:bg-[#0B0B0D]/80 light:bg-[#FFF9EE] border border-white/10 dark:border-white/10 light:border-[#E6D9C4]">
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#B8A7FF] dark:bg-[#B8A7FF] light:bg-[#D6AA35] animate-pulse" />
              <span className="font-bold text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#8C6D15] uppercase tracking-wider">
                Step {stepIndex} of 4: {stepTitles[stepIndex - 1]}
              </span>
            </div>
            <span className="text-[#A7A7AD] font-semibold">{Math.round((stepIndex / 4) * 100)}%</span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map(idx => (
              <div
                key={idx}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx <= stepIndex
                    ? 'bg-gradient-to-r from-[#B8A7FF] to-[#9180FF] shadow-sm'
                    : 'bg-white/10 dark:bg-white/10 light:bg-black/10'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Section 1: Venture Identity */}
        {stepIndex === 1 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#8C6D15] font-bold">
                STAGE 1 / VENTURE IDENTITY
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32]">
                Name & Sector
              </h1>
              <p className="text-xs text-[#A7A7AD] leading-relaxed">
                Define the foundation of your venture so Genesis can initialize the intelligence graph.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#D1D1D6] dark:text-[#D1D1D6] light:text-[#304B32] mb-1.5">
                  Venture Name *
                </label>
                <input
                  type="text"
                  value={venture?.startupDetails?.name || ''}
                  onChange={e => updateStartupDetails({ name: e.target.value })}
                  placeholder="e.g. WasteWise Systems"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#0B0B0D] dark:bg-[#0B0B0D] light:bg-[#FFF9EE] border border-white/15 dark:border-white/15 light:border-[#E6D9C4] text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32] text-sm focus:outline-none focus:border-[#B8A7FF] focus:ring-1 focus:ring-[#B8A7FF]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#D1D1D6] dark:text-[#D1D1D6] light:text-[#304B32] mb-1.5">
                  Industry / Sector *
                </label>
                <input
                  type="text"
                  value={venture?.startupDetails?.industry || ''}
                  onChange={e => updateStartupDetails({ industry: e.target.value })}
                  placeholder="e.g. FoodTech / B2B SaaS"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#0B0B0D] dark:bg-[#0B0B0D] light:bg-[#FFF9EE] border border-white/15 dark:border-white/15 light:border-[#E6D9C4] text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32] text-sm focus:outline-none focus:border-[#B8A7FF] focus:ring-1 focus:ring-[#B8A7FF]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#D1D1D6] dark:text-[#D1D1D6] light:text-[#304B32] mb-1.5">
                  Development Stage
                </label>
                <select
                  value={venture?.startupDetails?.stage || 'Concept'}
                  onChange={e => updateStartupDetails({ stage: e.target.value as any })}
                  className="w-full px-4 py-3.5 rounded-xl bg-[#0B0B0D] dark:bg-[#0B0B0D] light:bg-[#FFF9EE] border border-white/15 dark:border-white/15 light:border-[#E6D9C4] text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32] text-sm focus:outline-none focus:border-[#B8A7FF]"
                >
                  <option value="Concept">Concept Stage</option>
                  <option value="Prototype">Prototype / MVP</option>
                  <option value="Early Traction">Early Traction / First Customers</option>
                  <option value="Growth">Growth / Scaling</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Section 2: Problem & Alternatives */}
        {stepIndex === 2 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#8C6D15] font-bold">
                STAGE 2 / MARKET PROBLEM
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32]">
                Problem & Alternatives
              </h1>
              <p className="text-xs text-[#A7A7AD] leading-relaxed">
                What urgent pain is being suffered by your customers, and how do they cope today?
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#D1D1D6] dark:text-[#D1D1D6] light:text-[#304B32] mb-1.5">
                  Problem Being Solved *
                </label>
                <textarea
                  rows={3}
                  value={venture?.problem?.statement || ''}
                  onChange={e => updateProblem({ statement: e.target.value })}
                  placeholder="e.g. Independent restaurants lose 12-18% of gross margin to unmonitored food waste and inaccurate daily prep forecasts..."
                  className="w-full px-4 py-3.5 rounded-xl bg-[#0B0B0D] dark:bg-[#0B0B0D] light:bg-[#FFF9EE] border border-white/15 dark:border-white/15 light:border-[#E6D9C4] text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32] text-sm focus:outline-none focus:border-[#B8A7FF]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#D1D1D6] dark:text-[#D1D1D6] light:text-[#304B32] mb-1.5">
                  Current Alternatives / Workarounds
                </label>
                <input
                  type="text"
                  value={venture?.problem?.currentWorkarounds || ''}
                  onChange={e => updateProblem({ currentWorkarounds: e.target.value })}
                  placeholder="e.g. Manual whiteboards, post-shift spreadsheets, guessing"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#0B0B0D] dark:bg-[#0B0B0D] light:bg-[#FFF9EE] border border-white/15 dark:border-white/15 light:border-[#E6D9C4] text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32] text-sm focus:outline-none focus:border-[#B8A7FF]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Section 3: Solution & Product */}
        {stepIndex === 3 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#8C6D15] font-bold">
                STAGE 3 / PROPOSED SOLUTION
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32]">
                Solution & Differentiation
              </h1>
              <p className="text-xs text-[#A7A7AD] leading-relaxed">
                Describe your unique product approach and the primary value proposition delivered.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#D1D1D6] dark:text-[#D1D1D6] light:text-[#304B32] mb-1.5">
                  Proposed Product / Service *
                </label>
                <textarea
                  rows={3}
                  value={venture?.solution?.proposedSolution || ''}
                  onChange={e => updateSolution({ proposedSolution: e.target.value })}
                  placeholder="e.g. Mobile kitchen copilot that integrates with POS order feeds to auto-generate daily prep sheets..."
                  className="w-full px-4 py-3.5 rounded-xl bg-[#0B0B0D] dark:bg-[#0B0B0D] light:bg-[#FFF9EE] border border-white/15 dark:border-white/15 light:border-[#E6D9C4] text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32] text-sm focus:outline-none focus:border-[#B8A7FF]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#D1D1D6] dark:text-[#D1D1D6] light:text-[#304B32] mb-1.5">
                  Key Value Proposition
                </label>
                <input
                  type="text"
                  value={venture?.solution?.valueProposition || ''}
                  onChange={e => updateSolution({ valueProposition: e.target.value })}
                  placeholder="e.g. Recover 8-12% of lost gross food margins within 30 days"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#0B0B0D] dark:bg-[#0B0B0D] light:bg-[#FFF9EE] border border-white/15 dark:border-white/15 light:border-[#E6D9C4] text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32] text-sm focus:outline-none focus:border-[#B8A7FF]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Section 4: Customer & Context */}
        {stepIndex === 4 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#8C6D15] font-bold">
                STAGE 4 / TARGET AUDIENCE
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32]">
                Customer & Operational Context
              </h1>
              <p className="text-xs text-[#A7A7AD] leading-relaxed">
                Who buys this first, and what real-world operational constraints must be respected?
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#D1D1D6] dark:text-[#D1D1D6] light:text-[#304B32] mb-1.5">
                  Primary Customer Segment *
                </label>
                <input
                  type="text"
                  value={venture?.targetCustomers?.primarySegment || ''}
                  onChange={e => updateTargetCustomers({ primarySegment: e.target.value })}
                  placeholder="e.g. Independent Casual Dining Restaurants (1-5 locations)"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#0B0B0D] dark:bg-[#0B0B0D] light:bg-[#FFF9EE] border border-white/15 dark:border-white/15 light:border-[#E6D9C4] text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32] text-sm focus:outline-none focus:border-[#B8A7FF]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#D1D1D6] dark:text-[#D1D1D6] light:text-[#304B32] mb-1.5">
                  Operational Constraints
                </label>
                <input
                  type="text"
                  value={venture?.targetCustomers?.operationalConstraints || ''}
                  onChange={e => updateTargetCustomers({ operationalConstraints: e.target.value })}
                  placeholder="e.g. Kitchen staff have minimal computer literacy during rush hours"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#0B0B0D] dark:bg-[#0B0B0D] light:bg-[#FFF9EE] border border-white/15 dark:border-white/15 light:border-[#E6D9C4] text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32] text-sm focus:outline-none focus:border-[#B8A7FF]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Navigation Action Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-white/10 dark:border-white/10 light:border-[#E6D9C4]">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs font-mono font-bold text-[#A7A7AD] hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {stepIndex === 1 ? 'Exit to Home' : 'Back'}
          </button>

          <button
            onClick={handleNext}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs sm:text-sm font-mono font-bold tracking-wider uppercase bg-gradient-to-r from-[#B8A7FF] to-[#9180FF] text-[#050505] shadow-xl hover:scale-105 active:scale-95 transition-all shadow-[#B8A7FF]/20"
          >
            {stepIndex < 4 ? (
              <>
                Continue
                <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate Venture Understanding
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
