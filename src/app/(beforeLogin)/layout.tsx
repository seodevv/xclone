import styles from './beforeLogin.layout.module.css';
import { ReactNode } from 'react';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/_lib/authOptions';
import { redirect } from 'next/navigation';

type Props = { children: ReactNode; modal: ReactNode };
export default async function Layout({ children, modal }: Props) {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/home');
  }

  return (
    <main className={styles.main_container}>
      {children}
      {modal}
    </main>
  );
}
