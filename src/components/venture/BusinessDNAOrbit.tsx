import React, { useState } from 'react';
import { useVenture } from '../../context/VentureContext';
import { GlassPanel } from '../ui/GlassPanel';
import { ArrowRight, Edit3, Compass, CheckCircle2, AlertCircle } from 'lucide-react';

export const BusinessDNAOrbit: React.FC = () => {
  const { venture, setStage, refineContext } = useVenture();
  const derived = venture.derivedInsights || {} as any;
  const [selectedAttribute, setSelectedAttribute] = useState<string>('problemSummary');
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  const dnaNodes = [
    { key: 'problemSummary', label: 'Problem', val: venture.businessDNA?.coreAttributes?.problemSummary || 'Analyzing problem statement...' },
    { key: 'solutionSummary', label: 'Solution', val: venture.businessDNA?.coreAttributes?.solutionSummary || 'Formulating core solution...' },
    { key: 'targetCustomerSummary', label: 'Customer', val: venture.businessDNA?.coreAttributes?.targetCustomerSummary || 'Identifying initial customer...' },
    { key: 'valuePropSummary', label: 'Value Prop', val: venture.businessDNA?.coreAttributes?.valuePropSummary || 'Structuring value proposition...' },
    { key: 'industrySector', label: 'Industry', val: venture.businessDNA?.coreAttributes?.industrySector || 'Mapping sector dynamics...' }
  ];

  const handleSaveEdit = async () => {
    if (editingField && editValue) {
      await refineContext(editingField, editValue);
      setEditingField(null);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-between pt-28 pb-16 px-6 bg-[#050505] dark:bg-[#050505] light:bg-[#F7F1E5] text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32]">
      <div className="w-full max-w-6xl mx-auto space-y-12">
        
        {/* Stage Header */}
        <div className="space-y-3 text-left">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#D6AA35]">
              STAGE 01 / VENTURE UNDERSTANDING
            </span>
            <span className="px-2 py-0.5 rounded text-[9px] font-mono uppercase bg-[#0B0B0D] dark:bg-[#0B0B0D] light:bg-[#FFF9EE] border border-white/10 dark:border-white/10 light:border-[#E6D9C4] text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270]">
              {venture.startupDetails.stage || 'Concept Stage'}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32]">
            WHAT IS THIS VENTURE REALLY TRYING TO DO?
          </h1>
        </div>

        {/* GENESIS SYNTHESIS INTERPRETATION PANEL */}
        <GlassPanel padding="medium" className="border-[#B8A7FF]/30 dark:border-[#B8A7FF]/30 light:border-[#D6AA35]/30">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#D6AA35]">
              GENESIS INTERPRETATION
            </span>
            <span className="text-[9px] font-mono text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270]">
              SYNTHESIZED FROM USER INPUT
            </span>
          </div>
          <p className="text-sm font-medium text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32] leading-relaxed">
            “{derived.problemInsight} {derived.customerInsight}”
          </p>
        </GlassPanel>

        {/* MAIN DNA ORBIT & DETAIL GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Orbital Graph */}
          <div className="lg:col-span-7 relative flex items-center justify-center min-h-[380px] bg-[#0B0B0D]/80 dark:bg-[#0B0B0D]/80 light:bg-[#FFF9EE]/80 rounded-2xl border border-white/10 dark:border-white/10 light:border-[#E6D9C4] p-6 overflow-hidden">
            <div className="absolute w-[320px] h-[320px] rounded-full border border-white/10 dark:border-white/10 light:border-[#304B32]/10 animate-spin-slow" />
            <div className="absolute w-[220px] h-[220px] rounded-full border border-[#B8A7FF]/20 dark:border-[#B8A7FF]/20 light:border-[#D6AA35]/30" />

            {/* Central Venture Node */}
            <div className="relative z-10 w-24 h-24 rounded-full bg-[#050505] dark:bg-[#050505] light:bg-[#F7F1E5] border-2 border-[#B8A7FF] dark:border-[#B8A7FF] light:border-[#D6AA35] shadow-2xl shadow-[#B8A7FF]/30 flex flex-col items-center justify-center text-center p-2">
              <span className="text-xs font-mono font-medium text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32] truncate max-w-[80px]">
                {venture.startupDetails.name || 'Venture'}
              </span>
              <span className="text-[8px] font-mono text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270] uppercase">
                {venture.startupDetails.location || 'Global'}
              </span>
            </div>

            {/* Orbiting Attribute Nodes */}
            {dnaNodes.map((node, index) => {
              const angles = [0, 72, 144, 216, 288];
              const angle = (angles[index] * Math.PI) / 180;
              const radius = 120;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              const isSelected = selectedAttribute === node.key;

              return (
                <button
                  key={node.key}
                  onClick={() => setSelectedAttribute(node.key)}
                  style={{ transform: `translate(${x}px, ${y}px)` }}
                  className={`
                    absolute z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-300
                    ${
                      isSelected
                        ? 'bg-[#B8A7FF] dark:bg-[#B8A7FF] light:bg-[#D6AA35] text-[#050505] dark:text-[#050505] light:text-[#304B32] shadow-lg scale-105'
                        : 'bg-[#050505] dark:bg-[#050505] light:bg-[#F7F1E5] text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#58724A] border border-white/10 dark:border-white/10 light:border-[#E6D9C4]'
                    }
                  `}
                >
                  <span>{node.label}</span>
                </button>
              );
            })}
          </div>

          {/* Detailed Context Panel */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <GlassPanel padding="large">
              <div className="flex items-center justify-between mb-3 border-b border-white/10 dark:border-white/10 light:border-[#E6D9C4] pb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270]">
                  {selectedAttribute.replace(/([A-Z])/g, ' $1')}
                </span>
                <button
                  onClick={() => {
                    setEditingField(selectedAttribute);
                    const currentVal = dnaNodes.find(n => n.key === selectedAttribute)?.val || '';
                    setEditValue(currentVal);
                  }}
                  className="inline-flex items-center gap-1 text-xs font-mono text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#D6AA35]"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  Refine
                </button>
              </div>

              {editingField === selectedAttribute ? (
                <div className="space-y-3">
                  <textarea
                    rows={3}
                    value={editValue}
                    onChange={e => setEditValue(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#050505] dark:bg-[#050505] light:bg-[#F7F1E5] border border-[#B8A7FF] text-xs font-mono text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32] focus:outline-none"
                  />
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => setEditingField(null)}
                      className="px-3 py-1 rounded text-xs font-mono text-[#A7A7AD]"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveEdit}
                      className="px-3 py-1 rounded text-xs font-mono bg-[#B8A7FF] text-[#050505]"
                    >
                      Save & Recalibrate
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-sm font-medium text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32] leading-relaxed">
                  {dnaNodes.find(n => n.key === selectedAttribute)?.val || 'Select a node from the Business DNA orbit.'}
                </p>
              )}
            </GlassPanel>

            {/* Complete Venture Context Meta Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-[#0B0B0D]/60 dark:bg-[#0B0B0D]/60 light:bg-[#FFF9EE]/60 border border-white/5 dark:border-white/5 light:border-[#E6D9C4]">
                <span className="text-[9px] text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270] block">CURRENT WORKAROUNDS</span>
                <span className="text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32] font-medium block truncate">
                  {venture.problem.currentWorkarounds || 'Manual Spreadsheets'}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#0B0B0D]/60 dark:bg-[#0B0B0D]/60 light:bg-[#FFF9EE]/60 border border-white/5 dark:border-white/5 light:border-[#E6D9C4]">
                <span className="text-[9px] text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270] block">PRIMARY BUYER PERSONA</span>
                <span className="text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#304B32] font-medium block truncate">
                  {venture.targetCustomers.buyerPersona || 'Owner / Chef'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM STAGE NAVIGATION */}
        <div className="flex justify-between items-center pt-8 border-t border-white/10 dark:border-white/10 light:border-[#E6D9C4]">
          <span className="text-xs font-mono text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#7D9270]">
            Stage 1 of 7 Complete
          </span>

          <button
            onClick={() => setStage('trans-mkt')}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-xs font-mono font-medium tracking-wider uppercase bg-[#B8A7FF] dark:bg-[#B8A7FF] light:bg-[#D6AA35] text-[#050505] dark:text-[#050505] light:text-[#304B32] shadow-xl transition-all hover:scale-105"
          >
            CONTINUE TO MARKET INTELLIGENCE
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
