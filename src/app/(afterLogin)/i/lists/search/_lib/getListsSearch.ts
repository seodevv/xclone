import { ERROR_STATUS, responseErrorHandler } from '@/app/_lib/error';
import { AdvancedLists } from '@/model/Lists';

interface Params {
  queryKey: (string | { q?: string; f?: string; pf?: string; lf?: string })[];
  pageParam: number;
}

const getListsSearch = async ({
  queryKey: [, , , options],
  pageParam,
}: Params): Promise<{
  data: AdvancedLists[];
  nextCursor?: number;
  message: string;
}> => {
  if (typeof options !== 'object') {
    throw new Error(ERROR_STATUS.badRequest);
  }

  const q = options.q || '';
  const isServer = typeof window === 'undefined';
  const nextHeader = isServer ? await import('next/headers') : undefined;
  const requestUrl = `${
    isServer ? process.env.SERVER_URL : process.env.NEXT_PUBLIC_SERVER_URL
  }/api/lists?q=${q}&cursor=${pageParam}`;
  const requestOptions: RequestInit = {
    method: 'GET',
    credentials: 'include',
    headers: nextHeader
      ? { Cookie: nextHeader.cookies().toString() }
      : undefined,
    next: {
      tags: ['lists', 'list', 'search', JSON.stringify(options)],
    },
    cache: 'no-store',
  };

  const response = await fetch(requestUrl, requestOptions);
  if (response.ok) {
    return response.json();
  }

  return responseErrorHandler(response);
};

export default getListsSearch;
