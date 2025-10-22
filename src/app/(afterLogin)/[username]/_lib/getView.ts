import { PostViews } from '@/model/Post';

// ['post', 'views', :postid]
interface Params {
  queryKey: [string, string, string];
}

export const getView = async ({
  queryKey: [, , postid],
}: Params): Promise<{ data: PostViews; message: string }> => {
  const isServer = typeof window === 'undefined';
  const nextHeaders = isServer ? await import('next/headers') : undefined;
  const requestUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${postid}/views`;
  const requestOptions: RequestInit = {
    method: 'GET',
    credentials: 'include',
    headers: nextHeaders
      ? { Cookie: nextHeaders.cookies().toString() }
      : undefined,
    next: {
      tags: ['posts', 'views', postid],
    },
    cache: 'no-store',
  };

  const response = await fetch(requestUrl, requestOptions);

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
};
