import UserListsHydrationBoundary from '@/app/(afterLogin)/@i/(.)i/lists/add_member/_boundary/ListsListHydrationBoundary';
import ListsRecommends from '@/app/(afterLogin)/[username]/lists/_component/ListsRecommends';
import UserLists from '@/app/(afterLogin)/[username]/lists/_component/UserLists';
import DivideLine from '@/app/_component/_util/DivideLine';
import authOptions from '@/app/_lib/authOptions';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';

interface Props {
  params: { username: string };
}

export const metadata: Metadata = {
  title: 'Lists / XClone',
};

export default async function UserListsPage({ params }: Props) {
  const session = await getServerSession(authOptions);
  const filter = 'all';

  return (
    <UserListsHydrationBoundary username={params.username} filter={filter}>
      {session?.user?.email === params.username && <ListsRecommends more />}
      <DivideLine />
      <UserLists session={session} username={params.username} filter={filter} />
    </UserListsHydrationBoundary>
  );
}
