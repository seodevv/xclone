import RoomMessageInfo from '@/app/(afterLogin)/messages/[room]/info/_component/RoomMessageInfo';
import authOptions from '@/app/_lib/authOptions';
import { getServerSession } from 'next-auth';

interface Props {
  params: { room: string };
}

export default async function RoomMessageInfoPage({ params: { room } }: Props) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) return null;

  return <RoomMessageInfo sessionId={session.user.email} roomId={room} />;
}
