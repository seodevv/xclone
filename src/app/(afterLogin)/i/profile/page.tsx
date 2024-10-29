import authOptions from '@/app/_lib/authOptions';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function IProfile() {
  const session = await getServerSession(authOptions);
  redirect(`/${session?.user?.email}`);
}
