'use client';

import { Fragment, useContext } from 'react';
import { HomeTabContext } from './HomeTabProvider';
import Post from '@/app/(afterLogin)/_component/post/Post';
import { useHomePostQuery } from '../_hook/useHomePostQuery';
import PageLoading from '../../_component/loading/PageLoading';

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

  return (
    <>
      {posts.pages.map((page, i) => (
        <Fragment key={i}>
          {page.data.map((p) => {
            return <Post key={p.postId} post={p} />;
          })}
        </Fragment>
      ))}
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