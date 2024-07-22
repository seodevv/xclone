'use client';

import style from './trendSection.module.css';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getTrends } from '@/app/(afterLogin)/_lib/getTrends';
import Trend from '@/app/(afterLogin)/_component/trends/Trend';
import SpinnerSvg from '@/app/_svg/spinner/SpinnerSvg';

export default function Trends() {
  const segment = useSelectedLayoutSegment();
  const { data: trends, isLoading } = useQuery({
    queryKey: ['hashtags', 'list'],
    queryFn: getTrends,
    enabled: segment !== 'explore',
  });

  if (segment === 'explore') return null;

  if (trends) {
    return (
      <div className={style.trendSection}>
        <h3>Trends for you</h3>
        {trends.data.map((tag) => (
          <Trend key={tag.id} tag={tag} />
        ))}
        <Link href={'/i/trends'} className={style.trendMore}>
          Show more
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={style.trendSection} style={{ textAlign: 'center' }}>
        <SpinnerSvg />
      </div>
    );
  }

  return (
    <div className={style.trendSection}>
      <h3>트렌드를 불러올 수 없습니다.</h3>
    </div>
  );
}
