import ITrendsHydrationBoundary from '@/app/(afterLogin)/i/trends/_boundary/ITrendsHydrationBoundary';
import ITrends from '@/app/(afterLogin)/i/trends/_component/ITrends';
import ITrendsHeader from '@/app/(afterLogin)/i/trends/_component/ITrendsHeader';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trends / XClone',
};

export default function TrendsPage() {
  return (
    <ITrendsHydrationBoundary>
      <main>
        <ITrendsHeader />
        <ITrends />
      </main>
    </ITrendsHydrationBoundary>
  );
}
