'use client';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  return (
    <main>
      <h3>{error.message}</h3>
      <h4>{error.digest}</h4>
    </main>
  );
}
