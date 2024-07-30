import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getPostSearch } from '../_lib/getPostSearch';
import SearchBody from './_component/body/SearchBody';
import { redirect } from 'next/navigation';
import { getUserSearch } from '../_lib/getUserSearch';

type Props = {
  searchParams: { q?: string; f?: string; pf?: string; lf?: string };
};
export default async function SearchPage({ searchParams }: Props) {
  if (!searchParams.q) redirect('/explore');

  const queryClient = new QueryClient();
  queryClient.setDefaultOptions({
    queries: { staleTime: 1 * 60 * 1000 },
  });
  Promise.all([
    queryClient.prefetchInfiniteQuery({
      queryKey: ['posts', 'list', 'search', searchParams],
      queryFn: getPostSearch,
      initialPageParam: 0,
    }),
    queryClient.prefetchInfiniteQuery({
      queryKey: ['users', 'list', 'search', searchParams],
      queryFn: getUserSearch,
      initialPageParam: '',
    }),
  ]);
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <SearchBody searchParams={searchParams} />
    </HydrationBoundary>
  );
}
