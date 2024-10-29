import AddHistoryStack from '@/app/(afterLogin)/@i/(.)i/_component/AddHistoryStack';
import styles from './IListsInfo.page.module.css';
import IListsInfoHeader from '@/app/(afterLogin)/@i/(.)i/lists/[listid]/info/_component/IListsInfoHeader';
import ListsCreatePhase from '@/app/(afterLogin)/@i/(.)i/lists/create/_component/ListsCreatePhase';
import IListsProvider from '@/app/(afterLogin)/@i/(.)i/lists/create/_provider/IListsProvider';

interface Props {
  params: { listid: string };
}

export default function IListsInfoSlot({ params }: Props) {
  return (
    <IListsProvider mode="edit">
      <AddHistoryStack />
      <main className={styles.main}>
        <IListsInfoHeader />
        <ListsCreatePhase />
      </main>
    </IListsProvider>
  );
}
