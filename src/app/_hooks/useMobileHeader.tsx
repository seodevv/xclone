'use client';

import styles from './hooks.module.css';
import useViewport from '@/app/(afterLogin)/_hooks/useViewport';
import { scrollHeaderHandler } from '@/app/_lib/eventListener';
import { useEffect, useState } from 'react';

export default function useMobileHeader() {
  const { width, height } = useViewport();
  const [scrollDir, setScrollDir] = useState<'up' | 'down' | null>(null);

  useEffect(() => {
    if ((width && width < 500) || (height && height < 500)) {
      return scrollHeaderHandler(setScrollDir);
    }
  }, [width, height, scrollHeaderHandler, setScrollDir]);

  return {
    dir: scrollDir,
    transitClass: styles.transit,
  };
}
