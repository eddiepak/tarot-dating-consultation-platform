import { createClient } from '@supabase/supabase-js';

// These should be replaced with actual Supabase credentials
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
