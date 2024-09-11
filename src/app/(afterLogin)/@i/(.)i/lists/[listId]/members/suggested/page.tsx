import styles from './suggested.page.module.css';
import SuggestedProvider from '@/app/(afterLogin)/@i/(.)i/lists/[listId]/members/suggested/_provider/SuggestedProvider';
import SuggestedSearch from '@/app/(afterLogin)/@i/(.)i/lists/[listId]/members/suggested/_component/SuggestedSearch';
import AddHistoryStack from '@/app/(afterLogin)/@i/(.)i/_component/AddHistoryStack';

interface Props {
  params: { listId: string };
}

export default function IListsMembersSuggestedSlot({ params }: Props) {
  return (
    <SuggestedProvider>
      <AddHistoryStack />
      <main className={styles.search}>
        <SuggestedSearch listId={params.listId} />
      </main>
    </SuggestedProvider>
  );
}
