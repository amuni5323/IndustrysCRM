'use client';

import { supabase } from '@/utils/supabaseClient';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function CustomerRegistrationPage() {
  const params = useParams();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug || '';

  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [companyName, setCompanyName] = useState('');

  useEffect(() => {
    const fetchCompany = async () => {
      if (!slug) return;
      const { data, error } = await supabase
        .from('companies')
        .select('name')
        .eq('slug', slug)
        .single();
      if (data) setCompanyName(data.name);
      if (error) setError('Invalid company URL.');
    };
    fetchCompany();
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const { data: existingCustomer } = await supabase
        .from('customers')
        .select('email')
        .eq('email', email)
        .maybeSingle();

      const { data: existingCompany } = await supabase
        .from('companies')
        .select('email')
        .eq('email', email)
        .maybeSingle();

      if (existingCustomer) {
        setError('Email already registered as a customer.');
        return;
      }

      if (existingCompany) {
        setError('Email already registered as a company.');
        return;
      }

      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/${slug}/verify-email`,
        },
      });

      if (signUpError) throw signUpError;

      await supabase.from('customers').insert([
        { name, email, phone, password_hash: password, company_slug: slug },
      ]);
      

      setSuccessMessage('Check your email to verify your account.');
      setName('');
      setEmail('');
      setPhone('');
      setPassword('');
    } catch (err: any) {
      setError('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600">
          {companyName ? `${companyName} Registration` : 'Loading...'}
        </h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {successMessage && (
          <p className="text-green-500 text-sm text-center">{successMessage}</p>
        )}
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border p-2 w-full"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="border p-2 w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border p-2 w-full"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white w-full py-2 rounded-md hover:bg-blue-700"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}
