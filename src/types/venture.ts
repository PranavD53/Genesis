export interface StartupDetails {
  name: string;
  idea: string;
  description: string;
  industry: string;
  stage: 'Concept' | 'Prototype' | 'Early Traction' | 'Growth';
  location: string;
}

export interface ProblemDetails {
  statement: string;
  affectedAudience: string;
  context: string;
  currentWorkarounds: string;
}

export interface SolutionDetails {
  proposedSolution: string;
  coreFeatures: string[];
  valueProposition: string;
}

export interface TargetCustomerDetails {
  primarySegment: string;
  buyerPersona: string;
  coreNeeds: string[];
  operationalConstraints: string;
}

export interface DerivedVentureInsights {
  problemInsight: string;
  customerInsight: string;
  marketThesis: string;
  positioningGap: string;
  monetizationFlow: string;
  economicOutlook: string;
  baseRunway: string;
  verdict: 'PROMISING' | 'REQUIRES REFINEMENT' | 'HIGH RISK';
  verdictRationale: string;
  keyStrength: string;
  keyConstraint: string;
  nextActions: string[];
}

export interface BusinessDNA {
  coreAttributes: {
    problemSummary: string;
    solutionSummary: string;
    targetCustomerSummary: string;
    valuePropSummary: string;
    industrySector: string;
    primaryRevenueModel: string;
  };
  assumptions: string[];
  constraints: string[];
  isConstructed: boolean;
  lastUpdated: string;
}

export type VentureEvolutionStage =
  | 'opening'
  | 'input-1'
  | 'trans-1'
  | 'input-2'
  | 'trans-2'
  | 'input-3'
  | 'trans-3'
  | 'input-4'
  | 'trans-dna'
  | 'dna'
  | 'trans-mkt'
  | 'market'
  | 'trans-comp'
  | 'competitor'
  | 'trans-bm'
  | 'business'
  | 'trans-fin'
  | 'financial'
  | 'trans-via'
  | 'decisions'
  | 'trans-road'
  | 'roadmap'
  | 'strategy';

export interface RefinementLog {
  id?: string;
  timestamp: string;
  changedField: string;
  previousValue?: string;
  newValue: string;
  reAnalysisSummary?: string;
}

export interface VentureState {
  currentStage: VentureEvolutionStage;
  startupDetails: StartupDetails;
  problem: ProblemDetails;
  solution: SolutionDetails;
  targetCustomers: TargetCustomerDetails;
  businessDNA: BusinessDNA;
  derivedInsights: DerivedVentureInsights;
  marketAnalysis: {
    tam: string;
    sam: string;
    som: string;
    attractivenessAssessment: string;
  };
  competitorAnalysis: {
    positioningSummary: string;
    competitorNodes: Array<{ name: string; type: 'basic' | 'genesis' | 'enterprise'; label: string }>;
  };
  businessModel: {
    flowSteps: string[];
    summary: string;
  };
  financialProfile: {
    baseRunway: string;
    baseVenueTarget: number;
    capitalRequired: string;
    scenarios: Array<{ name: string; growth: string; breakEvenMonths: number }>;
  };
  riskOpportunity: {
    topRisks: Array<{ title: string; mitigation: string }>;
  };
  signals: Array<{
    id: string;
    timestamp: string;
    category: string;
    headline: string;
    relevanceImpact: string;
    suggestedAction: string;
  }>;
  refinementHistory: RefinementLog[];
  isDemoMode: boolean;
}

