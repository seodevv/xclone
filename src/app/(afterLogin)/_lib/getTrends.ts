import { HashTags } from '@/model/Hashtag';

export const getTrends = async (): Promise<{
  data: HashTags[];
  nextCursor?: number;
  message: string;
}> => {
  const isServer = typeof window === 'undefined';
  const nextHeaders = isServer ? await import('next/headers') : undefined;
  const requestUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/hashtags/trends`;
  const requestOptions: RequestInit = {
    method: 'GET',
    credentials: 'include',
    headers: nextHeaders
      ? { Cookie: nextHeaders.cookies().toString() }
      : undefined,
    next: {
      tags: ['hashtags', 'list'],
    },
    cache: 'no-store',
  };
  const response = await fetch(requestUrl, requestOptions);

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
};
