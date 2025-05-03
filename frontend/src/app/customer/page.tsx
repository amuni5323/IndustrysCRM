"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function CustomerPage() {
  const router = useRouter()
  const [companies, setCompanies] = useState<any[]>([])
  const [selectedCompany, setSelectedCompany] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  useEffect(() => {
    const fetchCompanies = async () => {
      const { data } = await supabase.from("companies").select("id, name")
      setCompanies(data || [])
    }
    fetchCompanies()
  }, [])

  const handleRegister = async () => {
    const res = await fetch("/api/customer/register", {
      method: "POST",
      body: JSON.stringify({ name, email, phone, selected_company: selectedCompany }),
    })

    if (res.ok) {
      const selected = companies.find(c => c.id === selectedCompany)
      const slug = selected.name.toLowerCase().replace(/\s+/g, "-")
      router.push(`/platform/${slug}`)
    } else {
      alert("Something went wrong.")
    }
  }

  return (
    <div className="p-10 max-w-xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold">Customer Registration</h2>

      <select
        className="w-full border rounded p-2"
        value={selectedCompany}
        onChange={(e) => setSelectedCompany(e.target.value)}
      >
        <option value="">Select a Company</option>
        {companies.map((company) => (
          <option key={company.id} value={company.id}>
            {company.name}
          </option>
        ))}
      </select>

      <input
        placeholder="Your Name"
        className="w-full border p-2 rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Email"
        className="w-full border p-2 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Phone Number"
        className="w-full border p-2 rounded"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <button
        className="bg-blue-600 text-white p-2 rounded w-full"
        onClick={handleRegister}
      >
        Register & View Company
      </button>
    </div>
  )
}
