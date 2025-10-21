import styles from './_style/explore.module.css';
import Trends from '../_component/trends/Trends';
import TrendsHydrationBoundary from '../_boundary/TrendsHydrationBoundary';
import { Metadata } from 'next';
import ExploreHeader from '@/app/(afterLogin)/explore/_components/ExploreHeader';
import FooterController from '@/app/(afterLogin)/_component/_footer/FooterController';

export const metadata: Metadata = {
  title: 'Explore / XClone',
};

export default async function ExplorePage() {
  return (
    <main className={styles.main}>
      <ExploreHeader />
      <TrendsHydrationBoundary>
        <div className={styles.blank}>
          <Trends showTitle={false} />
        </div>
      </TrendsHydrationBoundary>
      <FooterController type="post" />
    </main>
  );
}
