import { useLayoutEffect } from 'react';
import useViewportStore from '@/app/(afterLogin)/_store/ViewportStore';

export default function useViewport() {
  const { width, height, setViewport } = useViewportStore();

  useLayoutEffect(() => {
    const listener = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };

    if (typeof window !== 'undefined' && (width === null || height === null)) {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    }

    window.addEventListener('resize', listener);
    return () => {
      window.removeEventListener('resize', listener);
    };
  }, [width, height, setViewport]);

  return { width, height };
}
