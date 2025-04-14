import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import nodemailer from "nodemailer"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const {
      email,
      company_name,
      logo_url,
      description,
      about_us,
      contact_info,
      footer_links,
      footer_icons,
    } = body

    // Save to Supabase DB
    const { error: dbError } = await supabase.from("companies").insert([
      {
        email,
        company_name,
        logo_url,
        description,
        about_us,
        contact_info,
        footer_links,
        footer_icons,
      },
    ])

    if (dbError) {
      console.error("Supabase error:", dbError)
      return NextResponse.json({ error: dbError.message }, { status: 500 })
    }

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO_NOTIFY,
      subject: `New Company Registered: ${company_name}`,
      text: `
📧 Email: ${email}
🏢 Company: ${company_name}
📝 Description: ${description}
ℹ️ About Us: ${about_us}
📞 Contact Info: ${contact_info}
      `,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error("Unexpected error:", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
