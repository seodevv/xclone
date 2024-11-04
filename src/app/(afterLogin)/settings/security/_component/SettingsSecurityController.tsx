'use client';

import useSettingsLocalStore from '@/app/(afterLogin)/_store/SettingsLocalStore';
import SettingsInform from '@/app/(afterLogin)/settings/_component/SettingsInform';
import SettingsSubWrapper from '@/app/(afterLogin)/settings/_component/SettingsSubWrapper';
import SettingsVerifyPassword from '@/app/(afterLogin)/settings/_component/SettingsVerifyPassword';
import SettingsSecurity from '@/app/(afterLogin)/settings/security/_component/SettingsSecurity';
import { useState } from 'react';

export default function SettingsSecurityController() {
  const [verified, setVerified] = useState(false);
  const setPassProtection = useSettingsLocalStore(
    (state) => state.setPassProtection
  );

  if (verified) {
    return (
      <SettingsSubWrapper header="Save account changes" noBack={false}>
        <SettingsVerifyPassword
          onSuccess={() => {
            setPassProtection(true);
            setVerified(false);
          }}
        />
      </SettingsSubWrapper>
    );
  }

  return (
    <SettingsSubWrapper header="Security" noBack={false}>
      <SettingsInform inform="Manage your account’s security." />
      <SettingsSecurity
        onCheck={() => {
          setVerified(true);
        }}
        onUnCheck={() => {
          setVerified(true);
        }}
      />
    </SettingsSubWrapper>
  );
}
