import {
  StartupDetails,
  ProblemDetails,
  SolutionDetails,
  TargetCustomerDetails,
  VentureState,
  DerivedVentureInsights,
  BusinessDNA
} from '../types/venture';
import { initialMockVentureState } from '../data/mockVentureData';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || '';

export type ActiveAIProvider = 'gemini' | 'groq' | 'synthesized-local';

/**
 * Tracks which AI provider is currently serving requests
 */
export let currentActiveProvider: ActiveAIProvider = GEMINI_API_KEY ? 'gemini' : (GROQ_API_KEY ? 'groq' : 'synthesized-local');

/**
 * Robust JSON extractor that handles markdown code blocks and raw responses
 */
function extractJson(text: string): any {
  try {
    return JSON.parse(text.trim());
  } catch (e) {}

  const fenceMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (fenceMatch && fenceMatch[1]) {
    try {
      return JSON.parse(fenceMatch[1].trim());
    } catch (e) {}
  }

  const firstBrace = text.indexOf('{');
  const lastBrace = text.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    const candidate = text.substring(firstBrace, lastBrace + 1);
    try {
      return JSON.parse(candidate);
    } catch (e) {}
  }

  throw new Error('Unable to extract valid JSON from model response');
}

/**
 * Call Gemini Flash (gemini-flash-latest)
 */
async function callGemini(prompt: string, apiKey: string): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ],
      generationConfig: {
        temperature: 0.35,
        responseMimeType: 'application/json'
      }
    })
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Gemini API Error (${response.status}): ${errorBody}`);
  }

  const json = await response.json();
  const rawText = json?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) throw new Error('Empty response received from Gemini API');
  return rawText;
}

/**
 * Call Groq (openai/gpt-oss-120b with qwen/qwen3.8-27b fallback)
 */
async function callGroq(prompt: string, apiKey: string): Promise<string> {
  const url = 'https://api.groq.com/openai/v1/chat/completions';
  const models = ['openai/gpt-oss-120b', 'qwen/qwen3.8-27b'];

  let lastError: any = null;

  for (const model of models) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model,
          messages: [
            {
              role: 'system',
              content: 'You are an elite VC Principal, startup builder and venture strategist. Always reply in valid, well-formed JSON matching the required schema.'
            },
            { role: 'user', content: prompt }
          ],
          response_format: { type: 'json_object' },
          temperature: 0.35
        })
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Groq API Error (${response.status}) with ${model}: ${errorBody}`);
      }

      const json = await response.json();
      const rawText = json?.choices?.[0]?.message?.content;
      if (!rawText) throw new Error(`Empty response received from Groq API with ${model}`);
      return rawText;
    } catch (err) {
      lastError = err;
      console.warn(`Groq model ${model} attempt failed, trying next fallback...`, err);
    }
  }

  throw lastError || new Error('All Groq models failed');
}

/**
 * Dual-API Router: Calls Gemini first, automatically falls back to Groq if quota or error happens
 */
async function executeDualPrompt(prompt: string): Promise<string> {
  // 1. Try Gemini if key is present
  if (GEMINI_API_KEY && GEMINI_API_KEY.trim().length > 0) {
    try {
      const result = await callGemini(prompt, GEMINI_API_KEY.trim());
      currentActiveProvider = 'gemini';
      return result;
    } catch (geminiError: any) {
      console.warn('Gemini API exhausted or failed. Attempting fallback to Groq...', geminiError?.message || geminiError);
    }
  }

  // 2. Try Groq fallback if key is present
  if (GROQ_API_KEY && GROQ_API_KEY.trim().length > 0) {
    try {
      const result = await callGroq(prompt, GROQ_API_KEY.trim());
      currentActiveProvider = 'groq';
      return result;
    } catch (groqError: any) {
      console.error('Groq API fallback also failed:', groqError);
    }
  }

  // 3. Neither key worked or available
  currentActiveProvider = 'synthesized-local';
  throw new Error('NO_API_KEYS_AVAILABLE');
}

/**
 * Generate Complete 7-Stage Venture Intelligence Pipeline
 */
