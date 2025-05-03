import { createClient } from '@supabase/supabase-js'

export const createServerClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

// utils/supabase/server.ts
// utils/supabase/server.ts
// utils/supabase/server.ts
// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
// import { cookies } from 'next/headers';
// import type { Database } from '@/types/supabase'; // adjust or remove if not using types

// export const createServerClient = async () => {
//   const cookieStore = cookies();
//   return createServerComponentClient<Database>({ cookies: () => cookieStore });
// };


