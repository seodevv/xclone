'use client';

import styles from '../_style/userPosts.module.css';
import cx from 'classnames';
import { useUserQuery } from '../_hooks/useUserQuery';
import { useUserPostsQuery } from '../_hooks/useUserPostsQuery';
import Post from '@/app/(afterLogin)/_component/post/Post';
import LoadingSpinner from '../../_component/loading/LoadingSpinner';
import DisConnection from '../../_component/error/DisConnection';
import PageLoading from '../../_component/loading/PageLoading';
import PostMedia from '../../_component/post/body/PostMedia';
import NoMedia from './NoMedias';
import FollowRecommends from '../../_component/follow_recommends/FollowRecommends';
import NoProfile from './_body/NoProfile';
import { Session } from 'next-auth';

interface Props {
  session: Session | null;
  username: string;
  filter?: 'all' | 'reply' | 'media' | 'like';
}

export default function UserPosts({
  session,
  username,
  filter = 'all',
}: Props) {
  const { data: user } = useUserQuery(username);
  const {
    data: posts,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    isError,
    fetchNextPage,
    refetch,
  } = useUserPostsQuery({ username, filter });

  if (!user) return <NoProfile />;

  if (posts) {
    const isOwn = session?.user?.email === username;
    const isMedia = filter === 'media';
    const isEmpty = posts.pages[0].data.length === 0;
    return (
      <div className={cx(styles.userPosts, isMedia && styles.userMedia)}>
        {posts.pages.map((page, i) =>
          page.data.map((p, j) =>
            isMedia ? (
              <PostMedia key={p.postid} post={p} />
            ) : (
              <Post
                key={p.postid}
                post={p}
                style={{ order: 10 * i + j + 1 }}
                hasPinned
              />
            )
          )
        )}
        {isEmpty && <NoMedia type={filter} username={username} isOwn={isOwn} />}
        {!isMedia && isOwn && (
          <div className={styles.followRecommends} style={{ order: 5 }}>
            <FollowRecommends isDesc />
          </div>
        )}
        <PageLoading
          type="next"
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          isError={isError}
          fetchNextPage={fetchNextPage}
          refetch={refetch}
        />
      </div>
    );
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <DisConnection onClick={() => refetch()} />;
  }

  return null;
}
