import { AdvancedUser } from '@/model/User';

export const getFollowRecommends = async (): Promise<{
  data: AdvancedUser[];
  message: string;
}> => {
  const isServer = typeof window === 'undefined';
  const nextHeaders = isServer ? await import('next/headers') : undefined;

  const requestUrl = `${
    isServer ? process.env.SERVER_URL : process.env.NEXT_PUBLIC_SERVER_URL
  }/api/users/followRecommends`;
  const requestOptions: RequestInit = {
    method: 'GET',
    credentials: 'include',
    next: {
      tags: ['users', 'list', 'recommends'],
    },
    cache: 'no-store',
    headers: nextHeaders
      ? {
          Cookie: nextHeaders.cookies().toString(),
        }
      : undefined,
  };

  const response = await fetch(requestUrl, requestOptions);

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
};
