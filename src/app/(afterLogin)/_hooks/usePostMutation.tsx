'use client';

import {
  InfiniteData,
  QueryClient,
  QueryKey,
  useMutation,
} from '@tanstack/react-query';
import { MediaType } from '../[username]/status/[id]/_component/CommentForm';
import { AdvancedPost } from '@/model/Post';
import { Session } from 'next-auth';

interface MutationParams {
  queryClient: QueryClient;
  session: Session;
  parent?: {
    postId: AdvancedPost['postId'];
    userId: AdvancedPost['User']['id'];
  };
  content: string;
  media: MediaType[];
}

const usePostMutation = () =>
  useMutation({
    mutationFn: async ({
      parent,
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

      const requestUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts${
        parent ? `/${parent.postId}/comments` : ''
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
    onSuccess: (response, { queryClient, session, parent }) => {
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
              (p) => p.postId === -1
            );
            if (optimisticPostIndex > -1) {
              const shallow = { ...queryData };
              shallow.pages = [...queryData.pages];
              shallow.pages[i] = { ...queryData.pages[i] };
              shallow.pages[i].data = [...queryData.pages[i].data];
              shallow.pages[i].data[optimisticPostIndex] = response.data;
              queryClient.setQueryData(queryKey, shallow);
            }
          });
        }
      });

      if (parent) {
        queryClient.invalidateQueries({
          queryKey: ['posts', 'list', 'comments', parent.postId.toString()],
          refetchType: 'none',
        });
        queryClient.invalidateQueries({
          queryKey: ['posts', 'list', parent.userId],
        });
        queryClient.invalidateQueries({
          queryKey: ['posts', parent.postId.toString()],
        });
        queryClient.invalidateQueries({
          queryKey: ['users', parent.userId],
        });
      }
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
      });
      queryClient.invalidateQueries({
        queryKey: ['users', session.user?.email],
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
    onMutate: ({ queryClient, session, parent, content, media }) => {
      const newPost: AdvancedPost = {
        postId: -1,
        userId: session.user?.email as string,
        content,
        images: media.map((m, i) => ({
          imageId: i + 1,
          link: m.link,
          width: m.width,
          height: m.height,
        })),
        createAt: new Date().toISOString(),
        parentId: parent?.postId,
        User: {
          id: session.user?.email as string,
          image: session.user?.image as string,
          nickname: session.user?.name as string,
        },
        Hearts: [],
        Reposts: [],
        Comments: [],
        _count: {
          Hearts: 0,
          Comments: 0,
          Reposts: 0,
        },
      };

      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache
        .getAll()
        .map((q) => q.queryKey)
        .filter(
          (key) =>
            (key[0] === 'posts' &&
              key[1] === 'list' &&
              key[2] === 'comments' &&
              key[3] === parent?.postId?.toString()) ||
            (key[0] === 'posts' && key[1] === 'list' && key[2] === 'recommends')
        );
      const context: {
        queryKey: QueryKey;
        queryData: InfiniteData<
          { data: AdvancedPost[]; message: string },
          number
        >;
      }[] = [];
      queryKeys.forEach((queryKey) => {
        const queryData =
          queryClient.getQueryData<
            InfiniteData<
              { data: AdvancedPost[]; nextCursor?: String; message: string },
              number
            >
          >(queryKey);
        if (queryData) {
          const shallow = { ...queryData };
          shallow.pages = [...queryData.pages];
          shallow.pages[0] = { ...queryData.pages[0] };
          shallow.pages[0].data = [...queryData.pages[0].data];
          shallow.pages[0].data.unshift(newPost);
          queryClient.setQueryData(queryKey, shallow);

          context.push({ queryKey, queryData });
        }
      });
      return context;
    },
  });

export default usePostMutation;
