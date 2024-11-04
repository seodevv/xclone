'use client';

import SettingsVerifyPassword from '@/app/(afterLogin)/settings/_component/SettingsVerifyPassword';
import useAlterModal from '@/app/_hooks/useAlterModal';

export default function LoginHistory() {
  const { sendPrepareMessage } = useAlterModal();
  const onSuccessVerify = () => {
    sendPrepareMessage();
  };

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
