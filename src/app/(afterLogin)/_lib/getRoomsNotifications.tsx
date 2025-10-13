import { responseErrorHandler } from '@/app/_lib/error';
import { RoomsNotifications } from '@/model/Room';

interface Params {
  queryKey: [string, string];
}

const getRoomsNotifications = async ({}: Params): Promise<{
  data: RoomsNotifications[];
  message: string;
}> => {
  const isServer = typeof window === 'undefined';
  const nextHeader = isServer ? await import('next/headers') : undefined;
  const requestUrl = `${
    isServer
      ? process.env.NEXT_PUBLIC_SERVER_URL
      : process.env.NEXT_PUBLIC_SERVER_URL
  }/api/rooms/notifications`;
  const requestInit: RequestInit = {
    method: 'GET',
    headers: nextHeader
      ? { Cookie: nextHeader.cookies().toString() }
      : undefined,
    credentials: 'include',
  };

  const response = await fetch(requestUrl, requestInit);

  if (response.ok) {
    return response.json();
  }

  return responseErrorHandler(response);
};

export default getRoomsNotifications;
