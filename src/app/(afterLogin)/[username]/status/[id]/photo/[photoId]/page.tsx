// import { redirect } from 'next/navigation';

// interface Props {
//   params: { username: string; id: string; photoId: string };
// }

// export default function Page({ params: { username, id } }: Props) {
//   redirect(`/${username}/status/${id}`);
// }

import styles from '@/app/(afterLogin)/@modal/(.)[username]/status/[id]/photo/[photoId]/_style/photoModal.module.css';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getSinglePost } from '@/app/(afterLogin)/[username]/status/[id]/_lib/getSinglePost';
import PhotoSection from '@/app/(afterLogin)/@modal/(.)[username]/status/[id]/photo/[photoId]/_component/PhotoSection';
import PostSection from '@/app/(afterLogin)/@modal/(.)[username]/status/[id]/photo/[photoId]/_component/PostSection';
import FoldProvider from '@/app/(afterLogin)/@modal/(.)[username]/status/[id]/photo/[photoId]/_provider/FoldProvider';

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
      <FoldProvider>
        <main className={styles.PhotoModal}>
          <PhotoSection id={params.id} photoId={params.photoId} />
          <PostSection id={params.id} />
        </main>
      </FoldProvider>
    </HydrationBoundary>
  );
}
