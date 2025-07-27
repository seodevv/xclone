'use client';

import styles from './searchBody.module.css';
import Post from '@/app/(afterLogin)/_component/post/Post';
import cx from 'classnames';
import { usePostSearchQuery } from '../../_hook/usePostSearchQuery';
import PostMedia from '@/app/(afterLogin)/_component/post/body/PostMedia';
import PageLoading from '@/app/(afterLogin)/_component/loading/PageLoading';
import LoadingSpinner from '@/app/(afterLogin)/_component/loading/LoadingSpinner';

interface Props {
  searchParams: { q?: string; f?: string; pf?: string; lf?: string };
}

export default function SearchPosts({ searchParams }: Props) {
  const {
    data: searchPosts,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    isError,
    fetchNextPage,
    refetch,
  } = usePostSearchQuery({
    searchParams,
  });

  if (searchPosts) {
    const isMedia = searchParams.f === 'media';
    return (
      <div className={cx(isMedia && styles.postMedia)}>
        {searchPosts.pages.map((page, i) =>
          page.data.map((p) =>
            isMedia ? (
              <PostMedia key={p.postid} post={p} />
            ) : (
              <Post key={p.postid} post={p} />
            )
          )
        )}
        <PageLoading
          type="next"
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          isError={isError}
          fetchNextPage={fetchNextPage}
          refetch={refetch}
        />
      </div>
    );
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return null;
}
