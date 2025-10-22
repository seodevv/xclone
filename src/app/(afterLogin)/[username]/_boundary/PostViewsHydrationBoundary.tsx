import { getView } from '@/app/(afterLogin)/[username]/_lib/getView';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

interface Props {
  postid: string;
  disabled?: boolean;
  children: React.ReactNode;
}

export default async function PostViewsHydrationBoundary({
  postid,
  disabled,
  children,
}: Props) {
  const queryClient = new QueryClient();
  queryClient.setDefaultOptions({
    queries: { staleTime: 5 * 60 * 1000 },
  });
  await queryClient.prefetchQuery({
    queryKey: ['posts', 'views', postid],
    queryFn: getView,
  });
  const dehydrateState = dehydrate(queryClient);

  if (disabled) return <>{children}</>;

  return (
    <HydrationBoundary state={dehydrateState}>{children}</HydrationBoundary>
  );
}
