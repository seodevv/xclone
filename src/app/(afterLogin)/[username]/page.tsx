import UserPosts from './_component/UserPosts';
import UserHydrationBoundary from './_boundary/UserHydrationBoundary';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/_lib/authOptions';
import FooterController from '@/app/(afterLogin)/_component/_footer/FooterController';

interface Props {
  params: { username: string };
}

export default async function ProfilePage({ params }: Props) {
  const session = await getServerSession(authOptions);
  const filter = 'all' as const;

  return (
    <UserHydrationBoundary username={params.username} filter={filter}>
      <UserPosts session={session} username={params.username} />
      <FooterController type="post" />
    </UserHydrationBoundary>
  );
}
