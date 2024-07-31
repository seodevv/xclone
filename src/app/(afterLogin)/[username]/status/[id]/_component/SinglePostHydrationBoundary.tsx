import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getSinglePost } from '../_lib/getSinglePost';
import { getComments } from '../_lib/getComments';

interface Props {
  children: React.ReactNode;
  params: { username: string; id: string; photoId?: string };
}

export default async function SinglePostHydrationBoundary({
  children,
  params,
}: Props) {
  const queryClient = new QueryClient();
  queryClient.setDefaultOptions({
    queries: {
      staleTime: 1 * 60 * 1000,
    },
  });
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['posts', params.id, { username: params.username }],
      queryFn: getSinglePost,
    }),
    queryClient.prefetchInfiniteQuery({
      queryKey: [
        'posts',
        'list',
        'comments',
        params.id,
        { username: params.username },
      ],
      queryFn: getComments,
      initialPageParam: 0,
    }),
  ]);
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>{children}</HydrationBoundary>
  );
}
