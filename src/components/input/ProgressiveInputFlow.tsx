import React from 'react';
import { useVenture } from '../../context/VentureContext';
import { GlassPanel } from '../ui/GlassPanel';
import { ArrowRight } from 'lucide-react';

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
    setStage
  } = useVenture();

  const handleNext = () => {
    if (stepIndex === 1) setStage('trans-1');
    if (stepIndex === 2) setStage('trans-2');
    if (stepIndex === 3) setStage('trans-3');
    if (stepIndex === 4) setStage('trans-dna');
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center pt-24 pb-16 px-6 bg-[#050505] dark:bg-[#050505] light:bg-[#F7F1E5] text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32]">
      <div className="w-full max-w-2xl mx-auto space-y-8 text-left">
        
        <span className="text-[11px] font-medium uppercase tracking-widest text-[#74747B] dark:text-[#74747B] light:text-[#7D9270] block">
          VENTURE INPUT • SECTION {stepIndex} OF 4
        </span>

        {/* Section 1: Venture Identity */}
        {stepIndex === 1 && (
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32]">
              Venture Identity
            </h1>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270] mb-1.5">
                  Venture Name *
                </label>
                <input
                  type="text"
                  value={venture.startupDetails.name}
                  onChange={e => updateStartupDetails({ name: e.target.value })}
                  placeholder="e.g. WasteWise Systems"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#0B0B0D] dark:bg-[#0B0B0D] light:bg-[#FFF9EE] border border-white/10 dark:border-white/10 light:border-[#E6D9C4] text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32] text-sm focus:outline-none focus:border-[#B8A7FF]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270] mb-1.5">
                  Industry / Sector *
                </label>
                <input
                  type="text"
                  value={venture.startupDetails.industry}
                  onChange={e => updateStartupDetails({ industry: e.target.value })}
                  placeholder="e.g. FoodTech / B2B SaaS"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#0B0B0D] dark:bg-[#0B0B0D] light:bg-[#FFF9EE] border border-white/10 dark:border-white/10 light:border-[#E6D9C4] text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32] text-sm focus:outline-none focus:border-[#B8A7FF]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270] mb-1.5">
                  Development Stage
                </label>
                <select
                  value={venture.startupDetails.stage}
                  onChange={e => updateStartupDetails({ stage: e.target.value as any })}
                  className="w-full px-4 py-3.5 rounded-xl bg-[#0B0B0D] dark:bg-[#0B0B0D] light:bg-[#FFF9EE] border border-white/10 dark:border-white/10 light:border-[#E6D9C4] text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32] text-sm focus:outline-none"
                >
                  <option value="Concept">Concept</option>
                  <option value="Prototype">Prototype</option>
                  <option value="Early Traction">Early Traction</option>
                  <option value="Growth">Growth</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Section 2: Problem & Alternatives */}
        {stepIndex === 2 && (
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32]">
              Problem & Alternatives
            </h1>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270] mb-1.5">
                  Problem Being Solved *
                </label>
                <textarea
                  rows={3}
                  value={venture.problem.statement}
                  onChange={e => updateProblem({ statement: e.target.value })}
                  placeholder="e.g. Independent restaurants lose 12-18% of gross margin to unmonitored food waste..."
                  className="w-full px-4 py-3.5 rounded-xl bg-[#0B0B0D] dark:bg-[#0B0B0D] light:bg-[#FFF9EE] border border-white/10 dark:border-white/10 light:border-[#E6D9C4] text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32] text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270] mb-1.5">
                  Current Alternatives / Workarounds
                </label>
                <input
                  type="text"
                  value={venture.problem.currentWorkarounds}
                  onChange={e => updateProblem({ currentWorkarounds: e.target.value })}
                  placeholder="e.g. Manual whiteboards, post-shift spreadsheets"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#0B0B0D] dark:bg-[#0B0B0D] light:bg-[#FFF9EE] border border-white/10 dark:border-white/10 light:border-[#E6D9C4] text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32] text-sm focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Section 3: Solution & Product */}
        {stepIndex === 3 && (
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32]">
              Solution & Differentiation
            </h1>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270] mb-1.5">
                  Proposed Product / Service *
                </label>
                <textarea
                  rows={3}
                  value={venture.solution.proposedSolution}
                  onChange={e => updateSolution({ proposedSolution: e.target.value })}
                  placeholder="e.g. Mobile kitchen copilot that integrates with POS order feeds to auto-generate daily prep sheets..."
                  className="w-full px-4 py-3.5 rounded-xl bg-[#0B0B0D] dark:bg-[#0B0B0D] light:bg-[#FFF9EE] border border-white/10 dark:border-white/10 light:border-[#E6D9C4] text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32] text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270] mb-1.5">
                  Key Value Proposition
                </label>
                <input
                  type="text"
                  value={venture.solution.valueProposition}
                  onChange={e => updateSolution({ valueProposition: e.target.value })}
                  placeholder="e.g. Recover 8-12% of lost gross food margins within 30 days"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#0B0B0D] dark:bg-[#0B0B0D] light:bg-[#FFF9EE] border border-white/10 dark:border-white/10 light:border-[#E6D9C4] text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32] text-sm focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Section 4: Customer & Context */}
        {stepIndex === 4 && (
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32]">
              Customer & Operational Context
            </h1>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270] mb-1.5">
                  Primary Customer Segment *
                </label>
                <input
                  type="text"
                  value={venture.targetCustomers.primarySegment}
                  onChange={e => updateTargetCustomers({ primarySegment: e.target.value })}
                  placeholder="e.g. Independent Casual Dining Restaurants (1-5 locations)"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#0B0B0D] dark:bg-[#0B0B0D] light:bg-[#FFF9EE] border border-white/10 dark:border-white/10 light:border-[#E6D9C4] text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32] text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270] mb-1.5">
                  Operational Constraints
                </label>
                <input
                  type="text"
                  value={venture.targetCustomers.operationalConstraints}
                  onChange={e => updateTargetCustomers({ operationalConstraints: e.target.value })}
                  placeholder="e.g. Kitchen staff have minimal computer literacy during rush hours"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#0B0B0D] dark:bg-[#0B0B0D] light:bg-[#FFF9EE] border border-white/10 dark:border-white/10 light:border-[#E6D9C4] text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32] text-sm focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="flex justify-end pt-4">
          <button
            onClick={handleNext}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-medium bg-[#B8A7FF] dark:bg-[#B8A7FF] light:bg-[#D6AA35] text-[#050505] dark:text-[#050505] light:text-[#304B32] shadow-xl transition-all hover:scale-105"
          >
            {stepIndex < 4 ? 'CONTINUE' : 'GENERATE VENTURE UNDERSTANDING'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
