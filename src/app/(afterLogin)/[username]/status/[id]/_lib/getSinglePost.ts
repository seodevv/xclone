import { ERROR_STATUS } from '@/app/(afterLogin)/error';
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
  const requestUrl = `${
    isServer ? process.env.SERVER_URL : process.env.NEXT_PUBLIC_SERVER_URL
  }/api/posts/${id}?userId=${username}`;
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

  if (response.status === 400) {
    throw new Error(ERROR_STATUS.badRequest);
  } else if (response.status === 403) {
    throw new Error(ERROR_STATUS.unAuthorized);
  } else if (response.status === 404) {
    throw new Error(ERROR_STATUS.notFound);
  } else if (response.status === 500) {
    throw new Error(ERROR_STATUS.serverERror);
  } else {
    throw new Error(ERROR_STATUS.fetchError);
  }
};
