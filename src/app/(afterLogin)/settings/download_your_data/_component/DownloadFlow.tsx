'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DownloadFlow() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/i/flow/verify_account_ownership', { scroll: false });
  }, []);

  return null;
}
