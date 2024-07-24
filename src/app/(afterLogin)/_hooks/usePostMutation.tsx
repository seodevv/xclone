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
  parentId?: number;
  content: string;
  media: MediaType[];
}

const usePostMutation = () =>
  useMutation({
    mutationFn: async ({
      parentId,
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
        parentId ? `/${parentId}/comments` : ''
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
    onSuccess: (response, { queryClient, session, parentId }) => {
      if (parentId) {
        const targetUser = response.data.User.id;
        queryClient.invalidateQueries({
          queryKey: ['posts', 'list', 'comments', parentId.toString()],
          refetchType: 'none',
        });
        queryClient.invalidateQueries({
          queryKey: ['posts', 'list', targetUser],
        });
        queryClient.invalidateQueries({
          queryKey: ['posts', parentId.toString()],
        });
        queryClient.invalidateQueries({
          queryKey: ['users', targetUser],
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
          }
        | undefined
    ) => {
      console.error(error);
      if (context) {
        queryClient.setQueryData(context.queryKey, context.queryData);
      }
    },
    onMutate: ({ queryClient, session, parentId, content, media }) => {
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
        parentId,
        User: {
          id: session.user?.email as string,
          image: session.user?.image as string,
          nickname: session.user?.name as string,
          regist: new Date().toISOString(),
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

      if (parentId) {
        const queryKey: QueryKey = [
          'posts',
          'list',
          'comments',
          parentId?.toString(),
        ];
        const queryData =
          queryClient.getQueryData<
            InfiniteData<{ data: AdvancedPost[]; message: string }, number>
          >(queryKey);
        if (queryData) {
          const shallow = { ...queryData };
          shallow.pages = [...queryData.pages];
          shallow.pages[0] = { ...queryData.pages[0] };
          shallow.pages[0].data = [...queryData.pages[0].data];
          shallow.pages[0].data.unshift(newPost);
          queryClient.setQueryData(queryKey, shallow);

          return { queryKey, queryData };
        }
      }
    },
  });

export default usePostMutation;
