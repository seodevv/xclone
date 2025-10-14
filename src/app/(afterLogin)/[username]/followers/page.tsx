import { Metadata } from 'next';
import UserFollowHydrationBoundary from '../_boundary/UserFollowHydrationBoundary';
import UserFollowContent from '../_component/_follow/UserFollowContent';
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
        title: `Poeple following ${user.data.nickname} (@${user.data.id})`,
      };
    }
  } catch (error) {
    console.error(error);
  }

  return {
    title: `Following / XClone`,
  };
};

export default function FollowersPage({ params }: Props) {
  const type = 'follow';
  return (
    <UserFollowHydrationBoundary username={params.username} type={type}>
      <UserFollowContent username={params.username} type={type} />
    </UserFollowHydrationBoundary>
  );
}
