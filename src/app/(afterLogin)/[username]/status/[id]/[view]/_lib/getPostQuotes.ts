import { ERROR_STATUS } from '@/app/(afterLogin)/error';
import { REGEX_NUMBER_ONLY } from '@/app/_lib/regex';
import { AdvancedPost } from '@/model/Post';

interface Params {
  queryKey: (string | { username: string; filter: 'quotes' })[];
  pageParam: number;
}

const getPostQuotes = async ({
  queryKey: [, , , postId, options],
  pageParam,
}: Params): Promise<{
  data: AdvancedPost[];
  nextCursor?: number;
  message: string;
}> => {
  if (
    typeof postId !== 'string' ||
    !REGEX_NUMBER_ONLY.test(postId) ||
    typeof options !== 'object'
  ) {
    throw new Error(ERROR_STATUS.badRequest);
  }
  const isServer = typeof window === 'undefined';
  const nextHeader = isServer ? await import('next/headers') : undefined;
  const requestUrl = `${
    isServer ? process.env.SERVER_URL : process.env.NEXT_PUBLIC_SERVER_URL
  }/api/posts/${postId}/engagements?userId=${options.username}&filter=${
    options.filter
  }&cursor=${pageParam}`;
  const requestOptions: RequestInit = {
    method: 'GET',
    credentials: 'include',
    headers: nextHeader
      ? { Cookie: nextHeader.cookies().toString() }
      : undefined,
    next: {
      tags: ['posts', 'list', 'quotes', postId, JSON.stringify(options)],
    },
    cache: 'no-store',
  };

  const response = await fetch(requestUrl, requestOptions);
  if (response.ok) {
    return response.json();
  }

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
  } else {
    throw new Error(ERROR_STATUS.fetchError);
  }
};

export default getPostQuotes;
