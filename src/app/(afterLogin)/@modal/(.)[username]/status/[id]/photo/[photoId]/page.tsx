import style from './_style/photoModal.module.css';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getSinglePost } from '@/app/(afterLogin)/[username]/status/[id]/_lib/getSinglePost';
import PhotoSection from './_component/PhotoSection';
import PostSection from './_component/PostSection';

interface Props {
  params: { username: string; id: string; photoId: string };
}

export default async function PhotoPage({ params }: Props) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['posts', params.id],
    queryFn: getSinglePost,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <main className={style.PhotoModal}>
        <PhotoSection id={params.id} />
        <PostSection />
      </main>
    </HydrationBoundary>
  );
}
