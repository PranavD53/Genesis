import React from 'react';
import { Database, ShieldCheck, Clock } from 'lucide-react';

interface ProvenanceBadgeProps {
  source?: string;
  timestamp?: string;
  isDemoData?: boolean;
  confidence?: 'High' | 'Medium' | 'Estimated';
}

export const ProvenanceBadge: React.FC<ProvenanceBadgeProps> = ({
  source = 'Genesis Analytical Core',
  timestamp = 'Recent Run',
  isDemoData = false,
  confidence = 'High'
}) => {
  if (isDemoData) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
        Demo Data / Prototype State
      </span>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300">
      <ShieldCheck className="w-3.5 h-3.5 text-purple-500" />
      <span className="font-medium">{source}</span>
      <span className="text-slate-400 dark:text-slate-500">•</span>
      <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
        <Clock className="w-3 h-3" />
        {timestamp}
      </span>
      <span className="px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wider font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-300">
        {confidence} Confidence
      </span>
    </div>
  );
};
