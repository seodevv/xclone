'use client';

import styles from './followRecommend.module.css';
import FollowRecommend from '@/app/(afterLogin)/_component/follow_recommends/FollowRecommend';
import RefreshButton from '@/app/(afterLogin)/_component/buttons/RefreshButton';
import LoadingSpinner from '../loading/LoadingSpinner';
import { useFollowRecommendsQuery } from '../../_hooks/useFollowRecommendsQuery';
import Link from 'next/link';

interface Props {
  title?: string;
  size?: number;
  isDesc?: boolean;
}

export default function FollowRecommends({
  title = 'who to follow',
  size = 3,
  isDesc = false,
}: Props) {
  const {
    data: followRecommends,
    isLoading,
    isError,
    refetch,
  } = useFollowRecommendsQuery();

  if (followRecommends) {
    return (
      <div className={styles.followRecommend}>
        <h3>{title}</h3>
        {followRecommends.pages
          .map((page) =>
            page.data.map((u) => (
              <FollowRecommend
                key={u.id}
                className={styles.list}
                user={u}
                isDesc={isDesc}
              />
            ))
          )
          .flat()
          .slice(0, size)}
        <Link className={styles.more} href={`/i/connect_people`}>
          Show more
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={styles.followRecommend}>
        <h3>{title}</h3>
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.error}>
        <span>A problem has occurred</span>
        <span>Try Refreshing.</span>
        <div className={styles.refresh}>
          <RefreshButton onClick={() => refetch()} text="Refresh" />
        </div>
      </div>
    );
  }

  return null;
}
