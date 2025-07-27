'use client';

import { useSelectedLayoutSegment } from 'next/navigation';
import { createContext, useLayoutEffect, useState } from 'react';

type Info = {
  scroll: 'bottom' | 'idle' | 'top';
  position: 'bottom' | 'middle' | 'top';
};

type Context = {
  info: Info;
  setScroll: (scroll: Info['scroll']) => void;
  setPosition: (position: Info['position']) => void;
};

const initialState: Context = {
  info: {
    scroll: 'bottom',
    position: 'bottom',
  },
  setScroll: () => {},
  setPosition: () => {},
};

export const MessagesScrollContext = createContext<Context>(initialState);

interface Props {
  children: React.ReactNode;
}

export default function MessagesScrollProvider({ children }: Props) {
  const segment = useSelectedLayoutSegment();
  const [info, setInfo] = useState<Info>({
    scroll: 'bottom',
    position: 'bottom',
  });

  const setScroll = (scroll: Info['scroll']) => {
    setInfo((prev) => ({ ...prev, scroll }));
  };
  const setPosition = (position: Info['position']) => {
    setInfo((prev) => ({
      ...prev,
      position,
    }));
  };

  useLayoutEffect(() => {
    setInfo(initialState.info);
  }, [segment, setInfo]);

  return (
    <MessagesScrollContext.Provider value={{ info, setScroll, setPosition }}>
      {children}
    </MessagesScrollContext.Provider>
  );
}
