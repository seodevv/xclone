import { getServerSession } from 'next-auth';
import authOptions from '@/app/_lib/authOptions';
import IBackground from '@/app/(afterLogin)/@i/(.)i/_component/IBackground';
import SingleUserHydrationBoundary from '@/app/(afterLogin)/@settings/(.)settings/profile/_boundaray/SingleUserHydrationBoundary';
import SettingsProfile from '@/app/(afterLogin)/@settings/(.)settings/profile/_component/SettingsProfile';
import HtmlOverflowHidden from '@/app/_component/_overflow/HtmlOverflowHidden';

export default async function SettingsProfileSlot() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;

  return (
    <SingleUserHydrationBoundary username={session.user.email}>
      <IBackground overflow="auto">
        <HtmlOverflowHidden />
        <SettingsProfile sessionid={session.user.email} />
      </IBackground>
    </SingleUserHydrationBoundary>
  );
}
