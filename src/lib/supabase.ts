import { createClient } from '@supabase/supabase-js';

// These must be set via environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Database types
export interface ConsultationRecord {
  id?: string;
  category: string;
  cards: string[];
  interpretation: string;
  advice: string;
  created_at?: string;
}

// Save consultation to Supabase
export async function saveConsultation(consultation: ConsultationRecord) {
  if (!supabase) {
    console.warn('Supabase not configured. Skipping save.');
    return { success: false, error: 'Supabase not configured' };
  }
  
  try {
    const { data, error } = await supabase
      .from('consultations')
      .insert([consultation])
      .select();
    
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error saving consultation:', error);
    return { success: false, error };
  }
}

// Get consultation history
export async function getConsultationHistory(limit = 10) {
  if (!supabase) {
    console.warn('Supabase not configured. Skipping fetch.');
    return { success: false, error: 'Supabase not configured' };
  }
  
  try {
    const { data, error } = await supabase
      .from('consultations')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching consultations:', error);
    return { success: false, error };
  }
}
