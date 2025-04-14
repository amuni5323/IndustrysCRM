"use client"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@supabase/supabase-js"

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function CompanyPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [logo, setLogo] = useState<File | null>(null)
  const [description, setDescription] = useState("")
  const [about, setAbout] = useState("")
  const [contact, setContact] = useState("")
  const [footerLinks, setFooterLinks] = useState([{ name: "", url: "" }])
  const [footerIcons, setFooterIcons] = useState([{ name: "", file: null }])

  const handleRegister = async (e: any) => {
    e.preventDefault()

    const slug = name.toLowerCase().replace(/\s+/g, "-") // ✅ generate slug from name

    if (!email || !password || !name) {
      alert("Please fill out all required fields.")
      return
    }

    const validImageTypes = ["image/jpeg", "image/png", "image/gif"]
    if (logo && !validImageTypes.includes(logo.type)) {
      alert("Invalid image format. Only JPG, PNG, and GIF are allowed.")
      return
    }

    try {
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      })

      if (signUpError || !signUpData?.user) {
        throw new Error(signUpError?.message || "User sign-up failed")
      }

      const { data: sessionData, error: sessionError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (sessionError) {
        throw new Error(sessionError.message)
      }

      const user = sessionData.user

      let logoUrl = ""
      if (logo) {
        const { data, error: uploadError } = await supabase.storage
          .from("logos")
          .upload(`${name}-${Date.now()}`, logo)

        if (uploadError) {
          throw new Error(uploadError.message)
        }

        logoUrl = supabase.storage.from("logos").getPublicUrl(data.path).data.publicUrl
      }

      const { error: insertError } = await supabase.from("companies").insert([
        {
          user_id: user.id,
          email,
          name,
          slug, // ✅ include slug
          description,
          about,
          contact,
          footer_links: footerLinks,
          footer_icons: footerIcons.map(({ name }) => ({ name })),
          logo_url: logoUrl,
        },
      ])

      if (insertError) {
        throw new Error(insertError.message)
      }

      router.push(`/${slug}`) // ✅ use the same slug for routing
    } catch (error: any) {
      console.error("Error:", error.message)
      alert(error.message || "An unexpected error occurred.")
    }
  }

  const handleFooterLinkChange = (index: number, key: string, value: string) => {
    const updated = [...footerLinks]
    updated[index][key] = value
    setFooterLinks(updated)
  }

  const handleFooterIconChange = (index: number, key: string, value: any) => {
    const updated = [...footerIcons]
    updated[index][key] = value
    setFooterIcons(updated)
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 p-10 max-w-5xl mx-auto">
        <form
          onSubmit={handleRegister}
          className="mb-12 bg-white p-6 rounded-xl shadow-md space-y-8"
        >
          <h2 className="text-2xl font-bold mb-4">Register Your Company</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <Input
              type="email"
              placeholder="Company login email (for internal use)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password for your internal dashboard"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="grid gap-4">
            <Input
              type="text"
              placeholder="Your company's official name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setLogo(e.target.files?.[0] || null)}
              placeholder="Upload your logo"
            />
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-semibold">Company Description</h3>
              <textarea
                placeholder="Brief overview of your services or industry..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="p-3 rounded-md border border-zinc-300 resize-none"
                rows={4}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-semibold">About Us</h3>
              <textarea
                placeholder="Your team background, goals, or story..."
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="p-3 rounded-md border border-zinc-300 resize-none"
                rows={4}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-semibold">Contact Information</h3>
              <textarea
                placeholder="Email, phone number, office location, etc..."
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="p-3 rounded-md border border-zinc-300 resize-none"
                rows={4}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Footer Links</h3>
            {footerLinks.map((link, i) => (
              <div key={i} className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Link title (e.g., Privacy Policy)"
                  value={link.name}
                  onChange={(e) => handleFooterLinkChange(i, "name", e.target.value)}
                />
                <Input
                  placeholder="Link URL (e.g., https://yourcompany.com/privacy)"
                  value={link.url}
                  onChange={(e) => handleFooterLinkChange(i, "url", e.target.value)}
                />
              </div>
            ))}
            <Button
              type="button"
              onClick={() => setFooterLinks([...footerLinks, { name: "", url: "" }])}
            >
              + Add Link
            </Button>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Footer Icons</h3>
            {footerIcons.map((icon, i) => (
              <div key={i} className="grid grid-cols-2 gap-4 items-center">
                <Input
                  placeholder="Icon label (e.g., Facebook, LinkedIn)"
                  value={icon.name}
                  onChange={(e) => handleFooterIconChange(i, "name", e.target.value)}
                />
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFooterIconChange(i, "file", e.target.files?.[0])}
                />
              </div>
            ))}
            <Button
              type="button"
              onClick={() => setFooterIcons([...footerIcons, { name: "", file: null }])}
            >
              + Add Icon
            </Button>
          </div>

          <div className="flex justify-end">
            <Button type="submit">Submit Company</Button>
          </div>
        </form>
      </div>
      <Footer />
    </main>
  )
}
