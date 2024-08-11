import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import SettingsProfileSlotOutSide from './_component/SettingsProfileSlotOutSide';

export default async function SettingsProfileSlot() {
  const session = await getServerSession(authOptions);

  if (!session) return null;

  return (
    <SettingsProfileSlotOutSide>
      <h3>This is /settings/profile slot</h3>
      <p>{session.user?.email}</p>
    </SettingsProfileSlotOutSide>
  );
}
