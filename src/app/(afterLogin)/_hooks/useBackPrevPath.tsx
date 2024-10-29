'use client';

import { PathRecordContext } from '@/app/_provider/PathRecordProvider';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';

export default function useBackRouter(prevPath = '/home') {
  const router = useRouter();
  const ctx = useContext(PathRecordContext);

  const back = () => {
    if (ctx.prevPath === ctx.path) {
      router.push(prevPath);
      return;
    }

    router.back();
  };

  return { back };
}
