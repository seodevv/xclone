import ITrendsHydrationBoundary from '@/app/(afterLogin)/i/trends/_boundary/ITrendsHydrationBoundary';
import ITrends from '@/app/(afterLogin)/i/trends/_component/ITrends';
import ITrendsHeader from '@/app/(afterLogin)/i/trends/_component/ITrendsHeader';

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
