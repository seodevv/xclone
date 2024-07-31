import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import SinglePost from './_component/SinglePost';
import SinglePostHydrationBoundary from './_component/SinglePostHydrationBoundary';

interface Props {
  params: { username: string; id: string };
}

export default async function SinglePostPage({ params }: Props) {
  const session = await getServerSession(authOptions);

  return (
    <SinglePostHydrationBoundary params={params}>
      <SinglePost session={session} params={params} />
    </SinglePostHydrationBoundary>
  );
}
