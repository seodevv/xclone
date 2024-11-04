'use client';

import VerifyPassword from '@/app/(afterLogin)/@i/(.)i/flow/_component/VerifyPassword';
import SecurityKey from '@/app/(afterLogin)/@i/(.)i/flow/two-factor-security-key-enrollment/_component/SecurityKey';
import { useState } from 'react';

export default function SecurityKeyController() {
  const [verified, setVerified] = useState(false);

  if (verified) {
    return <SecurityKey />;
  }

  return (
    <VerifyPassword
      title="Enter your password"
      sub="To get started, first enter your X password to confirm it’s really you."
      onSuccess={() => setVerified(true)}
    />
  );
}
