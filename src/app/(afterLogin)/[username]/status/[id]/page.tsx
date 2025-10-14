import { getServerSession } from 'next-auth';
import authOptions from '@/app/_lib/authOptions';
import SinglePost from './_component/SinglePost';
import SinglePostHydrationBoundary from './_component/SinglePostHydrationBoundary';
import { Metadata } from 'next';
import { AdvancedPost } from '@/model/Post';

interface Props {
  params: { username: string; id: string };
}

export const generateMetadata = async ({
  params: { username, id },
}: Props): Promise<Metadata> => {
  const requestUrl = `/api/v1/posts/${id}?userid=${username}`;
  const requestInit: RequestInit = {
    method: 'GET',
    credentials: 'include',
  };

  try {
    const response = await fetch(requestUrl, requestInit);

    if (response.ok) {
      const post = (await response.json()) as {
        data: AdvancedPost;
        message: string;
      };

      return {
        title: `${post.data.User.nickname} on XClone: "${post.data.content}"`,
      };
    }
  } catch (error) {
    console.error(error);
  }

  return {
    title: `${username}'s post / XClone`,
  };
};

export default async function SinglePostPage({ params }: Props) {
  const session = await getServerSession(authOptions);

  return (
    <SinglePostHydrationBoundary params={params}>
      <SinglePost session={session} params={params} />
    </SinglePostHydrationBoundary>
  );
}
