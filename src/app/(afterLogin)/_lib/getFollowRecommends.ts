import { AdvancedUser } from '@/model/User';

interface Params {
  queryKey: string[];
  pageParam: string;
}

export const getFollowRecommends = async ({
  queryKey: [, , , mode],
  pageParam,
}: Params): Promise<{
  data: AdvancedUser[];
  nextCursor?: string;
  message: string;
}> => {
  const isServer = typeof window === 'undefined';
  const nextHeaders = isServer ? await import('next/headers') : undefined;

  const requestUrl = `${
    isServer ? process.env.SERVER_URL : process.env.NEXT_PUBLIC_SERVER_URL
  }/api/users/followRecommends?cursor=${pageParam}${
    typeof mode !== 'undefined' ? '&mode=creator' : ''
  }`;
  const requestOptions: RequestInit = {
    method: 'GET',
    credentials: 'include',
    headers: nextHeaders
      ? {
          Cookie: nextHeaders.cookies().toString(),
        }
      : undefined,
    next: {
      tags: ['users', 'list', 'recommends'],
    },
    cache: 'no-store',
  };

  const response = await fetch(requestUrl, requestOptions);

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
};
