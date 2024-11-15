'use client';

import SettingsVerifyPassword from '@/app/(afterLogin)/settings/_component/SettingsVerifyPassword';
import useAlterModal from '@/app/_hooks/useAlterModal';
import { useState } from 'react';

export default function LoginHistory() {
  const [verified, setVerified] = useState(false);
  const { sendPrepareMessage } = useAlterModal();
  const onSuccessVerify = () => {
    setVerified(true);
    sendPrepareMessage();
  };

  if (verified) {
    return null;
  }

  return (
    <>
      <SettingsVerifyPassword
        title="Confirm your password"
        sub="Please enter your password in order to get this."
        btnText="Confirm"
        noDivideLine
        onSuccess={onSuccessVerify}
      />
    </>
  );
}
