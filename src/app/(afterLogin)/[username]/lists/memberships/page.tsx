import UserListsHydrationBoundary from '@/app/(afterLogin)/@i/(.)i/lists/add_member/_boundary/ListsListHydrationBoundary';
import UserLists from '@/app/(afterLogin)/[username]/lists/_component/UserLists';
import authOptions from '@/app/_lib/authOptions';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';

interface Props {
  params: { username: string };
}

export const generateMetadata = ({ params: { username } }: Props): Metadata => {
  return {
    title: `List memberships for @${username}`,
  };
};

export default async function UserListsMembershipsPage({ params }: Props) {
  const session = await getServerSession(authOptions);
  const filter = 'memberships';

  return (
    <UserListsHydrationBoundary username={params.username} filter={filter}>
      <main>
        <UserLists
          session={session}
          username={params.username}
          filter={filter}
          pinned={false}
        />
      </main>
    </UserListsHydrationBoundary>
  );
}
