'use client';

import modalStyles from '@/app/modal.module.css';
import VerifyPassword, {
  VerifyPasswordRef,
} from '@/app/(afterLogin)/@i/(.)i/flow/_component/VerifyPassword';
import { useRef, useState } from 'react';
import useAlterModal from '@/app/_hooks/useAlterModal';
import { useRouter } from 'next/navigation';

export default function SSODisconnectController() {
  const router = useRouter();
  const { sendPrepareMessage } = useAlterModal();
  const [password, setPassword] = useState('');
  const verifyRef = useRef<VerifyPasswordRef>(null);

  const onSuccessVerify = () => {
    sendPrepareMessage();
    router.back();
  };

  const onChangePassword = (value: string) => {
    setPassword(value);
  };

  return (
    <div className={modalStyles.container}>
      <div className={modalStyles.body}>
        <VerifyPassword
          ref={verifyRef}
          title="Disconnect from Google"
          sub="To disconnect from Google, please verify your password."
          btnText={password === '' ? 'Forgot password?' : 'Disconnect'}
          btnTheme={'theme'}
          onSuccess={onSuccessVerify}
          onChange={onChangePassword}
        />
      </div>
    </div>
  );
}
