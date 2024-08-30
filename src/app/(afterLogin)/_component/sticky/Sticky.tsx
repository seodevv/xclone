'use client';

import styles from './sticky.module.css';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import useViewport from '../../_hooks/useViewport';
import { usePathname } from 'next/navigation';
import cx from 'classnames';

interface Props {
  children: ReactNode;
}

export default function Sticky({ children }: Props) {
  const { height } = useViewport();
  const pathname = usePathname();
  const [top, setTop] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const lastScrollTop = useRef(0);

  const calculateSticky = useCallback(
    (init: number) => {
      const offsetHeight = ref.current ? ref.current.offsetHeight : -(init * 2);
      return height - offsetHeight - init > 0
        ? init
        : height - offsetHeight - init;
    },
    [height]
  );

  const scrollListener = useCallback(() => {
    const init = ['/explore', '/search'].includes(pathname) ? 0 : 60;
    const scrollTop = window.scrollY;
    const diff = lastScrollTop.current - scrollTop;
    if (diff === 0) {
      setTop(init);
    } else if (diff > 0) {
      setTop((prev) => {
        const next = prev + diff;
        if (next > init) return init;
        return next;
      });
    } else {
      setTop((prev) => {
        const next = prev + diff;
        const top = calculateSticky(init);
        if (next < top) return top;
        return next;
      });
    }
    lastScrollTop.current = scrollTop;
  }, [pathname, setTop, calculateSticky]);

  useEffect(() => {
    scrollListener();
    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, [height, pathname, setTop, scrollListener]);

  return (
    <div
      ref={ref}
      className={cx(
        styles.sticky,
        ['/search', '/explore'].includes(pathname) && styles.noMargin
      )}
      style={{ top: top }}
    >
      {children}
    </div>
  );
}
