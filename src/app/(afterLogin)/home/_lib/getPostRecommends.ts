import { ERROR_STATUS } from '@/app/_lib/error';
import { AdvancedPost } from '@/model/Post';

interface Params {
  queryKey: (string | { filter: 'all' | 'media' })[];
  pageParam: number;
}

export const getPostRecommends = async ({
  queryKey: [, , , options],
  pageParam,
}: Params): Promise<{
  data: AdvancedPost[];
  nextCursor?: number;
  message: string;
}> => {
  if (typeof options !== 'object') {
    throw new Error(ERROR_STATUS.badRequest);
  }

  const isServer = typeof window === 'undefined';
  const response = await fetch(
    `${
      isServer ? process.env.SERVER_URL : process.env.NEXT_PUBLIC_SERVER_URL
    }/api/posts/recommends?cursor=${pageParam}&filter=${options.filter}`,
    {
      method: 'GET',
      credentials: 'include',
      next: {
        tags: ['posts', 'list', 'recommends'],
      },
      cache: 'no-store',
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
};
