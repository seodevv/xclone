'use client';

import DisConnection from '@/app/(afterLogin)/_component/error/DisConnection';
import NotFound from '@/app/(afterLogin)/_component/error/NotFound';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  if (error.message === 'not-found') {
    return <NotFound href="/search" alterMessage="this post not found" />;
  }

  return <DisConnection onClick={() => reset()} />;
}
