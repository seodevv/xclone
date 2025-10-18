'use client';

import styles from './trendSection.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Trend from '@/app/(afterLogin)/_component/trends/Trend';
import LoadingSpinner from '@/app/(afterLogin)/_component/loading/LoadingSpinner';
import { useTrendsQuery } from '@/app/(afterLogin)/_hooks/useTrendsQuery';

interface Props {
  showTitle?: boolean;
  showMore?: boolean;
}

export default function Trends({ showTitle = true, showMore = true }: Props) {
  const pathname = usePathname();
  const { data: trends, isLoading } = useTrendsQuery();
  const isExplore = pathname === '/explore';

  if (trends) {
    return (
      <>
        {showTitle && <h3>{isExplore ? 'Trends' : 'Trends for you'}</h3>}
        {trends.pages.map((page, i) =>
          page.data.map((tag, j) => (
            <Trend key={tag.id} tag={tag} index={i * 10 + j} />
          ))
        )}
        {showMore && (
          <Link
            href={'/i/trends'}
            className={styles.trendMore}
            style={{ order: 999 }}
          >
            Show more
          </Link>
        )}
        <div style={{ paddingBottom: 100, order: 9999 }}></div>
      </>
    );
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return <h3>트렌드를 불러올 수 없습니다.</h3>;
}
