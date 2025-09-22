import styles from './searchBody.module.css';
import { useUserSearchQuery } from '../../_hook/useUserSearchQuery';
import FollowRecommend from '@/app/(afterLogin)/_component/follow_recommends/FollowRecommend';
import Link from 'next/link';
import LoadingSpinner from '@/app/(afterLogin)/_component/loading/LoadingSpinner';
import PageLoading from '@/app/(afterLogin)/_component/loading/PageLoading';
import SearchNoResult from '@/app/(afterLogin)/search/_component/_body/SearchNoResult';

interface Props {
  searchParams: { q?: string; f?: string; pf?: string; lf?: string };
  loading?: boolean;
  noResult?: boolean;
}
export default function SearchUsers({
  searchParams,
  loading,
  noResult,
}: Props) {
  const {
    data: searchUsers,
    hasNextPage,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  } = useUserSearchQuery({
    searchParams,
  });
  const { f } = searchParams;
  const isTop = typeof f === 'undefined';
  const linkSearchParams = new URLSearchParams(searchParams);
  linkSearchParams.set('f', 'user');

  if (typeof searchUsers !== 'undefined') {
    const flatten = searchUsers.pages.map((page) => page.data).flat();
    const isEmpty = flatten.length === 0;

    if (noResult && isEmpty) {
      return <SearchNoResult q={searchParams.q} />;
    }

    return (
      <>
        {isTop && !isEmpty && (
          <div className={styles.people}>
            <span>People</span>
          </div>
        )}
        {flatten.map((user, i) => {
          if (isTop && i > 2) return null;
          return <FollowRecommend key={user.id} user={user} isDesc />;
        })}
        {!isTop && (
          <PageLoading
            type="next"
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            isError={isError}
            fetchNextPage={fetchNextPage}
            refetch={refetch}
          />
        )}
        {isTop && !isEmpty && (
          <Link
            className={styles.viewAll}
            href={`/search?${linkSearchParams.toString()}`}
          >
            View all
          </Link>
        )}
      </>
    );
  }

  if (loading && isLoading) {
    return <LoadingSpinner />;
  }

  return null;
}
