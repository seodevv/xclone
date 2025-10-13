import styles from './suggested.page.module.css';
import SuggestedProvider from '@/app/(afterLogin)/@i/(.)i/lists/[listid]/members/suggested/_provider/SuggestedProvider';
import SuggestedSearch from '@/app/(afterLogin)/@i/(.)i/lists/[listid]/members/suggested/_component/SuggestedSearch';
import AddHistoryStack from '@/app/(afterLogin)/@i/(.)i/_component/AddHistoryStack';

interface Props {
  params: { listid: string };
}

export default function IListsMembersSuggestedSlot({ params }: Props) {
  return (
    <SuggestedProvider>
      <AddHistoryStack />
      <main className={styles.search}>
        <SuggestedSearch listid={params.listid} />
      </main>
    </SuggestedProvider>
  );
}
