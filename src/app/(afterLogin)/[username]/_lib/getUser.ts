import { AdvancedUser } from '@/model/User';

interface Params {
  queryKey: [string, string];
}

export const getUser = async ({
  queryKey: [, username],
}: Params): Promise<{ data: AdvancedUser; message: string }> => {
  const isServer = typeof window === 'undefined';
  const requestUrl = `/api/v1/users/${username}`;
  const requestOptions: RequestInit = {
    method: 'GET',
    credentials: 'include',
    next: {
      tags: ['users', username],
    },
    cache: 'no-store',
  };

  const response = await fetch(requestUrl, requestOptions);

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
};
