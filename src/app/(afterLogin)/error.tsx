'use client';

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
  pageNotFound: 'page-not-found',
  serverERror: 'server-error',
};

export default function Error({ error, reset }: Props) {
  return (
    <main>
      <h3>{error.message}</h3>
      <h4>{error.digest}</h4>
    </main>
  );
}
