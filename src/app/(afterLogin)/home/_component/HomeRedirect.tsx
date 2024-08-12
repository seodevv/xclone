'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface Props {
  redirect?: string;
}

export default function HomeRedirect({ redirect }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (redirect) {
      history.replaceState(null, '', pathname);
      router.push(`/${redirect.replaceAll(',', '/')}`, { scroll: false });
    }
  }, [redirect]);

  return null;
}
