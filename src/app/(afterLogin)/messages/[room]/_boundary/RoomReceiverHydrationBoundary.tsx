import { getUser } from '@/app/(afterLogin)/[username]/_lib/getUser';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

interface Props {
  children?: React.ReactNode;
  receiverid: string;
}

export default async function RoomReceiverHydrationBoundary({
  children,
  receiverid,
}: Props) {
  const queryClient = new QueryClient();
  queryClient.setDefaultOptions({
    queries: {
      staleTime: 5 * 60 * 1000,
    },
  });
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['users', receiverid],
      queryFn: getUser,
    }),
  ]);
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>{children}</HydrationBoundary>
  );
}
