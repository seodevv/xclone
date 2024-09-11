import AddHistoryStack from '@/app/(afterLogin)/@i/(.)i/_component/AddHistoryStack';
import ListsMemberHydrationBoundary from '@/app/(afterLogin)/@i/(.)i/lists/[listId]/_boundary/ListsMemberHydrationBoundary';
import ListsUserList from '@/app/(afterLogin)/@i/(.)i/lists/[listId]/_component/ListsUserList';
import IListHeader from '@/app/(afterLogin)/@i/(.)i/lists/_component/IListHeader';

interface Props {
  params: { listId: string };
}

export default function IListsFollowerSlot({ params }: Props) {
  const filter = 'followers';

  return (
    <ListsMemberHydrationBoundary listId={params.listId} filter={filter}>
      <AddHistoryStack />
      <main style={{ maxHeight: 650 }}>
        <IListHeader title="List members" noBtn />
        <ListsUserList listId={params.listId} filter={filter} />
      </main>
    </ListsMemberHydrationBoundary>
  );
}
