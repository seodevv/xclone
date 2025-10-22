import AddHistoryStack from '@/app/(afterLogin)/@i/(.)i/_component/AddHistoryStack';
import IBackground from '@/app/(afterLogin)/@i/(.)i/_component/IBackground';
import IHeader from '@/app/(afterLogin)/@i/(.)i/_component/IHeader';
import PostViewsHydrationBoundary from '@/app/(afterLogin)/[username]/_boundary/PostViewsHydrationBoundary';
import SinglePostHydrationBoundary from '@/app/(afterLogin)/[username]/status/[id]/_component/SinglePostHydrationBoundary';
import authOptions from '@/app/_lib/authOptions';
import { getServerSession } from 'next-auth';

interface Props {
  params: { username: string; id: string };
  children: React.ReactNode;
}

export default async function UserAnalyticsLayout({ params, children }: Props) {
  const session = await getServerSession(authOptions);
  const title = 'Post Analytics';

  return (
    <SinglePostHydrationBoundary
      params={params}
      disabled={session?.user?.email === params.username}
    >
      <PostViewsHydrationBoundary
        postid={params.id}
        disabled={session?.user?.email === params.username}
      >
        <IBackground>
          <AddHistoryStack />
          <IHeader title={title} align="left" />
          {children}
        </IBackground>
      </PostViewsHydrationBoundary>
    </SinglePostHydrationBoundary>
  );
}
