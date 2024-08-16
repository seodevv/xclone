import style from './_style/photoModal.module.css';
import PhotoSection from './_component/PhotoSection';
import PostSection from './_component/PostSection';
import FoldProvider from './_provider/FoldProvider';
import { getServerSession } from 'next-auth';
import SinglePostHydrationBoundary from '@/app/(afterLogin)/[username]/status/[id]/_component/SinglePostHydrationBoundary';
import HtmlOverflowHidden from '@/app/_component/_overflow/HtmlOverflowHidden';
import authOptions from '@/app/_lib/authOptions';

interface Props {
  params: { username: string; id: string; photoId: string };
}

export default async function PhotoPage({ params }: Props) {
  const session = await getServerSession(authOptions);

  return (
    <SinglePostHydrationBoundary params={params}>
      <FoldProvider>
        <HtmlOverflowHidden />
        <main className={style.PhotoModal}>
          <PhotoSection params={params} />
          <PostSection session={session} params={params} />
        </main>
      </FoldProvider>
    </SinglePostHydrationBoundary>
  );
}
