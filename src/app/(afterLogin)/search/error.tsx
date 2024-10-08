'use client';

import DisConnection from '../_component/error/DisConnection';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function SearchError({ error, reset }: Props) {
  return <DisConnection onClick={() => reset()} />;
}
