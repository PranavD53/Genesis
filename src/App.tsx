import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { VentureProvider, useVenture } from './context/VentureContext';
import { FlowingLinesBackground } from './components/common/FlowingLinesBackground';
import { AmbientGlow } from './components/common/AmbientGlow';
import { FloatingNavBar } from './components/common/FloatingNavBar';
import { TransitionScreen } from './components/common/TransitionScreen';
import { FocusedOpeningScreen } from './components/opening/FocusedOpeningScreen';
import { ProgressiveInputStep } from './components/input/ProgressiveInputFlow';
import { BusinessDNAOrbit } from './components/venture/BusinessDNAOrbit';
import { MarketAnalysisView } from './components/analysis/MarketAnalysisView';
import { CompetitorMatrixView } from './components/analysis/CompetitorMatrixView';
import { BusinessModelView } from './components/analysis/BusinessModelView';
import { FinancialScenariosView } from './components/analysis/FinancialScenariosView';
import { RiskOpportunityRadar } from './components/decision/RiskOpportunityRadar';
import { FinalVentureArtifact } from './components/roadmap/FinalVentureArtifact';
import { ContinuousSignalFeed } from './components/intelligence/ContinuousSignalFeed';

const MainContent: React.FC = () => {
  const { currentStage, setStage } = useVenture();

  return (
    <main className="relative z-10 min-h-screen">
      {/* 1. Opening Surface */}
      {currentStage === 'opening' && <FocusedOpeningScreen />}

      {/* 2. Guided Progressive Input Flow */}
      {currentStage === 'input-1' && <ProgressiveInputStep stepIndex={1} />}
      {currentStage === 'trans-1' && (
        <TransitionScreen
          label="Understanding your idea…"
          onComplete={() => setStage('input-2')}
        />
      )}

      {currentStage === 'input-2' && <ProgressiveInputStep stepIndex={2} />}
      {currentStage === 'trans-2' && (
        <TransitionScreen
          label="Mapping the problem…"
          onComplete={() => setStage('input-3')}
        />
      )}

      {currentStage === 'input-3' && <ProgressiveInputStep stepIndex={3} />}
      {currentStage === 'trans-3' && (
        <TransitionScreen
          label="Finding your customer…"
          onComplete={() => setStage('input-4')}
        />
      )}

      {currentStage === 'input-4' && <ProgressiveInputStep stepIndex={4} />}
      {currentStage === 'trans-dna' && (
        <TransitionScreen
          label="Constructing Business DNA…"
          onComplete={() => setStage('dna')}
        />
      )}

      {/* 3. Business DNA Reveal */}
      {currentStage === 'dna' && <BusinessDNAOrbit />}
      {currentStage === 'trans-mkt' && (
        <TransitionScreen
          label="Reading the market…"
          onComplete={() => setStage('market')}
        />
      )}

      {/* 4. Progressive Analysis Journey */}
      {currentStage === 'market' && <MarketAnalysisView />}
      {currentStage === 'trans-comp' && (
        <TransitionScreen
          label="Mapping competitors…"
          onComplete={() => setStage('competitor')}
        />
      )}

      {currentStage === 'competitor' && <CompetitorMatrixView />}
      {currentStage === 'trans-bm' && (
        <TransitionScreen
          label="Testing the business model…"
          onComplete={() => setStage('business')}
        />
      )}

      {currentStage === 'business' && <BusinessModelView />}
      {currentStage === 'trans-fin' && (
        <TransitionScreen
          label="Assessing financial viability…"
          onComplete={() => setStage('financial')}
        />
      )}

      {currentStage === 'financial' && <FinancialScenariosView />}
      {currentStage === 'trans-via' && (
        <TransitionScreen
          label="Forming the verdict…"
          onComplete={() => setStage('decisions')}
        />
      )}

      {/* 5. Strategic Decisions & Viability */}
      {currentStage === 'decisions' && <RiskOpportunityRadar />}
      {currentStage === 'trans-road' && (
        <TransitionScreen
          label="Building your roadmap…"
          onComplete={() => setStage('roadmap')}
        />
      )}

      {/* 6. Destination: Strategic Roadmap Artifact */}
      {currentStage === 'roadmap' && <FinalVentureArtifact />}

      {/* 7. Signals Monitoring Feed */}
      {currentStage === 'strategy' && <ContinuousSignalFeed />}
    </main>
  );
};

export function App() {
  return (
    <ThemeProvider>
      <VentureProvider>
        <div className="relative min-h-screen font-sans text-slate-900 dark:text-white bg-[#050505] dark:bg-[#050505] light:bg-[#F7F1E5] transition-colors duration-300 overflow-x-hidden">
          <AmbientGlow />
          <FlowingLinesBackground />
          <FloatingNavBar />
          <MainContent />
        </div>
      </VentureProvider>
    </ThemeProvider>
  );
}

export default App;
