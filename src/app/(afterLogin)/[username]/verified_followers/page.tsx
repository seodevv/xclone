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
  const requestUrl = `/api/v1/users/${username}`;
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
        title: `Verified accounts following ${user.data.nickname} (@${user.data.id})`,
      };
    }
  } catch (error) {
    console.error(error);
  }

  return {
    title: `Following / XClone`,
  };
};

export default function VerifiedFollowers({ params }: Props) {
  const type = 'verified_followers';

  return (
    <UserFollowHydrationBoundary username={params.username} type={type}>
      <UserFollowContent username={params.username} type={type} />
    </UserFollowHydrationBoundary>
  );
}
