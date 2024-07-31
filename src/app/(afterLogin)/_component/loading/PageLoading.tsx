'use client';

import styles from './loading.module.css';
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
  QueryObserverResult,
  RefetchOptions,
} from '@tanstack/react-query';
import ObserveElement from '../observer/ObserveElement';
import LoadingSpinner from './LoadingSpinner';
import DisConnection from '../error/DisConnection';

interface Props<TData> {
  hasNextPage: boolean;
  isFetchingNextPage?: boolean;
  isError?: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions
  ) => Promise<
    InfiniteQueryObserverResult<InfiniteData<TData, unknown>, Error>
  >;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<InfiniteData<TData, unknown>, Error>>;
}

export default function PageLoading<TData>({
  hasNextPage,
  isFetchingNextPage,
  isError,
  fetchNextPage,
  refetch,
}: Props<TData>) {
  return (
    <>
      {isFetchingNextPage && (
        <LoadingSpinner className={styles.pageLoadingSpinner} />
      )}
      <ObserveElement
        callback={() => {
          if (!isError && !isFetchingNextPage && hasNextPage) {
            fetchNextPage();
          }
        }}
        dependencies={[hasNextPage, isFetchingNextPage, isError, fetchNextPage]}
        isFetching={isFetchingNextPage}
        active={hasNextPage && !isError}
      />
      {isError && <DisConnection onClick={() => refetch()} />}
    </>
  );
}
