// // src/app/company/dashboard/page.tsx
// 'use client';

// import { useEffect, useState } from 'react';
// import { supabase } from '@/utils/supabase/client';

// export default function CompanyDashboard() {
//   const [customers, setCustomers] = useState([]);

//   useEffect(() => {
//     const fetchCustomers = async () => {
//       const { data, error } = await supabase
//         .from('customers')
//         .select('name, email, phone');

//       if (!error) setCustomers(data);
//     };

//     fetchCustomers();
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-semibold mb-4">Customer List</h1>
//       <div className="bg-white rounded shadow p-4">
//         {customers.length === 0 ? (
//           <p>No customers yet.</p>
//         ) : (
//           <ul className="divide-y">
//             {customers.map((cust, index) => (
//               <li key={index} className="py-2">
//                 <p><strong>{cust.name}</strong></p>
//                 <p>{cust.email}</p>
//                 <p>{cust.phone}</p>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }


// /app/[slug]/dashboard/page.tsx
// import { createServerClient } from '@/utils/supabase/server';
// import { redirect } from 'next/navigation';
// import { cookies } from 'next/headers';

// interface Props {
//   params: { slug: string };
// }

// export default async function CompanyDashboard({ params }: Props) {
//   const supabase = createServerClient(cookies());
//   const { slug } = params;

