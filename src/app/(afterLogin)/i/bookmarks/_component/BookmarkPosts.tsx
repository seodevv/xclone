'use client';

import DisConnection from '@/app/(afterLogin)/_component/error/DisConnection';
import LoadingSpinner from '@/app/(afterLogin)/_component/loading/LoadingSpinner';
import PageLoading from '@/app/(afterLogin)/_component/loading/PageLoading';
import NoPost from '@/app/(afterLogin)/_component/post/NoPost';
import Post from '@/app/(afterLogin)/_component/post/Post';
import useBookmarkPostsQuery from '@/app/(afterLogin)/i/bookmarks/_hook/useBookmarkPostsQuery';
import { BookmarkContext } from '@/app/(afterLogin)/i/bookmarks/_provider/BookmarkProvider';
import Link from 'next/link';
import { useContext } from 'react';

export default function BookmarkPosts() {
  const { state } = useContext(BookmarkContext);
  const {
    data: bookmarks,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    fetchNextPage,
    refetch,
  } = useBookmarkPostsQuery();

  if (bookmarks) {
    if (bookmarks.pages[0].data.length === 0) {
      return (
        <NoPost
          title="Save posts for later"
          message="Bookmark posts to easily find them again in the future.
"
        />
      );
    }

    if (state.status === 'loading') {
      return <LoadingSpinner />;
    }

    let length = 0;
    const content = bookmarks.pages.map((page) =>
      page.data.map((p) => {
        if (state.status === 'search') {
          const active =
            p.User.id.toLowerCase().includes(state.search.toLowerCase()) ||
            p.User.nickname
              .toLowerCase()
              .includes(state.search.toLowerCase()) ||
            p.content.toLowerCase().includes(state.search.toLowerCase());
          length = active ? length + 1 : length;
          return active ? <Post key={p.postId} post={p} /> : null;
        }

        return <Post key={p.postId} post={p} />;
      })
    );

    if (state.status === 'search' && length === 0) {
      return (
        <NoPost title={`No results for ${state.search}`}>
          <span>
            Try searching for something else, or check your{' '}
            <Link href="/settings/search">Search settings</Link> to see if
            they’re protecting you from potentially sensitive content.
          </span>
        </NoPost>
      );
    }

    return (
      <div>
        {content}
        <PageLoading
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

  if (isError) {
    return <DisConnection onClick={() => refetch()} />;
  }

  return null;
}
