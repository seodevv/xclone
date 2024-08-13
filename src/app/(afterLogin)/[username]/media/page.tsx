import UserPosts from '../_component/UserPosts';
import UserHydrationBoundary from '../_boundary/UserHydrationBoundary';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

interface Props {
  params: { username: string };
}

export default async function MediaPage({ params }: Props) {
  const session = await getServerSession(authOptions);
  const filter = 'media' as const;

  return (
    <UserHydrationBoundary username={params.username} filter={filter}>
      <UserPosts session={session} username={params.username} filter="media" />
    </UserHydrationBoundary>
  );
}
