import { HashTag } from '@/model/Hashtag';

export const getTrends = async (): Promise<{
  data: HashTag[];
  message: string;
}> => {
  const isServer = typeof window === 'undefined';
  const nextHeaders = isServer ? await import('next/headers') : undefined;
  const requestUrl = `${
    isServer ? process.env.SERVER_URL : process.env.NEXT_PUBLIC_SERVER_URL
  }/api/hashtags/trends`;
  const requestOptions: RequestInit = {
    method: 'GET',
    credentials: 'include',
    next: {
      tags: ['hashtags', 'list'],
    },
    headers: nextHeaders
      ? { Cookie: nextHeaders.cookies().toString() }
      : undefined,
  };
  const response = await fetch(requestUrl, requestOptions);

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
};
