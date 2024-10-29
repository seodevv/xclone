'use client';

import VerifyPassword from '@/app/(afterLogin)/@i/(.)i/flow/_component/VerifyPassword';
import AddEmail from '@/app/(afterLogin)/@i/(.)i/flow/add_email/_component/AddEmail';
import { useState } from 'react';

export default function IFlowAddEmailController() {
  const [verified, setVerified] = useState(false);

  if (verified) {
    return <AddEmail />;
  }

  return (
    <VerifyPassword
      onSuccess={() => {
        setVerified(true);
      }}
    />
  );
}
