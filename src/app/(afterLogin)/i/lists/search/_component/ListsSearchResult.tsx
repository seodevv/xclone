'use client';

import Lists from '@/app/(afterLogin)/@i/(.)i/lists/_component/Lists';
import TextLink from '@/app/(afterLogin)/_component/Link/TextLink';
import LoadingSpinner from '@/app/(afterLogin)/_component/loading/LoadingSpinner';
import PageLoading from '@/app/(afterLogin)/_component/loading/PageLoading';
import NoPost from '@/app/(afterLogin)/_component/post/NoPost';
import useGetListsSearchQuery from '@/app/(afterLogin)/i/lists/search/useGetListsSearchQuery';

interface Props {
  searchParams: { q?: string };
}

export default function ListsSearchResult({ searchParams }: Props) {
  const {
    data: searchLists,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
    isLoading,
    fetchNextPage,
    refetch,
  } = useGetListsSearchQuery(searchParams);
  const q = searchParams.q ? decodeURIComponent(searchParams.q) : '';

  if (searchLists) {
    if (searchLists.pages[0].data.length === 0) {
      return (
        <NoPost
          title={`No Lists matched "${q}"`}
          message="Why not create one?"
          children={
            <TextLink
              href="/i/lists/create"
              text="Create new List"
              theme="white"
              size="large"
              inline
            />
          }
        />
      );
    }

    return (
      <section>
        {searchLists.pages.map((page) =>
          page.data.map((l) => <Lists key={l.id} lists={l} follow />)
        )}
        <PageLoading
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          isError={isError}
          fetchNextPage={fetchNextPage}
          refetch={refetch}
        />
      </section>
    );
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    throw error;
  }

  return null;
}
