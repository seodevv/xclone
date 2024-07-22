import { useContext, useEffect } from 'react';
import { ViewportContext } from '../_provider/ViewportProvider';

export default function useViewport() {
  const { viewport, setViewport } = useContext(ViewportContext);

  useEffect(() => {
    const listener = (e: UIEvent) => {
      setViewport({
        width: document.body.offsetWidth,
        height: document.body.offsetHeight,
      });
    };
    window.addEventListener('resize', listener);
    return () => {
      window.removeEventListener('resize', listener);
    };
  }, [setViewport]);

  return viewport;
}
