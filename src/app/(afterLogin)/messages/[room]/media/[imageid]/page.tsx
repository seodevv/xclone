import { redirect } from 'next/navigation';

interface Props {
  params: { room: string; imageid: string };
}

export default function MessagesImagePage({ params }: Props) {
  redirect(`/messages/${params.room}`);
}
