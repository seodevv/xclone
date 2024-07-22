import { AdvancedPost } from '@/model/Post';

interface Params {
  queryKey: [string, string];
}

export const getSinglePost = async ({
  queryKey: [, id],
}: Params): Promise<{ data: AdvancedPost; message: string }> => {
  const isServer = typeof window === 'undefined';
  const requestUrl = `${
    isServer ? process.env.SERVER_URL : process.env.NEXT_PUBLIC_SERVER_URL
  }/api/posts/${id}`;
  const requestOptions: RequestInit = {
    method: 'GET',
    credentials: 'include',
    next: {
      tags: ['posts', id],
    },
  };
  const response = await fetch(requestUrl, requestOptions);

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
};
