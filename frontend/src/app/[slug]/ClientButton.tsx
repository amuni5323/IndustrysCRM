'use client';

import { useState } from 'react';
import PurchaseRequestForm from './PurchaseRequestForm';


export default function ClientButton({ companySlug }: { companySlug: string }) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="absolute top-4 right-4">
      <button
        onClick={() => setShowForm(prev => !prev)}
        className="bg-blue-600 text-white px-4 py-2 rounded shadow"
      >
        {showForm ? 'Hide Form' : 'Purchase'}
      </button>

      {showForm && (
        <div className="mt-4 z-10 absolute top-12 right-0 w-[300px]">
          <PurchaseRequestForm companySlug={companySlug} />
        </div>
      )}
    </div>
  );
}
