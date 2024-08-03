import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getFollowList } from '../_lib/getFollowList';

interface Props {
  children: React.ReactNode;
  username: string;
  type: 'verified_followers' | 'follow' | 'following';
}

export default async function UserFollowHydrationBoundary({
  children,
  username,
  type,
}: Props) {
  const queryClient = new QueryClient();
  queryClient.setDefaultOptions({
    queries: { staleTime: 1 * 60 * 1000 },
  });
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['users', 'list', username, { type }],
    queryFn: getFollowList,
    initialPageParam: '',
  });
  const dehydrateState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydrateState}>{children}</HydrationBoundary>
  );
}
