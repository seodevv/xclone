'use client';

import DisConnection from '@/app/(afterLogin)/_component/error/DisConnection';
import NotFound from '@/app/(afterLogin)/_component/error/NotFound';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export const ERROR_STATUS = {
  fetchError: 'fetch-error',
  badRequest: 'bad-request',
  unAuthorized: 'unAuthorized',
  forbidden: 'forbidden',
  notFound: 'not-found',
  serverERror: 'server-error',
};

export default function Error({ error, reset }: Props) {
  if (error.message === ERROR_STATUS.notFound) {
    return (
      <NotFound href="/search" type="post" alterMessage="this post not found" />
    );
  }

  return <DisConnection onClick={() => reset()} />;
}
