import { ERROR_STATUS, responseErrorHandler } from '@/app/_lib/error';
import { AdvancedLists } from '@/model/Lists';

interface Params {
  queryKey: (string | { filter: 'own' | 'all' | 'memberships' })[];
  pageParam: number;
}

const getUserLists = async ({
  queryKey: [, , userid, options],
  pageParam,
}: Params): Promise<{
  data: AdvancedLists[];
  nextCursor?: number;
  message: string;
}> => {
  if (!userid || typeof userid !== 'string' || typeof options !== 'object') {
    throw new Error(ERROR_STATUS.badRequest);
  }
  const isServer = typeof window === 'undefined';
  const nextHeader = isServer ? await import('next/headers') : undefined;
  const requestUrl = `/api/v1/users/${userid}/lists?cursor=${pageParam}&filter=${options.filter}`;
  const requestOptions: RequestInit = {
    method: 'GET',
    credentials: 'include',
    headers: nextHeader
      ? {
          Cookie: nextHeader.cookies().toString(),
        }
      : undefined,
    next: {
      tags: ['lists', 'list', userid],
    },
    cache: 'no-store',
  };

  const response = await fetch(requestUrl, requestOptions);

  if (response.ok) {
    return response.json();
  }

  return responseErrorHandler(response);
};

export default getUserLists;
