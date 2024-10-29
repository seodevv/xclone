import { getMyProfile } from '@/app/(afterLogin)/_lib/getMyProfile';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

interface Props {
  children?: React.ReactNode;
}

export default async function MyProfileHydrationBoundary({ children }: Props) {
  const queryClient = new QueryClient();
  queryClient.setDefaultOptions({
    queries: {
      staleTime: 5 * 60 * 1000,
    },
  });
  await queryClient.prefetchQuery({
    queryKey: ['users', 'myProfile'],
    queryFn: getMyProfile,
  });
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>{children}</HydrationBoundary>
  );
}
