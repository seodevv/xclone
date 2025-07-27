import AddHistoryStack from '@/app/(afterLogin)/@i/(.)i/_component/AddHistoryStack';
import MessagesComposeBody from '@/app/(afterLogin)/@modal/(.)messages/compose/_component/MessagesComposeBody';
import authOptions from '@/app/_lib/authOptions';
import { getServerSession } from 'next-auth';

export default async function MessagesComposeGroupSlot() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) return null;

  return (
    <>
      <AddHistoryStack />
      <MessagesComposeBody sessionId={session.user.email} />
    </>
  );
}
