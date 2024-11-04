'use client';

import { SettingsContext } from '@/app/(afterLogin)/settings/_controller/SettingsLayoutController';
import { useContext, useLayoutEffect } from 'react';

export default function MonetizationLayoutController() {
  const context = useContext(SettingsContext);

  useLayoutEffect(() => {
    context.setShow(true);
    return () => {
      context.setShow(false);
    };
  }, []);

  return null;
}
