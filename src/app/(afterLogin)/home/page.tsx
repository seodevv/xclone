import style from './_style/home.module.css';
import Tab from '@/app/(afterLogin)/home/_component/Tab';
import TabProvider from '@/app/(afterLogin)/home/_component/TabProvider';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getPostRecommends } from './_lib/getPostRecommends';
import PostRecommends from './_component/PostRecommends';
import { getPostFollowings } from './_lib/getPostFollowings';
import CommentForm from '../[username]/status/[id]/_component/CommentForm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const queryClient = new QueryClient();
  queryClient.setDefaultOptions({
    queries: {
      staleTime: 1 * 60 * 1000,
    },
  });
  await Promise.all([
    queryClient.prefetchInfiniteQuery({
      queryKey: ['posts', 'list', 'recommends'],
      queryFn: getPostRecommends,
      initialPageParam: 0,
    }),
    queryClient.prefetchInfiniteQuery({
      queryKey: ['posts', 'list', 'followings'],
      queryFn: getPostFollowings,
      initialPageParam: 0,
    }),
  ]);
  const dehydrateState = dehydrate(queryClient);

  if (!session) return null;

  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydrateState}>
        <TabProvider>
          <Tab />
          {/* <PostForm /> */}
          <CommentForm session={session} isActive />
          <PostRecommends />
        </TabProvider>
      </HydrationBoundary>
    </main>
  );
}
