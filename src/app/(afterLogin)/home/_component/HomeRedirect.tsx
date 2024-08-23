'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function HomeRedirect() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const redirect = searchParams.get('r');
    if (redirect) {
      history.replaceState(null, '', pathname);
      router.push(`/${redirect.replaceAll(',', '/')}`, { scroll: false });
    }
  }, [searchParams, pathname, router]);

  return null;
}
