'use client';

import style from '@/app/(afterLogin)/[username]/_style/userPosts.module.css';
import { useUserQuery } from '../_hooks/useUserQuery';
import { useUserPostsQuery } from '../_hooks/useUserPostsQuery';
import Post from '@/app/(afterLogin)/_component/post/Post';
import { Fragment } from 'react';
import LoadingSpinner from '../../_component/loading/LoadingSpinner';
import DisConnection from '../../_component/error/DisConnection';
import PageLoading from '../../_component/loading/PageLoading';

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
    return (
      <>
        <div className={style.userPosts}>
          {posts.pages.map((page, i) => {
            return (
              <Fragment key={i}>
                {page.data.map((p) => (
                  <Post key={p.postId} post={p} />
                ))}
              </Fragment>
            );
          })}
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
