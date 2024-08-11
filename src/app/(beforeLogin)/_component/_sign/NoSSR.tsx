'use client';

import dynamic from 'next/dynamic';

const NoSSR = dynamic(
  () =>
    Promise.resolve(({ children }: { children: React.ReactNode }) => {
      return children;
    }),
  {
    ssr: false,
  }
);

export default NoSSR;
