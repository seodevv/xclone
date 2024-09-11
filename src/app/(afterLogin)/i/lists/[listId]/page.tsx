import SingleListsHydartionBoundary from '@/app/(afterLogin)/i/lists/[listId]/_boundary/SingleListsHydrationBoundary';
import SingleListsBody from '@/app/(afterLogin)/i/lists/[listId]/_component/SingleListsBody';
import SingleListsHeader from '@/app/(afterLogin)/i/lists/[listId]/_component/SingleListsHeader';

interface Props {
  params: { listId: string };
}

export default function IListsIdPage({ params }: Props) {
  return (
    <SingleListsHydartionBoundary listId={params.listId}>
      <main>
        <SingleListsHeader listId={params.listId} />
        <SingleListsBody listId={params.listId} />
      </main>
    </SingleListsHydartionBoundary>
  );
}
