import utils from '@/app/utility.module.css';
import cx from 'classnames';
import IBackground from '@/app/(afterLogin)/@i/(.)i/_component/IBackground';
import MessagesComposeHeader from '@/app/(afterLogin)/@modal/(.)messages/compose/_component/MessagesComposeHeader';
import MessagesComposeSearch from '@/app/(afterLogin)/@modal/(.)messages/compose/_component/MessagesComposeSearch';
import MessagesComposeProvider from '@/app/(afterLogin)/@modal/(.)messages/compose/_provider/MessagesComposeProvider';
import MessagesComposeUsers from '@/app/(afterLogin)/@modal/(.)messages/compose/_component/MessagesComposeUsers';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/_lib/authOptions';

interface Props {
  children: React.ReactNode;
}

export default async function MessagesComposeLayout({ children }: Props) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) return null;

  return (
    <MessagesComposeProvider>
      <IBackground>
        <MessagesComposeHeader
          session={{
            id: session.user.email,
            nickname: session.user.name || '',
            image: session.user.image || '',
            verified: null,
          }}
        />
        <div className={cx(utils.d_flexColumn, utils.h_max_600)}>
          <MessagesComposeSearch />
          <MessagesComposeUsers />
          {children}
        </div>
      </IBackground>
    </MessagesComposeProvider>
  );
}
