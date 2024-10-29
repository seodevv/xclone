import { ERROR_STATUS, responseErrorHandler } from '@/app/_lib/error';
import { AdvancedPost } from '@/model/Post';
import { AdvancedUser } from '@/model/User';
import {
  InfiniteData,
  QueryClient,
  QueryKey,
  useMutation,
} from '@tanstack/react-query';

interface ViewMutationParams {
  queryClient: QueryClient;
}

const useViewMutation = ({
  userid,
  postid,
}: {
  userid: AdvancedUser['id'];
  postid: AdvancedPost['postid'];
}) =>
  useMutation({
    mutationFn: async ({}: ViewMutationParams) => {
      if (postid < 1) {
        throw new Error(ERROR_STATUS.badRequest);
      }

      const requestUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts/${postid}/views`;
      const requestOptions: RequestInit = {
        method: 'POST',
        body: JSON.stringify({ userid }),
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
    onMutate: ({ queryClient }) => {
      const queryKeys = queryClient
        .getQueryCache()
        .getAll()
        .map((q) => q.queryKey);
      const context: {
        queryKey: QueryKey;
        queryData:
          | TData<AdvancedPost>
          | InfiniteData<TData<AdvancedPost[]>, number>;
      }[] = [];
      queryKeys.forEach((queryKey) => {
        const [a, b] = queryKey;

        switch ([a, b].toString()) {
          case `posts,${postid}`: {
            const queryData =
              queryClient.getQueryData<TData<AdvancedPost>>(queryKey);
            if (!queryData) return;

            const shallow = {
              ...queryData,
              data: {
                ...queryData.data,
                _count: {
                  ...queryData.data._count,
                  Views: queryData.data._count.Views + 1,
                },
              },
            };
            queryClient.setQueryData(queryKey, shallow);
            context.push({ queryKey, queryData });
            break;
          }
          case 'posts,list':
            {
              const queryData =
                queryClient.getQueryData<
                  InfiniteData<TData<AdvancedPost[]>, number>
                >(queryKey);
              if (!queryData) return;

              queryData.pages.forEach((page, i) =>
                page.data.forEach((p, j) => {
                  if (p.postid === postid) {
                    const shallow = { ...queryData };
                    shallow.pages = [...shallow.pages];
                    shallow.pages[i] = { ...shallow.pages[i] };
                    shallow.pages[i].data = [...shallow.pages[i].data];
                    shallow.pages[i].data[j] = {
                      ...p,
                      _count: {
                        ...p._count,
                        Views: p._count.Views + 1,
                      },
                    };
                    queryClient.setQueryData(queryKey, shallow);
                    context.push({ queryKey, queryData });
                  } else if (p.Original?.postid === postid) {
                    const shallow = { ...queryData };
                    shallow.pages = [...shallow.pages];
                    shallow.pages[i] = { ...shallow.pages[i] };
                    shallow.pages[i].data = [...shallow.pages[i].data];
                    shallow.pages[i].data[j] = {
                      ...p,
                      Original: {
                        ...p.Original,
                        _count: {
                          ...p.Original._count,
                          Views: p.Original._count.Views,
                        },
                      },
                    };
                    queryClient.setQueryData(queryKey, shallow);
                    context.push({ queryKey, queryData });
                  }
                })
              );
            }
            break;
        }
      });

      return context;
    },
    onError: (error, { queryClient }, context) => {
      console.error(error);
      if (context) {
        context.forEach(({ queryKey, queryData }) => {
          queryClient.setQueryData(queryKey, queryData);
        });
      }
    },
  });

export default useViewMutation;

interface TData<T> {
  data: T;
  nextCursor?: number;
  message: string;
}
