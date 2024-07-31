import { AdvancedPost } from '@/model/Post';

interface Params {
  queryKey: [string, string, { username: string }];
}

export const getSinglePost = async ({
  queryKey: [, id, { username }],
}: Params): Promise<{ data: AdvancedPost; message: string }> => {
  const isServer = typeof window === 'undefined';
  const requestUrl = `${
    isServer ? process.env.SERVER_URL : process.env.NEXT_PUBLIC_SERVER_URL
  }/api/posts/${id}?userId=${username}`;
  const requestOptions: RequestInit = {
    method: 'GET',
    credentials: 'include',
    next: {
      tags: ['posts', id],
    },
    cache: 'no-store',
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
