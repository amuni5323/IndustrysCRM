import { NextResponse } from 'next/server';
import { sendPurchaseRequestEmail } from '../../../utils/sendEmail';  // Update this path
import { supabase } from '../../../utils/supabase';  // Update this path

export async function POST(request: Request) {
  const { name, email, phone, companySlug, message } = await request.json();

  if (!name || !email || !phone || !companySlug || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('purchase_requests')
    .insert([{ customer_name: name, customer_email: email, customer_phone: phone, company_id: companySlug, message }]);

  if (error) {
    return NextResponse.json({ error: 'Failed to save request' }, { status: 500 });
  }

  const { data: companyData, error: companyError } = await supabase
    .from('companies')
    .select('email')
    .eq('slug', companySlug)
    .single();

  if (companyError || !companyData) {
    return NextResponse.json({ error: 'Company email not found' }, { status: 404 });
  }

  const emailSent = await sendPurchaseRequestEmail(companyData.email, {
    name, email, phone, message
  });

  if (!emailSent) {
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
