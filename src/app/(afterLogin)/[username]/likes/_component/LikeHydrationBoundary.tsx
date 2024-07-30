import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getLikePosts } from '../_lib/getLikePosts';

interface Props {
  children: React.ReactNode;
}

export default async function LikeHydrationBoundary({ children }: Props) {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['posts', 'list', 'likes'],
    queryFn: getLikePosts,
    initialPageParam: 0,
    staleTime: 1 * 60 * 1000,
  });
  const hydrateState = dehydrate(queryClient);

  return <HydrationBoundary state={hydrateState}>{children}</HydrationBoundary>;
}
