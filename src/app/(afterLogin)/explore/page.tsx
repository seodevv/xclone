import styles from './_style/explore.module.css';
import SearchForm from '@/app/(afterLogin)/_component/search/SearchForm';
import Trends from '../_component/trends/Trends';
import TrendsHydrationBoundary from '../_boundary/TrendsHydrationBoundary';
import SettingButton from '../_component/buttons/SettingButton';

export default async function ExplorePage() {
  return (
    <main className={styles.main}>
      <div className={styles.formZone}>
        <SearchForm />
        <div className={styles.settings}>
          <SettingButton />
        </div>
      </div>
      <TrendsHydrationBoundary>
        <Trends showTitle={false} />
      </TrendsHydrationBoundary>
    </main>
  );
}
