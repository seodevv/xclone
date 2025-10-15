import { AdvancedPost } from '@/model/Post';

interface Params {
  pageParam: number;
}

export const getPostFollowings = async ({
  pageParam,
}: Params): Promise<{
  data: AdvancedPost[];
  nextCursor?: number;
  message: string;
}> => {
  const isServer = typeof window === 'undefined';
  const nextHeaders = isServer ? await import('next/headers') : undefined;
  const requestUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/posts/followings?cursor=${pageParam}`;
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
