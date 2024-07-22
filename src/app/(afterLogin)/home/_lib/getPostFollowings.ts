import { AdvancedPost } from '@/model/Post';
// import { cookies } from 'next/headers';

export const getPostFollowings = async (): Promise<{
  data: AdvancedPost[];
  message: string;
}> => {
  const isServer = typeof window === 'undefined';
  const nextHeaders = isServer ? await import('next/headers') : undefined;

  const requestUrl = `${
    isServer ? process.env.SERVER_URL : process.env.NEXT_PUBLIC_SERVER_URL
  }/api/posts/followings`;
  const requestOptions: RequestInit = {
    method: 'GET',
    credentials: 'include',
    headers: nextHeaders
      ? {
          Cookie: nextHeaders.cookies().toString(),
        }
      : undefined,
    next: {
      tags: ['posts', 'followings'],
    },
    cache: 'no-store',
  };
  const response = await fetch(requestUrl, requestOptions);

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
};
