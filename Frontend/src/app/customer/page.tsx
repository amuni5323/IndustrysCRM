'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function CustomerCompanySelector() {
  const router = useRouter();
  const [companies, setCompanies] = useState<{ slug: string }[]>([]);
  const [selectedSlug, setSelectedSlug] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchCompanies = async () => {
      const { data, error } = await supabase.from('companies').select('slug');
      if (error) {
        console.error('Error fetching companies:', error.message);
      } else {
        setCompanies(data ?? []);
      }
    };

    fetchCompanies();
  }, []);

  const handleNavigate = () => {
    if (!selectedSlug) return alert('Please select a company.');
    if (!email) return alert('Please enter your email.');

    // Save to localStorage so next page can read it
    localStorage.setItem('customerEmail', email.toLowerCase());

    router.push(`/${selectedSlug}`);
  };

  return (
    <div className="p-10 max-w-md mx-auto space-y-4">
      <h2 className="text-2xl font-semibold">Select a Company</h2>

      <input
        type="email"
        placeholder="Enter your email"
        className="w-full border p-2 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <select
        className="w-full border rounded p-2"
        value={selectedSlug}
        onChange={(e) => setSelectedSlug(e.target.value)}
      >
        <option value="">-- Select a Company (slug) --</option>
        {companies.map((company) => (
          <option key={company.slug} value={company.slug}>
            {company.slug}
          </option>
        ))}
      </select>

      <button
        className="bg-blue-600 text-white p-2 rounded w-full"
        onClick={handleNavigate}
      >
        Go to Company Page
      </button>
    </div>
  );
}
