'use client';

import styles from './trendSection.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import cx from 'classnames';
import Trend from '@/app/(afterLogin)/_component/trends/Trend';
import LoadingSpinner from '@/app/(afterLogin)/_component/loading/LoadingSpinner';
import { useTrendsQuery } from '@/app/(afterLogin)/_hooks/useTrendsQuery';

export default function Trends() {
  const pathname = usePathname();
  const { data: trends, isLoading } = useTrendsQuery();
  const isExplore = pathname === '/explore';

  if (trends) {
    return (
      <div className={cx(styles.trendSection, isExplore && styles.explore)}>
        <h3>{isExplore ? 'Trends' : 'Trends for you'}</h3>
        {trends.data.map((tag, index) => (
          <Trend key={tag.id} tag={tag} index={index} />
        ))}
        <Link href={'/i/trends'} className={styles.trendMore}>
          Show more
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={styles.trendSection}>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className={styles.trendSection}>
      <h3>트렌드를 불러올 수 없습니다.</h3>
    </div>
  );
}
