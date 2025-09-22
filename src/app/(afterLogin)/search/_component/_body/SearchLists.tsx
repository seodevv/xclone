import Lists from '@/app/(afterLogin)/@i/(.)i/lists/_component/Lists';
import LoadingSpinner from '@/app/(afterLogin)/_component/loading/LoadingSpinner';
import PageLoading from '@/app/(afterLogin)/_component/loading/PageLoading';
import SearchNoResult from '@/app/(afterLogin)/search/_component/_body/SearchNoResult';
import { useListsSearchQuery } from '@/app/(afterLogin)/search/_hook/useListsSearchQuery';
import { useRouter } from 'next/navigation';

interface Props {
  searchParams: { q?: string; f?: string; pf?: string; lf?: string };
  loading?: boolean;
  noResult?: boolean;
}

export default function SearchLists({
  searchParams,
  loading,
  noResult,
}: Props) {
  const router = useRouter();
  const {
    data: searchLists,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    isError,
    fetchNextPage,
    refetch,
  } = useListsSearchQuery({
    searchParams,
  });

  if (typeof searchLists !== 'undefined') {
    const flatten = searchLists.pages.map((page) => page.data).flat();

    if (noResult && flatten.length === 0) {
      return <SearchNoResult q={searchParams.q} />;
    }

    return (
      <>
        {flatten.map((list) => (
          <Lists
            key={list.id}
            lists={list}
            follow
            onClick={() => {
              router.push(`/i/lists/${list.id}`);
            }}
          />
        ))}
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

  if (loading && isLoading) {
    return <LoadingSpinner />;
  }

  return null;
}
