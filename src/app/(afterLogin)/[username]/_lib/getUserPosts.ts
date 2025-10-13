import { AdvancedPost } from '@/model/Post';

interface Params {
  queryKey: (string | { filter?: 'all' | 'reply' | 'media' | 'like' })[];
  pageParam: number;
}

export const getUserPosts = async ({
  queryKey: [, , username, options],
  pageParam,
}: Params): Promise<{
  data: AdvancedPost[];
  nextCursor?: number;
  message: string;
}> => {
  if (typeof username !== 'string' || typeof options !== 'object') {
    throw new Error('Invalid query key');
  }

  const isServer = typeof window === 'undefined';
  const requestUrl = `${
    isServer
      ? process.env.NEXT_PUBLIC_SERVER_URL
      : process.env.NEXT_PUBLIC_SERVER_URL
  }/api/users/${username}/posts?filter=${options.filter}&cursor=${pageParam}`;
  const requestOptions: RequestInit = {
    method: 'GET',
    credentials: 'include',
    next: {
      tags: ['posts', 'list', username],
    },
    cache: 'no-store',
  };

  const response = await fetch(requestUrl, requestOptions);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
};
