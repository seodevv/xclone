import { getUser } from '@/app/(afterLogin)/[username]/_lib/getUser';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

interface Props {
  username: string;
  children: React.ReactNode;
}

export default async function SingleUserHydrationBoundary({
  username,
  children,
}: Props) {
  const queryClient = new QueryClient();
  queryClient.setDefaultOptions({
    queries: { staleTime: 5 * 60 * 1000 },
  });
  await queryClient.prefetchQuery({
    queryKey: ['users', username],
    queryFn: getUser,
  });
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>{children}</HydrationBoundary>
  );
}
