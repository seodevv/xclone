import { responseErrorHandler } from '@/app/_lib/error';
import { AdvancedPost } from '@/model/Post';

interface Params {
  queryKey: string[];
  pageParam: number;
}

const getSingleListsPosts = async ({
  queryKey: [, , , listid],
  pageParam,
}: Params): Promise<{
  data?: AdvancedPost[];
  nextCursor?: number;
  message: string;
}> => {
  const isServer = typeof window === 'undefined';
  const nextHeader = isServer ? await import('next/headers') : undefined;
  const requestUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/lists/${listid}/posts?cursor=${pageParam}`;
  const requestOptions: RequestInit = {
    method: 'GET',
    credentials: 'include',
    headers: nextHeader
      ? { Cookie: nextHeader.cookies().toString() }
      : undefined,
    next: {
      tags: ['posts', 'list', 'lists', listid],
    },
    cache: 'no-store',
  };

  const response = await fetch(requestUrl, requestOptions);
  if (response.ok) {
    return response.json();
  }

  return responseErrorHandler(response);
};

export default getSingleListsPosts;
