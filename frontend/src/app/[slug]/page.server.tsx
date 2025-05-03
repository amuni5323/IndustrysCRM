// import { createServerClient } from '@/utils/supabase/server';
// import { cookies } from 'next/headers';

// export async function getServerSideProps(context) {
//   const { slug } = context.params;
//   const supabase = createServerClient(cookies());

//   // Fetch company details
//   const { data: company, error: companyError } = await supabase
//     .from('companies')
//     .select('*')
//     .eq('slug', slug)
//     .single();

//   if (companyError || !company) {
//     return { notFound: true }; // Company not found
//   }

//   // Fetch sample images
//   const { data: sampleImages, error: imagesError } = await supabase
//     .from('sample_images')
//     .select('url')
//     .eq('company_id', company.id);

//   if (imagesError) {
//     console.error('Error fetching sample images:', imagesError.message);
//   }

//   return {
//     props: {
//       company,
//       sampleImages,
//     },
//   };
// }
