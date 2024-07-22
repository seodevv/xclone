import { AdvancedUser } from '@/model/User';

interface Params {
  queryKey: [string, string];
}

export const getUser = async ({
  queryKey,
}: Params): Promise<{ data: AdvancedUser; message: string }> => {
  const [, username] = queryKey;
  const isServer = typeof window === 'undefined';
  const nextHeaders = isServer ? await import('next/headers') : undefined;
  const requestUrl = `${
    isServer ? process.env.SERVER_URL : process.env.NEXT_PUBLIC_SERVER_URL
  }/api/users/${username}`;
  const requestOptions: RequestInit = {
    method: 'GET',
    credentials: 'include',
    headers: nextHeaders
      ? { Cookie: nextHeaders.cookies().toString() }
      : undefined,
    next: {
      tags: ['users', username],
    },
    // cache: 'no-store',
  };

  const response = await fetch(requestUrl, requestOptions);

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
};
