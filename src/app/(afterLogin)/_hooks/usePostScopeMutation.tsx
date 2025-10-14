import { responseErrorHandler } from '@/app/_lib/error';
import { AdvancedPost } from '@/model/Post';
import {
  InfiniteData,
  QueryClient,
  QueryKey,
  useMutation,
} from '@tanstack/react-query';

interface MutationParam {
  queryClient: QueryClient;
  post: AdvancedPost;
  scope: AdvancedPost['scope'];
}

const usePostScopeMutation = () =>
  useMutation({
    mutationFn: async ({
      post,
      scope,
    }: MutationParam): Promise<{ data: AdvancedPost; message: string }> => {
      const requestUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts/${post.postid}/scope`;
      const requestOptions: RequestInit = {
        method: 'POST',
        body: JSON.stringify({
          scope,
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
    onMutate: ({ queryClient, post, scope }) => {
      const queryKeys = queryClient
        .getQueryCache()
        .getAll()
        .map((q) => q.queryKey)
        .filter((key) => key[0] === 'posts');
      const context: {
        queryKey: QueryKey;
        queryData:
          | TData<AdvancedPost>
          | InfiniteData<TData<AdvancedPost[]>, number>;
      }[] = [];

      queryKeys.forEach((queryKey) => {
        // ['posts', post.postid]
        if (queryKey[1] === post.postid.toString()) {
          const queryData =
            queryClient.getQueryData<TData<AdvancedPost>>(queryKey);
          if (!queryData) return;

          const shallow = { ...queryData, data: { ...queryData.data, scope } };
          queryClient.setQueryData(queryKey, shallow);
          context.push({ queryKey, queryData });
        }
        // ['posts', 'list', *]
        else if (queryKey[1] === 'list') {
          const queryData =
            queryClient.getQueryData<
              InfiniteData<TData<AdvancedPost[]>, number>
            >(queryKey);
          if (!queryData) return;

          queryData.pages.forEach((page, i) =>
            page.data.forEach((p, j) => {
              if (p.postid === post.postid) {
                const shallow = { ...queryData, page: [...queryData.pages] };
                shallow.pages[i] = {
                  ...shallow.pages[i],
                  data: [...shallow.pages[i].data],
                };
                shallow.pages[i].data[j] = {
                  ...p,
                  scope,
                };
                queryClient.setQueryData(queryKey, shallow);
                context.push({ queryKey, queryData });
              } else if (p.Original?.postid === post.postid) {
                const shallow = { ...queryData, page: [...queryData.pages] };
                shallow.pages[i] = {
                  ...shallow.pages[i],
                  data: [...shallow.pages[i].data],
                };
                shallow.pages[i].data[j] = {
                  ...p,
                  Original: {
                    ...p.Original,
                    scope,
                  },
                };
                queryClient.setQueryData(queryKey, shallow);
                context.push({ queryKey, queryData });
              }
            })
          );
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

export default usePostScopeMutation;

interface TData<T> {
  data: T;
  nextCursor?: number;
  message: string;
}
