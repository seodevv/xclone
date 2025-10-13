import { responseErrorHandler } from '@/app/_lib/error';
import { AdvancedLists } from '@/model/Lists';

interface Params {
  queryKey: [string, string];
}

const getSingleLists = async ({
  queryKey: [, listid],
}: Params): Promise<{ data: AdvancedLists; message: string }> => {
  const isServer = typeof window === 'undefined';
  const nextHeader = isServer ? await import('next/headers') : undefined;
  const requestUrl = `${
    isServer
      ? process.env.NEXT_PUBLIC_SERVER_URL
      : process.env.NEXT_PUBLIC_SERVER_URL
  }/api/lists/${listid}`;
  const requestOptions: RequestInit = {
    method: 'GET',
    credentials: 'include',
    headers: nextHeader
      ? { Cookie: nextHeader.cookies().toString() }
      : undefined,
    next: {
      tags: ['lists', listid],
    },
    cache: 'no-store',
  };

  const response = await fetch(requestUrl, requestOptions);
  if (response.ok) {
    return response.json();
  }

  return responseErrorHandler(response);
};

export default getSingleLists;
