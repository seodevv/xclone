import { AdvancedPost } from '@/model/Post';

export const getPostRecommends = async (): Promise<{
  data: AdvancedPost[];
  message: string;
}> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts/recommends`,
    {
      cache: 'no-store',
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
};
