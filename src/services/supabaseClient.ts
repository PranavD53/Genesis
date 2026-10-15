import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { VentureState, RefinementLog } from '../types/venture';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = (): boolean => {
  return (
    typeof supabaseUrl === 'string' &&
    supabaseUrl.trim().length > 0 &&
    supabaseUrl.startsWith('http') &&
    typeof supabaseAnonKey === 'string' &&
    supabaseAnonKey.trim().length > 0
  );
};

export const supabase: SupabaseClient | null = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Save complete venture state to Supabase
 */
export async function saveVentureToSupabase(venture: VentureState): Promise<string | null> {
  // 1. Always save to LocalStorage immediately as offline resilience
  try {
    localStorage.setItem(`genesis_local_venture_${venture.startupDetails?.name || 'current'}`, JSON.stringify(venture));
    localStorage.setItem('genesis_latest_venture', JSON.stringify(venture));
  } catch (e) {
    console.warn('LocalStorage save notice:', e);
  }

  if (!isSupabaseConfigured() || !supabase) {
    return null;
  }

  try {
    let userId: string | null = null;
    try {
      const { data: userData } = await supabase.auth.getUser();
      userId = userData?.user?.id || null;
    } catch {
      // ignore
    }

    const { data, error } = await supabase
      .from('ventures')
      .insert([
        {
          user_id: userId,
          name: venture.startupDetails?.name || 'Untitled Venture',
          industry: venture.startupDetails?.industry || 'Technology',
          stage: venture.startupDetails?.stage || 'Concept',
          location: venture.startupDetails?.location || 'Global',
          startup_details: venture.startupDetails,
          problem: venture.problem,
          solution: venture.solution,
          target_customers: venture.targetCustomers,
          business_dna: venture.businessDNA,
          derived_insights: venture.derivedInsights,
          market_analysis: venture.marketAnalysis,
          competitor_analysis: venture.competitorAnalysis,
          business_model: venture.businessModel,
          financial_profile: venture.financialProfile,
          risk_opportunity: venture.riskOpportunity,
          signals: venture.signals,
          verdict: venture.derivedInsights?.verdict || 'PROMISING',
          current_stage: venture.currentStage,
          is_demo_mode: venture.isDemoMode
        }
      ])
      .select('id')
      .single();

    if (error) {
      if (error.code === 'PGRST205') {
        console.info('Supabase notice: "ventures" table is pending schema creation in Supabase SQL editor. LocalStorage cache is active.');
      } else {
        console.warn('Supabase venture sync notice:', error.message);
      }
      return null;
    }

    return data?.id || null;
  } catch (err) {
    console.warn('Failed to save venture to Supabase (using local backup):', err);
    return null;
  }
}

/**
 * Save a refinement action & recalibration log
 */
export async function saveRefinementToSupabase(
  ventureId: string | null,
  log: RefinementLog
): Promise<void> {
  if (!isSupabaseConfigured() || !supabase || !ventureId) return;

  try {
    await supabase.from('venture_refinements').insert([
      {
        venture_id: ventureId,
        changed_field: log.changedField,
        previous_value: log.previousValue || null,
        new_value: log.newValue,
        reanalysis_summary: log.reAnalysisSummary || null
      }
    ]);
  } catch (err) {
    console.error('Failed to log refinement to Supabase:', err);
  }
}

/**
 * Save a chat exchange with the AI Cofounder
 */
export async function saveCofounderMessageToSupabase(
  ventureId: string | null,
  role: 'user' | 'assistant',
  content: string
): Promise<void> {
  if (!isSupabaseConfigured() || !supabase || !ventureId) return;

  try {
    await supabase.from('cofounder_messages').insert([
      {
        venture_id: ventureId,
        role,
        content
      }
    ]);
  } catch (err) {
    console.error('Failed to save cofounder message to Supabase:', err);
  }
}

/**
 * Fetch previous conversation history for the AI Cofounder
 */
export async function fetchCofounderMessagesFromSupabase(
  ventureId: string | null
): Promise<Array<{ role: 'user' | 'assistant'; content: string; created_at: string }>> {
  if (!isSupabaseConfigured() || !supabase || !ventureId) return [];

  try {
    const { data, error } = await supabase
      .from('cofounder_messages')
      .select('role, content, created_at')
      .eq('venture_id', ventureId)
      .order('created_at', { ascending: true });

    if (error || !data) return [];
    return data as Array<{ role: 'user' | 'assistant'; content: string; created_at: string }>;
  } catch (err) {
    console.error('Failed to fetch cofounder messages:', err);
    return [];
  }
}

/**
 * Upload an artifact/file to Supabase Storage Bucket ('venture-files')
 */
export async function uploadVentureFile(
  file: File | Blob,
  path: string,
  bucket: string = 'venture-files'
): Promise<{ url: string | null; error: string | null }> {
  if (!isSupabaseConfigured() || !supabase) {
    return { url: null, error: 'Supabase storage is not configured' };
  }

  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, { upsert: true });

    if (error) {
      return { url: null, error: error.message };
    }

    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(data.path);
    return { url: urlData.publicUrl, error: null };
  } catch (err: any) {
    return { url: null, error: err?.message || 'Upload failed' };
  }
}

/**
 * Get public download URL for a file stored in Supabase Storage
 */
export function getVentureFileUrl(path: string, bucket: string = 'venture-files'): string | null {
  if (!isSupabaseConfigured() || !supabase) return null;
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl || null;
}
