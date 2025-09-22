'use client';

import styles from './searchBody.module.css';
import Post from '@/app/(afterLogin)/_component/post/Post';
import cx from 'classnames';
import { usePostSearchQuery } from '../../_hook/usePostSearchQuery';
import PostMedia from '@/app/(afterLogin)/_component/post/body/PostMedia';
import PageLoading from '@/app/(afterLogin)/_component/loading/PageLoading';
import LoadingSpinner from '@/app/(afterLogin)/_component/loading/LoadingSpinner';
import SearchNoResult from '@/app/(afterLogin)/search/_component/_body/SearchNoResult';

interface Props {
  searchParams: { q?: string; f?: string; pf?: string; lf?: string };
  loading?: boolean;
  noResult?: boolean;
}

export default function SearchPosts({
  searchParams,
  loading,
  noResult,
}: Props) {
  const {
    data: searchPosts,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    isError,
    fetchNextPage,
    refetch,
  } = usePostSearchQuery({
    searchParams,
  });

  if (typeof searchPosts !== 'undefined') {
    const flatten = searchPosts.pages.map((page) => page.data).flat();
    const isMedia = searchParams.f === 'media';

    if (noResult && flatten.length === 0) {
      return <SearchNoResult q={searchParams.q} />;
    }

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

  if (loading && isLoading) {
    return <LoadingSpinner />;
  }

  return null;
}
