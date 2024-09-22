'use client';

import useHistoryStore from '@/app/(afterLogin)/_store/HistoryStore';
import { useEffect, useRef } from 'react';

export default function AddHistoryStack() {
  const addStack = useHistoryStore((state) => state.addStack);
  const { enable, resetEnable } = useHistoryStore((state) => ({
    stack: state.stack,
    enable: state.enable,
    resetEnable: state.resetEnable,
  }));
  const firstMount = useRef(false);

  useEffect(() => {
    if (firstMount.current) {
      if (enable) {
        addStack();
      } else {
        resetEnable();
      }
    }
    firstMount.current = true;
  }, [addStack, resetEnable]);

  return null;
}
