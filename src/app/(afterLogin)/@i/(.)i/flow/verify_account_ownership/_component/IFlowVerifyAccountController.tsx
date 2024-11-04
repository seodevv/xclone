'use client';

import VerifyPassword from '@/app/(afterLogin)/@i/(.)i/flow/_component/VerifyPassword';
import VerifyAccount from '@/app/(afterLogin)/@i/(.)i/flow/verify_account_ownership/_component/VerifyAccount';
import { useState } from 'react';

export default function IFlowVerifyAccountController() {
  const [verified, setVerified] = useState(false);

  if (verified) {
    return <VerifyAccount />;
  }

  return (
    <VerifyPassword
      onSuccess={() => {
        setVerified(true);
      }}
    />
  );
}
