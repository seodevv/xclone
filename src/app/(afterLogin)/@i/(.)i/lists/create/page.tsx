import styles from './IListCreate.page.module.css';
import IListsProvider from '@/app/(afterLogin)/@i/(.)i/lists/create/_provider/IListsProvider';
import IListCreateHeader from '@/app/(afterLogin)/@i/(.)i/lists/create/_component/_header/IListCreateHeader';
import ListsCreatePhase from '@/app/(afterLogin)/@i/(.)i/lists/create/_component/ListsCreatePhase';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/_lib/authOptions';
import AddHistoryStack from '@/app/(afterLogin)/@i/(.)i/_component/AddHistoryStack';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lists / XClone',
};

export default async function IListsCreateSlot() {
  const session = await getServerSession(authOptions);

  if (!session) return;

  return (
    <IListsProvider mode="create">
      <AddHistoryStack />
      <main className={styles.main}>
        <IListCreateHeader session={session} />
        <ListsCreatePhase />
      </main>
    </IListsProvider>
  );
}
