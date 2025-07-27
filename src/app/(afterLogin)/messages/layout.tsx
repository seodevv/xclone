import styles from './messages.layout.module.css';
import RoomsHydartionBoundary from '@/app/(afterLogin)/messages/_boundary/RoomsHydrationBoundary';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/_lib/authOptions';
import WebSocketProvider from '@/app/(afterLogin)/messages/[room]/_provider/WebSocketProvider';
import MessagesLeftSection from '@/app/(afterLogin)/messages/_component/MessagesLeftSection';
import MessagesScrollProvider from '@/app/(afterLogin)/messages/[room]/_provider/MessagesScrollProvider';

interface Props {
  children: React.ReactNode;
}

export default async function MessagesLayout({ children }: Props) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) return null;

  return (
    <RoomsHydartionBoundary sessionId={session.user.email}>
      <MessagesScrollProvider>
        <WebSocketProvider sessionId={session.user.email}>
          <main className={styles.main}>
            <MessagesLeftSection sessionid={session.user.email} />
            <section className={styles.right}>{children}</section>
          </main>
        </WebSocketProvider>
      </MessagesScrollProvider>
    </RoomsHydartionBoundary>
  );
}
