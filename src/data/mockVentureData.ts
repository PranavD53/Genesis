import { VentureState } from '../types/venture';

export const initialMockVentureState: VentureState = {
  currentStage: 'opening',
  isDemoMode: true,
  startupDetails: {
    name: 'WasteWise Systems',
    idea: 'AI-driven dynamic inventory & kitchen waste prevention for independent dining venues',
    description: 'WasteWise helps local independent restaurant operators monitor real-time food inventory degradation and forecast daily chef prep sheets.',
    industry: 'FoodTech / B2B SaaS',
    stage: 'Concept',
    location: 'Metropolitan India & SEA'
  },
  problem: {
    statement: 'Independent restaurant operators lose 12-18% of gross margin to unmonitored food ingredient waste and inaccurate daily prep forecasts.',
    affectedAudience: 'Independent casual dining owners and head chefs',
    context: 'Perishable ingredients are ordered on intuition without predictive demand forecasting.',
    currentWorkarounds: 'Manual whiteboards, post-shift spreadsheets'
  },
  solution: {
    proposedSolution: 'A lightweight mobile kitchen copilot that integrates with POS order feeds to track ingredient velocity and auto-generate daily chef prep sheets.',
    coreFeatures: [
      'Predictive Daily Prep Sheet Generator',
      'POS Order Velocity & Degradation Sync',
      'Supplier Reorder Triggers'
    ],
    valueProposition: 'Recover 8-12% of lost gross food margins within 30 days without changing chef workflow.'
  },
  targetCustomers: {
    primarySegment: 'Independent Casual Dining Restaurants (1-5 locations)',
    buyerPersona: 'Restaurant Owner-Operator or Executive Chef',
    coreNeeds: ['Reduce food COGS', 'Zero hardware overhead', 'Simple daily prep alerts'],
    operationalConstraints: 'Kitchen staff have minimal computer literacy during rush hours'
  },
  businessDNA: {
    coreAttributes: {
      problemSummary: 'Food ingredient margin decay in independent dining',
      solutionSummary: 'AI-assisted predictive chef prep copilot',
      targetCustomerSummary: 'Independent casual dining operators (1-5 locations)',
      valuePropSummary: '8-12% gross margin recovery in 30 days',
      industrySector: 'FoodTech / Restaurant SaaS',
      primaryRevenueModel: 'Monthly SaaS Tier per Location (₹3,500 - ₹7,500)'
    },
    assumptions: ['POS data feeds accessible via webhooks', 'Chefs adopt 1-tap morning prep alerts'],
    constraints: ['Low tolerance for complex ERP software'],
    isConstructed: true,
    lastUpdated: '2026-10-05'
  },
  derivedInsights: {
    problemInsight: 'Food waste is driven by weak demand forecasting, creating a direct margin recovery opportunity.',
    customerInsight: 'Independent restaurants are the clearest initial customer segment.',
    marketThesis: '₹180 Cr initial opportunity within a ₹4,200 Cr reachable segment.',
    positioningGap: 'Genesis identifies a gap between basic reactive POS tools and expensive enterprise inventory systems.',
    monetizationFlow: 'Predictive prep guidance becomes a recurring software subscription for independent restaurants.',
    economicOutlook: 'The model can reach break-even through recurring software revenue without hardware capital.',
    baseRunway: '₹45L initial capital supports a 12-month runway toward 100 paying venues.',
    verdict: 'PROMISING',
    verdictRationale: 'Clear customer pain, measurable economic value and a focused initial market create a credible entry point.',
    keyStrength: 'Urgent margin improvement opportunity with zero hardware dependency.',
    keyConstraint: 'Kitchen workflow adoption during peak rush hours.',
    nextActions: [
      'Validate WhatsApp daily prep alert with 10 pilot venues',
      'Establish API connector for Petpooja & UrbanPiper POS feeds',
      'Prove ₹25,000 monthly food savings per pilot venue'
    ]
  },
  marketAnalysis: {
    tam: '₹28,500 Cr',
    sam: '₹4,200 Cr',
    som: '₹180 Cr',
    attractivenessAssessment: 'Large enough to matter. Focused enough to enter.'
  },
  competitorAnalysis: {
    positioningSummary: 'Genesis occupies the focused gap between low-cost reactive POS modules and enterprise-priced chain systems.',
    competitorNodes: [
      { name: 'Basic POS Modules', type: 'basic', label: 'Reactive Stock Logging' },
      { name: 'WasteWise (Genesis)', type: 'genesis', label: 'Predictive Prep Guidance' },
      { name: 'Enterprise ERPs', type: 'enterprise', label: 'High Cost / Complex' }
    ]
  },
  businessModel: {
    flowSteps: [
      'Independent Restaurants',
      'Predictive Prep Guidance',
      'Lower Ingredient Waste',
      'Recurring SaaS Subscription'
    ],
    summary: 'Recurring software revenue with low hardware dependency supports a scalable model.'
  },
  financialProfile: {
    baseRunway: '12 Months Runway',
    baseVenueTarget: 100,
    capitalRequired: '₹45 Lakhs Seed Capital',
    scenarios: [
      { name: 'Conservative', growth: '50 venues', breakEvenMonths: 18 },
      { name: 'Base Expansion', growth: '120 venues', breakEvenMonths: 14 },
      { name: 'Aggressive Scale', growth: '300 venues', breakEvenMonths: 11 }
    ]
  },
  riskOpportunity: {
    topRisks: [
      { title: 'Adoption Friction during Rush Hours', mitigation: 'Deliver 1-tap WhatsApp morning prep alert to head chef.' },
      { title: 'POS Integration Permissions', mitigation: 'Build open webhooks for top regional POS providers.' },
      { title: 'Restaurant Closure Churn Rate', mitigation: 'Expand into institutional dining halls and cloud kitchens.' }
    ]
  },
  signals: [
    {
      id: 'sig-1',
      timestamp: '2026-10-04',
      category: 'Market Trend',
      headline: 'Commercial Raw Ingredient Inflation Rises 12%',
      relevanceImpact: 'Increases urgency for independent venues to optimize ingredient yield.',
      suggestedAction: 'Highlight ingredient inflation protection in venue pitch.'
    },
    {
      id: 'sig-2',
      timestamp: '2026-10-02',
      category: 'Competitor Activity',
      headline: 'Major Regional POS Provider Opens Open Webhooks',
      relevanceImpact: 'Reduces integration development timeline from weeks to days.',
      suggestedAction: 'Deploy Petpooja V3 webhook listener.'
    }
  ],
  refinementHistory: []
};
