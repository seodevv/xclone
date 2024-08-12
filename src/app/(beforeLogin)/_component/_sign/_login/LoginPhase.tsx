'use client';

import LoginPhaseA from '@/app/(beforeLogin)/_component/_sign/_login/LoginPhaseA';
import LoginPhaseB from '@/app/(beforeLogin)/_component/_sign/_login/LoginPhaseB';
import { LoginContext } from '@/app/(beforeLogin)/_component/_sign/_login/LoginProvider';
import { useContext } from 'react';

export default function LoginPhase() {
  const { state } = useContext(LoginContext);

  if (state.options.page === 0) {
    return <LoginPhaseA />;
  }

  if (state.options.page === 1) {
    return <LoginPhaseB />;
  }

  return null;
}
