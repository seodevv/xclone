'use client';

import { AdvancedPost } from '@/model/Post';
import {
  InfiniteData,
  QueryClient,
  QueryKey,
  useMutation,
} from '@tanstack/react-query';

interface RequiredSession {
  email: string;
  name: string;
  image: string;
}

interface ReactionMutationParams {
  queryClient: QueryClient;
  type: 'Hearts' | 'Reposts' | 'Bookmarks';
  method: 'post' | 'delete';
  post: AdvancedPost;
  session: RequiredSession;
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
        post.postId
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
    onMutate: ({ queryClient, type, method, post, session }) => {
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
          case `posts,${post.postId}`: {
            const queryData = queryClient.getQueryData<{
              data: AdvancedPost;
              message: string;
            }>(queryKey);
            if (!queryData) return;

            const shallow = { ...queryData };
            const already = shallow.data[type]
              .map((u) => u.id)
              .includes(session?.email);
            if (method === 'post' && !already) {
              shallow.data = {
                ...shallow.data,
                [type]: [...queryData.data[type], { id: session.email }],
                _count: {
                  ...queryData.data._count,
                  Hearts:
                    type === 'Hearts'
                      ? queryData.data._count.Hearts + 1
                      : queryData.data._count.Hearts,
                  Reposts:
                    type === 'Reposts'
                      ? queryData.data._count.Reposts + 1
                      : queryData.data._count.Reposts,
                },
              };
            } else if (method === 'delete' && already) {
              shallow.data = {
                ...shallow.data,
                [type]: queryData.data[type].filter(
                  (u) => u.id !== session.email
                ),
                _count: {
                  ...queryData.data._count,
                  Hearts:
                    type === 'Hearts'
                      ? queryData.data._count.Hearts < 1
                        ? 0
                        : queryData.data._count.Hearts - 1
                      : queryData.data._count.Hearts,
                  Reposts:
                    type === 'Reposts'
                      ? queryData.data._count.Reposts < 1
                        ? 0
                        : queryData.data._count.Reposts - 1
                      : queryData.data._count.Reposts,
                },
              };
            }
            queryClient.setQueryData(queryKey, shallow);
            context.push({ queryKey, queryData });
            break;
          }
          case 'posts,list': {
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
            if (
              type === 'Reposts' &&
              (c === 'recommends' || c === session.email)
            ) {
              if (method === 'post') {
                const newPost: AdvancedPost = {
                  postId: -1,
                  userId: session.email,
                  content: '',
                  images: [],
                  createAt: new Date().toISOString(),
                  User: {
                    id: session.email,
                    image: session.image,
                    nickname: session.name,
                  },
                  Hearts: [],
                  Reposts: [],
                  Comments: [],
                  Bookmarks: [],
                  _count: {
                    Hearts: 0,
                    Comments: 0,
                    Reposts: 0,
                    Views: 0,
                  },
                  originalId: post.postId,
                  Original: {
                    ...post,
                    Reposts: [...post.Reposts, { id: session.email }],
                    _count: {
                      ...post._count,
                      Reposts: post._count.Reposts + 1,
                    },
                  },
                };
                shallow.pages = [...shallow.pages];
                shallow.pages[0] = {
                  ...shallow.pages[0],
                  data: [newPost, ...shallow.pages[0].data],
                };
              } else {
                queryData.pages.forEach((page, i) => {
                  const j = page.data.findIndex(
                    (p) =>
                      p.User.id === session.email &&
                      p.Original?.postId === post.postId
                  );

                  if (j > -1) {
                    shallow.pages = [...shallow.pages];
                    shallow.pages[i] = {
                      ...shallow.pages[i],
                      data: [...shallow.pages[i].data],
                    };
                    shallow.pages[i].data.splice(j, 1);
                  }
                });
              }
            }

            if (type === 'Bookmarks' && c === 'bookmarks') {
              if (method === 'post') {
                shallow.pages = [...shallow.pages];
                shallow.pages[0] = {
                  ...shallow.pages[0],
                  data: [
                    {
                      ...post,
                      Bookmarks: [...post.Bookmarks, { id: session.email }],
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
                      (p) => p.postId !== post.postId
                    ),
                  };
                });
              }
            }

            shallow.pages.forEach((page, i) => {
              page.data.forEach((p, j) => {
                if (p.postId === post.postId) {
                  shallow.pages = [...shallow.pages];
                  shallow.pages[i] = { ...shallow.pages[i] };
                  shallow.pages[i].data = [...shallow.pages[i].data];

                  const already = shallow.pages[i].data[j][type]
                    .map((u) => u.id)
                    .includes(session.email);
                  switch (method) {
                    case 'post': {
                      if (!already) {
                        shallow.pages[i].data[j] = {
                          ...shallow.pages[i].data[j],
                          [type]: [
                            ...shallow.pages[i].data[j][type],
                            { id: session.email },
                          ],
                          _count: {
                            ...shallow.pages[i].data[j]._count,
                            Hearts:
                              type === 'Hearts'
                                ? shallow.pages[i].data[j]._count.Hearts + 1
                                : shallow.pages[i].data[j]._count.Hearts,
                            Reposts:
                              type === 'Reposts'
                                ? shallow.pages[i].data[j]._count.Reposts + 1
                                : shallow.pages[i].data[j]._count.Reposts,
                          },
                        };
                      }
                      break;
                    }
                    case 'delete': {
                      if (already) {
                        shallow.pages[i].data[j] = {
                          ...shallow.pages[i].data[j],
                          [type]: shallow.pages[i].data[j][type].filter(
                            (u) => u.id !== session.email
                          ),
                          _count: {
                            ...shallow.pages[i].data[j]._count,
                            Hearts:
                              type === 'Hearts'
                                ? shallow.pages[i].data[j]._count.Hearts < 1
                                  ? 0
                                  : shallow.pages[i].data[j]._count.Hearts - 1
                                : shallow.pages[i].data[j]._count.Hearts,
                            Reposts:
                              type === 'Reposts'
                                ? shallow.pages[i].data[j]._count.Reposts < 1
                                  ? 0
                                  : shallow.pages[i].data[j]._count.Reposts - 1
                                : shallow.pages[i].data[j]._count.Reposts,
                          },
                        };
                      }
                      break;
                    }
                  }
                } else if (p.Original?.postId === post.postId) {
                  shallow.pages = [...shallow.pages];
                  shallow.pages[i] = { ...shallow.pages[i] };
                  shallow.pages[i].data = [...shallow.pages[i].data];

                  const already = p.Original[type].some(
                    (u) => u.id === session.email
                  );
                  switch (method) {
                    case 'post': {
                      if (!already) {
                        shallow.pages[i].data[j] = {
                          ...shallow.pages[i].data[j],
                          Original: {
                            ...p.Original,
                            [type]: [
                              ...p.Original[type],
                              { id: session.email },
                            ],
                            _count: {
                              ...p.Original._count,
                              Hearts:
                                type === 'Hearts'
                                  ? p.Original._count.Hearts + 1
                                  : p.Original._count.Hearts,
                              Reposts:
                                type === 'Reposts'
                                  ? p.Original._count.Reposts + 1
                                  : p.Original._count.Reposts,
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
                              (u) => u.id !== session.email
                            ),
                            _count: {
                              ...p.Original._count,
                              Hearts:
                                type === 'Hearts'
                                  ? p.Original._count.Hearts < 1
                                    ? 0
                                    : p.Original._count.Hearts - 1
                                  : p.Original._count.Hearts,
                              Reposts:
                                type === 'Reposts'
                                  ? p.Original._count.Reposts < 1
                                    ? 0
                                    : p.Original._count.Reposts
                                  : p.Original._count.Reposts,
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
    onSuccess: (response, { queryClient, type, method, session }) => {
      if (type === 'Reposts' && method === 'post' && response) {
        const queryCache = queryClient.getQueryCache();
        const queryKeys = queryCache.getAll().map((q) => q.queryKey);

        queryKeys.forEach((queryKey) => {
          const [a, b, c] = queryKey;
          if (a !== 'posts') return;
          if (b !== 'list') return;
          if (c !== 'recommends' && c !== session.email) return;

          const queryData =
            queryClient.getQueryData<
              InfiniteData<
                { data: AdvancedPost[]; nextCursor?: number; message: string },
                number
              >
            >(queryKey);
          queryData?.pages.forEach((page, i) => {
            page.data.forEach((post, j) => {
              if (post.postId !== -1) return;

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
      if (type === 'Hearts') {
        queryClient.invalidateQueries({
          queryKey: ['posts', 'list', 'likes'],
        });
      }
      queryClient.invalidateQueries({
        queryKey: ['posts', 'list', 'search'],
        refetchType: 'none',
      });
    },
  });

export default useReactionMutation;
