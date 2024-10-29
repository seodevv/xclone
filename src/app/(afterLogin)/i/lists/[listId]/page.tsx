import SingleListsBody from '@/app/(afterLogin)/i/lists/[listid]/_component/SingleListsBody';

interface Props {
  params: { listid: string };
}

export default function IListsIdPage({ params }: Props) {
  return (
    <main>
      <SingleListsBody listid={params.listid} />
    </main>
  );
}
