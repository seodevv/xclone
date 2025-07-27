import { responseErrorHandler } from '@/app/_lib/error';
import { AdvancedMessages } from '@/model/Message';

interface Params {
  queryKey: string[];
  pageParam: number;
}

// 'messages', 'list', userId, roomId
export const getRoomMessages = async ({
  queryKey: [, , userId, roomId],
  pageParam,
}: Params): Promise<{
  data: AdvancedMessages[];
  prevCursor?: number;
  nextCursor?: number;
  message: string;
}> => {
  const isServer = typeof window === 'undefined';
  const nextHeader = isServer ? await import('next/headers') : undefined;
  const requestUrl = `${
    isServer ? process.env.SERVER_URL : process.env.NEXT_PUBLIC_SERVER_URL
  }/api/messages/${roomId}?cursor=${pageParam}&size=30`;
  const requestOptions: RequestInit = {
    method: 'GET',
    credentials: 'include',
    headers: nextHeader
      ? { Cookie: nextHeader.cookies().toString() }
      : undefined,
    next: {
      tags: ['messages', 'list', userId, roomId],
    },
    cache: 'no-store',
  };

  const response = await fetch(requestUrl, requestOptions);
  if (response.ok) {
    return response.json();
  }

  return responseErrorHandler(response);
};
