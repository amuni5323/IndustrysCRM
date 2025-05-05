
//2222
// import { createServerClient } from '@/utils/supabase/server';
//  // ✅ your existing file
// import { redirect } from 'next/navigation';

// interface Props {
//   params: {
//     slug: string; // The slug of the company (e.g., 'cn', 'amuni', etc.)
//   };
// }

// const DashboardPage = async ({ params }: Props) => {
//   const { slug } = params;
//   const supabase = createServerClient();

//   // ✅ Directly fetch the customer data for the given company_slug
//   const { data: customers, error: customersError } = await supabase
//     .from('customers')
//     .select('*')
//     .eq('company_slug', slug); // Use the company_slug from the URL

//   if (customersError) {
//     console.error('Customer error:', customersError);
//     return (
//       <div className="p-8 text-red-600">
//         Error loading customer data: {customersError.message}
//       </div>
//     );
//   }

//   if (customers && customers.length > 0) {
//     return (
//       <div className="p-8">
//         <h1 className="text-3xl font-bold mb-6">Customers for {slug}:</h1>
//         <div className="space-y-4">
//           {customers.map((customer) => (
//             <div key={customer.id} className="p-4 border rounded bg-white shadow">
//               <p><strong>Name:</strong> {customer.name}</p>
//               <p><strong>Email:</strong> {customer.email}</p>
//               <p><strong>Phone:</strong> {customer.phone}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   // If no customer data is found for the given company
//   return (
//     <div className="p-8 text-red-600">
//       No customers found for company <strong>{slug}</strong>. You may need to register.
//     </div>
//   );
// };

// export default DashboardPage;

// src/app/[slug]/dashboard/page.tsx

// "use client"; // Mark the component as a client component

// import { useState } from 'react';
// import { createServerClient } from '../../../utils/supabase/server'; // Your Supabase client utility
// import { useRouter } from 'next/navigation';

// interface Props {
//   params: {
//     slug: string; // The slug of the company (e.g., 'cn', 'amuni', etc.)
//   };
// }

// const DashboardPage = async ({ params }: Props) => {
//   const { slug } = params;
//   const supabase = createServerClient();
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();

//   // Fetch the customer data for the given company_slug
//   const { data: customers, error: customersError } = await supabase
//     .from('customers')
//     .select('*')
//     .eq('company_slug', slug); // Use the company_slug from the URL

//   if (customersError) {
//     console.error('Customer error:', customersError);
//     setError('Error loading customer data.');
//     return (
//       <div className="p-8 text-red-600">
//         Error loading customer data: {customersError.message}
//       </div>
//     );
//   }

//   const handleDelete = async (customerId: string) => {
//     // Delete the customer from the database
//     const { error } = await supabase
//       .from('customers')
//       .delete()
//       .eq('id', customerId);

//     if (error) {
//       console.error('Error deleting customer:', error);
//       setError('Error deleting customer.');
//       return;
//     }

//     // After deletion, refresh the page or navigate to another page
//     router.refresh();
//   };

//   const handleSendEmail = async (customerEmail: string) => {
//     try {
//       const response = await fetch('/api/send-custom-email', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           customerEmail,
//           companySlug: slug,
//           message,
//         }),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         alert('Email sent successfully!');
//       } else {
//         setError('Failed to send email.');
//       }
//     } catch (err) {
//       console.error(err);
//       setError('An error occurred while sending the email.');
//     }
//   };

//   if (customers && customers.length > 0) {
//     return (
//       <div className="p-8">
//         <h1 className="text-3xl font-bold mb-6">Customers for {slug}:</h1>
//         <div className="space-y-4">
//           {customers.map((customer) => (
//             <div key={customer.id} className="p-4 border rounded bg-white shadow">
//               <p><strong>Name:</strong> {customer.name}</p>
//               <p><strong>Email:</strong> {customer.email}</p>
//               <p><strong>Phone:</strong> {customer.phone}</p>

//               {/* Delete Button */}
//               <button
//                 onClick={() => handleDelete(customer.id)}
//                 className="mt-2 bg-red-500 text-white py-2 px-4 rounded"
//               >
//                 Delete Customer
//               </button>

//               {/* Send Message Form */}
//               <textarea
//                 placeholder="Enter your message"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 className="mt-2 w-full p-2 border rounded"
//               />

