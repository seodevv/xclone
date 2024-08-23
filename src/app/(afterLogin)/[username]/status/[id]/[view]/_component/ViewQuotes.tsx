'use client';

import usePostQuotesQuery from '@/app/(afterLogin)/[username]/status/[id]/[view]/_hooks/usePostQuotesQuery';
import LoadingSpinner from '@/app/(afterLogin)/_component/loading/LoadingSpinner';
import PageLoading from '@/app/(afterLogin)/_component/loading/PageLoading';
import NoPost from '@/app/(afterLogin)/_component/post/NoPost';
import Post from '@/app/(afterLogin)/_component/post/Post';
import { ERROR_STATUS } from '@/app/(afterLogin)/error';

interface Props {
  username: string;
  id: string;
  view: 'quotes';
}

export default function ViewQuotes({ username, id, view }: Props) {
  const {
    data: quotes,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isLoading,
    fetchNextPage,
    refetch,
  } = usePostQuotesQuery({ username, id, view });

  if (quotes) {
    if (quotes.pages[0].data.length === 0) {
      return (
        <NoPost
          title="No Quotes yet"
          message="You will find a list of everyone who quoted this post here."
        />
      );
    }

    return (
      <div>
        {quotes.pages.map((page) =>
          page.data.map((p) => <Post key={p.postId} post={p} />)
        )}
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
    throw new Error(ERROR_STATUS.fetchError);
  }

  return null;
}
