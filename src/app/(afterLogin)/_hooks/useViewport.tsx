import { useCallback, useContext, useEffect } from 'react';
import { ViewportContext } from '../_provider/ViewportProvider';

export default function useViewport() {
  const { viewport, setViewport } = useContext(ViewportContext);

  const settingViewport = useCallback(() => {
    setViewport({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, [setViewport]);

  useEffect(() => {
    const listener = () => {
      settingViewport();
    };
    if (viewport.width === 0 && viewport.height === 0) {
      settingViewport();
    }
    window.addEventListener('resize', listener);
    return () => {
      window.removeEventListener('resize', listener);
    };
  }, [viewport.width, viewport.height, setViewport, settingViewport]);

  return viewport;
}
