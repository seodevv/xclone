'use client';

import SettingButton from '@/app/(afterLogin)/_component/buttons/SettingButton';
import { useRouter } from 'next/navigation';

export default function ExploreSettings() {
  const router = useRouter();

  const onClickSettings = () => {
    router.push('/settings/explore');
  };

  return <SettingButton onClick={onClickSettings} />;
}
