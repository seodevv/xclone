import style from './layout.module.css';
import { ReactNode } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import ReactQueryProvider from './_provider/ReactQueryProvider';
import NextAuthProvider from '@/app/(afterLogin)/_provider/NextAuthProvider';
import ViewportProvider from './_provider/ViewportProvider';
import AlterModalProvider from './_provider/AlterModalProvider';
import NavMenu from '@/app/(afterLogin)/_component/navbar/NavMenu';
import XLogo from './_component/XLogo';
import FollowRecommendsSection from './_component/follow_recommends/FollowRecommendsSection';
import RightSearchZone from '@/app/(afterLogin)/_component/search/RightSearchZone';
import Logout from './_component/logout/Logout';
import TrendSection from './_component/trends/TrendSection';

type Props = { children: ReactNode; modal: ReactNode };
export default async function AfterLoginLayout({ children, modal }: Props) {
  const session = await getServerSession(authOptions);

  return (
    <NextAuthProvider>
      <ReactQueryProvider>
        <ViewportProvider>
          <AlterModalProvider>
            <div className={style.container}>
              <header className={style.leftSectionWrapper}>
                <section className={style.leftSection}>
                  <div className={style.leftSectionFixed}>
                    <XLogo session={session} />
                    <NavMenu session={session} />
                    <Logout session={session} />
                  </div>
                </section>
              </header>
              <div className={style.rightSectionWrapper}>
                <div className={style.rightSectionInner}>
                  <main className={style.main}>{children}</main>
                  <section className={style.rightSection}>
                    <RightSearchZone />
                    <TrendSection />
                    <FollowRecommendsSection />
                  </section>
                </div>
              </div>
              {modal}
            </div>
          </AlterModalProvider>
        </ViewportProvider>
      </ReactQueryProvider>
    </NextAuthProvider>
  );
}
