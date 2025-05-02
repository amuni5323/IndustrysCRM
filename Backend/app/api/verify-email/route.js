// import { NextResponse } from 'next/server';
// import { createClient } from '@supabase/supabase-js';

// // Initialize Supabase client
// const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// export async function GET(req) {
//   const url = new URL(req.url);
//   const token = url.searchParams.get('token');

//   // If no token is provided, return a 400 error
//   if (!token) {
//     return NextResponse.json({ success: false, error: 'No token provided' }, { status: 400 });
//   }

//   try {
//     // Step 1: Verify the token with Supabase
//     const { data, error } = await supabase.auth.api.getUser(token);

//     if (error) {
//       throw new Error('Invalid or expired token');
//     }

//     // Step 2: Use email (or any other identifier) as a slug for the company page
//     const slug = data?.user?.email?.split('@')[0]; // You can adjust this to use a different unique identifier if needed

//     // Redirect the user to the company page
//     return NextResponse.redirect(`/company/${slug}`);

//   } catch (err) {
//     console.error('❌ Error:', err);
//     return NextResponse.json({ success: false, error: 'Failed to verify email' }, { status: 500 });
//   }
// }
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get('token');

  if (!token) {
    return NextResponse.json({ success: false, error: 'No token provided' }, { status: 400 });
  }

  try {
    // Authenticate user from token
    const { data: userData, error } = await supabase.auth.getUser(token);

    if (error || !userData?.user?.email) {
      throw new Error('Invalid or expired token');
    }

    const email = userData.user.email;
    const slug = email.split('@')[0];

    // Use absolute URL for redirect
    const redirectUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'}/${slug}`;

    return NextResponse.redirect(redirectUrl);
  } catch (err) {
    console.error('❌ Error verifying email:', err);
    return NextResponse.json({ success: false, error: 'Failed to verify email' }, { status: 500 });
  }
}
