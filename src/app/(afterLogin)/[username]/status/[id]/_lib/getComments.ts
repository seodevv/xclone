import { AdvancedPost } from '@/model/Post';

interface Params {
  queryKey: (string | { username: string })[];
  pageParam: number;
}

export const getComments = async ({
  queryKey: [, , , id, params],
  pageParam,
}: Params): Promise<{
  data: AdvancedPost[];
  nextCursor?: number;
  message: string;
}> => {
  if (typeof params !== 'object' || typeof id !== 'string') {
    throw new Error('Invalid query key');
  }
  const isServer = typeof window === 'undefined';
  const requestUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts/${id}/comments?cursor=${pageParam}&userid=${params.username}`;
  const requestOptions: RequestInit = {
    method: 'GET',
    credentials: 'include',
    next: {
      tags: ['posts', 'list', 'comments', id],
    },
  };
  const response = await fetch(requestUrl, requestOptions);

  if (response.status === 404) {
    throw new Error('not-found');
  }

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
};
