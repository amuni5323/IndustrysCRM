// frontend/src/app/auth/signout/route.ts
import { createServerClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const supabase = createServerClient(cookies());

  await supabase.auth.signOut();

  const formData = await req.formData();
  const slug = formData.get('slug') as string;

  const redirectUrl = slug ? `/${slug}` : '/';
  return NextResponse.redirect(new URL(redirectUrl, process.env.NEXT_PUBLIC_SITE_URL));
}
