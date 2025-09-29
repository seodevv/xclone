'use client';

import { signIn } from 'next-auth/react';
import { useLayoutEffect } from 'react';

interface Props {
  token?: string;
}

export default function TokenLogin({ token }: Props) {
  useLayoutEffect(() => {
    if (typeof token !== 'undefined') {
      signIn('credentials', {
        token,
        redirect: true,
      });
    }
  }, [token]);

  return null;
}