//   // Get current logged-in user
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (!user) {
//     return redirect(`/${slug}/login`);
//   }

//   // Fetch company info by slug
//   const { data: company, error: companyError } = await supabase
//     .from('companies')
//     .select('*')
//     .eq('slug', slug)
//     .single();

//   if (!company || company.email !== user.email) {
//     return redirect(`/${slug}`); // Not authorized
//   }

//   // Fetch all customers that belong to this company
//   const { data: customers, error: customerError } = await supabase
//     .from('customers')
//     .select('id, name, email, phone')
//     .eq('company_slug', slug);

//   return (
//     <div className="p-8">
//       <h1 className="text-3xl font-bold mb-4">Customer Dashboard - {slug}</h1>

//       {customers?.length === 0 && <p>No customers registered yet.</p>}

//       <div className="grid gap-4">
//         {customers?.map((cust) => (
//           <div key={cust.id} className="p-4 border rounded shadow-sm bg-white">
//             <p><strong>Name:</strong> {cust.name}</p>
//             <p><strong>Email:</strong> {cust.email}</p>
//             <p><strong>Phone:</strong> {cust.phone}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


// import { createServerClient } from '@/utils/supabase/server';
// import { redirect } from 'next/navigation';
// import { cookies } from 'next/headers';

// interface Props {
//   params: { slug: string };
// }

// export default async function CompanyDashboard({ params }: Props) {
//   const supabase = createServerClient(cookies());
//   const { slug } = params;

//   // Get current logged-in user
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (!user) {
//     return redirect(`/${slug}/login`);
//   }

//   // Fetch company info by slug
//   const { data: company, error: companyError } = await supabase
//     .from('companies')
//     .select('*')
//     .eq('slug', slug)
//     .single();

//   if (!company || company.email !== user.email) {
//     return redirect(`/${slug}`); // Not authorized
//   }

//   // Fetch all customers that belong to this company
//   const { data: customers, error: customerError } = await supabase
//     .from('customers')
//     .select('id, name, email, phone')
//     .eq('company_slug', slug);

//   return (
//     <div className="p-8">
//       <h1 className="text-3xl font-bold mb-4">Customer Dashboard - {slug}</h1>

//       {customers?.length === 0 && <p>No customers registered yet.</p>}

//       <div className="grid gap-4">
//         {customers?.map((cust) => (
//           <div key={cust.id} className="p-4 border rounded shadow-sm bg-white">
//             <p><strong>Name:</strong> {cust.name}</p>
//             <p><strong>Email:</strong> {cust.email}</p>
//             <p><strong>Phone:</strong> {cust.phone}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



// import { cookies } from 'next/headers'; // important
// import { redirect } from 'next/navigation';
// import { createServerClient } from '@/utils/supabase/server';  // Ensure this is the correct import
// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';  // Use this only if needed

// const DashboardPage = async (context: { params: { slug: string } }) => {
//   const cookieStore = cookies(); // ✅ correctly get cookies
//   const supabase = createServerClient(cookieStore); // Initialize supabase with server-side cookies

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   const slug = context.params.slug; // ✅ avoid direct destructure from `params`

//   if (!user) {
//     // Redirect to login page if user is not logged in
//     redirect(`/company/login?redirectTo=${slug}`);
//   }

//   // Fetch the company based on the user's email
//   const { data: company, error: companyError } = await supabase
//     .from('companies')
//     .select('*')
//     .eq('email', user.email)
//     .single();

//   if (companyError) {
//     return <div className="text-red-600">Error loading company: {companyError.message}</div>;
//   }

//   if (!company || company.slug !== slug) {
//     return (
//       <div className="p-4 text-red-600">
//         You are not authorized to access the dashboard for <strong>{slug}</strong>.
//       </div>
//     );
//   }

//   // Fetch customers for this company
//   const { data: customers, error: customersError } = await supabase
//     .from('customers')
//     .select('id, name, email, phone')
//     .eq('company_slug', slug);

//   if (customersError) {
//     return <div className="text-red-600">Error loading customers: {customersError.message}</div>;
//   }

//   return (
//     <div className="p-8">
//       <h1 className="text-3xl font-bold mb-6">Company Dashboard for {slug}</h1>
//       {customers?.length === 0 ? (
//         <p>No customers found for this company.</p>
//       ) : (
//         <div className="space-y-4">
//           {customers.map((cust) => (
//             <div key={cust.id} className="p-4 border rounded bg-white shadow">
//               <p><strong>Name:</strong> {cust.name}</p>
//               <p><strong>Email:</strong> {cust.email}</p>
//               <p><strong>Phone:</strong> {cust.phone}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default DashboardPage;




// frontend/src/app/company/dashboard/page.tsx
import { createServerClient } from '@/utils/supabase/server'; // now correct
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Database } from '@/types/supabase';
import ClientButton from './ClientButton';
import MiniSiteNavbar from '@/components/MiniSiteNavbar';

export const dynamic = 'force-dynamic';

export default async function PlatformPage({ params }: { params: { slug: string } }) {
  const supabase = createServerClient(); // no cookies() passed manually anymore

  const { slug } = params;

  const { data: company, error, count } = await supabase
    .from('companies')
    .select('*', { count: 'exact' })
    .eq('slug', slug);

  if (error || count !== 1 || !company?.[0]) {
    console.error('Company fetch error or not found:', error?.message || 'Unknown error');
    notFound();
  }

  const {
    company_name,
    logo_url,
    description,
    about_us,
    contact_info,
    footer_links = [],
    footer_icons = [],
    sample_images = [],
    footer_text,
  } = company[0];

  const baseUrl = 'https://ccpawmbmfbxyihtxrekn.supabase.co/storage/v1/object/public';

  const formatStorageUrl = (filePath: string, bucket: string) =>
    filePath.startsWith('http') ? filePath : `${baseUrl}/${bucket}/${filePath}`;

  return (
    <div className="min-h-screen flex flex-col">
      <MiniSiteNavbar
        slug={slug}
        logoUrl={formatStorageUrl(logo_url, 'logos')}
        companyName={company_name}
      />

      <main className="flex-grow px-6 py-10 max-w-4xl mx-auto space-y-10">
        <h1 className="text-3xl font-bold text-center text-gray-800">{company_name}</h1>

        {sample_images.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sample_images.map((img: string, index: number) => (
              <div key={index} className="relative w-full">
                <Image
                  src={formatStorageUrl(img, 'sample-images')}
                  alt={`Sample Image ${index + 1}`}
                  width={600}
                  height={300}
                  className="rounded-lg object-cover w-full max-h-[300px]"
                />
                <ClientButton companySlug={slug} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic text-center">No sample images found.</p>
        )}

        <section className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">Description</h2>
          <p className="text-gray-600 whitespace-pre-line">{description}</p>
        </section>

        <section className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">About Us</h2>
          <p className="text-gray-600 whitespace-pre-line">{about_us}</p>
        </section>

        <section className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">Contact Info</h2>
          <p className="text-gray-600 whitespace-pre-line">{contact_info}</p>
        </section>
      </main>

      <footer className="bg-gray-100 py-6 mt-auto border-t">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center space-x-2">
            {logo_url && (
              <Image
                src={formatStorageUrl(logo_url, 'logos')}
                alt="Company Logo"
                width={40}
                height={40}
                className="rounded-full object-contain"
              />
            )}
            <span className="font-medium text-gray-800">{company_name}</span>
          </div>

          {footer_links.length > 0 && (
            <ul className="flex flex-wrap justify-center md:justify-start gap-4 text-blue-600 underline">
              {footer_links.map((link, index) => (
                <li key={index}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          )}

          {footer_icons.length > 0 && (
            <div className="flex items-center space-x-4">
              {footer_icons.map((iconObj, index) => (
                <Image
                  key={index}
                  src={formatStorageUrl(iconObj.url, 'footer-icons')}
                  alt={iconObj.name}
                  width={24}
                  height={24}
                  className="object-contain"
                />
              ))}
            </div>
          )}
        </div>

        <p className="text-center text-sm text-gray-500 mt-4">
          © {new Date().getFullYear()} {footer_text || company_name}
        </p>
      </footer>
    </div>
  );
}
