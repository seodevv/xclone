import style from './_style/photoModal.module.css';
import PhotoSection from './_component/PhotoSection';
import PostSection from './_component/PostSection';
import FoldProvider from './_provider/FoldProvider';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import SinglePostHydrationBoundary from '@/app/(afterLogin)/[username]/status/[id]/_component/SinglePostHydrationBoundary';

interface Props {
  params: { username: string; id: string; photoId: string };
}

export default async function PhotoPage({ params }: Props) {
  const session = await getServerSession(authOptions);

  return (
    <SinglePostHydrationBoundary params={params}>
      <FoldProvider>
        <main className={style.PhotoModal}>
          <PhotoSection params={params} />
          <PostSection session={session} params={params} />
        </main>
      </FoldProvider>
    </SinglePostHydrationBoundary>
  );
}
