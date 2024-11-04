'use client';

import DisConnection from '@/app/(afterLogin)/_component/error/DisConnection';
import { useMyProfileQuery } from '@/app/(afterLogin)/_hooks/useMyProfileQuery';
import Deactivate from '@/app/(afterLogin)/settings/deactivate/_component/Deactivate';
import DeactivateInform from '@/app/(afterLogin)/settings/deactivate/_component/DeactivateInform';
import { useState } from 'react';

export default function DeactivateController() {
  const { data: user, refetch } = useMyProfileQuery();
  const [next, setNext] = useState(false);

  if (next) {
    return <Deactivate />;
  }

  if (user) {
    return <DeactivateInform user={user.data} onClick={() => setNext(true)} />;
  }

  return <DisConnection onClick={() => refetch()} />;
}
