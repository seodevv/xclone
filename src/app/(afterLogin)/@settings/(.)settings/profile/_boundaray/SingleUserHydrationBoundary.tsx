import { getUser } from '@/app/(afterLogin)/[username]/_lib/getUser';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

interface Props {
  sessionId: string;
  children: React.ReactNode;
}

export default async function SingleUserHydrationBoundary({
  sessionId,
  children,
}: Props) {
  const queryClient = new QueryClient();
  queryClient.setDefaultOptions({
    queries: { staleTime: 5 * 60 * 1000 },
  });
  await queryClient.prefetchQuery({
    queryKey: ['users', sessionId],
    queryFn: getUser,
  });
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>{children}</HydrationBoundary>
  );
}
