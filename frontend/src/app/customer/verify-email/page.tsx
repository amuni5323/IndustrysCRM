// 'use client';

// import { useEffect, useState } from 'react';
// import { supabase } from '@/utils/supabaseClient';
// import { useRouter } from 'next/navigation';

// export default function CustomerVerifyEmailPage() {
//   const [status, setStatus] = useState<'loading' | 'verified' | 'error'>('loading');
//   const [message, setMessage] = useState('');
//   const router = useRouter();

//   useEffect(() => {
//     const verifyUser = async () => {
//       const {
//         data: { session },
//         error,
//       } = await supabase.auth.getSession();

//       if (error || !session) {
//         setStatus('error');
//         setMessage('No active session found. Please try verifying again.');
//         return;
//       }

//       const user = session.user;

//       if (!user?.email) {
//         setStatus('error');
//         setMessage('Unable to retrieve user email.');
//         return;
//       }

//       // Check if customer already exists
//       const { data: existing, error: fetchError } = await supabase
//         .from('customers')
//         .select('email')
//         .eq('email', user.email)
//         .maybeSingle();

//       if (fetchError) {
//         setStatus('error');
//         setMessage('Error checking customer status.');
//         return;
//       }

//       if (existing) {
//         setStatus('verified');
//         setMessage('Email already verified. Redirecting to login...');
//         setTimeout(() => router.push('/customer/login'), 3000);
//         return;
//       }

//       // Insert customer with placeholder values
//       const { error: insertError } = await supabase
//         .from('customers')
//         .insert([
//           {
//             email: user.email,
//             name: '',
//             phone: '',
//             password_hash: '',
//           },
//         ]);

//       if (insertError) {
//         setStatus('error');
//         setMessage('Verification succeeded, but saving info failed.');
//       } else {
//         setStatus('verified');
//         setMessage('Email verified successfully! Redirecting to login...');
//         setTimeout(() => router.push('/customer/login'), 3000);
//       }
//     };

//     verifyUser();
//   }, [router]);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md text-center">
//         {status === 'loading' && <p className="text-blue-500">Verifying your email...</p>}
//         {status === 'verified' && <p className="text-green-600 font-semibold">{message}</p>}
//         {status === 'error' && <p className="text-red-600 font-semibold">{message}</p>}
//       </div>
//     </div>
//   );
// }
