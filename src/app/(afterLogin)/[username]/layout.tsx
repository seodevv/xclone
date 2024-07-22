import { ReactNode } from 'react';
import style from '@/app/(afterLogin)/[username]/_style/layout.module.css';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import UserProfile from './_component/UserProfile';
import UserTabs from './_component/UserTabs';
import ProfileHeader from './_component/ProfileHeader';

interface Props {
  children: ReactNode;
  params: { username: string };
}

export default async function layout({ children, params }: Props) {
  const session = await getServerSession(authOptions);

  return (
    <main className={style.main}>
      <ProfileHeader username={params.username} />
      <section className={style.content}>
        <UserProfile session={session} username={params.username} />
        <UserTabs session={session} username={params.username} />
        {children}
      </section>
    </main>
  );
}
