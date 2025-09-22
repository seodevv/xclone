import ListsSearchHydrationBoundary from '@/app/(afterLogin)/i/lists/search/_boundary/ListsSearchHydrationBoundary';
import ListsSearchResult from '@/app/(afterLogin)/i/lists/search/_component/ListsSearchResult';

interface Props {
  searchParams: { q?: string };
}

export default function ListsSaerchPage({ searchParams }: Props) {
  return (
    <ListsSearchHydrationBoundary searchParams={searchParams}>
      <ListsSearchResult searchParams={searchParams} />
    </ListsSearchHydrationBoundary>
  );
}
