'use client';

import useViewport from '@/app/(afterLogin)/_hooks/useViewport';
import { useRouter } from 'next/navigation';
import { useLayoutEffect } from 'react';

export default function SettingsPage() {
  const router = useRouter();
  const { width } = useViewport();

  useLayoutEffect(() => {
    if (width !== null && width >= 1024) {
      router.replace('/settings/account');
    }
  }, [width]);

  return null;

  // redirect('/settings/account');
}
