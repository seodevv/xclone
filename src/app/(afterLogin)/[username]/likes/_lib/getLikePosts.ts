import { AdvancedPost } from '@/model/Post';

interface Params {
  queryKey: string[];
  pageParam: number;
}

export const getLikePosts = async ({
  pageParam,
}: Params): Promise<{
  data: AdvancedPost[];
  nextCursor?: number;
  message: string;
}> => {
  const isServer = typeof window === 'undefined';
  const nextHeader = isServer ? await import('next/headers') : undefined;
  const requestUrl = `${
    isServer
      ? process.env.NEXT_PUBLIC_SERVER_URL
      : process.env.NEXT_PUBLIC_SERVER_URL
  }/api/posts/likes?cursor=${pageParam}`;
  const requestOptions: RequestInit = {
    method: 'GET',
    credentials: 'include',
    headers: nextHeader
      ? { Cookie: nextHeader.cookies().toString() }
      : undefined,
    next: { tags: ['posts', 'list', 'likes'] },
    cache: 'no-store',
  };

  const response = await fetch(requestUrl, requestOptions);

  if (!response.ok) {
    throw new Error('Failed to fetch error');
  }

  return response.json();
};
