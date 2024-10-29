'use client';

import { AdvancedPost } from '@/model/Post';
import {
  InfiniteData,
  QueryClient,
  QueryKey,
  useMutation,
} from '@tanstack/react-query';

interface ReactionMutationParams {
  queryClient: QueryClient;
  type: 'Comments' | 'Hearts' | 'Reposts' | 'Bookmarks';
  method: 'post' | 'delete';
  post: AdvancedPost;
  sessionid: string;
}

const useReactionMutation = () =>
  useMutation({
    mutationFn: async ({
      type,
      method,
      post,
    }: ReactionMutationParams): Promise<
      | {
          data: AdvancedPost;
          message: string;
        }
      | undefined
    > => {
      const requestUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts/${
        post.postid
      }/${type.toLowerCase()}`;
      const requestOptions: RequestInit = {
        method,
        credentials: 'include',
      };

      const response = await fetch(requestUrl, requestOptions);

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      if (response.status === 204) {
        return new Promise((resolve) => resolve(undefined));
      }

      return response.json();
    },
    onMutate: ({ queryClient, type, method, post, sessionid }) => {
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache.getAll().map((q) => q.queryKey);

      const context: {
        queryKey: QueryKey;
        queryData:
          | { data: AdvancedPost; message: string }
          | InfiniteData<
              { data: AdvancedPost[]; nextCursor?: number; message: string },
              number
            >;
      }[] = [];
      queryKeys.forEach((queryKey) => {
        const [a, b, c] = queryKey;

        switch ([a, b].toString()) {
          case `posts,${post.postid}`: {
            // queryKey is ['posts', postid, *]
            const queryData = queryClient.getQueryData<{
              data: AdvancedPost;
              message: string;
            }>(queryKey);
            if (!queryData) return;

            const shallow = { ...queryData };
            const already = shallow.data[type]
              .map((u) => u.id)
              .includes(sessionid);
            // increase reaction
            // type is 'Comments' | 'Reposts' | 'Hearts' | 'Bookmarks'
            if (method === 'post' && !already) {
              shallow.data = {
                ...shallow.data,
                [type]: [...shallow.data[type], { id: sessionid }],
                _count: {
                  ...queryData.data._count,
                  [type]: shallow.data._count[type] + 1,
                },
              };
            }
            // decrease reaction
            // type is 'Comments' | 'Reposts' | 'Hearts' | 'Bookmarks'
            else if (method === 'delete' && already) {
              shallow.data = {
                ...shallow.data,
                [type]: queryData.data[type].filter((u) => u.id !== sessionid),
                _count: {
                  ...queryData.data._count,
                  [type]:
                    shallow.data._count[type] < 1
                      ? 0
                      : shallow.data._count[type] - 1,
                },
              };
            }
            queryClient.setQueryData(queryKey, shallow);
            context.push({ queryKey, queryData });
            break;
          }
          case 'posts,list': {
            // queryKey is ['posts','list', *]
            const queryData = queryClient.getQueryData<
              InfiniteData<
                {
                  data: AdvancedPost[];
                  nextCursor?: number;
                  message: string;
                },
                number
              >
            >(queryKey);
            if (!queryData) return;

            const shallow = { ...queryData };
            if (type === 'Reposts' && method === 'delete') {
              queryData.pages.forEach((page, i) => {
                const findPost = page.data.find(
                  (p) =>
                    p.Original?.postid === post.postid &&
                    p.User.id === sessionid &&
                    !p.quote
                );
                if (findPost) {
                  shallow.pages = [...shallow.pages];
                  shallow.pages[i] = {
                    ...page,
                    data: page.data.filter((p) => p !== findPost),
                  };
                }
              });
            }

            // queryKey is ['posts','list','bookmarks']
            // add/remove bookmark list
            if (type === 'Bookmarks' && c === 'bookmarks') {
              if (method === 'post') {
                shallow.pages = [...shallow.pages];
                shallow.pages[0] = {
                  ...shallow.pages[0],
                  data: [
                    {
                      ...post,
                      Bookmarks: [...post.Bookmarks, { id: sessionid }],
                    },
                    ...shallow.pages[0].data,
                  ],
                };
              } else {
                shallow.pages = [...shallow.pages];
                shallow.pages.forEach((page, i) => {
                  shallow.pages[i] = {
                    ...shallow.pages[i],
                    data: shallow.pages[i].data.filter(
                      (p) => p.postid !== post.postid
                    ),
                  };
                });
              }
            }

            shallow.pages.forEach((page, i) => {
              page.data.forEach((p, j) => {
                // find the target through postid in the list
                if (p.postid === post.postid) {
                  shallow.pages = [...shallow.pages];
                  shallow.pages[i] = { ...shallow.pages[i] };
                  shallow.pages[i].data = [...shallow.pages[i].data];

                  const already = p[type].map((u) => u.id).includes(sessionid);
                  // update the target in the list
                  // type is "Comments" | "Hearts" | "Reposts" | "Bookmarks"
                  switch (method) {
                    case 'post': {
                      if (!already) {
                        shallow.pages[i].data[j] = {
                          ...p,
                          [type]: [...p[type], { id: sessionid }],
                          _count: {
                            ...p._count,
                            [type]: p._count[type] + 1,
                          },
                        };
                      }
                      break;
                    }
                    case 'delete': {
                      if (already) {
                        shallow.pages[i].data[j] = {
                          ...p,
                          [type]: p[type].filter((u) => u.id !== sessionid),
                          _count: {
                            ...p._count,
                            [type]: p._count[type] < 0 ? 0 : p._count[type] - 1,
                          },
                        };
                      }
                      break;
                    }
                  }
                }
                // find the repost target through postid in the list
                else if (p.Original?.postid === post.postid) {
                  shallow.pages = [...shallow.pages];
                  shallow.pages[i] = { ...shallow.pages[i] };
                  shallow.pages[i].data = [...shallow.pages[i].data];

                  const already = p.Original[type].some(
                    (u) => u.id === sessionid
                  );
                  // update the repost target in the list
                  // type is "Comments" | "Hearts" | "Reposts" | "Bookmarks"
                  switch (method) {
                    case 'post': {
                      if (!already) {
                        shallow.pages[i].data[j] = {
                          ...shallow.pages[i].data[j],
                          Original: {
                            ...p.Original,
                            [type]: [...p.Original[type], { id: sessionid }],
                            _count: {
                              ...p.Original._count,
                              [type]: p.Original._count[type],
                            },
                          },
                        };
                      }
                      break;
                    }
                    case 'delete': {
                      if (already) {
                        shallow.pages[i].data[j] = {
                          ...shallow.pages[i].data[j],
                          Original: {
                            ...p.Original,
                            [type]: p.Original[type].filter(
                              (u) => u.id !== sessionid
                            ),
                            _count: {
                              ...p.Original._count,
                              [type]:
                                p.Original._count[type] < 1
                                  ? 0
                                  : p.Original._count[type] - 1,
                            },
                          },
                        };
                      }
                      break;
                    }
                  }
                }
              });
            });
            queryClient.setQueryData(queryKey, shallow);
            context.push({ queryKey, queryData });
            break;
          }
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
    onSuccess: (response, { queryClient, type, method, post, sessionid }) => {
      if (type === 'Reposts' && method === 'post' && response) {
        const queryCache = queryClient.getQueryCache();
        const queryKeys = queryCache.getAll().map((q) => q.queryKey);

        queryKeys.forEach((queryKey) => {
          const [a, b, c] = queryKey;
          if (a !== 'posts') return;
          if (b !== 'list') return;
          if (c !== 'recommends' && c !== sessionid) return;

          const queryData =
            queryClient.getQueryData<
              InfiniteData<
                { data: AdvancedPost[]; nextCursor?: number; message: string },
                number
              >
            >(queryKey);
          queryData?.pages.forEach((page, i) => {
            page.data.forEach((post, j) => {
              if (post.postid !== -1) return;

              const { data } = response;
              const shallow = { ...queryData };
              shallow.pages = [...shallow.pages];
              shallow.pages[i] = { ...shallow.pages[i] };
              shallow.pages[i].data = [...shallow.pages[i].data];
              shallow.pages[i].data[j] = data;
              queryClient.setQueryData(queryKey, shallow);
            });
          });
        });
      }
      if (type === 'Reposts') {
        queryClient.invalidateQueries({
          queryKey: ['posts', 'list', 'recommends'],
          refetchType: 'none',
        });
        queryClient.invalidateQueries({
          queryKey: ['posts', 'list', sessionid],
          refetchType: 'none',
        });
        queryClient.invalidateQueries({
          queryKey: ['users', 'list', 'retweets', post.postid],
          refetchType: 'inactive',
        });
      }
      if (type === 'Hearts') {
        queryClient.invalidateQueries({
          queryKey: ['posts', 'list', 'likes'],
        });
        queryClient.invalidateQueries({
          queryKey: ['users', 'list', 'likes'],
          refetchType: 'inactive',
        });
      }
      queryClient.invalidateQueries({
        queryKey: ['posts', 'list', 'search'],
        refetchType: 'none',
      });
    },
  });

export default useReactionMutation;