export async function generateFullVentureAnalysis(data: {
  startupDetails: StartupDetails;
  problem: ProblemDetails;
  solution: SolutionDetails;
  targetCustomers: TargetCustomerDetails;
}): Promise<VentureState> {
  const prompt = `
You are the Genesis Venture Intelligence Engine. Analyze this startup idea thoroughly as an elite venture capital partner and enterprise startup architect.

STARTUP PROFILE:
- Venture Name: "${data.startupDetails.name || 'Untitled Venture'}"
- Sector / Industry: "${data.startupDetails.industry || 'Technology / B2B SaaS'}"
- Development Stage: "${data.startupDetails.stage || 'Concept'}"
- Location / Target Region: "${data.startupDetails.location || 'Global'}"

PROBLEM SPECIFICATION:
- Problem Statement: "${data.problem.statement || 'Friction in traditional workflows'}"
- Affected Audience: "${data.problem.affectedAudience || 'Core market users'}"
- Operational Context: "${data.problem.context || 'Legacy operational methods'}"
- Current Workarounds / Alternatives: "${data.problem.currentWorkarounds || 'Spreadsheets, manual processes'}"

SOLUTION SPECIFICATION:
- Proposed Solution: "${data.solution.proposedSolution || 'Automated modern digital solution'}"
- Core Features: ${JSON.stringify(data.solution.coreFeatures || [])}
- Primary Value Proposition: "${data.solution.valueProposition || 'High ROI & efficiency gain'}"

CUSTOMER SPECIFICATION:
- Primary Segment: "${data.targetCustomers.primarySegment || 'SMBs & Enterprise'}"
- Buyer Persona: "${data.targetCustomers.buyerPersona || 'Decision Maker / Department Lead'}"
- Core Needs: ${JSON.stringify(data.targetCustomers.coreNeeds || [])}
- Operational Constraints: "${data.targetCustomers.operationalConstraints || 'Low training tolerance, tight margins'}"

TASK:
Synthesize an authoritative, realistic, and fully interconnected Venture Analysis JSON matching the exact schema below. Ensure all figures (TAM/SAM/SOM, currency, break-even months, OpEx, capital, competitor nodes) are tailored to this exact business and geography.

SCHEMA REQUIREMENTS (JSON ONLY):
{
  "businessDNA": {
    "coreAttributes": {
      "problemSummary": "1-line crisp problem summary",
      "solutionSummary": "1-line crisp solution summary",
      "targetCustomerSummary": "1-line customer segment summary",
      "valuePropSummary": "1-line value proposition summary",
      "industrySector": "Industry sector category",
      "primaryRevenueModel": "Specific revenue pricing model (e.g. $49/mo SaaS, 2% GMV transaction fee, etc.)"
    },
    "assumptions": ["3 critical assumptions that must be true for this venture"],
    "constraints": ["2 major regulatory or operational friction points"],
    "isConstructed": true,
    "lastUpdated": "${new Date().toISOString().split('T')[0]}"
  },
  "derivedInsights": {
    "problemInsight": "High-conviction analytical thesis on why this problem represents an urgent opportunity.",
    "customerInsight": "Analysis of the initial beachhead customer segment.",
    "marketThesis": "Quantitative summary of market capture and growth opportunity.",
    "positioningGap": "Strategic breakdown of where Genesis positions this venture relative to alternatives.",
    "monetizationFlow": "Mechanics of converting user value into scalable recurring revenue.",
    "economicOutlook": "Unit economics and capital efficiency verdict.",
    "baseRunway": "Estimated runway and milestone achievable with initial seed capital.",
    "verdict": "PROMISING" | "REQUIRES REFINEMENT" | "HIGH RISK",
    "verdictRationale": "Thorough VC-grade justification for the verdict.",
    "keyStrength": "Single greatest unfair advantage or moat.",
    "keyConstraint": "Single biggest existential bottleneck to solve.",
    "nextActions": [
      "Priority Action Item 1 (specific to venture)",
      "Priority Action Item 2 (specific to venture)",
      "Priority Action Item 3 (specific to venture)"
    ]
  },
  "marketAnalysis": {
    "tam": "Estimated Total Addressable Market with currency (e.g. $14.2B / ₹18,000 Cr)",
    "sam": "Estimated Serviceable Addressable Market with currency",
    "som": "Estimated Serviceable Obtainable Market with currency",
    "attractivenessAssessment": "Crisp evaluation of market timing and growth velocity"
  },
  "competitorAnalysis": {
    "positioningSummary": "Spatial positioning overview against direct competitors, incumbents, and workarounds.",
    "competitorNodes": [
      { "name": "Actual alternative tool or workaround", "type": "basic", "label": "Reactive or low-tier solution" },
      { "name": "${data.startupDetails.name || 'This Venture'}", "type": "genesis", "label": "Differentiated high-value position" },
      { "name": "Actual incumbent / enterprise vendor in this sector", "type": "enterprise", "label": "High cost / complex" }
    ]
  },
  "businessModel": {
    "flowSteps": [
      "Target customer segment",
      "Value proposition delivery",
      "Operational efficiency gain",
      "Demonstrable ROI",
      "Recurring revenue capture"
    ],
    "summary": "Summary of recurring economics, customer acquisition channel, and unit margins."
  },
  "financialProfile": {
    "baseRunway": "12-18 Months",
    "baseVenueTarget": 100,
    "capitalRequired": "Recommended seed funding required (e.g. $250k / ₹50 Lakhs)",
    "scenarios": [
      { "name": "Conservative", "growth": "Target units/accounts", "breakEvenMonths": 18 },
      { "name": "Base Expansion", "growth": "Target units/accounts", "breakEvenMonths": 14 },
      { "name": "Aggressive Scale", "growth": "Target units/accounts", "breakEvenMonths": 10 }
    ]
  },
  "riskOpportunity": {
    "topRisks": [
      { "title": "Top Risk 1", "mitigation": "Actionable, concrete mitigation strategy" },
      { "title": "Top Risk 2", "mitigation": "Actionable, concrete mitigation strategy" },
      { "title": "Top Risk 3", "mitigation": "Actionable, concrete mitigation strategy" }
    ]
  },
  "signals": [
    {
      "id": "sig-1",
      "timestamp": "${new Date().toISOString().split('T')[0]}",
      "category": "Market Momentum",
      "headline": "Real-world relevant industry headline",
      "relevanceImpact": "Specific impact on this venture",
      "suggestedAction": "Strategic recommendation for founder"
    },
    {
      "id": "sig-2",
      "timestamp": "${new Date().toISOString().split('T')[0]}",
      "category": "Competitive Movement",
      "headline": "Real-world competitor or platform trend",
      "relevanceImpact": "Specific competitive implication",
      "suggestedAction": "Suggested counter-move"
    }
  ]
}
`;

  try {
    const rawJson = await executeDualPrompt(prompt);
    const parsed = extractJson(rawJson);

    return {
      currentStage: 'dna',
      isDemoMode: false,
      startupDetails: data.startupDetails,
      problem: data.problem,
      solution: data.solution,
      targetCustomers: data.targetCustomers,
      businessDNA: parsed.businessDNA || initialMockVentureState.businessDNA,
      derivedInsights: parsed.derivedInsights || initialMockVentureState.derivedInsights,
      marketAnalysis: parsed.marketAnalysis || initialMockVentureState.marketAnalysis,
      competitorAnalysis: parsed.competitorAnalysis || initialMockVentureState.competitorAnalysis,
      businessModel: parsed.businessModel || initialMockVentureState.businessModel,
      financialProfile: parsed.financialProfile || initialMockVentureState.financialProfile,
      riskOpportunity: parsed.riskOpportunity || initialMockVentureState.riskOpportunity,
      signals: parsed.signals || initialMockVentureState.signals,
      refinementHistory: []
    };
  } catch (error) {
    console.warn('Real-time AI generation fallback triggered:', error);

    // Fallback: Smart local synthesis engine
    const name = data.startupDetails.name || 'Your Venture';
    const industry = data.startupDetails.industry || 'Technology / SaaS';

    return {
      currentStage: 'dna',
      isDemoMode: false,
      startupDetails: data.startupDetails,
      problem: data.problem,
      solution: data.solution,
      targetCustomers: data.targetCustomers,
      businessDNA: {
        coreAttributes: {
          problemSummary: data.problem.statement || 'Friction in operational workflows',
          solutionSummary: data.solution.proposedSolution || 'Integrated modern workflow copilot',
          targetCustomerSummary: data.targetCustomers.primarySegment || 'Initial beachhead customers',
          valuePropSummary: data.solution.valueProposition || 'High ROI & margin recovery',
          industrySector: industry,
          primaryRevenueModel: 'Monthly SaaS Tier / Value-based Pricing'
        },
        assumptions: [
          'Target users experience measurable pain with current alternatives',
          'Solution can be integrated with minimal onboarding friction',
          'Customer willingness to pay is validated within 30-day proof'
        ],
        constraints: [
          data.targetCustomers.operationalConstraints || 'Low tolerance for high learning curves'
        ],
        isConstructed: true,
        lastUpdated: new Date().toISOString().split('T')[0]
      },
      derivedInsights: {
        problemInsight: data.problem.statement
          ? `${data.problem.statement.slice(0, 120)} represents a concentrated operational friction.`
          : 'High friction in legacy workflows presents a focused entry point.',
        customerInsight: data.targetCustomers.primarySegment
          ? `${data.targetCustomers.primarySegment} provides the clearest beachhead for initial customer acquisition.`
          : 'Primary target segment is distinct and actionable.',
        marketThesis: `Emerging opportunity in ${industry} driven by the transition from legacy workarounds.`,
        positioningGap: `Genesis identifies a gap between basic tools (${data.problem.currentWorkarounds || 'manual methods'}) and expensive enterprise suites.`,
        monetizationFlow: `Value proposition centered on ${data.solution.valueProposition || 'direct efficiency'} converted into sustainable recurring revenue.`,
        economicOutlook: 'Favorable unit economics with low capital intensity and zero mandatory hardware overhead.',
        baseRunway: '12 Months Runway supports validation and initial 50-100 paying customers.',
        verdict: 'PROMISING',
        verdictRationale: `${name} addresses a distinct friction point with demonstrable economic upside and manageable early-stage capital requirements.`,
        keyStrength: data.solution.valueProposition || 'High-velocity ROI with direct operational integration.',
        keyConstraint: data.targetCustomers.operationalConstraints || 'Customer adoption inertia during busy periods.',
        nextActions: [
          `Run 10 pilot interviews with ${data.targetCustomers.buyerPersona || 'prospective buyers'}`,
          `Validate core differentiator (${data.solution.coreFeatures?.[0] || 'core feature'}) with prototype`,
          `Demonstrate initial unit payback: ${data.solution.valueProposition || 'measurable cost savings'}`
        ]
      },
      marketAnalysis: {
        tam: '$18.4 Billion',
        sam: '$2.8 Billion',
        som: '$140 Million',
        attractivenessAssessment: 'Expanding market segment with high willingness to adopt modern point solutions.'
      },
      competitorAnalysis: {
        positioningSummary: `Genesis maps ${name} between low-cost basic tools and enterprise incumbent platforms.`,
        competitorNodes: [
          { name: data.problem.currentWorkarounds || 'Legacy Workarounds', type: 'basic', label: 'Reactive / Manual Tools' },
          { name: name, type: 'genesis', label: data.solution.valueProposition || 'Predictive Modern Platform' },
          { name: 'Enterprise Incumbents', type: 'enterprise', label: 'High Cost / Complex Overhead' }
        ]
      },
      businessModel: {
        flowSteps: [
          data.targetCustomers.primarySegment || 'Target Audience',
          data.solution.proposedSolution || 'Solution Delivery',
          data.solution.valueProposition || 'Quantifiable ROI',
          'Recurring SaaS Monetization'
        ],
        summary: `Recurring subscription model targeting ${data.targetCustomers.primarySegment || 'beachhead users'}.`
      },
      financialProfile: {
        baseRunway: '12 Months Runway',
        baseVenueTarget: 100,
        capitalRequired: '$150,000 Seed Capital',
        scenarios: [
          { name: 'Conservative', growth: '40 accounts', breakEvenMonths: 18 },
          { name: 'Base Expansion', growth: '100 accounts', breakEvenMonths: 14 },
          { name: 'Aggressive Scale', growth: '250 accounts', breakEvenMonths: 10 }
        ]
      },
      riskOpportunity: {
        topRisks: [
          { title: 'User Onboarding Friction', mitigation: 'Keep daily interaction to 1-tap alerts and friction-free inputs.' },
          { title: 'Integration Barriers with Existing Systems', mitigation: 'Build open webhooks and lightweight connectors.' },
          { title: 'Churn Risk during Off-Peak Cycles', mitigation: 'Offer modular subscription pause options during slow quarters.' }
        ]
      },
      signals: [
        {
          id: 'sig-1',
          timestamp: new Date().toISOString().split('T')[0],
          category: 'Market Trend',
          headline: `Demand accelerating in ${industry}`,
          relevanceImpact: `Creates urgent window to capture market share before incumbents react.`,
          suggestedAction: `Lead marketing with proof of ROI and speed to value.`
        },
        {
          id: 'sig-2',
          timestamp: new Date().toISOString().split('T')[0],
          category: 'Ecosystem Opportunity',
          headline: 'Open APIs enabling rapid third-party partner integrations',
          relevanceImpact: 'Lowers implementation cost by over 60%.',
          suggestedAction: 'Deploy connector for top platform feeds.'
        }
      ],
      refinementHistory: []
    };
  }
}

