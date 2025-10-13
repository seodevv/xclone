import authOptions from '@/app/_lib/authOptions';
import { getServerSession } from 'next-auth';
import RoomBody from '@/app/(afterLogin)/messages/[room]/_component/_body/RoomBody';
import { Metadata, ResolvingMetadata } from 'next';
import { cookies } from 'next/headers';
import { AdvancedRooms } from '@/model/Room';
import { decryptRoomId } from '@/app/_lib/common';

export async function generateMetadata(
  { params: { room: roomId } }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return { title: 'XClone' };

  const requestUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/rooms/${roomId}`;
  const requestInit: RequestInit = {
    method: 'GET',
    credentials: 'include',
    headers: {
      Cookie: cookies().toString(),
    },
    next: {
      tags: ['rooms', 'list', session.user.email],
    },
    cache: 'no-store',
  };
  try {
    const response = await fetch(requestUrl, requestInit);
    if (response.ok) {
      const { data }: { data: AdvancedRooms } = await response.json();
      const target =
        session.user.email === data.receiverid
          ? data.Sender.nickname
          : data.Receiver.nickname;
      const notice = data.sent.find((u) => u.id === target)?.count || 0;
      return {
        title: `${notice !== 0 ? `(${notice})` : ''} ${target} / XClone`,
      };
    }
  } catch (error) {
    console.error('[error catch]\n', error);
  }

  return {
    title: `XClone`,
  };
}

interface Props {
  params: { room: string };
}

export default async function RoomPage({ params: { room } }: Props) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) return null;

  const { senderid, receiverid } = decryptRoomId({
    userId: session.user.email,
    roomId: room,
  });

  if (senderid !== session.user.email || receiverid === null) {
    return null;
  }

  return <RoomBody roomId={room} receiverid={receiverid} />;
}
