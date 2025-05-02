import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';
import slugify from 'slugify'; // Used to generate slugs from company names

// Initialize Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export async function POST(req) {

  const body = await req.json();

  const {
    email,
    password, // Now, the password is passed directly from the registration form
    company_name,
    logo_url,
    description,
    about_us,
    contact_info,
    footer_links,
    footer_icons,
  } = body;

  try {
    // Step 1: Register user in Supabase
    const { user, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      throw new Error(`Failed to register user in Supabase: ${signUpError.message}`);
    }

    // Step 2: Generate slug from company name
    const companySlug = slugify(company_name, { lower: true });

    // Step 3: Send confirmation email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Make sure these are correct
      },
    });

    const mailOptions = {
      from: `Industry CRM <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `📩 Confirm Your Registration: ${company_name}`,
      html: `
        <h2>Welcome to Industry CRM!</h2>
        <p>Please confirm your email by clicking the link below:</p>
        <a href="${process.env.BASE_URL || 'http://localhost:3000'}/${companySlug}">Confirm your email</a>
        <h3>Company Details:</h3>
        <p><strong>Company Name:</strong> ${company_name}</p>
        ${logo_url ? `<p><img src="${logo_url}" alt="Logo" height="80" /></p>` : ''}
        <p><strong>Description:</strong><br>${description}</p>
        <p><strong>About Us:</strong><br>${about_us}</p>
        <p><strong>Contact Info:</strong><br>${contact_info}</p>
        <p><strong>Footer Links:</strong></p>
        <ul>
          ${footer_links?.map((link) => `<li>${link.name}: <a href="${link.url}">${link.url}</a></li>`).join('') || ''}
        </ul>
        <p><strong>Footer Icons:</strong> ${footer_icons?.join(', ')}</p>
      `,
    };

    // Send the confirmation email
    await transporter.sendMail(mailOptions);

    // Step 4: Return successful response
    return NextResponse.json({ success: true, message: 'Registration successful, confirmation email sent.' });

  } catch (err) {
    console.error('❌ Error:', err);
    return NextResponse.json({ success: false, error: 'Registration failed: ' + err.message }, { status: 500 });
  }
}
