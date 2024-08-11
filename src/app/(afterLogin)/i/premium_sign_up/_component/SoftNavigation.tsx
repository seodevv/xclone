'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface Props {
  href?: string;
}

export default function SoftNavigation({ href }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (href) {
      router.push(href);
      return;
    }
    router.push(pathname);
  }, [router, pathname]);

  return null;
}
