import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function POST(req) {
  const formData = await req.formData()
  const file = formData.get("file")
  const iconName = formData.get("name")

  const { data, error } = await supabase.storage
    .from("icons")
    .upload(`footer/${iconName}-${Date.now()}`, file)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const publicUrl = supabase.storage.from("icons").getPublicUrl(data.path)

  return NextResponse.json({ url: publicUrl.data.publicUrl })
}
