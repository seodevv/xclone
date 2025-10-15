import { AdvancedUser } from '@/model/User';

interface Params {
  queryKey: (
    | string
    | { type: 'verified_followers' | 'follow' | 'following' }
  )[];
  pageParam: number;
}

export const getFollowList = async ({
  queryKey: [, , username, options],
  pageParam,
}: Params): Promise<{
  data?: AdvancedUser[];
  nextCursor?: number;
  message: string;
}> => {
  if (typeof username !== 'string' || typeof options !== 'object') {
    throw new Error('Invalid query key');
  }
  const isServer = typeof window === 'undefined';
  const nextHeader = isServer ? await import('next/headers') : undefined;
  const requestUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/users/${username}/follow?cursor=${pageParam}&type=${options.type}`;
  const requestOptions: RequestInit = {
    method: 'GET',
    credentials: 'include',
    headers: nextHeader
      ? { Cookie: nextHeader.cookies().toString() }
      : undefined,
    next: {
      tags: ['users', 'list', username, JSON.stringify(options)],
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
