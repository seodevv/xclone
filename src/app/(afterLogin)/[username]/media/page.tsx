import UserPosts from '../_component/UserPosts';
import UserPostHydartionBoundary from '../_component/UserPostHydrationBoundary';

interface Props {
  params: { username: string };
}

export default async function MediaPage({ params }: Props) {
  const filter = 'media' as const;

  return (
    <UserPostHydartionBoundary username={params.username} filter={filter}>
      <UserPosts username={params.username} filter="media" />
    </UserPostHydartionBoundary>
  );
}
