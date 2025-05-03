'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function CompanyRegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [logo, setLogo] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [about, setAbout] = useState('');
  const [contact, setContact] = useState('');
  const [footerLinks, setFooterLinks] = useState([{ name: '', url: '' }]);
  const [footerIcons, setFooterIcons] = useState([{ name: '', file: null }]);
  const [sampleImages, setSampleImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const validImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const slug = name.toLowerCase().replace(/\s+/g, '-');

    if (!email || !password || !name) {
      alert('Please fill out all required fields.');
      setLoading(false);
      return;
    }

    try {
      console.log("Starting Sign Up...");
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/email-callback?slug=${slug}`,
        },
      });

      if (signUpError) {
        console.error('Sign Up Error:', signUpError);
        setMessage(signUpError.message);
        setLoading(false);
        return;
      }

      setMessage('Check your email for confirmation');
      console.log("Sign Up Success:", signUpData);

      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session?.user?.id;

      if (!userId) {
        console.error('No user ID found');
        setLoading(false);
        return;
      }

      console.log("User ID:", userId);

      let logoUrl = '';
      if (logo && validImageTypes.includes(logo.type)) {
        const logoName = `${slug}-logo-${Date.now()}`;
        const { data, error } = await supabase.storage.from('logos').upload(logoName, logo);
        if (error) throw new Error(`Logo upload failed: ${error.message}`);
        logoUrl = supabase.storage.from('logos').getPublicUrl(data.path).data.publicUrl;
        console.log("Logo uploaded successfully:", logoUrl);
      }

      const sampleImageUrls: string[] = [];
      for (const file of sampleImages) {
        if (!validImageTypes.includes(file.type)) continue;
        const fileName = `${slug}-sample-${Date.now()}-${file.name}`;
        const { data, error } = await supabase.storage.from('sample-images').upload(fileName, file);
        if (error) throw new Error(`Sample image upload failed: ${error.message}`);
        sampleImageUrls.push(supabase.storage.from('sample-images').getPublicUrl(data.path).data.publicUrl);
        console.log("Sample image uploaded:", sampleImageUrls[sampleImageUrls.length - 1]);
      }

      const footerIconUrls: { name: string; url: string }[] = [];
      for (const icon of footerIcons) {
        if (icon.file && validImageTypes.includes(icon.file.type)) {
          const fileName = `${slug}-icon-${Date.now()}-${icon.file.name}`;
          const { data, error } = await supabase.storage.from('footer-icons').upload(fileName, icon.file);
          if (error) throw new Error(`Footer icon upload failed: ${error.message}`);
          footerIconUrls.push({ name: icon.name, url: supabase.storage.from('footer-icons').getPublicUrl(data.path).data.publicUrl });
          console.log("Footer icon uploaded:", footerIconUrls[footerIconUrls.length - 1]);
        }
      }

      console.log("Inserting company data into Supabase...");
      const { data, error: insertError } = await supabase.from('companies').insert([{
        user_id: userId,
        email,
        company_name: name,
        slug,
        description,
        about_us: about,
        contact_info: contact,
        footer_links: footerLinks, // Assuming your Supabase column is now of type jsonb[]
        footer_icons: footerIconUrls, // Assuming your Supabase column is now of type jsonb[]
        logo_url: logoUrl,
        sample_images: sampleImageUrls, // Assuming your Supabase column is now of type text[]
      }]);

      if (insertError) {
        console.error('Insert Error:', insertError);
        alert('Error saving company data: ' + insertError.message);
        setLoading(false);
        return;
      }

      console.log('Inserted Data:', data);

      await fetch('/api/send-registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          company_name: name,
          logo_url: logoUrl,
          description,
          about_us: about,
          contact_info: contact,
          footer_links: footerLinks,
          footer_icons: footerIconUrls.map((icon) => icon.name), // Sending only names to the API route
        }),
      });

      alert('Registration successful! Please check your email to confirm your account.');
    } catch (err: any) {
      console.error("Registration Error:", err);
      alert(err.message || 'Something went wrong during registration.');
    } finally {
      setLoading(false);
    }
  };

  const handleFooterLinkChange = (index: number, key: string, value: string) => {
    const updated = [...footerLinks];
    updated[index][key] = value;
    setFooterLinks(updated);
  };

  const handleFooterIconChange = (index: number, key: string, value: any) => {
    const updated = [...footerIcons];
    updated[index][key] = value;
    setFooterIcons(updated);
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 p-10 max-w-5xl mx-auto">
        <form onSubmit={handleRegister} className="bg-white p-6 rounded-xl shadow-md space-y-8">
          <h2 className="text-2xl font-bold">Register Your Company</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <Input type="email" placeholder="Company email (for login)" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <Input type="text" placeholder="Company Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input type="file" accept="image/*" onChange={(e) => setLogo(e.target.files?.[0] || null)} />

          <div>
            <h3 className="font-semibold mb-2">Sample Images</h3>
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setSampleImages(prev => [...prev, ...Array.from(e.target.files || [])])}
            />
            <ul className="mt-2 text-sm space-y-1">
              {sampleImages.map((file, i) => (
                <li key={i}>{file.name} ({Math.round(file.size / 1024)} KB)</li>
              ))}
            </ul>
          </div>

          <textarea placeholder="Company Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border p-2 rounded-md" />
          <textarea placeholder="About Us" value={about} onChange={(e) => setAbout(e.target.value)} className="w-full border p-2 rounded-md" />
          <textarea placeholder="Contact Info" value={contact} onChange={(e) => setContact(e.target.value)} className="w-full border p-2 rounded-md" />

          <div>
            <h3 className="font-semibold mb-2">Footer Links</h3>
            {footerLinks.map((link, i) => (
              <div key={i} className="grid gap-2 md:grid-cols-2 mb-2">
                <Input placeholder="Link Name" value={link.name} onChange={(e) => handleFooterLinkChange(i, 'name', e.target.value)} />
                <Input placeholder="URL" value={link.url} onChange={(e) => handleFooterLinkChange(i, 'url', e.target.value)} />
              </div>
            ))}
            <Button type="button" onClick={() => setFooterLinks([...footerLinks, { name: '', url: '' }])}>Add Link</Button>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Footer Icons</h3>
            {footerIcons.map((icon, i) => (
              <div key={i} className="grid gap-2 md:grid-cols-2 mb-2">
                <Input placeholder="Icon Name" value={icon.name} onChange={(e) => handleFooterIconChange(i, 'name', e.target.value)} />
                <Input type="file" accept="image/*" onChange={(e) => handleFooterIconChange(i, 'file', e.target.files?.[0] || null)} />
              </div>
            ))}
            <Button type="button" onClick={() => setFooterIcons([...footerIcons, { name: '', file: null }])}>Add Icon</Button>
          </div>

          <Button type="submit" disabled={loading}>{loading ? 'Loading...' : 'Register Company'}</Button>

          {message && <div className="text-red-500">{message}</div>}
        </form>
      </div>
      <Footer />
    </main>
  );
}