/**
 * Recalibrate Venture when a founder edits a field
 */
export async function recalibrateVentureWithAI(
  currentVenture: VentureState,
  fieldName: string,
  newValue: string
): Promise<VentureState> {
  const prompt = `
You are the Genesis Venture Intelligence Engine. The founder has just recalibrated an attribute of their venture:
- Venture Name: "${currentVenture.startupDetails.name}"
- Field Updated: "${fieldName}"
- New Value: "${newValue}"

Existing Business DNA:
${JSON.stringify(currentVenture.businessDNA.coreAttributes, null, 2)}

TASK:
Recalibrate downstream derived insights, verdict, key strengths, constraints, and immediate next actions to reflect this update accurately.

SCHEMA REQUIREMENTS (JSON ONLY):
{
  "reAnalysisSummary": "1-2 sentence explanation of how the venture dynamics and thesis changed due to this update",
  "derivedInsights": {
    "problemInsight": "Recalibrated problem insight",
    "customerInsight": "Recalibrated customer insight",
    "marketThesis": "Recalibrated market thesis",
    "positioningGap": "Recalibrated positioning gap",
    "monetizationFlow": "Recalibrated monetization flow",
    "economicOutlook": "Recalibrated economic outlook",
    "baseRunway": "Recalibrated runway",
    "verdict": "PROMISING" | "REQUIRES REFINEMENT" | "HIGH RISK",
    "verdictRationale": "Recalibrated verdict rationale",
    "keyStrength": "Recalibrated core strength",
    "keyConstraint": "Recalibrated key constraint",
    "nextActions": ["Action 1", "Action 2", "Action 3"]
  }
}
`;

  const updatedDNA: BusinessDNA = {
    ...currentVenture.businessDNA,
    coreAttributes: { ...currentVenture.businessDNA.coreAttributes },
    lastUpdated: new Date().toISOString().split('T')[0]
  };

  if (fieldName === 'problemSummary' || fieldName === 'Problem Statement') {
    updatedDNA.coreAttributes.problemSummary = newValue;
  } else if (fieldName === 'solutionSummary') {
    updatedDNA.coreAttributes.solutionSummary = newValue;
  } else if (fieldName === 'targetCustomerSummary' || fieldName === 'Target Customers') {
    updatedDNA.coreAttributes.targetCustomerSummary = newValue;
  } else if (fieldName === 'valuePropSummary' || fieldName === 'Value Proposition') {
    updatedDNA.coreAttributes.valuePropSummary = newValue;
  } else if (fieldName === 'industrySector') {
    updatedDNA.coreAttributes.industrySector = newValue;
  }

  try {
    const rawJson = await executeDualPrompt(prompt);
    const parsed = extractJson(rawJson);

    const newLog = {
      id: `ref-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      changedField: fieldName,
      previousValue: 'Previous configuration',
      newValue: newValue,
      reAnalysisSummary: parsed.reAnalysisSummary || `Recalibrated venture intelligence around updated ${fieldName}.`
    };

    return {
      ...currentVenture,
      businessDNA: updatedDNA,
      derivedInsights: {
        ...currentVenture.derivedInsights,
        ...(parsed.derivedInsights || {})
      },
      refinementHistory: [newLog, ...currentVenture.refinementHistory]
    };
  } catch (err) {
    const fallbackLog = {
      id: `ref-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      changedField: fieldName,
      previousValue: 'Previous configuration',
      newValue: newValue,
      reAnalysisSummary: `Recalibrated Business DNA & strategic direction based on updated ${fieldName}.`
    };

    return {
      ...currentVenture,
      businessDNA: updatedDNA,
      refinementHistory: [fallbackLog, ...currentVenture.refinementHistory]
    };
  }
}

