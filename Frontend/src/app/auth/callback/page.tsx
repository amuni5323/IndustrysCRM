'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/utils/supabaseClient';

export default function EmailCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug');
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (data.session) {
        // Redirect to the company page or fallback to home
        router.replace(slug ? `/${slug}` : '/');
      } else {
        setError('Email verification failed or session not found.');
        console.error('Session check error:', error);
        setChecking(false);
      }
    };

    checkSession();
  }, [slug, router]);

  return (
    <div className="h-screen flex flex-col items-center justify-center text-center px-4">
      {checking ? (
        <>
          <h1 className="text-2xl font-semibold mb-2">Verifying your email...</h1>
          <p className="text-gray-500">Please wait while we confirm your session.</p>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-semibold mb-2 text-red-600">Verification failed</h1>
          <p className="text-gray-500">{error}</p>
        </>
      )}
    </div>
  );
}
