'use client';

import styles from './loading.module.css';
import {
  FetchNextPageOptions,
  FetchPreviousPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
  QueryObserverResult,
  RefetchOptions,
} from '@tanstack/react-query';
import ObserveElement from '../observer/ObserveElement';
import LoadingSpinner from './LoadingSpinner';
import DisConnection from '../error/DisConnection';
import PostBlank from '@/app/(afterLogin)/_component/post/PostBlank';

interface PreviousProps<TData> {
  type: 'previous';
  hasPreviousPage: boolean;
  isFetchingPreviousPage?: boolean;
  isError?: boolean;
  fetchPreviousPage: (
    options?: FetchPreviousPageOptions
  ) => Promise<
    InfiniteQueryObserverResult<InfiniteData<TData, unknown>, Error>
  >;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<InfiniteData<TData, unknown>, Error>>;
}

interface NextProps<TData> {
  type: 'next';
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

export default function PageLoading<TData>(
  props: NextProps<TData> | PreviousProps<TData>
) {
  const isPrev = props.type === 'previous';
  const isNext = props.type === 'next';

  return (
    <>
      {isNext && props.isFetchingNextPage && (
        <LoadingSpinner className={styles.pageLoadingSpinner} />
      )}
      <ObserveElement
        callback={() => {
          if (
            isPrev &&
            !props.isError &&
            !props.isFetchingPreviousPage &&
            props.hasPreviousPage
          ) {
            props.fetchPreviousPage();
          } else if (
            isNext &&
            !props.isError &&
            !props.isFetchingNextPage &&
            props.hasNextPage
          ) {
            props.fetchNextPage();
          }
        }}
        dependencies={[
          isPrev ? props.hasPreviousPage : props.hasNextPage,
          isPrev ? props.isFetchingPreviousPage : props.isFetchingNextPage,
          props.isError,
          isPrev ? props.fetchPreviousPage : props.fetchNextPage,
        ]}
        isFetching={
          isPrev ? props.isFetchingPreviousPage : props.isFetchingNextPage
        }
        active={
          isPrev ? props.hasPreviousPage : props.hasNextPage && !props.isError
        }
      />
      {props.isError && <DisConnection onClick={() => props.refetch()} />}
      {isPrev && props.isFetchingPreviousPage && (
        <LoadingSpinner className={styles.pageLoadingSpinner} />
      )}
      {isNext && <PostBlank hasNextPage={isNext && props.hasNextPage} />}
    </>
  );
}
