'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface Props {
  params: { username: string; id: string; photoId: string };
  referer: string | null;
}

export default function RedirectStatus({ params, referer }: Props) {
  const router = useRouter();

  useEffect(() => {
    if (!referer) {
      router.replace(`/${params.username}/status/${params.id}`);
    }
  }, [router, referer, params.username, params.id]);

  return <></>;
}
