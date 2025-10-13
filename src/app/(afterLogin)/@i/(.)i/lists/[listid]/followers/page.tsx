import AddHistoryStack from '@/app/(afterLogin)/@i/(.)i/_component/AddHistoryStack';
import ListsMemberHydrationBoundary from '@/app/(afterLogin)/@i/(.)i/lists/[listid]/_boundary/ListsMemberHydrationBoundary';
import ListsUserList from '@/app/(afterLogin)/@i/(.)i/lists/[listid]/_component/ListsUserList';
import IListHeader from '@/app/(afterLogin)/@i/(.)i/lists/_component/IListHeader';

interface Props {
  params: { listid: string };
}

export default function IListsFollowerSlot({ params }: Props) {
  const filter = 'followers';

  return (
    <ListsMemberHydrationBoundary listid={params.listid} filter={filter}>
      <AddHistoryStack />
      <main style={{ maxHeight: 650 }}>
        <IListHeader title="List members" noBtn />
        <ListsUserList listid={params.listid} filter={filter} />
      </main>
    </ListsMemberHydrationBoundary>
  );
}
