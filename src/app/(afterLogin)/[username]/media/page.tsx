import UserPosts from '../_component/UserPosts';
import UserHydrationBoundary from '../_boundary/UserHydrationBoundary';

interface Props {
  params: { username: string };
}

export default async function MediaPage({ params }: Props) {
  const filter = 'media' as const;

  return (
    <UserHydrationBoundary username={params.username} filter={filter}>
      <UserPosts username={params.username} filter="media" />
    </UserHydrationBoundary>
  );
}
