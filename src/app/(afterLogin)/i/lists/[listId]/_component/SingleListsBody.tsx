import SingleLists from '@/app/(afterLogin)/i/lists/[listid]/_component/SingleLists';
import SingleListsPosts from '@/app/(afterLogin)/i/lists/[listid]/_component/SingleListsPosts';
import authOptions from '@/app/_lib/authOptions';
import { getServerSession } from 'next-auth';

interface Props {
  listid: string;
}

export default async function SingleListsBody({ listid }: Props) {
  const session = await getServerSession(authOptions);

  if (!session) return null;

  return (
    <div>
      <SingleLists session={session} listid={listid} />
      <SingleListsPosts listid={listid} />
    </div>
  );
}
