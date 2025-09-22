import styles from './_style/explore.module.css';
import SearchForm from '@/app/(afterLogin)/_component/search/SearchForm';
import Trends from '../_component/trends/Trends';
import TrendsHydrationBoundary from '../_boundary/TrendsHydrationBoundary';
import { Metadata } from 'next';
import ExploreSettings from '@/app/(afterLogin)/explore/_components/ExploreSettings';

export const metadata: Metadata = {
  title: 'Explore / XClone',
};

export default async function ExplorePage() {
  return (
    <main className={styles.main}>
      <div className={styles.formZone}>
        <SearchForm />
        <div className={styles.settings}>
          <ExploreSettings />
        </div>
      </div>
      <TrendsHydrationBoundary>
        <Trends showTitle={false} />
      </TrendsHydrationBoundary>
    </main>
  );
}
