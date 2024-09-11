import ListsRecommends from '@/app/(afterLogin)/[username]/lists/_component/ListsRecommends';
import ListsSuggestedHydrationBoundary from '@/app/(afterLogin)/i/lists/suggested/_boundary/ListsSuggestedHydrationBoundary';
import ListsSuggestedDescription from '@/app/(afterLogin)/i/lists/suggested/_component/ListsSuggestedDescription';
import ListsSuggestedHeader from '@/app/(afterLogin)/i/lists/suggested/_component/ListsSuggestedHeader';
import DivideLine from '@/app/_component/_util/DivideLine';

export default function ListsSuggested() {
  return (
    <ListsSuggestedHydrationBoundary>
      <main>
        <ListsSuggestedHeader />
        <ListsSuggestedDescription type="info" />
        <DivideLine />
        <ListsRecommends />
        <DivideLine />
        <ListsSuggestedDescription type="create" />
      </main>
    </ListsSuggestedHydrationBoundary>
  );
}
