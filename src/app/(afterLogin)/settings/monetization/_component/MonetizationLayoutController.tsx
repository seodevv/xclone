'use client';

import { SettingsContext } from '@/app/(afterLogin)/settings/_controller/SettingsLayoutController';
import { useContext, useLayoutEffect } from 'react';

export default function MonetizationLayoutController() {
  const { setShow } = useContext(SettingsContext);

  useLayoutEffect(() => {
    setShow(true);
    return () => {
      setShow(false);
    };
  }, [setShow]);

  return null;
}