//               <button
//                 onClick={() => handleSendEmail(customer.email)}
//                 className="mt-2 bg-blue-500 text-white py-2 px-4 rounded"
//               >
//                 Send Message
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-8 text-red-600">
//       No customers found for company <strong>{slug}</strong>. Please make sure the company has registered customers.
//     </div>
//   );
// };

// export default DashboardPage;

//3333

// import { createServerClient } from '@/utils/supabase/server';
// import { GetServerSideProps } from 'next';
// import { redirect } from 'next/navigation';

// interface Props {
//   params: {
//     slug: string; // The slug of the company (e.g., 'cn', 'amuni', etc.)
//   };
//   customers: Array<{ id: string; name: string; email: string; phone: string }>;
//   customersError?: string;
// }

// const DashboardPage = ({ params, customers, customersError }: Props) => {
//   const { slug } = params;

//   if (customersError) {
//     return (
//       <div className="p-8 text-red-600">
//         Error loading customer data: {customersError}
//       </div>
//     );
//   }

//   if (customers.length > 0) {
//     return (
//       <div className="p-8">
//         <h1 className="text-3xl font-bold mb-6">Customers for {slug}:</h1>
//         <div className="space-y-4">
//           {customers.map((customer) => (
//             <div key={customer.id} className="p-4 border rounded bg-white shadow">
//               <p><strong>Name:</strong> {customer.name}</p>
//               <p><strong>Email:</strong> {customer.email}</p>
//               <p><strong>Phone:</strong> {customer.phone}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   // If no customer data is found for the given company
//   return (
//     <div className="p-8 text-red-600">
//       No customers found for company <strong>{slug}</strong>. You may need to register.
//     </div>
//   );
// };

// // Fetching data on the server side with getServerSideProps
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const slug = context.params?.slug as string; // The slug is passed from the URL

//   const supabase = createServerClient();

//   // Fetch the customer data for the given company_slug
//   const { data: customers, error: customersError } = await supabase
//     .from('customers')
//     .select('*')
//     .eq('company_slug', slug);

//   if (customersError) {
//     console.error('Customer error:', customersError);
//     return {
//       props: {
//         params: { slug },
//         customers: [],
//         customersError: customersError.message,
//       },
//     };
//   }

//   // Pass the fetched customer data to the page as props
//   return {
//     props: {
//       params: { slug },
//       customers: customers || [],
//     },
//   };
// };

// export default DashboardPage;


// /444

// import { createServerClient } from '@/utils/supabase/server';

// interface Props {
//   params: {
//     slug: string; // The slug of the company (e.g., 'cn', 'amuni', etc.)
//   };
// }

// const DashboardPage = async ({ params }: Props) => {
//   const { slug } = params;
//   const supabase = createServerClient();

//   // Fetching data on the server side
//   const { data: customers, error: customersError } = await supabase
//     .from('customers')
//     .select('*')
//     .eq('company_slug', slug);

//   if (customersError) {
//     console.error('Customer error:', customersError);
//     return (
//       <div className="p-8 text-red-600">
//         Error loading customer data: {customersError.message}
//       </div>
//     );
//   }

//   if (customers.length > 0) {
//     return (
//       <div className="p-8">
//         <h1 className="text-3xl font-bold mb-6">Customers for {slug}:</h1>
//         <div className="space-y-4">
//           {customers.map((customer) => (
//             <div key={customer.id} className="p-4 border rounded bg-white shadow">
//               <p><strong>Name:</strong> {customer.name}</p>
//               <p><strong>Email:</strong> {customer.email}</p>
//               <p><strong>Phone:</strong> {customer.phone}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   // If no customer data is found for the given company
//   return (
//     <div className="p-8 text-red-600">
//       No customers found for company <strong>{slug}</strong>. You may need to register.
//     </div>
//   );
// };

// export default DashboardPage;


// src/app/[slug]/dashboard/page.tsx

import { notFound } from 'next/navigation'; // for handling 404

interface PageProps {
  params: { slug: string };
}

const DashboardPage: React.FC<PageProps> = async ({ params }) => {
  const { slug } = params;

  // Fetch data for the company or handle it as needed
  const res = await fetch(`https://api.example.com/companies/${slug}`);
  const companyData = await res.json();

  if (!companyData) {
    notFound(); // Optional: Use this to trigger a 404 if no company data is found
  }

  return (
    <div>
      <h1>{companyData.name}</h1>
      <p>{companyData.description}</p>
    </div>
  );
};

export default DashboardPage;
