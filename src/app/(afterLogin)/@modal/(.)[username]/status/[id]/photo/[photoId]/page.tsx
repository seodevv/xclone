import style from './_style/photoModal.module.css';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getSinglePost } from '@/app/(afterLogin)/[username]/status/[id]/_lib/getSinglePost';
import PhotoSection from './_component/PhotoSection';
import PostSection from './_component/PostSection';
import FoldProvider from './_provider/FoldProvider';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getComments } from '@/app/(afterLogin)/[username]/status/[id]/_lib/getComments';

interface Props {
  params: { username: string; id: string; photoId: string };
}

export default async function PhotoPage({ params }: Props) {
  const session = await getServerSession(authOptions);
  const queryClient = new QueryClient();
  queryClient.setDefaultOptions({
    queries: {
      staleTime: 1 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    },
  });
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['posts', params.id],
      queryFn: getSinglePost,
    }),
    queryClient.prefetchInfiniteQuery({
      queryKey: ['posts', 'list', 'comments', params.id],
      queryFn: getComments,
      initialPageParam: 0,
    }),
  ]);
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <FoldProvider>
        <main className={style.PhotoModal}>
          <PhotoSection id={params.id} photoId={params.photoId} />
          <PostSection session={session} id={params.id} />
        </main>
      </FoldProvider>
    </HydrationBoundary>
  );
}
