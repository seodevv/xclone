import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getSinglePost } from './_lib/getSinglePost';
import { getComments } from './_lib/getComments';
import SinglePost from './_component/SinglePost';

interface Props {
  params: { username: string; id: string };
}

export default async function SinglePostPage({ params: { id } }: Props) {
  const session = await getServerSession(authOptions);
  const queryClient = new QueryClient();
  queryClient.setDefaultOptions({
    queries: {
      staleTime: 1 * 60 * 1000,
    },
  });
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['posts', id],
      queryFn: getSinglePost,
    }),
    queryClient.prefetchInfiniteQuery({
      queryKey: ['posts', 'list', 'comments', id],
      queryFn: getComments,
      initialPageParam: 0,
    }),
  ]);
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <SinglePost session={session} id={id} />
    </HydrationBoundary>
  );
}
