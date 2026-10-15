import React from 'react';
import { useVenture } from '../../context/VentureContext';
import { useAuth } from '../../context/AuthContext';
import { GradientText } from '../common/GradientText';
import { AnimatedVentureNeuralCanvas, ConnectedArchitectureVisual } from '../common/EternaCloudVisuals';
import { Reveal } from '../common/Reveal';
import { ArrowRight, Sparkles } from 'lucide-react';

export const FocusedOpeningScreen: React.FC = () => {
  const { setStage, loadDemoVenture, resetVenture } = useVenture();
  const { user, openAuthModal } = useAuth();

  const handleStartVenture = () => {
    if (!user) {
      openAuthModal('register', () => {
        resetVenture('input-1');
      });
      return;
    }
    resetVenture('input-1');
  };

  return (
    <div className="w-full min-h-screen bg-[#050505] dark:bg-[#050505] light:bg-[#F7F1E5] text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#1C3B2B] space-y-16 lg:space-y-20 pt-24 pb-16 px-4 sm:px-12 overflow-x-hidden transition-colors duration-300">
      
      {/* ============================================================ */}
      {/* 1. HERO SECTION (24-40px Element Spacing, 60-90px Section)   */}
      {/* ============================================================ */}
      <section className="max-w-6xl mx-auto relative text-center pt-2">
        
        {/* Center Hero Content */}
        <div className="max-w-3xl mx-auto space-y-4 text-center z-10">
          
          {/* Hero Badge */}
          <Reveal delay={0} direction="up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-mono tracking-widest uppercase bg-[#0B0B0D] dark:bg-[#0B0B0D] light:bg-[#FFF9EE] border border-white/10 dark:border-white/10 light:border-[#E6D9C4] text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#65A30D] shadow-md hover:scale-105 transition-transform cursor-pointer">
              <span className="w-2 h-2 rounded-full bg-[#B8A7FF] dark:bg-[#B8A7FF] light:bg-[#FACC15] animate-pulse" />
              AI-POWERED VENTURE INTELLIGENCE
            </div>
          </Reveal>

          {/* Main Headline */}
          <Reveal delay={90} direction="up">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#1C3B2B] leading-[1.08]">
              Turn your startup idea <br />
              into a clear <GradientText>venture decision.</GradientText>
            </h1>
          </Reveal>

          {/* Short Slogan & Concise Supporting Copy */}
          <Reveal delay={180} direction="up">
            <div className="space-y-1.5">
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#65A30D] block">
                Understand. Analyze. Decide. Execute.
              </span>
              <p className="text-sm sm:text-base text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#304B32] leading-relaxed max-w-2xl mx-auto font-normal">
                Genesis connects venture understanding, market intelligence, business model, and financial viability into one connected workflow.
              </p>
            </div>
          </Reveal>

          {/* Action CTAs */}
          <Reveal delay={270} direction="up">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={handleStartVenture}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-9 py-3.5 rounded-full text-xs font-mono font-medium tracking-wider uppercase bg-[#B8A7FF] dark:bg-[#B8A7FF] light:bg-[#FACC15] text-[#050505] dark:text-[#050505] light:text-[#1C3B2B] shadow-2xl shadow-[#B8A7FF]/20 dark:shadow-[#B8A7FF]/20 light:shadow-[#FACC15]/30 transition-all hover:scale-105 active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                START YOUR VENTURE
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('workflow');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-xs font-mono font-medium tracking-wider uppercase bg-[#0B0B0D] dark:bg-[#0B0B0D] light:bg-[#FFF9EE] border border-white/10 dark:border-white/10 light:border-[#E6D9C4] text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#304B32] hover:text-[#F5F5F5] dark:hover:text-[#F5F5F5] light:hover:text-[#1C3B2B] transition-colors"
              >
                EXPLORE GENESIS
              </button>
            </div>
          </Reveal>
        </div>

        {/* Levitating Animated Neural Canvas */}
        <Reveal delay={380} direction="up">
          <AnimatedVentureNeuralCanvas />
        </Reveal>
      </section>

      {/* ============================================================ */}
      {/* 2. SECTION 2: EVOLUTIONARY PATHWAY (#workflow)               */}
      {/* ============================================================ */}
      <section id="workflow" className="scroll-mt-28 max-w-6xl mx-auto space-y-6 border-t border-white/10 dark:border-white/10 light:border-[#E6D9C4] pt-12 lg:pt-16 text-left">
        <Reveal delay={0} direction="up">
          <div className="max-w-2xl space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#65A30D]">
              EVOLUTIONARY PATHWAY
            </span>
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#1C3B2B]">
              FROM IDEA TO INTELLIGENT DECISION.
            </h2>
            <p className="text-xs font-mono text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#304B32]">
              Understand. Analyze. Model. Validate. Decide. Execute.
            </p>
          </div>
        </Reveal>

        {/* Sequential 01-06 Workflow Nodes */}
        <div className="relative pt-2">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#B8A7FF]/40 dark:via-[#B8A7FF]/40 light:via-[#65A30D]/40 to-transparent -translate-y-1/2" />
          
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 relative z-10 text-center">
            {[
              { label: 'UNDERSTAND', desc: 'Core DNA' },
              { label: 'ANALYZE', desc: 'Market Signal' },
              { label: 'MODEL', desc: 'Value Flow' },
              { label: 'VALIDATE', desc: 'Economics' },
              { label: 'DECIDE', desc: 'Verdict' },
              { label: 'EXECUTE', desc: 'Roadmap' }
            ].map((step, idx) => (
              <Reveal key={idx} delay={idx * 80} direction="up">
                <div className="flex flex-col items-center space-y-2 group cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-[#0B0B0D] dark:bg-[#0B0B0D] light:bg-[#FFF9EE] border border-[#B8A7FF]/30 dark:border-[#B8A7FF]/30 light:border-[#65A30D]/30 text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#65A30D] flex items-center justify-center text-xs font-mono group-hover:scale-105 group-hover:bg-[#B8A7FF] dark:group-hover:bg-[#B8A7FF] light:group-hover:bg-[#FACC15] group-hover:text-[#050505] transition-all duration-300 shadow-lg">
                    0{idx + 1}
                  </div>
                  <span className="text-xs font-mono font-medium tracking-wider text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#1C3B2B]">
                    {step.label}
                  </span>
                  <span className="text-[10px] text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#304B32]">
                    {step.desc}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. SECTION 3: CORE CAPABILITIES (#capabilities)              */}
      {/* ============================================================ */}
      <section id="capabilities" className="scroll-mt-28 max-w-6xl mx-auto space-y-8 border-t border-white/10 dark:border-white/10 light:border-[#E6D9C4] pt-12 lg:pt-16 text-left">
        <Reveal delay={0} direction="up">
          <div className="max-w-2xl space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#65A30D]">
              CORE CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#1C3B2B]">
              EVERYTHING IMPORTANT. ONE CONNECTED VIEW.
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-6 border-y border-white/10 dark:border-white/10 light:border-[#E6D9C4] py-6">
          {[
            { num: '01', title: 'VENTURE UNDERSTANDING', headline: 'Clarify identity, customer pain, and differentiation.', desc: 'Consolidates founder context into an evolving Business DNA graph.' },
            { num: '02', title: 'MARKET INTELLIGENCE', headline: 'Map TAM/SAM/SOM, market growth, and competitive gap.', desc: 'Synthesizes market dynamics with clear status labels (Reported, Estimated, AI-derived).' },
            { num: '03', title: 'BUSINESS MODEL', headline: 'Connect value creation to sustainable revenue mechanics.', desc: 'Visualizes the flow from customer acquisition to unit economic profitability.' },
            { num: '04', title: 'FINANCIAL VIABILITY', headline: 'Evaluate capital efficiency, monthly burn, runway, and break-even.', desc: 'Simulates Conservative, Base, and Aggressive revenue trajectories.' },
            { num: '05', title: 'STRATEGIC DECISION', headline: 'Synthesize overall verdict, strengths, constraints, and mitigations.', desc: 'Delivers an authoritative assessment (Promising, Caution, High Risk) with actionable steps.' },
            { num: '06', title: 'EXECUTION ROADMAP', headline: 'Transform strategic verdict into a phased execution plan.', desc: 'Defines clear 4-phase milestones and immediate founder action items.' }
          ].map((item, idx) => (
            <Reveal key={idx} delay={(idx % 2) * 100} direction="up">
              <div className="space-y-1 pb-4 border-b border-white/5 dark:border-white/5 light:border-[#E6D9C4] group transition-transform hover:-translate-y-0.5">
                <span className="text-[10px] font-mono tracking-widest text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#65A30D] block font-bold">
                  {item.num} / {item.title}
                </span>
                <h3 className="text-base font-medium text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#1C3B2B]">
                  {item.headline}
                </h3>
                <p className="text-xs text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#304B32] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. SECTION 4: SYSTEM ARCHITECTURE (#architecture)            */}
      {/* ============================================================ */}
      <section id="architecture" className="scroll-mt-28 max-w-6xl mx-auto space-y-6 border-t border-white/10 dark:border-white/10 light:border-[#E6D9C4] pt-12 lg:pt-16">
        <Reveal delay={0} direction="up">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#65A30D]">
              SYSTEM DESIGN
            </span>
            <h2 className="text-3xl font-medium tracking-tight text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#1C3B2B]">
              CONNECTING INPUT TO STRATEGIC DIRECTION.
            </h2>
          </div>
        </Reveal>

        <Reveal delay={120} direction="up">
          <ConnectedArchitectureVisual />
        </Reveal>
      </section>

      {/* ============================================================ */}
      {/* 5. SECTION 5: PARADIGM SHIFT (#contrast)                     */}
      {/* ============================================================ */}
      <section id="contrast" className="scroll-mt-28 max-w-5xl mx-auto space-y-6 border-t border-white/10 dark:border-white/10 light:border-[#E6D9C4] pt-12 lg:pt-16 text-left">
        <Reveal delay={0} direction="up">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#65A30D]">
              PARADIGM SHIFT
            </span>
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#1C3B2B]">
              STOP EVALUATING YOUR VENTURE IN PIECES.
            </h2>
          </div>
        </Reveal>

        <div className="space-y-3">
          {[
            { from: 'Fragmented research in scattered docs', to: 'Connected venture intelligence workflow' },
            { from: 'Unclear customer & problem assumptions', to: 'Structured evidence-backed analysis' },
            { from: 'Disconnected financial thinking', to: 'Validated break-even & runway economics' },
            { from: 'Uncertain next steps & paralysis', to: 'Phased actionable execution roadmap' }
          ].map((item, idx) => (
            <Reveal key={idx} delay={idx * 80} direction="up">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center p-3.5 rounded-xl bg-[#0B0B0D]/60 dark:bg-[#0B0B0D]/60 light:bg-[#FFF9EE] border border-white/5 dark:border-white/5 light:border-[#E6D9C4] transition-all hover:border-[#B8A7FF]/40 dark:hover:border-[#B8A7FF]/40 light:hover:border-[#65A30D]/40">
                <div className="md:col-span-5 text-xs font-mono text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#304B32]">
                  {item.from}
                </div>
                <div className="md:col-span-2 flex justify-center text-[#B8A7FF] dark:text-[#B8A7FF] light:text-[#65A30D] font-bold">
                  →
                </div>
                <div className="md:col-span-5 text-xs font-mono font-medium text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#1C3B2B]">
                  {item.to}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. FINAL CTA SECTION                                         */}
      {/* ============================================================ */}
      <section className="max-w-4xl mx-auto text-center space-y-5 border-t border-white/10 dark:border-white/10 light:border-[#E6D9C4] pt-12 lg:pt-16">
        <Reveal delay={0} direction="up">
          <div className="space-y-2">
            <h2 className="text-4xl sm:text-5xl font-medium tracking-tight text-[#F5F5F5] dark:text-[#F5F5F5] light:text-[#1C3B2B]">
              YOUR IDEA. <br />
              <GradientText>A CLEARER WAY FORWARD.</GradientText>
            </h2>
            <p className="text-sm text-[#A7A7AD] dark:text-[#A7A7AD] light:text-[#304B32]">
              Move from assumptions to a structured venture decision.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120} direction="up">
          <div>
            <button
              onClick={handleStartVenture}
              className="inline-flex items-center gap-2 px-9 py-4 rounded-full text-xs font-mono font-medium tracking-wider uppercase bg-[#B8A7FF] dark:bg-[#B8A7FF] light:bg-[#FACC15] text-[#050505] dark:text-[#050505] light:text-[#1C3B2B] shadow-2xl transition-all hover:scale-105 active:scale-95"
            >
              START YOUR VENTURE
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </Reveal>
      </section>

    </div>
  );
};
