import { Session } from 'next-auth';
import Trends from '@/app/(afterLogin)/_component/trends/Trends';
import TrendsHydrationBoundary from './TrendsHydrationBoundary';
import TrendsController from './TrendsController';

interface Props {
  session: Session | null;
}

export default function TrendSection({ session }: Props) {
  if (!session) return null;

  return (
    <TrendsHydrationBoundary>
      <TrendsController>
        <Trends />
      </TrendsController>
    </TrendsHydrationBoundary>
  );
}
