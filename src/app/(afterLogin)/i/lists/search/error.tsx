'use client';

import ListsError from '@/app/(afterLogin)/i/lists/[listid]/error';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  return <ListsError error={error} reset={reset} />;
}
