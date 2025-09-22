'use client';

import { useUserSearchQuery } from '@/app/(afterLogin)/search/_hook/useUserSearchQuery';
import SearchPosts from './SearchPosts';
import SearchUsers from './SearchUsers';
import { useLayoutEffect } from 'react';
import { usePostSearchQuery } from '@/app/(afterLogin)/search/_hook/usePostSearchQuery';
import LoadingSpinner from '@/app/(afterLogin)/_component/loading/LoadingSpinner';
import SearchLists from '@/app/(afterLogin)/search/_component/_body/SearchLists';
import SearchNoResult from '@/app/(afterLogin)/search/_component/_body/SearchNoResult';

interface Props {
  searchParams: { q?: string; f?: string; pf?: string; lf?: string };
}

export default function SearchBody({ searchParams }: Props) {
  const { data: uData, isLoading: uLoading } = useUserSearchQuery({
    searchParams,
  });
  const { data: pData, isLoading: pLoading } = usePostSearchQuery({
    searchParams,
  });
  const { f } = searchParams;

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [f]);

  if (typeof f === 'undefined') {
    if (uLoading || pLoading) {
      return <LoadingSpinner />;
    }

    if (
      uData?.pages.map((page) => page.data).flat().length === 0 &&
      pData?.pages.map((page) => page.data).flat().length === 0
    ) {
      return <SearchNoResult q={searchParams.q} />;
    }

    return (
      <>
        <SearchUsers searchParams={searchParams} />
        <SearchPosts searchParams={searchParams} />
      </>
    );
  }

  if (f === 'live') {
    return <SearchPosts searchParams={searchParams} loading noResult />;
  }

  if (f === 'user') {
    return <SearchUsers searchParams={searchParams} loading noResult />;
  }

  if (f === 'media') {
    return <SearchPosts searchParams={searchParams} loading noResult />;
  }

  if (f === 'lists') {
    return <SearchLists searchParams={searchParams} loading noResult />;
  }

  return <SearchNoResult q={searchParams.q} />;
}
