'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function EmailCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug');
  const [message, setMessage] = useState('Completing email confirmation...');

  useEffect(() => {
    const handleAuth = async () => {
      // Parse the URL hash
      const hash = window.location.hash;
      const params = new URLSearchParams(hash.substring(1));
      const access_token = params.get('access_token');
      const refresh_token = params.get('refresh_token');

      if (!access_token || !refresh_token || !slug) {
        setMessage('Missing required tokens or slug.');
        return;
      }

      const { error } = await supabase.auth.setSession({
        access_token,
        refresh_token,
      });

      if (error) {
        console.error('Session error:', error);
        setMessage('Failed to complete email confirmation.');
        return;
      }

      // Optional: check user info
      const {
        data: { user },
      } = await supabase.auth.getUser();

      console.log('User authenticated:', user);

      // OPTIONAL: Insert company data here if not already done (if you're deferring that).
      // You could store the form data in localStorage and retrieve it here if needed.

      // Redirect to /[slug]
      router.push(`/${slug}`);
    };

    handleAuth();
  }, [slug, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg font-medium">{message}</p>
    </div>
  );
}
