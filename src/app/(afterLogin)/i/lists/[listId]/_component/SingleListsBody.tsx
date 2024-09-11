import SingleLists from '@/app/(afterLogin)/i/lists/[listId]/_component/SingleLists';
import SingleListsPosts from '@/app/(afterLogin)/i/lists/[listId]/_component/SingleListsPosts';
import authOptions from '@/app/_lib/authOptions';
import { getServerSession } from 'next-auth';

interface Props {
  listId: string;
}

export default async function SingleListsBody({ listId }: Props) {
  const session = await getServerSession(authOptions);

  if (!session) return null;

  return (
    <div>
      <SingleLists session={session} listId={listId} />
      <SingleListsPosts listId={listId} />
    </div>
  );
}
