import { responseErrorHandler } from '@/app/_lib/error';
import { AdvancedUser } from '@/model/User';

interface Params {
  queryKey: [string, string];
}

export const getMyProfile = async ({
  queryKey,
}: Params): Promise<{ data: AdvancedUser; message: string }> => {
  const isServer = typeof window === 'undefined';
  const nextHeader = isServer ? await import('next/headers') : undefined;
  const requestUrl = `/api/v1/users`;
  const requestOptions: RequestInit = {
    method: 'GET',
    headers: nextHeader
      ? {
          Cookie: nextHeader.cookies().toString(),
        }
      : undefined,
    credentials: 'include',
  };

  const response = await fetch(requestUrl, requestOptions);

  if (response.ok) {
    return response.json();
  }

  return responseErrorHandler(response);
};
