import styles from './_style/likes.module.css';
import LikeHydrationBoundary from './_component/LikeHydrationBoundary';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/_lib/authOptions';
import LikePrivateMessage from './_component/LikePrivateMessage';
import LikePosts from './_component/LikePosts';
import { AdvancedUser } from '@/model/User';
import { Metadata } from 'next';

interface Props {
  params: { username: string };
}

export const generateMetadata = async ({
  params: { username },
}: Props): Promise<Metadata> => {
  const requestUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/users/${username}`;
  const requestInit: RequestInit = {
    method: 'GET',
    credentials: 'include',
  };

  try {
    const response = await fetch(requestUrl, requestInit);

    if (response.ok) {
      const user = (await response.json()) as {
        data: AdvancedUser;
        message: string;
      };

      return {
        title: `Posts liked by ${user.data.nickname} (@${user.data.id})`,
      };
    }
  } catch (error) {
    console.error(error);
  }

  return {
    title: `Following / XClone`,
  };
};

export default async function LikesPage({ params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  return (
    <LikeHydrationBoundary>
      <main className={styles.main}>
        <LikePrivateMessage />
        <LikePosts username={params.username} />
      </main>
    </LikeHydrationBoundary>
  );
}
