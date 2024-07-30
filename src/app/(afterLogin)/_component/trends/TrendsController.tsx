'use client';

import { useSelectedLayoutSegment } from 'next/navigation';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function TrendsController({ children }: Props) {
  const segment = useSelectedLayoutSegment();

  if (segment === 'explore') return null;

  return <>{children}</>;
}
