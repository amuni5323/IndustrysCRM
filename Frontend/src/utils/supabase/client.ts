import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// Rename this to make it specific for the browser/client side
export const createSupabaseBrowserClient = () => {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
};
