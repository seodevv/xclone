import { AdvancedPost } from '@/model/Post';

interface Params {
  queryKey: [
    string,
    string,
    string,
    { filter?: 'all' | 'reply' | 'media' | 'like' }
  ];
}

export const getUserPosts = async ({
  queryKey: [, , username, { filter = 'all' }],
}: Params): Promise<{ data: AdvancedPost[]; message: string }> => {
  const isServer = typeof window === 'undefined';
  const requestUrl = `${
    isServer ? process.env.SERVER_URL : process.env.NEXT_PUBLIC_SERVER_URL
  }/api/users/${username}/posts?filter=${filter}`;
  const requestOptions: RequestInit = {
    method: 'GET',
    credentials: 'include',
    next: {
      tags: ['posts', 'list', username],
    },
    // cache: 'no-store',
  };

  const response = await fetch(requestUrl, requestOptions);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
};
