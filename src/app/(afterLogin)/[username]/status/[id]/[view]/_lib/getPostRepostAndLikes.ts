import { ERROR_STATUS, responseErrorHandler } from '@/app/_lib/error';
import { REGEX_NUMBER_ONLY } from '@/app/_lib/regex';
import { AdvancedUser } from '@/model/User';

interface Params {
  queryKey: (string | { postid: string; username: string })[];
  pageParam: string;
}

const getPostRepostAndLikes = async ({
  queryKey: [, , filter, options],
  pageParam,
}: Params): Promise<{
  data: AdvancedUser[];
  nextCursor?: string;
  message: string;
}> => {
  if (
    typeof filter !== 'string' ||
    typeof options !== 'object' ||
    !REGEX_NUMBER_ONLY.test(options.postid)
  ) {
    throw new Error(ERROR_STATUS.badRequest);
  }
  const isServer = typeof window === 'undefined';
  const nextHeader = isServer ? await import('next/headers') : undefined;
  const requestUrl = `${
    isServer ? process.env.SERVER_URL : process.env.NEXT_PUBLIC_SERVER_URL
  }/api/posts/${options.postid}/engagements?userid=${
    options.username
  }&filter=${filter}&cursor=${pageParam}`;
  const requestOptions: RequestInit = {
    method: 'GET',
    credentials: 'include',
    headers: nextHeader
      ? { Cookie: nextHeader.cookies().toString() }
      : undefined,
    next: {
      tags: ['users', 'list', filter, JSON.stringify(options)],
    },
    cache: 'no-store',
  };

  const response = await fetch(requestUrl, requestOptions);
  if (response.ok) {
    return response.json();
  }

  return responseErrorHandler(response);
};

export default getPostRepostAndLikes;
