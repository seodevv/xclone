import { AdvancedUser } from '@/model/User';

interface Params {
  queryKey: string[];
  pageParam: number;
}

export const getFollowRecommends = async ({
  queryKey: [, , , mode],
  pageParam,
}: Params): Promise<{
  data: AdvancedUser[];
  nextCursor?: number;
  message: string;
}> => {
  const isServer = typeof window === 'undefined';
  const nextHeaders = isServer ? await import('next/headers') : undefined;

  const requestUrl = `/api/v1/users/followRecommends?cursor=${pageParam}${
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
