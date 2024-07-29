import { AdvancedPost } from '@/model/Post';

interface Params {
  queryKey: (string | { q?: string; f?: string; pf?: string; lf?: string })[];
  pageParam: number;
}

export const getPostSearch = async ({
  queryKey: [, , , option],
  pageParam,
}: Params): Promise<{
  data: AdvancedPost[];
  nextCursor?: number;
  message: string;
}> => {
  if (typeof option !== 'object') {
    throw new Error('Invalid query key');
  }
  const isServer = typeof window === 'undefined';
  const nextHeader = isServer ? await import('next/headers') : undefined;
  const searchParams = new URLSearchParams();
  searchParams.set('cursor', pageParam.toString());
  Object.entries(option).forEach(([key, value]) => {
    searchParams.set(key, value);
  });
  const requestUrl = `${
    isServer ? process.env.SERVER_URL : process.env.NEXT_PUBLIC_SERVER_URL
  }/api/posts?${searchParams.toString()}`;
  const requestOptions: RequestInit = {
    method: 'GET',
    credentials: 'include',
    headers: nextHeader
      ? {
          Cookie: nextHeader.cookies().toString(),
        }
      : {},
    next: {
      tags: ['posts', 'list', 'search', JSON.stringify(option)],
    },
    cache: 'no-store',
  };

  const response = await fetch(requestUrl, requestOptions);

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
};
