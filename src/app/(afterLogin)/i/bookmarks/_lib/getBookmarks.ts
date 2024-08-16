import { ERROR_STATUS } from '@/app/(afterLogin)/[username]/status/[id]/error';
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
    ? `${process.env.SERVER_URL}/api/posts/bookmarks?cursor=${pageParam}`
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

  if (response.status === 400) {
    throw new Error(ERROR_STATUS.badRequest);
  } else if (response.status === 401) {
    throw new Error(ERROR_STATUS.unAuthorized);
  } else if (response.status === 403) {
    throw new Error(ERROR_STATUS.forbidden);
  } else if (response.status === 404) {
    throw new Error(ERROR_STATUS.notFound);
  } else if (response.status === 500) {
    throw new Error(ERROR_STATUS.serverERror);
  } else if (!response.ok) {
    throw new Error(ERROR_STATUS.fetchError);
  }

  return response.json();
};

export default getBookmarks;
