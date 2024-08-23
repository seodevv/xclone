import getPostQuotes from '@/app/(afterLogin)/[username]/status/[id]/[view]/_lib/getPostQuotes';
import getPostRepostAndLikes from '@/app/(afterLogin)/[username]/status/[id]/[view]/_lib/getPostRepostAndLikes';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

interface Props {
  params: { username: string; id: string; view: string };
  children: React.ReactNode;
}

export default async function ViewHydrationBoundary({
  params: { username, id, view },
  children,
}: Props) {
  const queryClient = new QueryClient();
  queryClient.setDefaultOptions({
    queries: {
      staleTime: 5 * 60 * 1000,
    },
  });
  switch (view) {
    case 'quotes':
      await queryClient.prefetchInfiniteQuery({
        queryKey: [
          'posts',
          'list',
          'quotes',
          id,
          { username: username, filter: view },
        ],
        queryFn: getPostQuotes,
        initialPageParam: 0,
      });
      break;
    case 'retweets':
    case 'likes':
      await queryClient.prefetchInfiniteQuery({
        queryKey: ['users', 'list', view, { postId: id, username }],
        queryFn: getPostRepostAndLikes,
        initialPageParam: '',
      });
      break;
  }
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>{children}</HydrationBoundary>
  );
}
