import { ReactNode } from 'react';
import styles from '@/app/(beforeLogin)/_styles/main.module.css';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

type Props = { children: ReactNode; modal: ReactNode };
export default async function Layout({ children, modal }: Props) {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/home');
  }

  return (
    <div className={styles.main_container}>
      {children}
      {modal}
    </div>
  );
}
