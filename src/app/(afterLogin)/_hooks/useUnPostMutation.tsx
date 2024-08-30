'use client';

import { responseErrorHandler } from '@/app/_lib/error';
import { AdvancedPost } from '@/model/Post';
import {
  InfiniteData,
  QueryClient,
  QueryKey,
  useMutation,
} from '@tanstack/react-query';

interface MutationParams {
  queryClient: QueryClient;
  post: AdvancedPost;
}

const useUnPostMutation = () =>
  useMutation({
    mutationFn: async ({ post }: MutationParams) => {
      const requestUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts/${post.postId}`;
      const requestOptions: RequestInit = {
        method: 'DELETE',
        credentials: 'include',
      };

      const response = await fetch(requestUrl, requestOptions);

      if (response.ok) {
        return 'ok';
      }

      return responseErrorHandler(response);
    },
    onMutate: ({ queryClient, post }) => {
      const queryKeys = queryClient
        .getQueryCache()
        .getAll()
        .map((q) => q.queryKey)
        .filter((key) => key[0] === 'posts' && key[1] === 'list');
      const context: {
        queryKey: QueryKey;
        queryData: InfiniteData<TData<AdvancedPost[]>, number>;
      }[] = [];

      queryKeys.forEach((queryKey) => {
        const queryData =
          queryClient.getQueryData<InfiniteData<TData<AdvancedPost[]>, number>>(
            queryKey
          );
        if (!queryData) return;

        const shallow = { ...queryData, pages: [...queryData.pages] };
        let shouldBeUpdate = false;
        queryData.pages.forEach((page, i) =>
          page.data.forEach((p, j) => {
            if (p.postId === post.postId) {
              shouldBeUpdate = true;
              shallow.pages[i] = {
                ...shallow.pages[i],
                data: shallow.pages[i].data.filter(
                  (p) => p.postId !== post.postId
                ),
              };
            } else if (!p.quote && p.Original?.postId === post.postId) {
              shouldBeUpdate = true;
              shallow.pages[i] = {
                ...shallow.pages[i],
                data: shallow.pages[i].data.filter(
                  (p) => p.quote || p.Original?.postId !== post.postId
                ),
              };
            }
          })
        );
        if (shouldBeUpdate) {
          queryClient.setQueryData(queryKey, shallow);
          context.push({ queryKey, queryData });
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

interface TData<T> {
  data: T;
  nextCursor?: number;
  message: string;
}

export default useUnPostMutation;
