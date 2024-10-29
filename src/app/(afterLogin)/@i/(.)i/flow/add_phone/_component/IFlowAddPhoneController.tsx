'use client';

import AddPhone from '@/app/(afterLogin)/@i/(.)i/flow/add_phone/_component/AddPhone';
import VerifyPassword from '@/app/(afterLogin)/@i/(.)i/flow/_component/VerifyPassword';
import { useState } from 'react';

export default function IFlowAddPhoneController() {
  const [verified, setVerified] = useState(false);

  if (verified) {
    return <AddPhone />;
  }

  return (
    <VerifyPassword
      onSuccess={() => {
        setVerified(true);
      }}
    />
  );
}
