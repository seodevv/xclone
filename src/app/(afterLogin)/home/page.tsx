import style from './_style/home.module.css';
import Tab from '@/app/(afterLogin)/home/_component/Tab';
import TabProvider from '@/app/(afterLogin)/home/_component/TabProvider';
import PostForm from '@/app/(afterLogin)/home/_component/PostForm';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getPostRecommends } from './_lib/getPostRecommends';
import PostRecommends from './_component/PostRecommends';
import { getPostFollowings } from './_lib/getPostFollowings';

export default async function HomePage() {
  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['posts', 'list', 'recommends'],
      queryFn: getPostRecommends,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    }),
    queryClient.prefetchQuery({
      queryKey: ['posts', 'list', 'followings'],
      queryFn: getPostFollowings,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    }),
  ]);
  const dehydrateState = dehydrate(queryClient);

  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydrateState}>
        <TabProvider>
          <Tab />
          <PostForm />
          <PostRecommends />
        </TabProvider>
      </HydrationBoundary>
    </main>
  );
}
