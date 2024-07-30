'use client';

import { Fragment, useContext, useEffect, useRef } from 'react';
import { HomeTabContext } from './HomeTabProvider';
import Post from '@/app/(afterLogin)/_component/post/Post';
import LoadingSpinner from '../../_component/loading/LoadingSpinner';
import { useHomePostQuery } from '../_hook/useHomePostQuery';
import DisConnection from '../../_component/error/DisConnection';
import ObserveElement from '../../_component/observer/ObserveElement';

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
      {isFetchingNextPage && <LoadingSpinner style={{ padding: '30px' }} />}
      <ObserveElement
        callback={() => {
          if (!isError && hasNextPage && !isFetchingNextPage) {
            console.log('fetching');
            fetchNextPage();
          }
        }}
        dependencies={[isError, hasNextPage, isFetchingNextPage, fetchNextPage]}
        isFetching={isFetchingNextPage}
        active={hasNextPage && !isError}
      />
      {isError && <DisConnection onClick={() => refetch()} />}
    </>
  );
}
