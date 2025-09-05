import MessagesSearchBody from '@/app/(afterLogin)/messages/_component/_body/_search/MessagesSearchBody';
import MessagesSearchBar from '@/app/(afterLogin)/messages/_component/_body/MessagesSearchBar';

interface Props {
  sessionid: string;
}

export default function MessagesSearch({ sessionid }: Props) {
  return (
    <>
      <MessagesSearchBar />
      <MessagesSearchBody sessionid={sessionid} />
    </>
  );
}
