'use client';

import utils from '@/app/utility.module.css';
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

  const flatten = posts.pages.map((page) => page.data).flat();

  if (flatten.length === 0) {
    return <NoPosts />;
  }

  return (
    <>
      {flatten.map((p) => {
        return <Post key={p.postid} post={p} />;
      })}
      <PageLoading
        type="next"
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        isError={isError}
        fetchNextPage={fetchNextPage}
        refetch={refetch}
      />
    </>
  );
}
