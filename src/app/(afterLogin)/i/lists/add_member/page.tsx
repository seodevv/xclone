import authOptions from '@/app/_lib/authOptions';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function IListAddMemberPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;

  redirect(`/${session.user.email}/lists`);
}
