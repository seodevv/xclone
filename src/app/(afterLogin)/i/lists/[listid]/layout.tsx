import SingleListsHydartionBoundary from '@/app/(afterLogin)/i/lists/[listid]/_boundary/SingleListsHydrationBoundary';
import SingleListsHeader from '@/app/(afterLogin)/i/lists/[listid]/_component/SingleListsHeader';

interface Props {
  params: { listid: string };
  children: React.ReactNode;
}

export default function SingleListsLayout({ params, children }: Props) {
  return (
    <SingleListsHydartionBoundary listid={params.listid}>
      <SingleListsHeader listid={params.listid} />
      {children}
    </SingleListsHydartionBoundary>
  );
}
