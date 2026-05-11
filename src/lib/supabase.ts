import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseInstance: SupabaseClient | null = null;

export const supabase = (() => {
  if (supabaseInstance) return supabaseInstance;

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials are missing. Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
    // Return a dummy client or throw a clear error only when used
    return new Proxy({} as SupabaseClient, {
      get: () => {
        throw new Error('Supabase client not initialized. Check environment variables.');
      }
    });
  }

  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  return supabaseInstance;
})() as SupabaseClient;

export type Order = {
  id: string;
  order_number: string;
  customer_name: string;
  phone: string;
  shoe_type: string;
  service_type: string;
  notes: string;
  status: 'Pending' | 'Cleaning' | 'Drying' | 'Ready' | 'Completed';
  total_price: number;
  payment_proof_url: string;
  payment_status: 'Paid' | 'Unpaid';
  created_at: string;
};
