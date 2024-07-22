import style from './_style/explore.module.css';
import SearchForm from '@/app/(afterLogin)/_component/search/SearchForm';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getTrends } from '../_lib/getTrends';
import Trends from '../_component/trends/Trends';

export default async function ExplorePage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['hashtags', 'list'],
    queryFn: getTrends,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
  const dehydrateState = dehydrate(queryClient);

  return (
    <main className={style.main}>
      <div className={style.formZone}>
        <SearchForm />
      </div>
      <HydrationBoundary state={dehydrateState}>
        <Trends />
      </HydrationBoundary>
    </main>
  );
}
