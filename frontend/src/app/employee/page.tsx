// app/employee/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://your-project.supabase.co',
  'your-anon-key'
);

const schema = z.object({
  companyId: z.string().uuid(),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  password: z.string().min(6),
});

export default function EmployeePage() {
  const [companies, setCompanies] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const fetchCompanies = async () => {
      const { data, error } = await supabase.from('companies').select('id, name');
      if (data) setCompanies(data);
    };
    fetchCompanies();
  }, []);

  const onSubmit = async (formData) => {
    const { email, password, name, phone, companyId } = formData;

    // Sign up the user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      alert('Error signing up: ' + authError.message);
      return;
    }

    const userId = authData.user.id;

    // Insert employee record
    const { error: insertError } = await supabase.from('employees').insert([
      {
        user_id: userId,
        company_id: companyId,
        name,
        email,
        phone,
        role: 'employee',
        status: 'pending',
      },
    ]);

    if (insertError) {
      alert('Error saving employee data: ' + insertError.message);
    } else {
      alert('Registration successful! Awaiting approval.');
    }
  };

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Employee Registration</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <select {...register('companyId')} className="w-full p-2 border rounded">
          <option value="">Select Company</option>
          {companies.map((company) => (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          ))}
        </select>
        {errors.companyId && <p className="text-red-500">{errors.companyId.message}</p>}

        <Input placeholder="Full Name" {...register('name')} />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <Input type="email" placeholder="Email" {...register('email')} />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <Input placeholder="Phone Number" {...register('phone')} />
        {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}

        <Input type="password" placeholder="Password" {...register('password')} />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}

        <Button type="submit">Register</Button>
      </form>
    </div>
  );
}
