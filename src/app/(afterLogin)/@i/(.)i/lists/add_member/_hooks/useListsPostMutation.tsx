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
  listid: AdvancedLists['id'];
  postid: AdvancedPost['postid'];
}

const useListsPostMutation = () =>
  useMutation({
    mutationFn: async ({
      method,
      listid,
      postid,
    }: MutationParams): Promise<{ data: AdvancedLists; message: string }> => {
      const requestUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/lists/${listid}/post`;
      const requestOptions: RequestInit = {
        method,
        body: JSON.stringify({
          postid,
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
    onMutate: ({ queryClient, method, listid, postid }) => {
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
            if (l.id !== listid) return;
            const shallow = { ...queryData, pages: [...queryData.pages] };
            shallow.pages[i] = {
              ...shallow.pages[i],
              data: [...shallow.pages[i].data],
            };
            if (method === 'post') {
              shallow.pages[i].data[j] = {
                ...l,
                Posts: [...l.Posts, postid],
              };
            } else if (method === 'delete') {
              shallow.pages[i].data[j] = {
                ...l,
                Posts: l.Posts.filter((n) => n !== postid),
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
    onSuccess: (response, { queryClient, listid }, context) => {
      queryClient.invalidateQueries({
        queryKey: ['posts', 'list', 'lists', listid.toString()],
        refetchType: 'active',
      });
    },
  });

export default useListsPostMutation;

interface TData {
  data: AdvancedLists[];
  nextCursor?: number;
  message: string;
}
