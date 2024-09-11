import AddHistoryStack from '@/app/(afterLogin)/@i/(.)i/_component/AddHistoryStack';
import ListsUserList from '@/app/(afterLogin)/@i/(.)i/lists/[listId]/_component/ListsUserList';

interface Props {
  params: { listId: string };
}

export default function IListsMemberSlot({ params }: Props) {
  const filter = 'members';

  return (
    <>
      <AddHistoryStack />
      <ListsUserList listId={params.listId} filter={filter} />
    </>
  );
}
