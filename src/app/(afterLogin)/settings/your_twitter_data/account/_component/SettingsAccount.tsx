'use client';

import useSettingsLocalStore from '@/app/(afterLogin)/_store/SettingsLocalStore';
import useSettingsSessionStore from '@/app/(afterLogin)/_store/SettingsStore';
import SettingsAccountInformation from '@/app/(afterLogin)/settings/your_twitter_data/account/_component/SettingsAccountInformation';
import SettingsConfirm from '@/app/(afterLogin)/settings/your_twitter_data/account/_component/SettingsConfirm';
import { AdvancedUser } from '@/model/User';

export default function SettingsAccount() {
  const { verified, user, setVerified } = useSettingsSessionStore((state) => ({
    verified: state.verified,
    user: state.user,
    setVerified: state.setVerified,
  }));
  const gender = useSettingsLocalStore((state) => state.gender);

  const onSuccessVerified = (user: AdvancedUser) => {
    setVerified(user);
  };

  if (verified && user) {
    return <SettingsAccountInformation user={user} gender={gender} />;
  }

  return <SettingsConfirm onSuccess={onSuccessVerified} />;
}
