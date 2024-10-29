'use client';

import { Fragment } from 'react';
import { useLikePostsQuery } from '../_hooks/useLikePostsQuery';
import Post from '@/app/(afterLogin)/_component/post/Post';
import LoadingSpinner from '@/app/(afterLogin)/_component/loading/LoadingSpinner';
import DisConnection from '@/app/(afterLogin)/_component/error/DisConnection';
import PageLoading from '@/app/(afterLogin)/_component/loading/PageLoading';
import NoMedia from '@/app/(afterLogin)/[username]/_component/NoMedias';

interface Props {
  username: string;
}

export default function LikePosts({ username }: Props) {
  const {
    data: likePosts,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isError,
    refetch,
  } = useLikePostsQuery();

  if (likePosts) {
    const isEmpty = likePosts.pages[0].data.length === 0;
    return (
      <section>
        {likePosts.pages.map((page, i) => (
          <Fragment key={i}>
            {page.data.map((p) => (
              <Post key={p.postid} post={p} />
            ))}
          </Fragment>
        ))}
        {isEmpty && <NoMedia type="like" username={username} />}
        <PageLoading
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          isError={isError}
          fetchNextPage={fetchNextPage}
          refetch={refetch}
        />
      </section>
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
