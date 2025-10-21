'use client';

import useFooterButtonStore, {
  FooterButtonType,
} from '@/app/(afterLogin)/_store/FooterButtonStore';
import { useLayoutEffect } from 'react';

interface Props {
  type: FooterButtonType;
}

export default function FooterController({ type }: Props) {
  const state = useFooterButtonStore();

  useLayoutEffect(() => {
    state.setButton(type);
    return () => {
      state.resetButton();
    };
  }, [type, state.setButton, state.resetButton]);

  return null;
}
