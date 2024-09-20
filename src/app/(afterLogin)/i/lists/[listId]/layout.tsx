import SingleListsHydartionBoundary from '@/app/(afterLogin)/i/lists/[listId]/_boundary/SingleListsHydrationBoundary';
import SingleListsHeader from '@/app/(afterLogin)/i/lists/[listId]/_component/SingleListsHeader';

interface Props {
  params: { listId: string };
  children: React.ReactNode;
}

export default function SingleListsLayout({ params, children }: Props) {
  return (
    <SingleListsHydartionBoundary listId={params.listId}>
      <SingleListsHeader listId={params.listId} />
      {children}
    </SingleListsHydartionBoundary>
  );
}
