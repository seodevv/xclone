import UserPosts from '../_component/UserPosts';
import UserHydrationBoundary from '../_boundary/UserHydrationBoundary';

interface Props {
  params: { username: string };
}

export default async function WithRepliesPage({ params }: Props) {
  const filter = 'reply' as const;

  return (
    <UserHydrationBoundary username={params.username} filter={filter}>
      <UserPosts username={params.username} filter="reply" />
    </UserHydrationBoundary>
  );
}
