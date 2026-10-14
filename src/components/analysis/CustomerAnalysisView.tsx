import React from 'react';
import { useVenture } from '../../context/VentureContext';
import { GlassPanel } from '../ui/GlassPanel';
import { ProvenanceBadge } from '../common/ProvenanceBadge';
import { Users, AlertCircle, CheckCircle2 } from 'lucide-react';

export const CustomerAnalysisView: React.FC = () => {
  const { venture } = useVenture();
  const cust = venture.targetCustomers;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Analytical Dimension 1.5</span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Customer & Buyer Persona Deep-Dive</h2>
        </div>
        <ProvenanceBadge source="Genesis Customer Model" isDemoData={venture.isDemoMode} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassPanel padding="large">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-400" />
            Primary Customer Segment & Buyer Persona
          </h3>
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <span className="text-xs font-bold text-purple-400 block mb-0.5">Target Segment</span>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{cust.primarySegment}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
              <span className="text-xs font-bold text-slate-400 block mb-0.5">Buyer Persona</span>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{cust.buyerPersona}</p>
            </div>
          </div>
        </GlassPanel>

        <GlassPanel padding="large">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-400" />
            Operational Constraints & Needs
          </h3>
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <span className="text-xs font-bold text-amber-400 block mb-0.5">Operational Constraints</span>
              <p className="text-xs text-slate-700 dark:text-slate-200">{cust.operationalConstraints}</p>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 block mb-2">Core Customer Needs</span>
              <div className="space-y-2">
                {cust.coreNeeds.map((need, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 p-2 rounded-lg bg-slate-50 dark:bg-white/5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span>{need}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </GlassPanel>
      </div>
    </div>
  );
};
