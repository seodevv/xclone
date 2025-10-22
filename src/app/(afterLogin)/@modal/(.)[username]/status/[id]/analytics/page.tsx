import AnalyticsBody from '@/app/(afterLogin)/@modal/(.)[username]/status/[id]/analytics/_components/AnalyticsBody';
import AnalyticsOthers from '@/app/(afterLogin)/@modal/(.)[username]/status/[id]/analytics/_components/AnalyticsOthers';
import authOptions from '@/app/_lib/authOptions';
import { getServerSession } from 'next-auth';

interface Props {
  params: { username: string; id: string };
}

export default async function UserAnalyticsSlot({ params }: Props) {
  const session = await getServerSession(authOptions);

  if (session?.user?.email === params.username) {
    return <AnalyticsBody params={params} />;
  }

  return <AnalyticsOthers />;
}
