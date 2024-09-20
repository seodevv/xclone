'use client';

import { useEffect } from 'react';

interface Props {
  noHidden?: boolean;
}

export default function HtmlOverflowHidden({ noHidden }: Props) {
  useEffect(() => {
    if (!noHidden) {
      document.documentElement.style.overflow = 'hidden';
    }

    return () => {
      if (!noHidden) {
        document.documentElement.style.overflow = '';
      }
    };
  }, []);

  return null;
}
