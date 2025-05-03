// 'use client';

// import { supabase } from '@/utils/supabaseClient';
// import { useState } from 'react';

// export default function CustomerRegistrationPage() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     setSuccessMessage('');

//     try {
//       // Check for existing customer
//       const { data: existingCustomer } = await supabase
//         .from('customers')
//         .select('email')
//         .eq('email', email)
//         .maybeSingle();

//       // Check for existing company
//       const { data: existingCompany } = await supabase
//         .from('companies')
//         .select('email')
//         .eq('email', email)
//         .maybeSingle();

//       if (existingCustomer) {
//         setError('Email already registered as a customer.');
//         return;
//       }

//       if (existingCompany) {
//         setError('Email already registered as a company.');
//         return;
//       }

//       // Sign up with Supabase Auth and send verification email
//       const { error: signUpError } = await supabase.auth.signUp({
//         email,
//         password,
//         options: {
//           emailRedirectTo: `${window.location.origin}/customer/verify-email`,
//         },
//       });

//       if (signUpError) throw signUpError;

//       // DO NOT insert into customers table now — wait until verification
//       setSuccessMessage('Check your email to verify your account.');

//       setName('');
//       setEmail('');
//       setPhone('');
//       setPassword('');
//     } catch (err: any) {
//       setError('Error: ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg space-y-4"
//       >
//         <h2 className="text-2xl font-bold text-center text-blue-600">Customer Registration</h2>
//         {error && <p className="text-red-500 text-sm text-center">{error}</p>}
//         {successMessage && (
//           <p className="text-green-500 text-sm text-center">{successMessage}</p>
//         )}
//         <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required className="border p-2 w-full" />
//         <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="border p-2 w-full" />
//         <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required className="border p-2 w-full" />
//         <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="border p-2 w-full" />
//         <button type="submit" disabled={loading} className="bg-blue-600 text-white w-full py-2 rounded-md hover:bg-blue-700">
//           {loading ? 'Registering...' : 'Register'}
//         </button>
//       </form>
//     </div>
//   );
// }
