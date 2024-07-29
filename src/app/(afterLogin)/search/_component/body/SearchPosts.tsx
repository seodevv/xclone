'use client';

import Post from '@/app/(afterLogin)/_component/post/Post';
import { usePostSearchQuery } from '../../_hook/usePostSearchQuery';
import DisConnection from '@/app/(afterLogin)/_component/error/DisConnection';
import LoadingSpinner from '@/app/(afterLogin)/_component/loading/LoadingSpinner';
import { Fragment } from 'react';
import PostMedia from '@/app/(afterLogin)/_component/post/body/PostMedia';

interface Props {
  searchParams: { q?: string; f?: string; pf?: string; lf?: string };
}

export default function SearchPosts({ searchParams }: Props) {
  const {
    data: searchPosts,
    isError,
    isFetchingNextPage,
  } = usePostSearchQuery({
    searchParams,
  });

  if (searchPosts) {
    if (searchParams.f === 'media') {
      return searchPosts.pages.map((page, i) => (
        <div
          key={i}
          style={{ display: 'flex', flexFlow: 'row wrap', gap: '3px' }}
        >
          {page.data.map((p) => (
            <PostMedia post={p} />
          ))}
        </div>
      ));
    }

    return (
      <>
        {searchPosts.pages.map((page, i) => (
          <Fragment key={i}>
            {page.data.map((p) => (
              <Post key={p.postId} post={p} />
            ))}
          </Fragment>
        ))}
        {isError && <DisConnection />}
        {isFetchingNextPage && <LoadingSpinner />}
      </>
    );
  }

  return null;
}
