// 'use client';

// import { supabase } from '@/utils/supabaseClient';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { useState } from 'react';

// export default function CustomerLoginPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');

//     const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });

//     if (loginError) {
//       setError(loginError.message);
//     } else {
//       alert('Login successful!');

//       const companySlug = searchParams.get('company');
//       router.push(companySlug ? `/${companySlug}` : '/');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <form
//         onSubmit={handleLogin}
//         className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg space-y-4"
//       >
//         <h2 className="text-2xl font-bold text-center text-blue-600">Customer Login</h2>
//         {error && <p className="text-red-500 text-sm text-center">{error}</p>}
//         <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 w-full" />
//         <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 w-full" />
//         <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded-md hover:bg-blue-700">Login</button>
//       </form>
//     </div>
//   );
// }
