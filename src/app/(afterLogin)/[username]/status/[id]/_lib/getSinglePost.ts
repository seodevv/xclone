import { ERROR_STATUS, responseErrorHandler } from '@/app/_lib/error';
import { AdvancedPost } from '@/model/Post';

interface Params {
  queryKey: [string, string, { username: string }];
}

export const getSinglePost = async ({
  queryKey: [, id, { username }],
}: Params): Promise<{ data: AdvancedPost; message: string }> => {
  const regex = /^[0-9]+$/;
  if (!regex.test(id)) {
    throw new Error(ERROR_STATUS.notFound);
  }
  const isServer = typeof window === 'undefined';
  const requestUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${id}?userid=${username}`;
  const requestOptions: RequestInit = {
    method: 'GET',
    credentials: 'include',
    next: {
      tags: ['posts', id],
    },
    cache: 'no-store',
  };
  const response = await fetch(requestUrl, requestOptions);

  if (response.ok) {
    return response.json();
  }

  return responseErrorHandler(response);
};
