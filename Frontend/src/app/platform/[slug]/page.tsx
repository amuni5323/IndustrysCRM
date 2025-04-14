import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

export default async function PlatformPage({ params }: { params: { slug: string } }) {
  const supabase = createClient()

  // Ensure we log what's being fetched
  console.log('Fetching company with slug:', params.slug)

  // Fetch company by unique slug
  const { data: company, error } = await supabase
    .from('companies')
    .select('*')
    .eq('slug', params.slug)
    .single()
    console.log(company)

    

  // Error handling
  if (error) {
    console.error('Error fetching company:', error.message)
    notFound()
  }

  if (!company) {
    notFound()
  }

  return (
    <main className="min-h-screen px-6 py-12">
      <header className="text-center mb-10">
        {company.logo_url && (
          <div className="mx-auto w-32 h-32 relative mb-4">
            <Image src={company.logo_url} alt="Company Logo" fill className="object-contain" />
          </div>
        )}
        <h1 className="text-4xl font-bold">{company.company_name}</h1>
      </header>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">About Us</h2>
        <p className="text-gray-700">{company.about_us || 'No About Us info provided.'}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Contact Info</h2>
        <p className="text-gray-700">{company.contact_info || 'No contact info available.'}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Description</h2>
        <p className="text-gray-700">{company.description || 'No description available.'}</p>
      </section>

      {company.footer_icons && company.footer_icons.length > 0 && (
        <footer className="border-t pt-6 mt-12">
          <div className="flex items-center justify-center space-x-4">
            {company.footer_icons.map((iconUrl: string, index: number) => (
              <Image
                key={index}
                src={iconUrl}
                alt={`Icon ${index + 1}`}
                width={32}
                height={32}
                className="object-contain"
              />
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 mt-4">{company.footer_text || company.company_name}</p>
        </footer>
      )}
    </main>
  )
}
