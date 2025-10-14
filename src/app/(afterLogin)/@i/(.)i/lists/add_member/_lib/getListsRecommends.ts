import { responseErrorHandler } from '@/app/_lib/error';
import { AdvancedLists } from '@/model/Lists';

interface Params {
  queryKey: string[];
  pageParam: number;
}

const getListsRecommends = async ({
  pageParam,
}: Params): Promise<{
  data: AdvancedLists[];
  nextCursor?: number;
  message: string;
}> => {
  const isServer = typeof window === 'undefined';
  const nextHeader = isServer ? await import('next/headers') : undefined;
  const requestUrl = `/api/v1/lists/recommends?cursor=${pageParam}`;
  const requestOptions: RequestInit = {
    method: 'GET',
    credentials: 'include',
    headers: nextHeader
      ? { Cookie: nextHeader.cookies().toString() }
      : undefined,
    next: {
      tags: ['lists', 'list', 'recommends'],
    },
    cache: 'no-store',
  };

  const response = await fetch(requestUrl, requestOptions);

  if (response.ok) {
    return response.json();
  }

  return responseErrorHandler(response);
};

export default getListsRecommends;
