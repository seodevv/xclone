interface Params {
  queryKey: [string, string, string, { filter?: 'all' | 'media' | 'likes' }];
}

export const getUserPostsCount = async ({
  queryKey: [, , username, { filter = 'all' }],
}: Params): Promise<{ data: number; message: string }> => {
  const isServer = typeof window === 'undefined';
  const requestUrl = `/api/v1/users/${username}/posts/count?filter=${filter}`;
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
