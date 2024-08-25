'use client';

import DisConnection from '@/app/(afterLogin)/_component/error/DisConnection';
import NotFound from '@/app/(afterLogin)/_component/error/NotFound';
import { ERROR_STATUS } from '@/app/_lib/error';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  if (error.message === ERROR_STATUS.notFound) {
    return (
      <NotFound href="/search" type="post" alterMessage="this post not found" />
    );
  }

  if (error.message === ERROR_STATUS.pageNotFound) {
    return (
      <NotFound
        href="/search"
        type="page"
        alterMessage="this page doesn't exist"
      />
    );
  }

  return <DisConnection onClick={() => reset()} />;
}
