import UserPosts from './_component/UserPosts';
import UserHydrationBoundary from './_boundary/UserHydrationBoundary';

interface Props {
  params: { username: string };
}

export default async function ProfilePage({ params }: Props) {
  const filter = 'all' as const;

  return (
    <UserHydrationBoundary username={params.username} filter={filter}>
      <UserPosts username={params.username} />
    </UserHydrationBoundary>
  );
}
