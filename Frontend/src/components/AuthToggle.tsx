'use client';

import CustomerLoginForm from '@/app/customer/login/page';
import CustomerRegistrationForm from '@/app/customer/register/page';
import { useState } from 'react';

export default function AuthToggle() {
  const [formType, setFormType] = useState<'login' | 'register' | null>(null);

  return (
    <div className="flex flex-col items-start">
      {!formType && (
        <div className="flex gap-3">
          <button
            onClick={() => setFormType('register')}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Register
          </button>
          <button
            onClick={() => setFormType('login')}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Login
          </button>
        </div>
      )}

      {formType === 'login' && (
        <div className="mt-4">
          <CustomerLoginForm />
          <button
            onClick={() => setFormType(null)}
            className="mt-2 text-sm text-gray-500 underline"
          >
            Back
          </button>
        </div>
      )}

      {formType === 'register' && (
        <div className="mt-4">
          <CustomerRegistrationForm />
          <button
            onClick={() => setFormType(null)}
            className="mt-2 text-sm text-gray-500 underline"
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
}
