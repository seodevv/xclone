import styles from './_style/likes.module.css';
import LikeHydrationBoundary from './_component/LikeHydrationBoundary';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import LikePrivateMessage from './_component/LikePrivateMessage';
import LikePosts from './_component/LikePosts';

interface Props {
  params: { username: string };
}

export default async function LikesPage({ params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  return (
    <LikeHydrationBoundary>
      <main className={styles.main}>
        <LikePrivateMessage />
        <LikePosts />
      </main>
    </LikeHydrationBoundary>
  );
}
