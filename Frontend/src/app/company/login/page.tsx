// // src/app/company/login/page.tsx
// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { createSupabaseBrowserClient } from '@/utils/supabase/client';

// export default function CompanyLoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const router = useRouter();
//   const supabase = createSupabaseBrowserClient();
//   const handleLogin = async () => {
//     const { error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     if (error) {
//       setError(error.message);
//     } else {
//       router.push('/company/dashboard');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
//         <h2 className="text-xl font-semibold mb-4">Company Login</h2>
//         {error && <p className="text-red-500 mb-2">{error}</p>}
//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full p-2 mb-3 border rounded"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full p-2 mb-3 border rounded"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button
//           onClick={handleLogin}
//           className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
//         >
//           Login
//         </button>
//       </div>
//     </div>
//   );
// }

// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { createSupabaseBrowserClient } from '@/utils/supabase/client';

// const supabase = createSupabaseBrowserClient();

// export default function CompanyLoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const router = useRouter();

//   const handleLogin = async () => {
//     setError('');

//     // Sign in the user
//     const { error: signInError } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     if (signInError) {
//       return setError(signInError.message);
//     }

//     // Fetch the logged-in user to get their email
//     const {
//       data: { user },
//     } = await supabase.auth.getUser();

//     if (!user?.email) {
//       return setError('Unable to retrieve user info');
//     }

//     // Find the company by email
//     const { data: company, error: companyError } = await supabase
//       .from('companies')
//       .select('slug')
//       .eq('email', user.email)
//       .single();

//     if (companyError || !company?.slug) {
//       return setError('Company not found or unauthorized');
//     }

//     // Redirect to the correct dashboard
//     router.push(`/${company.slug}/dashboard`);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
//         <h2 className="text-xl font-semibold mb-4">Company Login</h2>
//         {error && <p className="text-red-500 mb-2">{error}</p>}
//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full p-2 mb-3 border rounded"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full p-2 mb-3 border rounded"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button
//           onClick={handleLogin}
//           className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
//         >
//           Login
//         </button>
//       </div>
//     </div>
//   );
// }


// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { createSupabaseBrowserClient } from '@/utils/supabase/client';

// export default function CompanyLoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const router = useRouter();
//   const supabase = createSupabaseBrowserClient();

//   const handleLogin = async () => {
//     setError('');

//     const { error: signInError } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     if (signInError) {
//       return setError(signInError.message);
//     }

//     // ✅ Optional: You can store the company slug in localStorage or global state here if needed

//     // ✅ Redirect to a fixed dashboard route
//     router.push('/company/dashboard');
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
//         <h2 className="text-xl font-semibold mb-4">Company Login</h2>
//         {error && <p className="text-red-500 mb-2">{error}</p>}
//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full p-2 mb-3 border rounded"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full p-2 mb-3 border rounded"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button
//           onClick={handleLogin}
//           className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
//         >
//           Login
//         </button>
//       </div>
//     </div>
//   );
// }


// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { createSupabaseBrowserClient } from '@/utils/supabase/client';

// export default function CompanyLoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const router = useRouter();
//   const supabase = createSupabaseBrowserClient();

//   const handleLogin = async () => {
//     setError('');

//     // Sign in the user with email and password
//     const { error: signInError } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     if (signInError) {
//       return setError(signInError.message);
//     }

//     // Fetch the logged-in user to get their email
//     const {
//       data: { user },
//       error: userError,
//     } = await supabase.auth.getUser();

//     if (userError || !user?.email) {
//       return setError('Unable to retrieve user info');
//     }

//     // Find the company by email
//     const { data: company, error: companyError } = await supabase
//       .from('companies')
//       .select('slug')
//       .eq('email', user.email)
//       .single();

//     if (companyError || !company?.slug) {
//       return setError('Company not found or unauthorized');
//     }

//     // Redirect to the correct company dashboard based on the slug
//     router.push(`/${company.slug}/dashboard`);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
//         <h2 className="text-xl font-semibold mb-4">Company Login</h2>
//         {error && <p className="text-red-500 mb-2">{error}</p>}
//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full p-2 mb-3 border rounded"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full p-2 mb-3 border rounded"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button
//           onClick={handleLogin}
//           className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
//         >
//           Login
//         </button>
//       </div>
//     </div>
//   );
// }


// src/app/company/login/page.tsx
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
  
    if (companyError || !company?.slug) {
      console.error('Company lookup error:', companyError);
      return setError('Company not found for this email');
    }
  
    // 4. Redirect to company dashboard
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
