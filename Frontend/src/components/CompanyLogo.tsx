// components/CompanyLogo.js
import Image from 'next/image';

export default function CompanyLogo() {
  return (
    <Image
      src="https://ccpawmbmfbxyihtxrekn.supabase.co/storage/v1/object/public/logos/amuni-1744796441187"
      alt="Amuni Company Logo"
      width={500}
      height={500}
    />
  );
}
