import { getServerSession } from 'next-auth';
import authOptions from '@/app/_lib/authOptions';
import AddMemberProvider from '@/app/(afterLogin)/@i/(.)i/lists/add_member/_provider/AddMemberProvider';
import AddMemberHeader from '@/app/(afterLogin)/@i/(.)i/lists/add_member/_component/_header/AddMemberHeader';
import AddMemberLists from '@/app/(afterLogin)/@i/(.)i/lists/add_member/_component/_body/AddMemberLists';
import UserListsHydrationBoundary from '@/app/(afterLogin)/@i/(.)i/lists/add_member/_boundary/ListsListHydrationBoundary';
import AddHistoryStack from '@/app/(afterLogin)/@i/(.)i/_component/AddHistoryStack';

export default async function IListAddMemberSlot() {
  const session = await getServerSession(authOptions);
  const filter = 'own';

  if (!session || !session.user?.email) return null;

  return (
    <UserListsHydrationBoundary username={session.user.email} filter={filter}>
      <AddHistoryStack />
      <AddMemberProvider>
        <main style={{ maxHeight: 600 }}>
          <AddMemberHeader />
          <AddMemberLists username={session.user.email} filter={filter} />
        </main>
      </AddMemberProvider>
    </UserListsHydrationBoundary>
  );
}
