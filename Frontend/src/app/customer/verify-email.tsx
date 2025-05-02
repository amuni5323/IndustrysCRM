// // app/customer/verify-email.tsx

// 'use client';

// import { supabase } from '@/utils/supabaseClient';
// import { useRouter } from 'next/router';
// import { useEffect } from 'react';

// const VerifyEmail = () => {
//   const router = useRouter();

//   useEffect(() => {
//     const verifyUser = async () => {
//       // Get the token from the URL and use it for email verification
//       const { error } = await supabase.auth.api.verifyEmail(router.query.token as string);

//       if (error) {
//         console.error('Error verifying email:', error.message);
//         return;
//       }

//       // Redirect to the login page after email verification is successful
//       router.push('/customer/login');
//     };

//     if (router.query.token) {
//       verifyUser();
//     }
//   }, [router.query]);

//   return <div>Verifying your email...</div>;
// };

// export default VerifyEmail;
