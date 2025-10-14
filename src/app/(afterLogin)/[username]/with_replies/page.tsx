import UserPosts from '../_component/UserPosts';
import UserHydrationBoundary from '../_boundary/UserHydrationBoundary';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/_lib/authOptions';
import { Metadata } from 'next';
import { AdvancedUser } from '@/model/User';

interface Props {
  params: { username: string };
}

export const generateMetadata = async ({
  params: { username },
}: Props): Promise<Metadata> => {
  const requestUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${username}`;
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
        title: `Posts with replies by ${user.data.nickname} (@${user.data.id})`,
      };
    }
  } catch (error) {
    console.error(error);
  }

  return {
    title: `Following / XClone`,
  };
};

export default async function WithRepliesPage({ params }: Props) {
  const session = await getServerSession(authOptions);
  const filter = 'reply' as const;

  return (
    <UserHydrationBoundary username={params.username} filter={filter}>
      <UserPosts session={session} username={params.username} filter="reply" />
    </UserHydrationBoundary>
  );
}
