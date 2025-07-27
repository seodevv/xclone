import { getServerSession } from 'next-auth';
import authOptions from '@/app/_lib/authOptions';
import HomePosts from './_component/HomePosts';
import HomeHydrationBoundary from '@/app/(afterLogin)/home/_boundray/HomeHydrationBoundary';
import HomeRedirect from '@/app/(afterLogin)/home/_component/HomeRedirect';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home / XClone',
};

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  return (
    <HomeHydrationBoundary>
      <HomeRedirect />
      <HomePosts />
    </HomeHydrationBoundary>
  );
}
