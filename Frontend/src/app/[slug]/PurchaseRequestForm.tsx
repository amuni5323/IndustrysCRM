'use client';

import { supabase } from '@/utils/supabaseClient';
import { useState } from 'react';

interface PurchaseRequestFormProps {
  companySlug: string;
}

const PurchaseRequestForm = ({ companySlug }: PurchaseRequestFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name, email, phone, message } = formData;

    // ✅ Check if customer is registered
    const { data: customer, error } = await supabase
      .from('customers')
      .select('*')
      .eq('email', email)
      .eq('phone', phone)
      .single();

    if (error || !customer) {
      alert('You are not registered. Please register to purchase.');
      return;
    }

    // ✅ Submit the purchase request
    const response = await fetch('/api/purchase-request', {
      method: 'POST',
      body: JSON.stringify({ name, email, phone, message, companySlug }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      alert('Purchase request submitted successfully!');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } else {
      alert('Failed to submit purchase request.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-md shadow-lg opacity-90">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 p-2 rounded-md" required />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 p-2 rounded-md" required />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
        <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 p-2 rounded-md" required />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
        <textarea id="message" name="message" value={formData.message} onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 p-2 rounded-md" required />
      </div>
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md">Submit Request</button>
    </form>
  );
};

export default PurchaseRequestForm;
