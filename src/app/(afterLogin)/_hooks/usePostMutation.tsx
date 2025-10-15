'use client';

import {
  InfiniteData,
  QueryClient,
  QueryKey,
  useMutation,
} from '@tanstack/react-query';
import { AdvancedPost } from '@/model/Post';
import { Session } from 'next-auth';
import { MediaType } from '@/app/(afterLogin)/_component/post/form/PostForm';

interface MutationParams {
  queryClient: QueryClient;
  session: Session;
  parent?: {
    postid: AdvancedPost['postid'];
    userid: AdvancedPost['userid'];
  };
  repost?: AdvancedPost;
  content: string;
  media: MediaType[];
}

const usePostMutation = () =>
  useMutation({
    mutationFn: async ({
      parent,
      repost,
      content,
      media,
    }: MutationParams): Promise<{ data: AdvancedPost; message: string }> => {
      const formData = new FormData();
      formData.append('content', content);
      formData.append(
        'mediaInfo',
        JSON.stringify(
          media.map((m) => {
            if (m.type === 'gif') return m;
            return {
              type: m.type,
              fileName: m.file.name,
              width: m.width,
              height: m.height,
            };
          })
        )
      );
      media.forEach((m) => {
        if (m.type === 'image') {
          formData.append('images', m.file);
        }
      });
      if (repost) {
        formData.append('repostid', repost.postid.toString());
      }

      const requestUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/posts${
        parent ? `/${parent.postid}/comments` : ''
      }`;
      const requestOptions: RequestInit = {
        method: 'POST',
        body: formData,
        credentials: 'include',
      };

      const response = await fetch(requestUrl, requestOptions);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return response.json();
    },
    onMutate: ({ queryClient, session, parent, repost, content, media }) => {
      const newPost: AdvancedPost = {
        postid: -1,
        userid: session.user?.email as string,
        content,
        images: media.map((m, i) => ({
          imageId: i + 1,
          link: m.link,
          width: m.width,
          height: m.height,
        })),
        createat: new Date().toISOString(),
        parentid: typeof parent !== 'undefined' ? parent.postid : null,
        Parent: null,
        User: {
          id: session.user?.email as string,
          image: session.user?.image as string,
          nickname: session.user?.name as string,
          verified: null,
        },
        Hearts: [],
        Reposts: [],
        Comments: [],
        Bookmarks: [],
        _count: {
          Hearts: 0,
          Comments: 0,
          Reposts: 0,
          Bookmarks: 0,
          Views: 0,
        },
        Original: typeof repost !== 'undefined' ? repost : null,
        originalid: typeof repost !== 'undefined' ? repost.postid : null,
        quote: !!repost,
        pinned: false,
        scope: 'every',
      };

      const queryCache = queryClient.getQueryCache();
      // queryKeys is ['posts','list', *]
      const queryKeys = queryCache
        .getAll()
        .map((q) => q.queryKey)
        .filter((key) => key[0] === 'posts' && key[1] === 'list');
      const context: {
        queryKey: QueryKey;
        queryData: InfiniteData<
          { data: AdvancedPost[]; nextCursor?: number; message: string },
          number
        >;
      }[] = [];
      queryKeys.forEach((queryKey) => {
        const [a, b, c, d] = queryKey;
        const queryData =
          queryClient.getQueryData<
            InfiniteData<
              { data: AdvancedPost[]; nextCursor?: number; message: string },
              number
            >
          >(queryKey);
        if (!queryData) return;

        // queryKey is ['posts','list','comments', parent.postid]
        // queryKey is ['posts','list','recommends']
        // queryKey is ['posts','list', session.user.email]
        // unshift new post
        let shouldBeUpdate = false;
        const shallow = { ...queryData };
        if (
          (c === 'comments' && d === parent?.postid.toString()) ||
          c === 'recommends' ||
          c === session.user?.email
        ) {
          shouldBeUpdate = true;
          shallow.pages = [...queryData.pages];
          shallow.pages[0] = { ...queryData.pages[0] };
          shallow.pages[0].data = [newPost, ...queryData.pages[0].data];
        }

        if (parent || repost) {
          shallow.pages.forEach((page, i) =>
            page.data.forEach((p, j) => {
              if (p.postid === parent?.postid) {
                shouldBeUpdate = true;
                shallow.pages = [...shallow.pages];
                shallow.pages[i] = { ...shallow.pages[i] };
                shallow.pages[i].data = [...shallow.pages[i].data];
                shallow.pages[i].data[j] = {
                  ...p,
                  Comments: [
                    ...p.Comments,
                    { id: session.user?.email as string },
                  ],
                  _count: {
                    ...p._count,
                    Comments: p._count.Comments + 1,
                  },
                };
              } else if (p.postid === repost?.postid) {
                shouldBeUpdate = true;
                shallow.pages = [...shallow.pages];
                shallow.pages[i] = { ...shallow.pages[i] };
                shallow.pages[i].data = [...shallow.pages[i].data];
                shallow.pages[i].data[j] = {
                  ...p,
                  _count: {
                    ...p._count,
                    Reposts: p._count.Reposts + 1,
                  },
                };
              }
            })
          );
        }
        if (shouldBeUpdate) {
          queryClient.setQueryData(queryKey, shallow);
          context.push({ queryKey, queryData });
        }
      });
      return context;
    },
    onSuccess: (response, { queryClient, session, parent, repost }) => {
      const queryKeys = queryClient
        .getQueryCache()
        .getAll()
        .map((cache) => cache.queryKey)
        .filter((q) => q[0] === 'posts' && q[1] === 'list');
      queryKeys.forEach((queryKey) => {
        const queryData =
          queryClient.getQueryData<
            InfiniteData<
              { data: AdvancedPost[]; nextCursor?: number; message: string },
              number
            >
          >(queryKey);
        if (queryData) {
          queryData.pages.forEach((page, i) => {
            const optimisticPostIndex = page.data.findIndex(
              (p) => p.postid === -1
            );
            if (optimisticPostIndex > -1) {
              const shallow = { ...queryData };
              shallow.pages = [...queryData.pages];
              shallow.pages[i] = {
                ...queryData.pages[i],
                data: [...queryData.pages[i].data],
              };
              shallow.pages[i].data[optimisticPostIndex] = response.data;
              queryClient.setQueryData(queryKey, shallow);
            }
          });
        }
      });

      if (parent) {
        queryClient.invalidateQueries({
          queryKey: ['posts', 'list', 'comments', parent.postid.toString()],
          refetchType: 'none',
        });
        queryClient.invalidateQueries({
          queryKey: ['posts', 'list', parent.userid],
          refetchType: 'none',
        });
        queryClient.invalidateQueries({
          queryKey: ['posts', parent.postid.toString()],
        });
      }
      if (repost) {
        queryClient.invalidateQueries({
          queryKey: ['posts', repost.postid.toString()],
        });
        queryClient.invalidateQueries({
          queryKey: ['posts', 'list', 'quotes', repost.postid],
          refetchType: 'inactive',
        });
      }
      queryClient.invalidateQueries({
        queryKey: ['posts', 'list', 'search'],
        refetchType: 'none',
      });
      queryClient.invalidateQueries({
        queryKey: ['posts', 'list', 'recommends'],
        refetchType: 'none',
      });
      queryClient.invalidateQueries({
        queryKey: ['posts', 'list', session.user?.email],
        refetchType: 'none',
      });
      queryClient.invalidateQueries({
        queryKey: ['posts', 'count', session.user?.email],
        refetchType: 'none',
      });
      queryClient.invalidateQueries({
        queryKey: ['hashtags', 'list'],
        refetchType: 'none',
      });
    },
    onError: (
      error,
      { queryClient },
      context:
        | {
            queryKey: QueryKey;
            queryData: InfiniteData<
              { data: AdvancedPost[]; message: string },
              number
            >;
          }[]
        | undefined
    ) => {
      console.error(error);
      if (context) {
        context.forEach(({ queryKey, queryData }) => {
          queryClient.setQueryData(queryKey, queryData);
        });
      }
    },
  });

export default usePostMutation;