/**
 * Ask the AI Cofounder in Real-Time
 */
export async function askCofounderAI(
  userQuery: string,
  venture: VentureState,
  chatHistory: Array<{ role: 'user' | 'assistant'; content: string }> = []
): Promise<string> {
  const prompt = `
You are the AI Cofounder for "${venture.startupDetails.name || 'this venture'}".
You possess deep startup execution expertise (Y Combinator partner style, tactical, empathetic, rigorous, and direct).

VENTURE CONTEXT:
- Name: "${venture.startupDetails.name}"
- Industry: "${venture.startupDetails.industry}"
- Stage: "${venture.startupDetails.stage}"
- Problem: "${venture.problem.statement}"
- Solution: "${venture.solution.proposedSolution}"
- Target Customers: "${venture.targetCustomers.primarySegment}"
- Value Proposition: "${venture.solution.valueProposition}"
- Revenue Model: "${venture.businessDNA.coreAttributes.primaryRevenueModel}"
- Strategic Verdict: "${venture.derivedInsights.verdict}" (Rationale: "${venture.derivedInsights.verdictRationale}")
- Core Moat: "${venture.derivedInsights.keyStrength}"
- Critical Bottleneck: "${venture.derivedInsights.keyConstraint}"

CONVERSATION HISTORY:
${chatHistory.map(m => `${m.role.toUpperCase()}: ${m.content}`).join('\n')}

FOUNDER'S CURRENT QUERY:
"${userQuery}"

GUIDELINES FOR YOUR RESPONSE:
- Act as a true cofounder: speak in first-person plural ("we", "our strategy", "let's validate").
- Be concise, tactical, and actionable (2-4 paragraphs or crisp bullet points).
- Ground advice directly in our specific business numbers, market dynamics, and customer persona.
- If the founder asks a strategic question, give concrete recommendations with clear next steps.
`;

  try {
    // 1. Try Gemini
    if (GEMINI_API_KEY && GEMINI_API_KEY.trim().length > 0) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY.trim()}`;
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.6 }
          })
        });
        if (res.ok) {
          const json = await res.json();
          const text = json?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            currentActiveProvider = 'gemini';
            return text;
          }
        }
      } catch (e) {
        console.warn('Gemini cofounder query failed, trying Groq...', e);
      }
    }

    // 2. Try Groq
    if (GROQ_API_KEY && GROQ_API_KEY.trim().length > 0) {
      const groqModels = ['openai/gpt-oss-120b', 'qwen/qwen3.8-27b'];
      for (const gm of groqModels) {
        try {
          const url = 'https://api.groq.com/openai/v1/chat/completions';
          const res = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${GROQ_API_KEY.trim()}`
            },
            body: JSON.stringify({
              model: gm,
              messages: [
                { role: 'system', content: 'You are an elite, proactive startup cofounder. Be direct, strategic, and tactical.' },
                { role: 'user', content: prompt }
              ],
              temperature: 0.6
            })
          });
          if (res.ok) {
            const json = await res.json();
            const text = json?.choices?.[0]?.message?.content;
            if (text) {
              currentActiveProvider = 'groq';
              return text;
            }
          }
        } catch (e) {
          console.warn(`Groq cofounder query with ${gm} failed, trying next...`, e);
        }
      }
    }

    // 3. Fallback
    return `As your cofounder for ${venture.startupDetails.name || 'our venture'}, here is my tactical recommendation on "${userQuery}":\n\n1. First, let's validate this directly with our primary beachhead segment (${venture.targetCustomers.primarySegment || 'our initial target users'}).\n2. We must protect our core moat: ${venture.solution.valueProposition || 'our distinct value proposition'}.\n3. Our biggest immediate focus should be solving our primary constraint: ${venture.derivedInsights.keyConstraint || 'customer adoption friction'}.`;
  } catch (err) {
    return `I hear you on "${userQuery}". Let's double down on our core strength: ${venture.solution.valueProposition || 'delivering high ROI'} and test this with our first 10 pilot customers.`;
  }
}
