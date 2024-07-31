'use client';

import { Fragment } from 'react';
import { useLikePostsQuery } from '../_hooks/useLikePostsQuery';
import Post from '@/app/(afterLogin)/_component/post/Post';
import LoadingSpinner from '@/app/(afterLogin)/_component/loading/LoadingSpinner';
import DisConnection from '@/app/(afterLogin)/_component/error/DisConnection';
import PageLoading from '@/app/(afterLogin)/_component/loading/PageLoading';

export default function LikePosts() {
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
    return (
      <section>
        {likePosts.pages.map((page, i) => (
          <Fragment key={i}>
            {page.data.map((p) => (
              <Post key={p.postId} post={p} />
            ))}
          </Fragment>
        ))}
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
