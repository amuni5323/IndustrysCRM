'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabaseClient';

export default function CustomerVerifyEmailPage() {
  const params = useParams();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug || '';

  const router = useRouter();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyEmail = async () => {
      const hash = window.location.hash;
      const params = new URLSearchParams(hash.replace(/^#/, '')); // Remove '#' and parse
      const access_token = params.get('access_token');

      if (!access_token) {
        setError('Invalid or missing verification token.');
        setLoading(false);
        return;
      }

      const { error } = await supabase.auth.setSession({
        access_token,
        refresh_token: params.get('refresh_token') || '',
      });

      if (error) {
        setError('Verification failed: ' + error.message);
        setLoading(false);
      } else {
        setMessage('Your email has been verified! Redirecting to login...');
        setLoading(false);
        setTimeout(() => {
          router.push(`/${slug}/login`);
        }, 2000); // Small delay so user sees the success message
      }
    };

    verifyEmail();
  }, [slug, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {loading ? (
        <p className="text-blue-600">Verifying...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <p className="text-green-500">{message}</p>
      )}
    </div>
  );
}
