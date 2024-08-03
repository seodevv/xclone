import UserFollowHydrationBoundary from '../_boundary/UserFollowHydrationBoundary';
import UserFollowContent from '../_component/_follow/UserFollowContent';

interface Props {
  params: { username: string };
}

export default function VerifiedFollowers({ params }: Props) {
  const type = 'verified_followers';

  return (
    <UserFollowHydrationBoundary username={params.username} type={type}>
      <UserFollowContent username={params.username} type={type} />
    </UserFollowHydrationBoundary>
  );
}
