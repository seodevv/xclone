'use client';

import style from '../_style/userPosts.module.css';
import cx from 'classnames';
import { useUserQuery } from '../_hooks/useUserQuery';
import { useUserPostsQuery } from '../_hooks/useUserPostsQuery';
import Post from '@/app/(afterLogin)/_component/post/Post';
import LoadingSpinner from '../../_component/loading/LoadingSpinner';
import DisConnection from '../../_component/error/DisConnection';
import PageLoading from '../../_component/loading/PageLoading';
import PostMedia from '../../_component/post/body/PostMedia';
import NoMedia from './NoMedias';

interface Props {
  username: string;
  filter?: 'all' | 'reply' | 'media' | 'like';
}

export default function UserPosts({ username, filter = 'all' }: Props) {
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

  if (!user) return null;

  if (posts) {
    const isMedia = filter === 'media';
    return (
      <>
        <div>
          {posts.pages.map((page, i) => (
            <div key={i} className={cx(isMedia && style.postMedia)}>
              {page.data.map((p) =>
                isMedia ? (
                  <PostMedia key={p.postId} post={p} />
                ) : (
                  <Post key={p.postId} post={p} />
                )
              )}
            </div>
          ))}
          {isMedia && posts.pages.at(0)?.data.length === 0 && <NoMedia />}
          <PageLoading
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            isError={isError}
            fetchNextPage={fetchNextPage}
            refetch={refetch}
          />
        </div>
      </>
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
