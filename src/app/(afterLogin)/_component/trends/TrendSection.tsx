'use client';

import { Session } from 'next-auth';
import Trends from '@/app/(afterLogin)/_component/trends/Trends';
import { useSelectedLayoutSegment } from 'next/navigation';

interface Props {
  session: Session | null;
}

export default function TrendSection({ session }: Props) {
  const segment = useSelectedLayoutSegment();

  if (segment === 'explore' || !session) return null;

  return <Trends />;
}
