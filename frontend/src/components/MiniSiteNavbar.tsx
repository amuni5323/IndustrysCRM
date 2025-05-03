// frontend/src/components/MiniSiteNavbar.tsx
import MiniSiteNavbarClient from './MiniSiteNavbarClient';

interface Props {
  slug: string;
  logoUrl: string;
  companyName: string;
}

export default function MiniSiteNavbar({ slug, logoUrl, companyName }: Props) {
  return (
    <MiniSiteNavbarClient slug={slug} logoUrl={logoUrl} companyName={companyName} />
  );
}
