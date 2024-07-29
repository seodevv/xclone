'use client';

import style from './followRecommend.module.css';
import { useQuery } from '@tanstack/react-query';
import { useSelectedLayoutSegment } from 'next/navigation';
import cx from 'classnames';
import { getFollowRecommends } from '@/app/(afterLogin)/_lib/getFollowRecommends';
import FollowRecommend from '@/app/(afterLogin)/_component/follow_recommends/FollowRecommend';
import RefreshButton from '@/app/(afterLogin)/_component/buttons/RefreshButton';
import SpinnerSvg from '@/app/_svg/spinner/SpinnerSvg';

export default function FollowRecommends() {
  const segment = useSelectedLayoutSegment();
  const isProfile =
    segment &&
    !['home', 'explore', 'search', 'messages', 'settings'].includes(segment);

  const {
    data: followRecommends,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['users', 'list', 'recommends'],
    queryFn: getFollowRecommends,
    enabled: segment !== 'messages',
  });

  if (segment === 'messages') {
    return null;
  }

  if (followRecommends) {
    return (
      <div className={cx(style.followRecommend, isProfile && style.firstOrder)}>
        <h3>{isProfile ? 'You might like' : 'Who to follow'}</h3>
        {followRecommends.data.map((f) => (
          <FollowRecommend key={f.id} user={f} />
        ))}
      </div>
    );
  }

  if (isLoading || isFetching) {
    return (
      <div className={cx(style.followRecommend, isProfile && style.firstOrder)}>
        <h3>{isProfile ? 'You might like' : 'Who to follow'}</h3>
        <SpinnerSvg />
      </div>
    );
  }

  return (
    <div className={cx(style.followRecommend, isProfile && style.firstOrder)}>
      <h3>{isProfile ? 'You might like' : 'Who to follow'}</h3>
      <div className={style.error}>
        <span>A problem has occurred</span>
        <span>Try Refreshing.</span>
        <div className={style.refresh}>
          <RefreshButton onClick={() => refetch()} text="Refresh" />
        </div>
      </div>
    </div>
  );
}
