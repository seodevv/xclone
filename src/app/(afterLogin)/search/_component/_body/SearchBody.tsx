'use client';

import styles from './searchBody.module.css';
import SearchPosts from './SearchPosts';
import { usePostSearchQuery } from '../../_hook/usePostSearchQuery';
import { useUserSearchQuery } from '../../_hook/useUserSearchQuery';
import LoadingSpinner from '@/app/(afterLogin)/_component/loading/LoadingSpinner';
import SearchNoResult from './SearchNoResult';
import SearchUsers from './SearchUsers';
import { useEffect } from 'react';

interface Props {
  searchParams: { q?: string; f?: string; pf?: string; lf?: string };
}

export default function SearchBody({ searchParams }: Props) {
  const {
    isLoading: pLoading,
    isEmpty: pEmpty,
    enabled: pEnabled,
  } = usePostSearchQuery({
    searchParams,
  });
  const {
    isLoading: uLoading,
    isEmpty: uEmpty,
    enabled: uEnabled,
  } = useUserSearchQuery({
    searchParams,
  });

  useEffect(() => {
    if (pLoading || uLoading) {
      window.scrollTo(0, 0);
    }
  }, [searchParams.f]);

  if (pLoading || uLoading) {
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
