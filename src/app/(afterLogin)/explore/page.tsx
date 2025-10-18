import styles from './_style/explore.module.css';
import Trends from '../_component/trends/Trends';
import TrendsHydrationBoundary from '../_boundary/TrendsHydrationBoundary';
import { Metadata } from 'next';
import ExploreHeader from '@/app/(afterLogin)/explore/_components/ExploreHeader';

export const metadata: Metadata = {
  title: 'Explore / XClone',
};

export default async function ExplorePage() {
  return (
    <main className={styles.main}>
      <ExploreHeader />
      <TrendsHydrationBoundary>
        <Trends showTitle={false} />
      </TrendsHydrationBoundary>
    </main>
  );
}
