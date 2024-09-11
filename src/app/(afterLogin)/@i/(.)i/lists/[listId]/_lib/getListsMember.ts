import { ERROR_STATUS, responseErrorHandler } from '@/app/_lib/error';
import { AdvancedUser } from '@/model/User';

interface Params {
  queryKey: (string | { filter: 'members' | 'followers' })[];
  pageParam: string;
}

const getListsMember = async ({
  queryKey: [, , , listId, options],
  pageParam,
}: Params): Promise<{
  data: AdvancedUser[];
  nextCursor?: string;
  message: string;
}> => {
  if (typeof listId !== 'string' || typeof options !== 'object') {
    throw new Error(ERROR_STATUS.badRequest);
  }
  const isServer = typeof window === 'undefined';
  const nextHeader = isServer ? await import('next/headers') : undefined;
  const requestUrl = `${
    isServer ? process.env.SERVER_URL : process.env.NEXT_PUBLIC_SERVER_URL
  }/api/lists/${listId}/${
    options.filter === 'members' ? 'member' : 'follow'
  }?cursor=${pageParam}`;
  const requestOptions: RequestInit = {
    method: 'GET',
    credentials: 'include',
    headers: nextHeader
      ? { Cookie: nextHeader.cookies().toString() }
      : undefined,
    next: {
      tags: [
        'users',
        'list',
        'lists',
        listId,
        JSON.stringify({ filter: options.filter }),
      ],
    },
    cache: 'no-store',
  };

  const response = await fetch(requestUrl, requestOptions);
  if (response.ok) {
    return response.json();
  }

  return responseErrorHandler(response);
};

export default getListsMember;
