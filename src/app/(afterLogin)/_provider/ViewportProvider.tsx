'use client';

import { createContext, Dispatch, SetStateAction, useState } from 'react';

interface Viewport {
  width: number;
  height: number;
}

export const ViewportContext = createContext<{
  viewport: Viewport;
  setViewport: Dispatch<SetStateAction<Viewport>>;
}>({
  viewport: {
    width: 0,
    height: 0,
  },
  setViewport: () => {},
});

interface Props {
  children: React.ReactNode;
}

export default function ViewportProvider({ children }: Props) {
  const [viewport, setViewport] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  return (
    <ViewportContext.Provider value={{ viewport, setViewport }}>
      {children}
    </ViewportContext.Provider>
  );
}
