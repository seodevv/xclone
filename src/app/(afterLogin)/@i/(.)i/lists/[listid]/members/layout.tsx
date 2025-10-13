import ListsMemberHydrationBoundary from '@/app/(afterLogin)/@i/(.)i/lists/[listid]/_boundary/ListsMemberHydrationBoundary';
import styles from './suggested.layout.module.css';
import LIstsMembersHeader from '@/app/(afterLogin)/@i/(.)i/lists/[listid]/members/_component/ListsMembersHeader';
import ListsMembersTab from '@/app/(afterLogin)/@i/(.)i/lists/[listid]/members/_component/ListsMembersTab';
import { Metadata } from 'next';

interface Props {
  params: { listid: string };
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'List / XClone',
};

export default function IListsMemberLayout({
  params: { listid },
  children,
}: Props) {
  const filter = 'members';

  return (
    <ListsMemberHydrationBoundary listid={listid} filter={filter}>
      <main className={styles.main}>
        <LIstsMembersHeader listid={listid} />
        <ListsMembersTab listid={listid} />
        {children}
      </main>
    </ListsMemberHydrationBoundary>
  );
}
