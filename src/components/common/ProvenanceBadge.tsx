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
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#B8A7FF]/10 dark:bg-[#B8A7FF]/10 light:bg-[#D6AA35]/15 text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#65A30D] border border-[#B8A7FF]/20 dark:border-[#B8A7FF]/20 light:border-[#D6AA35]/30">
        <span className="w-1.5 h-1.5 rounded-full bg-[#B8A7FF] dark:bg-[#B8A7FF] light:bg-[#FACC15] animate-pulse" />
        Sample Prototype Data
      </span>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-[#0B0B0D] dark:bg-[#0B0B0D] light:bg-[#FFF9EE] border border-white/10 dark:border-white/10 light:border-[#E6D9C4] text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#304B32]">
      <ShieldCheck className="w-3.5 h-3.5 text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#65A30D]" />
      <span className="font-medium text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32]">{source}</span>
      <span className="text-[#74747B]">•</span>
      <span className="flex items-center gap-1 text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#58724A]">
        <Clock className="w-3 h-3" />
        {timestamp}
      </span>
      <span className="px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wider font-semibold bg-[#B8A7FF]/20 dark:bg-[#B8A7FF]/20 light:bg-[#FACC15]/25 text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#65A30D]">
        {confidence} Confidence
      </span>
    </div>
  );
};

