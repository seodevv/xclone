import ListsSearchHydrationBoundary from '@/app/(afterLogin)/i/lists/search/_boundary/ListsSearchHydrationBoundary';
import ListsSearchHeader from '@/app/(afterLogin)/i/lists/search/_component/ListsSearchHeader';
import ListsSearchResult from '@/app/(afterLogin)/i/lists/search/_component/ListsSearchResult';

interface Props {
  searchParams: { q?: string };
}

export default function ListsSaerchPage({ searchParams }: Props) {
  return (
    <ListsSearchHydrationBoundary searchParams={searchParams}>
      <main>
        <ListsSearchHeader searchParams={searchParams} />
        <ListsSearchResult searchParams={searchParams} />
      </main>
    </ListsSearchHydrationBoundary>
  );
}
