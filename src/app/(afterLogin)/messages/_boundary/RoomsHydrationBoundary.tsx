import { getMyProfile } from '@/app/(afterLogin)/_lib/getMyProfile';
import { getRooms } from '@/app/(afterLogin)/messages/_lib/getRooms';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import React from 'react';

interface Props {
  children: React.ReactNode;
  sessionId: string;
}

export default async function RoomsHydartionBoundary({
  children,
  sessionId,
}: Props) {
  const queryClient = new QueryClient();
  queryClient.setDefaultOptions({
    queries: {
      staleTime: 5 * 60 * 1000,
    },
  });
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['rooms', 'list', sessionId],
      queryFn: getRooms,
    }),
    queryClient.prefetchQuery({
      queryKey: ['users', sessionId],
      queryFn: getMyProfile,
    }),
  ]);
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>{children}</HydrationBoundary>
  );
}
