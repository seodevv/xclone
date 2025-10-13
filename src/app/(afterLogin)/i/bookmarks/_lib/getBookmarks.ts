import { ERROR_STATUS, responseErrorHandler } from '@/app/_lib/error';
import { AdvancedPost } from '@/model/Post';

interface Params {
  queryKey: string[];
  pageParam: number;
}

const getBookmarks = async ({
  queryKey,
  pageParam,
}: Params): Promise<{
  data: AdvancedPost[];
  nextCursor?: number;
  message: string;
}> => {
  const isServer = typeof window === 'undefined';
  const nextHeader = isServer ? await import('next/headers') : undefined;
  const requestUrl = isServer
    ? `${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts/bookmarks?cursor=${pageParam}`
    : `${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts/bookmarks?cursor=${pageParam}`;
  const requestOptions: RequestInit = {
    method: 'GET',
    credentials: 'include',
    headers: nextHeader
      ? { Cookie: nextHeader.cookies().toString() }
      : undefined,
    next: {
      tags: ['posts', 'list', 'bookmarks'],
    },
    cache: 'no-store',
  };
  const response = await fetch(requestUrl, requestOptions);

  if (response.ok) {
    return response.json();
  }

  return responseErrorHandler(response);
};

export default getBookmarks;
