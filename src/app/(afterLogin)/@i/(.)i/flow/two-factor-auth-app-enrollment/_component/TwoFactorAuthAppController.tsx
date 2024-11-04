'use client';

import VerifyPassword from '@/app/(afterLogin)/@i/(.)i/flow/_component/VerifyPassword';
import TwoFactorAuthApp from '@/app/(afterLogin)/@i/(.)i/flow/two-factor-auth-app-enrollment/_component/TwoFactorAuthApp';
import { useState } from 'react';

export default function TwoFactorAuthAppController() {
  const [verified, setVerified] = useState(false);

  if (verified) {
    return <TwoFactorAuthApp />;
  }

  return (
    <VerifyPassword
      title="Enter your password"
      sub="To get started, first enter your X password to confirm it’s really you."
      onSuccess={() => setVerified(true)}
    />
  );
}
