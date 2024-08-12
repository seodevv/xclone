import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import HomePosts from './_component/HomePosts';
import HomeHydrationBoundary from '@/app/(afterLogin)/home/_boundray/HomeHydrationBoundary';
import HomeRedirect from '@/app/(afterLogin)/home/_component/HomeRedirect';

interface Props {
  searchParams: { r?: string };
}

export default async function HomePage({ searchParams }: Props) {
  const session = await getServerSession(authOptions);

  if (!session) return null;

  return (
    <HomeHydrationBoundary>
      <HomeRedirect redirect={searchParams.r} />
      <HomePosts />
    </HomeHydrationBoundary>
  );
}
