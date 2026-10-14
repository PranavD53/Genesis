import React, { useState } from 'react';
import { useVenture } from '../../context/VentureContext';
import { IdeaValidationView } from './IdeaValidationView';
import { CustomerAnalysisView } from './CustomerAnalysisView';
import { MarketAnalysisView } from './MarketAnalysisView';
import { CompetitorMatrixView } from './CompetitorMatrixView';
import { BusinessModelView } from './BusinessModelView';
import { FinancialScenariosView } from './FinancialScenariosView';
import { GlassPanel } from '../ui/GlassPanel';
import { ShieldCheck, Users, BarChart3, Users2, Layers, Calculator } from 'lucide-react';

export const AnalysisHubView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'validation' | 'customer' | 'market' | 'competitor' | 'business' | 'financial'>('validation');

  const tabs = [
    { id: 'validation', label: 'Validation', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'customer', label: 'Customer', icon: <Users className="w-4 h-4" /> },
    { id: 'market', label: 'Market', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'competitor', label: 'Competitors', icon: <Users2 className="w-4 h-4" /> },
    { id: 'business', label: 'Business Model', icon: <Layers className="w-4 h-4" /> },
    { id: 'financial', label: 'Financials', icon: <Calculator className="w-4 h-4" /> }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto pt-24 pb-16 px-4 space-y-6">
      
      {/* Analytical Tab Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-200
                ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25 scale-105'
                    : 'bg-white/80 dark:bg-[#120E24]/80 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10'
                }
              `}
            >
              {tab.icon}
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Render Active Analytical View */}
      <div className="transition-all duration-300">
        {activeTab === 'validation' && <IdeaValidationView />}
        {activeTab === 'customer' && <CustomerAnalysisView />}
        {activeTab === 'market' && <MarketAnalysisView />}
        {activeTab === 'competitor' && <CompetitorMatrixView />}
        {activeTab === 'business' && <BusinessModelView />}
        {activeTab === 'financial' && <FinancialScenariosView />}
      </div>
    </div>
  );
};
