import UserFollowHydrationBoundary from '../_boundary/UserFollowHydrationBoundary';
import UserFollowContent from '../_component/_follow/UserFollowContent';

interface Props {
  params: { username: string };
}

export default function FollowersPage({ params }: Props) {
  const type = 'follow';
  return (
    <UserFollowHydrationBoundary username={params.username} type={type}>
      <UserFollowContent username={params.username} type={type} />
    </UserFollowHydrationBoundary>
  );
}
