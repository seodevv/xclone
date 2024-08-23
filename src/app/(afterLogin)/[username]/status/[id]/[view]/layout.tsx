import ViewHydrationBoundary from '@/app/(afterLogin)/[username]/status/[id]/[view]/_boundary/ViewHydrationBoundary';
import authOptions from '@/app/_lib/authOptions';
import { getServerSession } from 'next-auth';

interface Props {
  params: { username: string; id: string; view: string };
  children: React.ReactNode;
}

export default async function ViewLayout({ params, children }: Props) {
  const session = await getServerSession(authOptions);

  if (
    !['quotes', 'retweets', 'likes'].includes(params.view) ||
    (params.view === 'likes' && session?.user?.email !== params.username)
  ) {
    throw new Error('page-not-found');
  }

  return (
    <ViewHydrationBoundary params={params}>{children}</ViewHydrationBoundary>
  );
}
