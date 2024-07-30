'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import useViewport from '../../_hooks/useViewport';
import { usePathname } from 'next/navigation';

interface Props {
  children: ReactNode;
}

export default function Sticky({ children }: Props) {
  const { height } = useViewport();
  const pathname = usePathname();
  const initialTop = ['/explore', '/search'].includes(pathname) ? 0 : 60;
  const [top, setTop] = useState(initialTop);
  const ref = useRef<HTMLDivElement>(null);
  const lastScrollTop = useRef(0);

  const calculateSticky = () => {
    const offsetHeight = ref.current
      ? ref.current.offsetHeight
      : -(initialTop * 2);
    return height - offsetHeight - initialTop > 0
      ? initialTop
      : height - offsetHeight - initialTop;
  };

  useEffect(() => {
    const scrollListener = () => {
      const scrollTop = document.body.scrollTop;
      const diff = lastScrollTop.current - scrollTop;
      if (diff > 0) {
        setTop((prev) => {
          const next = prev + diff;
          if (next > initialTop) return initialTop;
          return next;
        });
      } else {
        setTop((prev) => {
          const next = prev + diff;
          const top = calculateSticky();
          if (next < top) return top;
          return next;
        });
      }
      lastScrollTop.current = scrollTop;
    };
    scrollListener();
    document.body.addEventListener('scroll', scrollListener);
    return () => {
      document.body.removeEventListener('scroll', scrollListener);
    };
  }, [setTop, height]);

  return (
    <div ref={ref} style={{ position: 'sticky', top: top }}>
      {children}
    </div>
  );
}
