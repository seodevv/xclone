'use client';

import style from './trendSection.module.css';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import Trend from '@/app/(afterLogin)/_component/trends/Trend';
import LoadingSpinner from '../loading/LoadingSpinner';
import { useTrendsQuery } from '../../_hooks/useTrendsQuery';

export default function Trends() {
  const segment = useSelectedLayoutSegment();
  const { data: trends, isLoading } = useTrendsQuery(segment);

  if (segment === 'explore') return null;

  if (trends) {
    return (
      <div className={style.trendSection}>
        <h3>Trends for you</h3>
        {trends.data.map((tag, index) => (
          <Trend key={tag.id} tag={tag} index={index} />
        ))}
        <Link href={'/i/trends'} className={style.trendMore}>
          Show more
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={style.trendSection}>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className={style.trendSection}>
      <h3>트렌드를 불러올 수 없습니다.</h3>
    </div>
  );
}
