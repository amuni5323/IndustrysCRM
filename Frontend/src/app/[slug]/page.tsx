import { createServerClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import Image from 'next/image';
import { Database } from '@/types/supabase';
// import ClientButton from './ClientButton';
import ClientButton from '@/app/[slug]/ClientButton';

import MiniSiteNavbar from '@/components/MiniSiteNavbar';

export const dynamic = 'force-dynamic';

export default async function PlatformPage({ params }: { params: { slug: string } }) {
  const supabase = createServerClient<Database>(cookies());

  // Wait for params.slug to ensure it's available
  const { slug } = params;

  // Fetch company data based on the slug
  const { data: company, error, count } = await supabase
    .from('companies')
    .select('*', { count: 'exact' }) // Get the count of rows returned
    .eq('slug', slug);

  if (error) {
    // Log detailed error information for debugging
    console.error('Error fetching company:', error.message);
    notFound();
    return;
  }

  if (count !== 1) {
    // If count is not 1, log the issue and handle gracefully
    console.error(
      `Expected 1 company for slug '${slug}', but found ${count} rows.`
    );
    notFound();
    return;
  }

  // If no company is found, log and handle it
  if (!company || company.length === 0) {
    console.error(`No company found for slug '${slug}'`);
    notFound();
    return;
  }

  // Destructure the company data
  const {
    company_name,
    logo_url,
    description,
    about_us,
    contact_info,
    footer_links = [],  // Default to empty array if undefined
    footer_icons = [],  // Default to empty array if undefined
    sample_images = [], // Default to empty array if undefined
    footer_text,
  } = company[0]; // Ensure we access the first item

  const baseUrl = 'https://ccpawmbmfbxyihtxrekn.supabase.co/storage/v1/object/public';

  // Function to format URLs for Supabase storage
  const formatStorageUrl = (filePath: string, bucket: string) =>
    filePath.startsWith('http') ? filePath : `${baseUrl}/${bucket}/${filePath}`;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar using reusable component */}
      <MiniSiteNavbar
        slug={slug}
        logoUrl={formatStorageUrl(logo_url, 'logos')}
        companyName={company_name}
      />

      {/* Main Content */}
      <main className="flex-grow px-6 py-10 max-w-4xl mx-auto space-y-10">
        <h1 className="text-3xl font-bold text-center text-gray-800">{company_name}</h1>

        {/* Sample images */}
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

        {/* Description Section */}
        <section className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">Description</h2>
          <p className="text-gray-600 whitespace-pre-line">{description}</p>
        </section>

        {/* About Us Section */}
        <section className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">About Us</h2>
          <p className="text-gray-600 whitespace-pre-line">{about_us}</p>
        </section>

        {/* Contact Info Section */}
        <section className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">Contact Info</h2>
          <p className="text-gray-600 whitespace-pre-line">{contact_info}</p>
        </section>
      </main>

      {/* Footer */}
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

          {/* Footer Links */}
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

          {/* Footer Icons */}
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
