import styles from './iTrends.module.css';
import Trends from '@/app/(afterLogin)/_component/trends/Trends';
import MediaTrends from '@/app/(afterLogin)/_component/trends/MediaTrends';
import DivideLineWrapper from '@/app/_component/_util/DivideLineWrapper';
import FollowRecommends from '@/app/(afterLogin)/_component/follow_recommends/FollowRecommends';
import PostTrends from '@/app/(afterLogin)/_component/trends/PostTrends';

export default function ITrends() {
  return (
    <section className={styles.section}>
      <Trends showTitle={false} showMore={false} />
      <DivideLineWrapper position="top-bottom" order={3}>
        <MediaTrends />
      </DivideLineWrapper>
      <DivideLineWrapper position="none" order={10}>
        <FollowRecommends />
      </DivideLineWrapper>
      <DivideLineWrapper position="top" order={11}>
        <PostTrends />
      </DivideLineWrapper>
    </section>
  );
}
