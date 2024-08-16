import styles from './afterLogin.home.layout.module.css';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/_lib/authOptions';
import HomeTabProvider from '@/app/(afterLogin)/home/_component/HomeTabProvider';
import HomeTab from '@/app/(afterLogin)/home/_component/HomeTab';
import PostForm from '@/app/(afterLogin)/_component/post/form/PostForm';

interface Props {
  children: React.ReactNode;
}

export default async function HomeLayout({ children }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  return (
    <main className={styles.main}>
      <HomeTabProvider>
        <HomeTab />
        <PostForm session={session} placeholder="What is happening?!" />
        {children}
      </HomeTabProvider>
    </main>
  );
}
