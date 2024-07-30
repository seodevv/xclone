'use client';

import { Fragment } from 'react';
import { useLikePostsQuery } from '../_hooks/useLikePostsQuery';
import Post from '@/app/(afterLogin)/_component/post/Post';
import LoadingSpinner from '@/app/(afterLogin)/_component/loading/LoadingSpinner';
import DisConnection from '@/app/(afterLogin)/_component/error/DisConnection';

export default function LikePosts() {
  const { data: likePosts, isLoading, isError, refetch } = useLikePostsQuery();

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
        {isError && <DisConnection onClick={() => refetch()} />}
      </section>
    );
  }

  if (isLoading) {
    return <LoadingSpinner style={{ padding: 30 }} />;
  }

  if (isError) {
    return <DisConnection onClick={() => refetch()} />;
  }

  return null;
}
