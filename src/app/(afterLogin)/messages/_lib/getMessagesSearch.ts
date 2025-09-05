import { responseErrorHandler } from '@/app/_lib/error';
import { AdvancedMessages } from '@/model/Message';
import { AdvancedRooms } from '@/model/Room';

interface Params {
  queryKey: string[];
  pageParam: number;
}

export type AdvancedMessagesAddRooms = AdvancedMessages & {
  Room: AdvancedRooms;
};

export const getMessagesSearch = async ({
  queryKey: [, , , query],
  pageParam,
}: Params): Promise<{
  data: AdvancedMessagesAddRooms[];
  nextCursor?: number;
  message: string;
}> => {
  const isServer = typeof window === 'undefined';
  const nextHeader = isServer ? await import('next/headers') : undefined;
  const requestUrl = `${
    isServer ? process.env.SERVER_URL : process.env.NEXT_PUBLIC_SERVER_URL
  }/api/messages/search?query=${encodeURIComponent(
    query
  )}&cursor=${pageParam}&size=10`;
  const requestInit: RequestInit = {
    method: 'GET',
    credentials: 'include',
    headers: nextHeader
      ? { Cookie: nextHeader.cookies().toString() }
      : undefined,
    next: {
      tags: ['messages', 'list', 'search', query],
    },
    cache: 'no-store',
  };

  const response = await fetch(requestUrl, requestInit);
  if (response.ok) {
    return response.json();
  }

  return responseErrorHandler(response);
};
