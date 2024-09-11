'use client';

import useGetListsRecommends from '@/app/(afterLogin)/[username]/lists/_hooks/useGetListsRecommends';
import styles from './listsRecommends.module.css';
import Link from 'next/link';
import LoadingSpinner from '@/app/(afterLogin)/_component/loading/LoadingSpinner';
import DisConnection from '@/app/(afterLogin)/_component/error/DisConnection';
import Lists from '@/app/(afterLogin)/@i/(.)i/lists/_component/Lists';
import { useRouter } from 'next/navigation';
import { AdvancedLists } from '@/model/Lists';
import PageLoading from '@/app/(afterLogin)/_component/loading/PageLoading';

interface Props {
  more?: boolean;
}

export default function ListsRecommends({ more }: Props) {
  const router = useRouter();
  const {
    data: listsRecommends,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isLoading,
    fetchNextPage,
    refetch,
  } = useGetListsRecommends();

  const onClickLists = (listId: AdvancedLists['id']) => {
    router.push(`/i/lists/${listId}`);
  };

  if (listsRecommends) {
    return (
      <div className={styles.recommends}>
        <RecommendsTitle />
        {listsRecommends.pages[0].data.map((lists, i) => {
          if (more && i > 2) return null;
          return (
            <Lists
              key={lists.id}
              lists={lists}
              follow
              onClick={() => onClickLists(lists.id)}
            />
          );
        })}
        {more && <RecommendsMore />}
        {!more && (
          <PageLoading
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            isError={isError}
            fetchNextPage={fetchNextPage}
            refetch={refetch}
          />
        )}
      </div>
    );
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <DisConnection onClick={() => refetch()} />;
  }

  return null;
}

function RecommendsTitle() {
  return (
    <div className={styles.title}>
      <span>Discover new Lists</span>
    </div>
  );
}

function RecommendsMore() {
  return (
    <Link className={styles.more} href="/i/lists/suggested">
      Show more
    </Link>
  );
}
