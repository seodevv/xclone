import ListsMemberHydrationBoundary from '@/app/(afterLogin)/@i/(.)i/lists/[listId]/_boundary/ListsMemberHydrationBoundary';
import styles from './suggested.layout.module.css';
import LIstsMembersHeader from '@/app/(afterLogin)/@i/(.)i/lists/[listId]/members/_component/ListsMembersHeader';
import ListsMembersTab from '@/app/(afterLogin)/@i/(.)i/lists/[listId]/members/_component/ListsMembersTab';

interface Props {
  params: { listId: string };
  children: React.ReactNode;
}

export default function IListsMemberLayout({ params, children }: Props) {
  const filter = 'members';

  return (
    <ListsMemberHydrationBoundary listId={params.listId} filter={filter}>
      <main className={styles.main}>
        <LIstsMembersHeader />
        <ListsMembersTab listId={params.listId} />
        {children}
      </main>
    </ListsMemberHydrationBoundary>
  );
}
