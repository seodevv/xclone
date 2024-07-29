interface Params {
  queryKey: [string, string, string, { filter?: 'all' | 'media' }];
}

export const getUserPostsCount = async ({
  queryKey: [, , username, { filter = 'all' }],
}: Params): Promise<{ data: number; message: string }> => {
  const isServer = typeof window === 'undefined';
  const requestUrl = `${
    isServer ? process.env.SERVER_URL : process.env.NEXT_PUBLIC_SERVER_URL
  }/api/users/${username}/posts/count?filter=${filter}`;
  const requestOptions: RequestInit = {
    method: 'GET',
    credentials: 'include',
    next: {
      tags: ['posts', 'count', username, filter],
    },
    cache: 'no-store',
  };

  const response = await fetch(requestUrl, requestOptions);

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
};
