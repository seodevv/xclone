import { responseErrorHandler } from '@/app/_lib/error';
import { AdvancedRooms } from '@/model/Room';

// querykey is ['rooms', :roomid]
interface Params {
  queryKey: [string, string];
}

export const getRoom = async ({
  queryKey: [, roomid],
}: Params): Promise<{ data: AdvancedRooms; message: string }> => {
  const isServer = typeof window === 'undefined';
  const nextHeader = isServer ? await import('next/headers') : undefined;
  const requestUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/rooms/${roomid}`;
  const requestInit: RequestInit = {
    method: 'GET',
    credentials: 'include',
    headers: nextHeader
      ? { Cookie: nextHeader.cookies().toString() }
      : undefined,
    next: {
      tags: ['rooms', roomid],
    },
    cache: 'no-store',
  };

  const response = await fetch(requestUrl, requestInit);
  if (response.ok) {
    return response.json();
  }

  return responseErrorHandler(response);
};
