import { VentureState, StartupDetails, ProblemDetails, SolutionDetails, TargetCustomerDetails } from '../types/venture';
import { initialMockVentureState } from '../data/mockVentureData';

const USE_MOCK_API = true; // Toggle for FastAPI integration

export async function submitVentureInput(data: {
  startupDetails: StartupDetails;
  problem: ProblemDetails;
  solution: SolutionDetails;
  targetCustomers: TargetCustomerDetails;
}): Promise<VentureState> {
  if (USE_MOCK_API) {
    // Simulate backend processing time
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      ...initialMockVentureState,
      startupDetails: data.startupDetails,
      problem: data.problem,
      solution: data.solution,
      targetCustomers: data.targetCustomers,
      businessDNA: {
        ...initialMockVentureState.businessDNA,
        coreAttributes: {
          problemSummary: data.problem.statement || initialMockVentureState.businessDNA.coreAttributes.problemSummary,
          solutionSummary: data.solution.proposedSolution || initialMockVentureState.businessDNA.coreAttributes.solutionSummary,
          targetCustomerSummary: data.targetCustomers.primarySegment || initialMockVentureState.businessDNA.coreAttributes.targetCustomerSummary,
          valuePropSummary: data.solution.valueProposition || initialMockVentureState.businessDNA.coreAttributes.valuePropSummary,
          industrySector: data.startupDetails.industry || initialMockVentureState.businessDNA.coreAttributes.industrySector,
          primaryRevenueModel: initialMockVentureState.businessDNA.coreAttributes.primaryRevenueModel
        },
        isConstructed: true,
        lastUpdated: new Date().toISOString().split('T')[0]
      }
    };
  }

  // Real FastAPI call structure
  const response = await fetch('/api/v1/venture/input', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error('Backend FastAPI submission failed');
  return response.json();
}

export async function refineVentureField(
  ventureState: VentureState,
  fieldName: string,
  newValue: string
): Promise<VentureState> {
  if (USE_MOCK_API) {
    await new Promise(resolve => setTimeout(resolve, 600));
    const newLog = {
      id: `ref-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      changedField: fieldName,
      previousValue: 'Previous configuration',
      newValue: newValue,
      reAnalysisSummary: `Re-evaluated Business DNA based on updated ${fieldName}. Analysis model recalibrated context.`
    };

    return {
      ...ventureState,
      refinementHistory: [newLog, ...ventureState.refinementHistory]
    };
  }

  const response = await fetch('/api/v1/venture/refine', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fieldName, newValue })
  });
  return response.json();
}
