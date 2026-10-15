import {
  VentureState,
  StartupDetails,
  ProblemDetails,
  SolutionDetails,
  TargetCustomerDetails
} from '../types/venture';
import {
  generateFullVentureAnalysis,
  recalibrateVentureWithAI,
  askCofounderAI,
  currentActiveProvider
} from './aiEngine';
import {
  saveVentureToSupabase,
  saveRefinementToSupabase,
  saveCofounderMessageToSupabase,
  fetchCofounderMessagesFromSupabase,
  isSupabaseConfigured
} from './supabaseClient';

export { currentActiveProvider, isSupabaseConfigured };

/**
 * Real-time synthesis of complete venture intelligence from user prompt
 */
export async function submitVentureInput(data: {
  startupDetails: StartupDetails;
  problem: ProblemDetails;
  solution: SolutionDetails;
  targetCustomers: TargetCustomerDetails;
}): Promise<VentureState> {
  // 1. Generate full intelligence via Dual-API AI Engine (Gemini -> Groq -> Synthesized)
  const ventureState = await generateFullVentureAnalysis(data);

  // 2. Persist to Supabase if credentials are provided
  try {
    const supabaseId = await saveVentureToSupabase(ventureState);
    if (supabaseId) {
      (ventureState as any).id = supabaseId;
    }
  } catch (err) {
    console.warn('Supabase persistence notice:', err);
  }

  return ventureState;
}

/**
 * Real-time recalibration when founder refines an attribute
 */
export async function refineVentureField(
  ventureState: VentureState,
  fieldName: string,
  newValue: string
): Promise<VentureState> {
  // 1. Recalibrate via Dual-API AI Engine
  const recalibrated = await recalibrateVentureWithAI(ventureState, fieldName, newValue);

  // 2. Persist log to Supabase
  try {
    const ventureId = (ventureState as any)?.id || null;
    if (ventureId && recalibrated.refinementHistory.length > 0) {
      await saveRefinementToSupabase(ventureId, recalibrated.refinementHistory[0]);
    }
  } catch (err) {
    console.warn('Supabase refinement logging notice:', err);
  }

  return recalibrated;
}

/**
 * Interactive Cofounder Chat Query
 */
export async function queryCofounder(
  message: string,
  venture: VentureState,
  history: Array<{ role: 'user' | 'assistant'; content: string }> = []
): Promise<string> {
  const ventureId = (venture as any)?.id || null;

  // 1. Save user query to Supabase
  if (ventureId) {
    saveCofounderMessageToSupabase(ventureId, 'user', message).catch(() => {});
  }

  // 2. Generate AI response
  const aiReply = await askCofounderAI(message, venture, history);

  // 3. Save assistant response to Supabase
  if (ventureId) {
    saveCofounderMessageToSupabase(ventureId, 'assistant', aiReply).catch(() => {});
  }

  return aiReply;
}

/**
 * Fetch saved cofounder messages from Supabase
 */
export async function getCofounderHistory(
  ventureId: string | null
): Promise<Array<{ role: 'user' | 'assistant'; content: string; created_at: string }>> {
  return fetchCofounderMessagesFromSupabase(ventureId);
}
