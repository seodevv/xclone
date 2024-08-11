import style from './_style/home.module.css';
import CommentForm from '../[username]/status/[id]/_component/CommentForm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import HomeTab from './_component/HomeTab';
import HomeTabProvider from './_component/HomeTabProvider';
import HomePosts from './_component/HomePosts';
import HomeHydrationBoundary from './_boundray/HomeHydrationBoundary';

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) return null;

  return (
    <main className={style.main}>
      <HomeHydrationBoundary>
        <HomeTabProvider>
          <HomeTab />
          <CommentForm session={session} isPost />
          <HomePosts />
        </HomeTabProvider>
      </HomeHydrationBoundary>
    </main>
  );
}
