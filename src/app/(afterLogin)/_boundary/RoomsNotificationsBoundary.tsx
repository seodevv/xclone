import getRoomsNotifications from '@/app/(afterLogin)/_lib/getRoomsNotifications';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

interface Props {
  children: React.ReactNode;
}

export default async function RoomsNotificationsBoundary({ children }: Props) {
  const queryClient = new QueryClient();
  queryClient.setDefaultOptions({
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    },
  });
  await queryClient.prefetchQuery({
    queryKey: ['rooms', 'notifications'],
    queryFn: getRoomsNotifications,
  });
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>{children}</HydrationBoundary>
  );
}
