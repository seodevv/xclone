'use client';

import { responseErrorHandler } from '@/app/_lib/error';
import { AdvancedLists } from '@/model/Lists';
import {
  InfiniteData,
  QueryClient,
  QueryKey,
  useMutation,
} from '@tanstack/react-query';

interface MutationParams {
  queryClient: QueryClient;
  method: 'post' | 'delete';
  sessionid: string;
  lists: AdvancedLists;
}

const useListsFollowMutation = () =>
  useMutation({
    mutationFn: async ({ method, lists }: MutationParams) => {
      const requestUrl = `/api/v1/lists/${lists.id}/follow`;
      const requestOptions: RequestInit = {
        method,
        credentials: 'include',
      };

      const response = await fetch(requestUrl, requestOptions);
      if (response.ok) {
        return response.json();
      }

      return responseErrorHandler(response);
    },
    onMutate: ({ queryClient, method, sessionid, lists }) => {
      const queryKeys = queryClient
        .getQueryCache()
        .getAll()
        .map((c) => c.queryKey)
        .filter((key) => key[0] === 'lists');

      const context: {
        queryKey: QueryKey;
        queryData: TData<AdvancedLists> | InfiniteData<TData<AdvancedLists[]>>;
      }[] = [];

      const isTData = (
        queryData: TData<AdvancedLists> | InfiniteData<TData<AdvancedLists[]>>
      ): queryData is TData<AdvancedLists> => {
        return Object.hasOwn(queryData, 'data');
      };

      queryKeys.forEach((queryKey) => {
        const queryData = queryClient.getQueryData<
          TData<AdvancedLists> | InfiniteData<TData<AdvancedLists[]>, number>
        >(queryKey);
        if (!queryData) return;

        if (isTData(queryData)) {
          if (queryData.data.id !== lists.id) return;
          const shallow: TData<AdvancedLists> = {
            ...queryData,
            data: {
              ...queryData.data,
              Follower:
                method === 'post'
                  ? [...queryData.data.Follower, { id: sessionid }]
                  : queryData.data.Follower.filter((f) => f.id !== sessionid),
            },
          };
          queryClient.setQueryData(queryKey, shallow);
          context.push({ queryKey, queryData });
        } else {
          const shallow = {
            ...queryData,
            pages: [...queryData.pages],
          };
          let shouldBeUpdate = false;

          const filterIsAll = (key: any) => {
            return key.filter === 'all';
          };
          // queryKey is ['lists', 'list', sessionid, {filter: 'all'}]
          if (
            queryKey[1] === 'list' &&
            queryKey[2] === sessionid &&
            filterIsAll(queryKey[3])
          ) {
            shouldBeUpdate = true;
            if (method === 'post') {
              shallow.pages[0] = {
                ...shallow.pages[0],
                data: [lists, ...shallow.pages[0].data],
              };
            } else if (method === 'delete') {
              shallow.pages.forEach((page, i) => {
                shallow.pages[i] = {
                  ...page,
                  data: page.data.filter((l) => l.id !== lists.id),
                };
              });
            }
          }

          // queryKey is ['lists', *]
          shallow.pages.forEach((page, i) =>
            page.data.forEach((l, j) => {
              if (l.id !== lists.id) return;
              shouldBeUpdate = true;
              shallow.pages[i] = {
                ...page,
                data: [...page.data],
              };
              shallow.pages[i].data[j] = {
                ...l,
                Follower:
                  method === 'post'
                    ? [...l.Follower, { id: sessionid }]
                    : l.Follower.filter((f) => f.id !== sessionid),
              };
            })
          );

          if (shouldBeUpdate) {
            queryClient.setQueryData(queryKey, shallow);
            context.push({ queryKey, queryData });
          }
        }
      });
      return context;
    },
    onSuccess: (response, { queryClient }, context) => {
      context.forEach(({ queryKey }) => {
        queryClient.invalidateQueries({
          queryKey,
          refetchType: 'none',
        });
      });
    },
    onError: (error, { queryClient }, context) => {
      if (context) {
        context.forEach(({ queryKey, queryData }) => {
          queryClient.setQueryData(queryKey, queryData);
        });
      }
    },
  });

export default useListsFollowMutation;

interface TData<T> {
  data: T;
  nextCursor?: number;
  message: string;
}
