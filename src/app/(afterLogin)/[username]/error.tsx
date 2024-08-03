'use client';

import DisConnection from '../_component/error/DisConnection';
import NotFound from '../_component/error/NotFound';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ProfileError({ error, reset }: Props) {
  if (error.message === 'not-found') {
    return (
      <NotFound href="/search" type="user" alterMessage="this user not found" />
    );
  }

  return <DisConnection onClick={() => reset()} />;
}
