import RoomMessageInfo from '@/app/(afterLogin)/messages/[room]/info/_component/RoomMessageInfo';
import authOptions from '@/app/_lib/authOptions';
import { decryptRoomId } from '@/app/_lib/common';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';

export const metadata: Metadata = {
  title: 'Conversation info / XClone',
};

interface Props {
  params: { room: string };
}

export default async function RoomMessageInfoPage({ params: { room } }: Props) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) return null;

  const { senderid, receiverid } = decryptRoomId({
    userId: session.user.email,
    roomId: room,
  });

  if (senderid !== session.user.email || receiverid === null) {
    return null;
  }

  return (
    <RoomMessageInfo
      roomid={room}
      sessionid={session.user.email}
      receiverid={receiverid}
    />
  );
}
