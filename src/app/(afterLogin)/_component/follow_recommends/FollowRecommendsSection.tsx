'use client';

import styles from './followRecommend.module.css';
import { useSelectedLayoutSegment } from 'next/navigation';
import cx from 'classnames';
import FollowRecommends from '@/app/(afterLogin)/_component/follow_recommends/FollowRecommends';

export default function FollowRecommendsSection() {
  const segment = useSelectedLayoutSegment();

  if (!segment || segment === 'messages') return null;

  if (['home', 'explore', 'search', 'messages', 'settings'].includes(segment)) {
    return (
      <div className={cx(styles.followRecommendSection)}>
        <FollowRecommends />
      </div>
    );
  }

  return (
    <div className={cx(styles.followRecommendSection, styles.firstOrder)}>
      <FollowRecommends title="You might like" />
    </div>
  );
}
