import { AdvancedUser } from '@/model/User';

interface Params {
  queryKey: (
    | string
    | { q?: string; f?: string; pf?: string; lf?: string; self?: 'on' }
  )[];
  pageParam: number;
}

export const getUserSearch = async ({
  queryKey: [, , , options],
  pageParam,
}: Params): Promise<{
  data: AdvancedUser[];
  nextCursor?: number;
  message: string;
}> => {
  if (typeof options !== 'object') {
    throw new Error('Invalid query key');
  }
  const isServer = typeof window === 'undefined';
  const nextHeader = isServer ? await import('next/headers') : undefined;
  const searchParams = new URLSearchParams();
  searchParams.set('cursor', pageParam.toString());
  Object.entries(options).forEach(([key, value]) => {
    searchParams.set(key, value);
  });

  const requestUrl = `${
    isServer ? process.env.SERVER_URL : process.env.NEXT_PUBLIC_SERVER_URL
  }/api/users/search?${searchParams.toString()}`;
  const requestInit: RequestInit = {
    method: 'GET',
    credentials: 'include',
    headers: nextHeader
      ? { Cookie: nextHeader.cookies().toString() }
      : undefined,
    next: {
      tags: ['users', 'list', 'search', JSON.stringify(options)],
    },
    cache: 'no-store',
  };

  const response = await fetch(requestUrl, requestInit);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
};
