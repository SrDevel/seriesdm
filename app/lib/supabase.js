import { createClient } from '@supabase/supabase-js'
import Constants from 'expo-constants';

const supabaseUrl = Constants?.expoConfig?.extra?.supabaseUrl;
const supabaseKey = Constants?.expoConfig?.extra?.supabaseKey;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('No se encontraron las variables de entorno SUPABASE_URL y SUPABASE_ANON_KEY');
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});