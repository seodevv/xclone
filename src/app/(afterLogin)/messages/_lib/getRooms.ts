import { responseErrorHandler } from '@/app/_lib/error';
import { AdvancedRooms } from '@/model/Room';

// queryKey is ['rooms', 'list', :roomid]
interface Params {
  queryKey: [string, string, string];
}

export const getRooms = async ({
  queryKey: [, , username],
}: Params): Promise<{ data: AdvancedRooms[]; message: string }> => {
  const isServer = typeof window === 'undefined';
  const nextHeader = isServer ? await import('next/headers') : undefined;
  const requestUrl = `${
    isServer
      ? process.env.NEXT_PUBLIC_SERVER_URL
      : process.env.NEXT_PUBLIC_SERVER_URL
  }/api/rooms`;
  const requestInit: RequestInit = {
    method: 'GET',
    credentials: 'include',
    headers: nextHeader
      ? {
          Cookie: nextHeader.cookies().toString(),
        }
      : undefined,
    next: {
      tags: ['rooms', 'list', username],
    },
    cache: 'no-store',
  };

  const response = await fetch(requestUrl, requestInit);
  if (response.ok) {
    return response.json();
  }

  return responseErrorHandler(response);
};
