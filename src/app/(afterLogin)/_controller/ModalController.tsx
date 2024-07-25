'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}
export default function Modalontroller({ children }: Props) {
  const pathname = usePathname();
  const split = pathname.split('/');
  if (split[2] === 'status' && split[4] === 'photo' && !!split[5]) {
    return <>{children}</>;
  }

  return null;
}
