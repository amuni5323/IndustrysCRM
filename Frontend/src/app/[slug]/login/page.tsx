// 'use client';

// import { useRouter, useParams } from 'next/navigation';
// import { supabase } from '@/utils/supabaseClient';
// import { useState, useEffect } from 'react';

// const CustomerLoginPage = () => {
//   const params = useParams();
//   const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug || '';
//   const router = useRouter();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [companyName, setCompanyName] = useState('');

//   useEffect(() => {
//     const fetchCompany = async () => {
//       if (!slug) return;
//       const { data, error } = await supabase
//         .from('companies')
//         .select('name')
//         .eq('slug', slug)
//         .single();
//       if (data) {
//         setCompanyName(data.name);
//       }
//       if (error) {
//         setError('Invalid company URL.');
//       }
//     };
//     fetchCompany();
//   }, [slug]);

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');

//     if (!email || !password) {
//       setError('Please enter both email and password.');
//       return;
//     }

//     const { error } = await supabase.auth.signInWithPassword({ email, password });
//     if (error) {
//       setError('Login failed: ' + error.message);
//     } else {
//       router.push(`/${slug}`);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <form onSubmit={handleLogin} className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg space-y-4">
//         <h2 className="text-2xl font-bold text-center text-blue-600">
//           {companyName ? `${companyName} Login` : 'Loading...'}
//         </h2>
//         {error && <p className="text-red-500 text-sm text-center">{error}</p>}
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           className="border p-2 w-full"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           className="border p-2 w-full"
//         />
//         <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded-md hover:bg-blue-700">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CustomerLoginPage;

'use client'; 
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createSupabaseBrowserClient } from '@/utils/supabase/client';

export default function CompanyLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const handleLogin = async () => {
    setError('');
  
    // 1. Sign in
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
  
    if (signInError) {
      console.error('Sign-in error:', signInError);
      return setError(signInError.message);
    }
  
    // 2. Get logged-in user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
  
    console.log('Logged-in user:', user); // Debugging user fetch
  
    if (userError || !user?.email) {
      console.error('User fetch error:', userError);
      return setError('Unable to retrieve user info');
    }
  
    // 3. Find matching company
    const { data: company, error: companyError } = await supabase
      .from('companies')
      .select('slug')
      .ilike('email', user.email.trim()) // case-insensitive match
      .single();
  
    console.log('Company found:', company); // Debugging company fetch

    if (companyError || !company?.slug) {
      console.error('Company lookup error:', companyError);
      return setError('Company not found for this email');
    }
  
    // 4. Redirect to company dashboard
    console.log(`Redirecting to /${company.slug}/dashboard`); // Debugging redirection
    router.push(`/${company.slug}/dashboard`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Company Login</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-3 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </div>
  );
}


