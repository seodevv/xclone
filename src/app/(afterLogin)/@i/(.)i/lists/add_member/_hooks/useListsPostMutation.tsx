'use client';

import { responseErrorHandler } from '@/app/_lib/error';
import { AdvancedLists } from '@/model/Lists';
import { AdvancedPost } from '@/model/Post';
import {
  InfiniteData,
  QueryClient,
  QueryKey,
  useMutation,
} from '@tanstack/react-query';

interface MutationParams {
  queryClient: QueryClient;
  method: 'post' | 'delete';
  listId: AdvancedLists['id'];
  postId: AdvancedPost['postId'];
}

const useListsPostMutation = () =>
  useMutation({
    mutationFn: async ({
      method,
      listId,
      postId,
    }: MutationParams): Promise<{ data: AdvancedLists; message: string }> => {
      const requestUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/lists/${listId}/post`;
      const requestOptions: RequestInit = {
        method,
        body: JSON.stringify({
          postId,
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
    onMutate: ({ queryClient, method, listId, postId }) => {
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

        queryData.pages.forEach((page, i) =>
          page.data.forEach((l, j) => {
            if (l.id !== listId) return;
            const shallow = { ...queryData, pages: [...queryData.pages] };
            shallow.pages[i] = {
              ...shallow.pages[i],
              data: [...shallow.pages[i].data],
            };
            if (method === 'post') {
              shallow.pages[i].data[j] = {
                ...l,
                Posts: [...l.Posts, postId],
              };
            } else if (method === 'delete') {
              shallow.pages[i].data[j] = {
                ...l,
                Posts: l.Posts.filter((n) => n !== postId),
              };
            }
            queryClient.setQueryData(queryKey, shallow);
            context.push({ queryKey, queryData });
          })
        );
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

export default useListsPostMutation;

interface TData {
  data: AdvancedLists[];
  nextCursor?: number;
  message: string;
}
