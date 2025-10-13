import AddHistoryStack from '@/app/(afterLogin)/@i/(.)i/_component/AddHistoryStack';
import ListsUserList from '@/app/(afterLogin)/@i/(.)i/lists/[listid]/_component/ListsUserList';

interface Props {
  params: { listid: string };
}

export default function IListsMemberSlot({ params: { listid } }: Props) {
  const filter = 'members';

  return (
    <>
      <AddHistoryStack />
      <ListsUserList listid={listid} filter={filter} />
    </>
  );
}
