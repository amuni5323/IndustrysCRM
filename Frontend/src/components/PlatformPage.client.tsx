import { createServerClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

function getPublicImageUrl(path: string): string {
  return `https://ccpawmbmfbxyihtxrekn.supabase.co/storage/v1/object/public/${path}`;
}

export default async function PlatformPage({ params }: { params: { slug: string } }) {
  const supabase = createServerClient(cookies());
 
  // Await params to resolve the slug properly
  const slug = await params.slug;

  const { data: company, error } = await supabase
    .from('companies')
    .select('*')
    .eq('slug', slug) // Use the awaited slug
    .single();

  if (error || !company) {
    console.error('Error fetching company:', error?.message || 'Company not found');
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center">
        {/* Left: Logo and Company Name */}
        <div className="flex items-center space-x-2">
          {company.logo_url && company.logo_url !== "" ? (
            <Image
              src={getPublicImageUrl(company.logo_url)} // Fetch the logo from storage
              alt="Company Logo"
              width={40}
              height={40}
              className="rounded-full object-contain border"
            />
          ) : (
            <span>Logo unavailable</span> // Fallback if the logo URL is missing or empty
          )}
          <span className="font-semibold text-lg">{company.company_name}</span>
        </div>

        {/* Right: Register/Login/Logout Toggle */}
        <div className="flex flex-col items-end space-y-1 text-sm text-blue-600">
          {/* Handle authentication links */}
          {!company.user ? (
            <>
              <a href="/register" className="hover:underline">Register</a>
              <a href="/login" className="hover:underline">Login</a>
            </>
          ) : (
            <a href="/logout" className="hover:underline">Logout</a>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow px-6 py-10 max-w-4xl mx-auto space-y-10">
        {/* Header Image and Name */}
        {company.sample_images?.[0]?.url ? (
          <div className="w-full">
            <Image
              src={getPublicImageUrl(company.sample_images[0].url)} // Fetch the image from storage
              alt="Company Sample"
              width={800}
              height={400}
              className="rounded-lg object-cover w-full max-h-[400px]"
            />
          </div>
        ) : (
          <p>No sample image available</p> // Fallback if the image URL is missing
        )}

        <h1 className="text-3xl font-bold text-center text-gray-800">
          {company.company_name}
        </h1>

        {/* Description */}
        <section className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">Description</h2>
          <p className="text-gray-600 whitespace-pre-line">{company.description}</p>
        </section>

        {/* About Us */}
        <section className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">About Us</h2>
          <p className="text-gray-600 whitespace-pre-line">{company.about_us}</p>
        </section>

        {/* Contact Info */}
        <section className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">Contact Info</h2>
          <p className="text-gray-600 whitespace-pre-line">{company.contact_info}</p>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-6 mt-auto border-t">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          {/* Left: Logo */}
          <div className="flex items-center space-x-2">
            {company.logo_url && company.logo_url !== "" ? (
              <Image
                src={getPublicImageUrl(company.logo_url)} // Fetch the logo from storage
                alt="Company Logo"
                width={40}
                height={40}
                className="rounded-full object-contain"
              />
            ) : (
              <span>Logo unavailable</span> // Fallback if the logo URL is missing or empty
            )}
            <span className="font-medium text-gray-800">{company.company_name}</span>
          </div>

          {/* Center: Footer Links */}
          {company.footer_links?.length > 0 && (
            <ul className="flex flex-wrap justify-center md:justify-start gap-4 text-blue-600 underline">
              {company.footer_links.map((link: { url: string; name: string }, index: number) => (
                <li key={index}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          )}

          {/* Right: Footer Icons */}
          {company.footer_icons?.length > 0 && (
            <div className="flex items-center space-x-4">
              {company.footer_icons.map((iconObj: { name: string; url: string }, index: number) => (
                iconObj.url && iconObj.url !== "" ? (
                  <Image
                    key={index}
                    src={getPublicImageUrl(iconObj.url)} // Fetch the icon from storage
                    alt={iconObj.name}
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                ) : (
                  <span key={index}>Icon unavailable</span> // Fallback if icon URL is missing or empty
                )
              ))}
            </div>
          )}
        </div>

        <p className="text-center text-sm text-gray-500 mt-4">
          © {new Date().getFullYear()} {company.footer_text || company.company_name}
        </p>
      </footer>
    </div>
  );
}
