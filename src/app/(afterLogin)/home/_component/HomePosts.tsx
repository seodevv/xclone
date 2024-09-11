'use client';

import { useContext } from 'react';
import { HomeTabContext } from './HomeTabProvider';
import Post from '@/app/(afterLogin)/_component/post/Post';
import { useHomePostQuery } from '../_hook/useHomePostQuery';
import PageLoading from '../../_component/loading/PageLoading';
import NoPosts from '@/app/(afterLogin)/home/_component/NoPosts';

export default function HomePosts() {
  const { tab } = useContext(HomeTabContext);
  const {
    data: posts,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  } = useHomePostQuery(tab === 'rec' ? 'recommends' : 'followings');

  if (posts.pages.at(0)?.data.length === 0) {
    return <NoPosts />;
  }

  return (
    <>
      {posts.pages.map((page, i) =>
        page.data.map((p) => {
          return <Post key={p.postId} post={p} />;
        })
      )}
      <PageLoading
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        isError={isError}
        fetchNextPage={fetchNextPage}
        refetch={refetch}
      />
    </>
  );
}
