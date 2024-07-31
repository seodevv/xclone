import UserPosts from './_component/UserPosts';
import UserPostHydartionBoundary from './_component/UserPostHydrationBoundary';

interface Props {
  params: { username: string };
}

export default async function ProfilePage({ params }: Props) {
  const filter = 'all' as const;

  return (
    <UserPostHydartionBoundary username={params.username} filter={filter}>
      <UserPosts username={params.username} />
    </UserPostHydartionBoundary>
  );
}
