'use client';

import CustomerLoginForm from '@/app/customer/login/CustomerLoginForm';
import CustomerRegistrationForm from '@/app/customer/register/page';
import Image from 'next/image';
import { useState } from 'react';

export default function PlatformPageClient({ company }: { company: any }) {
  const {
    company_name,
    logo_url,
    description,
    about_us,
    contact_info,
    sample_image_urls,
    footer_links,
    footer_icons,
  } = company;

  const [view, setView] = useState<'login' | 'register' | null>(null);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 border-b bg-white">
        <div className="flex items-center gap-2">
          {logo_url && (
            <Image src={logo_url} alt="Logo" width={40} height={40} className="object-contain" />
          )}
          <h1 className="text-xl font-bold">{company_name}</h1>
        </div>
        <div className="flex gap-4">
          <button onClick={() => setView('login')} className="hover:underline">
            Login
          </button>
          <button onClick={() => setView('register')} className="hover:underline">
            Register
          </button>
        </div>
      </nav>

      {/* Main */}
      <main className="flex-1 p-6 space-y-6">
        {view === 'login' && <CustomerLoginForm />}
        {view === 'register' && <CustomerRegistrationForm />}

        {!view && (
          <>
            {/* Logo + Name Center */}
            <section className="text-center space-y-2">
              <h2 className="text-3xl font-semibold">{company_name}</h2>
              {logo_url && (
                <Image
                  src={logo_url}
                  alt="Company Logo"
                  width={100}
                  height={100}
                  className="mx-auto object-contain"
                />
              )}
            </section>

            {/* Sample Images */}
            {sample_image_urls?.length > 0 && (
              <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {sample_image_urls.map((url: string, idx: number) => (
                  <img
                    key={idx}
                    src={url}
                    alt={`Sample ${idx + 1}`}
                    className="rounded-lg shadow-md w-full h-48 object-cover"
                  />
                ))}
              </section>
            )}

            {/* Description */}
            {description && (
              <section>
                <h3 className="text-2xl font-semibold mb-2">Description</h3>
                <p className="bg-gray-50 p-4 rounded-lg border">{description}</p>
              </section>
            )}

            {/* About Us */}
            {about_us && (
              <section>
                <h3 className="text-2xl font-semibold mb-2">About Us</h3>
                <p className="bg-gray-50 p-4 rounded-lg border">{about_us}</p>
              </section>
            )}

            {/* Contact Info */}
            {contact_info && (
              <section>
                <h3 className="text-2xl font-semibold mb-2">Contact Info</h3>
                <p className="bg-gray-50 p-4 rounded-lg border">{contact_info}</p>
              </section>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 border-t mt-12 py-6 px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {logo_url && (
            <Image src={logo_url} alt="Footer Logo" width={40} height={40} className="object-contain" />
          )}
          <span className="font-semibold">{company_name}</span>
        </div>

        <div className="flex gap-4 flex-wrap justify-center">
          {footer_links?.map((link: string, idx: number) =>
            typeof link === 'string' ? (
              <a
                key={idx}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-sm"
              >
                {link.replace(/^https?:\/\//, '')}
              </a>
            ) : null
          )}
        </div>

        <div className="flex gap-3">
          {footer_icons?.map((iconUrl: string, idx: number) => (
            <img
              key={idx}
              src={iconUrl}
              alt={`Icon ${idx}`}
              className="h-6 w-6 object-contain"
            />
          ))}
        </div>
      </footer>
    </div>
  );
}
