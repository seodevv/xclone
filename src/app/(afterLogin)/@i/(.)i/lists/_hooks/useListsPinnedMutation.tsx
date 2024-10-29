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
  listid: AdvancedLists['id'];
  userid: AdvancedLists['userid'];
}

const useListsPinnedMutation = () =>
  useMutation({
    mutationFn: async ({ method, listid, userid }: MutationParams) => {
      const requestUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/lists/${listid}/pinned`;
      const requestOptions: RequestInit = {
        method,
        body: JSON.stringify({
          userid,
        }),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(requestUrl, requestOptions);
      if (response.ok) {
        return response.json();
      }

      return responseErrorHandler(response);
    },
    onMutate: ({ queryClient, method, listid }) => {
      const queryKeys = queryClient
        .getQueryCache()
        .getAll()
        .map((c) => c.queryKey)
        .filter((key) => key[0] === 'lists' && key[1] === 'list');

      const context: {
        queryKey: QueryKey;
        queryData: InfiniteData<TData, number>;
      }[] = [];

      queryKeys.forEach((queryKey) => {
        const queryData =
          queryClient.getQueryData<InfiniteData<TData, number>>(queryKey);
        if (!queryData) return;

        const flatten = queryData.pages
          .map((page) => page.data.map((l) => l))
          .flat();
        const findListsIndex = flatten.findIndex((l) => l.id === listid);
        if (findListsIndex === -1) return;

        flatten[findListsIndex] = {
          ...flatten[findListsIndex],
          Pinned: method === 'post' ? true : false,
        };

        flatten.sort((a, b) => {
          if (a.Pinned && !b.Pinned) return -1;
          if (!a.Pinned && b.Pinned) return 1;
          return a.createat > b.createat ? -1 : 1;
        });

        const shallow = { ...queryData, pages: [...queryData.pages] };
        queryData.pages.forEach((page, i) => {
          shallow.pages[i] = {
            ...page,
            data: flatten.slice(10 * i, 10 * (i + 1)),
          };
          shallow.pageParams[i] =
            i === 0
              ? 0
              : (flatten.slice(10 * i, 10 * (i + 1)).at(-1)?.id as number);
        });

        queryClient.setQueryData(queryKey, shallow);
        context.push({ queryKey, queryData });
      });
      return context;
    },
    onError: (error, { queryClient }, context) => {
      if (context) {
        context.forEach(({ queryKey, queryData }) => {
          queryClient.setQueryData(queryKey, queryData);
        });
      }
    },
  });

export default useListsPinnedMutation;

interface TData {
  data: AdvancedLists[];
  nextCursor?: number;
  message: string;
}
