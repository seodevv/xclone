import { responseErrorHandler } from '@/app/_lib/error';
import { AdvancedPost } from '@/model/Post';
import {
  InfiniteData,
  QueryClient,
  QueryKey,
  useMutation,
} from '@tanstack/react-query';

interface Variables {
  method: 'post' | 'delete';
  post: AdvancedPost;
  queryClient: QueryClient;
}

const usePostPinnedMutation = () =>
  useMutation({
    mutationFn: async ({
      method,
      post,
    }: Variables): Promise<{ data: AdvancedPost; message: string }> => {
      const requestUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts/${post.postid}/pinned`;
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
    onMutate: ({ method, post, queryClient }) => {
      const queryKeys = queryClient
        .getQueryCache()
        .getAll()
        .map((q) => q.queryKey)
        .filter((key) => key[0] === 'posts' && key[1] === 'list');

      const context: {
        queryKey: QueryKey;
        queryData: InfiniteData<TData, number>;
      }[] = [];

      const isKey = (key: any) => {
        return key.filter === 'all';
      };
      queryKeys.forEach((queryKey) => {
        // ['posts', 'list', username, {filter: 'all'}]
        if (queryKey[2] === post.User.id && isKey(queryKey[3])) {
          const queryData =
            queryClient.getQueryData<InfiniteData<TData, number>>(queryKey);
          if (!queryData) return;

          // add pin
          if (method === 'post') {
            const shallow = { ...queryData };
            queryData.pages.forEach((page, i) =>
              page.data.forEach((p, j) => {
                if (p.postid !== post.postid) return;

                shallow.pages = [...shallow.pages];
                shallow.pages[i] = { ...shallow.pages[i] };
                shallow.pages[i].data = [...shallow.pages[i].data];
                shallow.pages[i].data.splice(j, 1);
                shallow.pages[0].data.unshift({ ...p, pinned: true });
                shallow.pageParams = [...shallow.pageParams];
                shallow.pageParams[i] =
                  i === 0
                    ? 0
                    : (shallow.pages[i].data.at(-1)?.postid as number);
              })
            );
            queryClient.setQueryData(queryKey, shallow);
            context.push({ queryKey, queryData });
          }
          // delete pin
          else if (method === 'delete') {
            const flatten = queryData.pages
              .map((page) => page.data.map((p) => p))
              .flat();
            const findPostIndex = flatten.findIndex(
              (p) => p.postid === post.postid
            );
            if (findPostIndex === -1) return;
            flatten[findPostIndex] = {
              ...flatten[findPostIndex],
              pinned: false,
            };

            flatten.sort((a, b) => {
              if (a.pinned && !b.pinned) return -1;
              if (!a.pinned && b.pinned) return 1;
              return a.createat > b.createat ? -1 : 1;
            });
            const shallow = { ...queryData };
            queryData.pages.forEach((page, i) => {
              shallow.pages = [...shallow.pages];
              shallow.pages[i] = {
                ...page,
                data: flatten.slice(10 * i, 10 * (i + 1)),
              };
              shallow.pageParams[i] =
                i === 0
                  ? 0
                  : (flatten.slice(10 * i, 10 * (i + 1)).at(-1)
                      ?.postid as number);
            });

            queryClient.setQueryData(queryKey, shallow);
            context.push({ queryKey, queryData });
          }
        } else {
          const queryData =
            queryClient.getQueryData<InfiniteData<TData, number>>(queryKey);
          if (!queryData) return;

          const shallow = { ...queryData };
          let shouldBeUpdate = false;
          queryData.pages.forEach((page, i) =>
            page.data.forEach((p, j) => {
              if (p.postid === post.postid) {
                shouldBeUpdate = true;
                shallow.pages = [...shallow.pages];
                shallow.pages[i] = { ...shallow.pages[i] };
                shallow.pages[i].data = [...shallow.pages[i].data];
                shallow.pages[i].data[j] = {
                  ...p,
                  pinned: method === 'post' ? true : false,
                };
              } else if (p.Original?.postid === post.postid) {
                shouldBeUpdate = true;
                shallow.pages = [...shallow.pages];
                shallow.pages[i] = { ...shallow.pages[i] };
                shallow.pages[i].data = [...shallow.pages[i].data];
                shallow.pages[i].data[j] = {
                  ...p,
                  Original: {
                    ...p.Original,
                    pinned: method === 'post' ? true : false,
                  },
                };
              }
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
    onSuccess: (response, { queryClient, post }, context) => {
      context.forEach(({ queryKey }) => {
        queryClient.invalidateQueries({ queryKey, refetchType: 'none' });
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

interface TData {
  data: AdvancedPost[];
  nextCursor?: number;
  message: string;
}

export default usePostPinnedMutation;
