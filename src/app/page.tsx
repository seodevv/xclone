import utils from '@/app/utility.module.css';
import cx from 'classnames';
import Main from '@/app/(beforeLogin)/_component/Main';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/_lib/authOptions';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function Home() {
  const session = await getServerSession(authOptions);
  const sid = cookies().get('connect.sid');

  if (session && typeof sid !== 'undefined') {
    redirect('/home');
  }

  return (
    <main className={cx(utils.d_flexColumn, utils.h_min_100dvh)}>
      <Main />
    </main>
  );
}
