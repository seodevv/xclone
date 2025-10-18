'use client';

import styles from './explore.header.module.css';
import cx from 'classnames';
import SearchForm from '@/app/(afterLogin)/_component/search/SearchForm';
import ExploreSettings from '@/app/(afterLogin)/explore/_components/ExploreSettings';
import useMobileHeader from '@/app/_hooks/useMobileHeader';
import ProfileNav from '@/app/_component/_mobile/ProfileNav';

export default function ExploreHeader() {
  const { dir, transitClass } = useMobileHeader();

  return (
    <div
      className={cx(
        styles.formZone,
        transitClass,
        dir === 'down' && styles.hide
      )}
    >
      <div className={styles.profileNav}>
        <ProfileNav />
      </div>
      <SearchForm />
      <div className={styles.settings}>
        <ExploreSettings />
      </div>
    </div>
  );
}
