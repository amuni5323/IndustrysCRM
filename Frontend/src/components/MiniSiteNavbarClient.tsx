// 'use client';

// import { useEffect, useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { createSupabaseBrowserClient } from '@/utils/supabase/client';
// import { useRouter } from 'next/navigation'; // Import useRouter for redirection

// interface Props {
//   slug: string;
//   logoUrl: string;
//   companyName: string;
// }

// export default function MiniSiteNavbarClient({ slug, logoUrl, companyName }: Props) {
//   const [user, setUser] = useState<any>(null);
//   const supabase = createSupabaseBrowserClient();
//   const router = useRouter(); // Initialize the router

//   useEffect(() => {
//     // Get current user
//     supabase.auth.getUser().then(({ data: { user } }) => setUser(user));

//     // Subscribe to auth changes
//     const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
//       setUser(session?.user ?? null); // Update user state on auth state change
//     });

//     return () => {
//       listener?.subscription.unsubscribe(); // Cleanup listener on unmount
//     };
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await supabase.auth.signOut(); // Sign out from Supabase
//       setUser(null); // Clear user state after logout
//       router.push(`/${slug}`); // Redirect to the company's page (using slug)
//     } catch (error) {
//       console.error('Error during sign-out:', error);
//     }
//   };

//   return (
//     <nav className="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center">
//       <div className="flex items-center space-x-2">
//         {logoUrl && (
//           <Image
//             src={logoUrl}
//             alt="Company Logo"
//             width={40}
//             height={40}
//             className="rounded-full object-contain border"
//           />
//         )}
//         <span className="font-semibold text-lg">{companyName}</span>
//       </div>

//       <div className="text-sm text-blue-600">
//         {!user ? (
//           <div className="flex gap-2">
//             <Link href={`/${slug}/login`} className="hover:underline">Login</Link>
//             <Link href={`/${slug}/register`} className="hover:underline">Register</Link>
//           </div>
//         ) : (
//           <button onClick={handleLogout} className="hover:underline">Logout</button> // Logout button
//         )}
//       </div>
//     </nav>
//   );
// }


'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createSupabaseBrowserClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

interface Props {
  slug: string;
  logoUrl: string;
  companyName: string;
}

export default function MiniSiteNavbarClient({ slug, logoUrl, companyName }: Props) {
  const [user, setUser] = useState<any>(null);
  const [isCustomer, setIsCustomer] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();

  useEffect(() => {
    const fetchUserAndCheckCustomer = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user?.email) {
        const { data: customers, error } = await supabase
          .from('customers')
          .select('email')
          .eq('email', user.email);

        if (error) console.error("Customer check error:", error.message);
        setIsCustomer(!!customers && customers.length > 0);
      }

      setLoading(false);
    };

    fetchUserAndCheckCustomer();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const newUser = session?.user ?? null;
      setUser(newUser);

      if (newUser?.email) {
        supabase
          .from('customers')
          .select('email')
          .eq('email', newUser.email)
          .then(({ data, error }) => {
            if (error) console.error("Auth change customer check:", error.message);
            setIsCustomer(!!data && data.length > 0);
          });
      } else {
        setIsCustomer(false);
      }
    });

    return () => listener?.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsCustomer(false);
    router.push(`/${slug}`);
  };

  if (loading) return null;

  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        {logoUrl && (
          <Image
            src={logoUrl}
            alt="Company Logo"
            width={40}
            height={40}
            className="rounded-full object-contain border"
          />
        )}
        <span className="font-semibold text-lg">{companyName}</span>
      </div>

      <div className="text-sm text-blue-600">
        {user && isCustomer ? (
          <button onClick={handleLogout} className="hover:underline">Logout</button>
        ) : (
          <div className="flex gap-2">
            <Link href={`/${slug}/login`} className="hover:underline">Login</Link>
            <Link href={`/${slug}/register`} className="hover:underline">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
