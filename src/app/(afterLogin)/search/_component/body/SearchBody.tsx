'use client';

import styles from './searchBody.module.css';
import { usePostSearchQuery } from '../../_hook/usePostSearchQuery';
import { useUserSearchQuery } from '../../_hook/useUserSearchQuery';
import SearchPosts from './SearchPosts';
import LoadingSpinner from '@/app/(afterLogin)/_component/loading/LoadingSpinner';
import SearchNoResult from './SearchNoResult';
import SearchUsers from './SearchUsers';

interface Props {
  searchParams: { q?: string; f?: string; pf?: string; lf?: string };
}

export default function SearchBody({ searchParams }: Props) {
  const {
    isLoading: pLoading,
    isFetching: pFetching,
    isEmpty: pEmpty,
    enabled: pEnabled,
  } = usePostSearchQuery({
    searchParams,
  });
  const {
    isLoading: uLoading,
    isFetching: uFetching,
    isEmpty: uEmpty,
    enabled: uEnabled,
  } = useUserSearchQuery({
    searchParams,
  });

  if (pLoading || pFetching || uLoading || uFetching) {
    return <LoadingSpinner />;
  }

  if (pEnabled && uEnabled && pEmpty && uEmpty) {
    return <SearchNoResult q={searchParams.q} />;
  } else if (pEnabled && !uEnabled && pEmpty) {
    return <SearchNoResult q={searchParams.q} />;
  } else if (!pEnabled && uEnabled && uEmpty) {
    return <SearchNoResult q={searchParams.q} />;
  }

  return (
    <section className={styles.body}>
      <SearchUsers searchParams={searchParams} />
      <SearchPosts searchParams={searchParams} />
    </section>
  );
}
