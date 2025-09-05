import style from './layout.module.css';
import { ReactNode } from 'react';
import { getServerSession } from 'next-auth';
import ReactQueryProvider from './_provider/ReactQueryProvider';
import NextAuthProvider from '@/app/(afterLogin)/_provider/NextAuthProvider';
import ViewportProvider from './_provider/ViewportProvider';
import NavMenu from '@/app/(afterLogin)/_component/navbar/NavMenu';
import XLogo from './_component/XLogo';
import FollowRecommendsSection from './_component/follow_recommends/FollowRecommendsSection';
import RightSearchZone from '@/app/(afterLogin)/_component/search/RightSearchZone';
import Logout from './_component/logout/Logout';
import Sticky from './_component/sticky/Sticky';
import TrendSection from './_component/trends/TrendSection';
import SearchFilters from './_component/search/SearchFilters';
import FollowRecommendsHydrationBoundary from './_boundary/FollowRecommendsHydrationBoundary';
import TrendsHydrationBoundary from './_boundary/TrendsHydrationBoundary';
import authOptions from '@/app/_lib/authOptions';
import SubMenuProvider from '@/app/(afterLogin)/_provider/SubMenuProvider';
import PopUpModal from '@/app/(afterLogin)/_component/_popup/PopUpModal';
import ConfirmProvider from '@/app/(afterLogin)/_provider/ConfirmProvider';
import RightSectionController from '@/app/(afterLogin)/_component/_layout/RightSectionController';
import MainSectionController from '@/app/(afterLogin)/_component/_layout/MainSectionController';
import RoomsNotificationsBoundary from '@/app/(afterLogin)/_boundary/RoomsNotificationsBoundary';
import MyProfileHydrationBoundary from '@/app/(afterLogin)/_boundary/MyProfileHydrationBoundary';

interface Props {
  children: ReactNode;
  modal?: ReactNode;
  settings?: ReactNode;
  i?: ReactNode;
}
export default async function AfterLoginLayout({
  children,
  modal,
  settings,
  i,
}: Props) {
  const session = await getServerSession(authOptions);

  return (
    <>
      <NextAuthProvider>
        <ReactQueryProvider>
          <ViewportProvider>
            <ConfirmProvider>
              <SubMenuProvider session={session}>
                <MyProfileHydrationBoundary>
                  <div className={style.container}>
                    <header className={style.leftSectionWrapper}>
                      <section className={style.leftSection}>
                        <div className={style.leftSectionFixed}>
                          <XLogo session={session} />
                          <RoomsNotificationsBoundary>
                            <NavMenu session={session} />
                          </RoomsNotificationsBoundary>
                          <Logout />
                        </div>
                      </section>
                    </header>
                    <div className={style.rightSectionWrapper}>
                      <div className={style.rightSectionInner}>
                        <MainSectionController>
                          {children}
                        </MainSectionController>
                        <RightSectionController>
                          <RightSearchZone />
                          <Sticky>
                            <SearchFilters />
                            <TrendsHydrationBoundary>
                              <TrendSection session={session} />
                            </TrendsHydrationBoundary>
                            <FollowRecommendsHydrationBoundary>
                              <FollowRecommendsSection />
                            </FollowRecommendsHydrationBoundary>
                          </Sticky>
                        </RightSectionController>
                      </div>
                    </div>
                    {modal}
                    {settings}
                    {i}
                    <PopUpModal />
                  </div>
                </MyProfileHydrationBoundary>
              </SubMenuProvider>
            </ConfirmProvider>
          </ViewportProvider>
        </ReactQueryProvider>
      </NextAuthProvider>
    </>
  );
}
