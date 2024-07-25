import { AdvancedPost } from '@/model/Post';

interface Params {
  pageParam: number;
}

export const getPostRecommends = async ({
  pageParam,
}: Params): Promise<{
  data: AdvancedPost[];
  nextCursor?: number;
  message: string;
}> => {
  const isServer = typeof window === 'undefined';
  const response = await fetch(
    `${
      isServer ? process.env.SERVER_URL : process.env.NEXT_PUBLIC_SERVER_URL
    }/api/posts/recommends?cursor=${pageParam}`,
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
