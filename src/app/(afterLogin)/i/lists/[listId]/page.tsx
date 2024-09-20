import SingleListsBody from '@/app/(afterLogin)/i/lists/[listId]/_component/SingleListsBody';

interface Props {
  params: { listId: string };
}

export default function IListsIdPage({ params }: Props) {
  return (
    <main>
      <SingleListsBody listId={params.listId} />
    </main>
  );
}
