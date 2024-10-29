'use client';

import styles from './followRecommend.module.css';
import { useSelectedLayoutSegments } from 'next/navigation';
import cx from 'classnames';
import FollowRecommends from '@/app/(afterLogin)/_component/follow_recommends/FollowRecommends';

export default function FollowRecommendsSection() {
  const [a, b] = useSelectedLayoutSegments();

  let setNull = false;
  let lastOrder = false;
  switch (a) {
    case undefined:
    case 'messages':
    case 'settings':
      setNull = true;
      break;
    case 'home':
    case 'explore':
    case 'search':
    case 'settings':
      lastOrder = true;
      break;
    case 'i':
      switch (b) {
        case 'bookmarks':
          lastOrder = true;
          break;
        case 'connect_people':
          setNull = true;
          break;
      }
      break;
    default:
      if (b === 'lists') {
        lastOrder = true;
      }
      break;
  }

  if (setNull) return null;

  return (
    <div
      className={cx(
        styles.followRecommendSection,
        lastOrder && styles.lastOrder
      )}
    >
      <FollowRecommends
        title={lastOrder ? 'who to follow' : 'You might like'}
      />
    </div>
  );
}
