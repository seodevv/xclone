'use client';

import { usePathname } from 'next/navigation';

interface Props {
  children: React.ReactNode;
}

export default function SettingsProfileController({ children }: Props) {
  const pathname = usePathname();

  if (pathname !== '/settings/profile') return null;

  return <>{children}</>;
}
