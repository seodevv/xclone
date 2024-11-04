'use client';

import { useMyProfileQuery } from '@/app/(afterLogin)/_hooks/useMyProfileQuery';
import useSettingsLocalStore from '@/app/(afterLogin)/_store/SettingsLocalStore';
import useSettingsSessionStore from '@/app/(afterLogin)/_store/SettingsStore';
import SettingsAccountInformation from '@/app/(afterLogin)/settings/your_twitter_data/account/_component/SettingsAccountInformation';
import SettingsConfirm from '@/app/(afterLogin)/settings/your_twitter_data/account/_component/SettingsConfirm';

export default function SettingsAccount() {
  const { data: user } = useMyProfileQuery();
  const { verified, setVerified } = useSettingsSessionStore((state) => ({
    verified: state.verified,
    setVerified: state.setVerified,
  }));
  const gender = useSettingsLocalStore((state) => state.gender);

  const onSuccessVerified = () => {
    setVerified();
  };

  if (verified && user) {
    return <SettingsAccountInformation user={user.data} gender={gender} />;
  }

  return <SettingsConfirm onSuccess={onSuccessVerified} />;
}
