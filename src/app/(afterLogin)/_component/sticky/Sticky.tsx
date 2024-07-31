'use client';

import styles from './sticky.module.css';
import { ReactNode, useEffect, useRef, useState } from 'react';
import useViewport from '../../_hooks/useViewport';
import { usePathname } from 'next/navigation';

interface Props {
  children: ReactNode;
}

export default function Sticky({ children }: Props) {
  const { height } = useViewport();
  const pathname = usePathname();
  const [top, setTop] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const lastScrollTop = useRef(0);

  const calculateSticky = (init: number) => {
    const offsetHeight = ref.current ? ref.current.offsetHeight : -(init * 2);
    return height - offsetHeight - init > 0
      ? init
      : height - offsetHeight - init;
  };

  const scrollListener = () => {
    const init = ['/explore', '/search'].includes(pathname) ? 0 : 60;
    const scrollTop = document.body.scrollTop;
    const diff = lastScrollTop.current - scrollTop;
    console.log(pathname, diff, init);
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
  };

  useEffect(() => {
    scrollListener();
    document.body.addEventListener('scroll', scrollListener);
    return () => {
      document.body.removeEventListener('scroll', scrollListener);
    };
  }, [height, pathname, setTop]);

  return (
    <div ref={ref} className={styles.sticky} style={{ top: top }}>
      {children}
    </div>
  );
}
