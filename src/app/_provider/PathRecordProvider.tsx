'use client';

import { usePathname } from 'next/navigation';
import { createContext, useEffect, useState } from 'react';

const initialState = {
  prevPath: '',
  path: '',
};

export const PathRecordContext =
  createContext<IPathRecordContext>(initialState);

interface Props {
  children: React.ReactNode;
}

export default function PathRecordProvider({ children }: Props) {
  const pathname = usePathname();
  const [path, setPath] = useState<PathState>(initialState);

  useEffect(() => {
    setPath((prev) => ({ ...prev, path: pathname }));
    return () => {
      setPath((prev) => ({ ...prev, prevPath: pathname }));
    };
  }, [pathname, setPath]);

  return (
    <PathRecordContext.Provider
      value={{ prevPath: path.prevPath, path: path.path }}
    >
      {children}
    </PathRecordContext.Provider>
  );
}

interface IPathRecordContext {
  prevPath: string;
  path: string;
}

interface PathState {
  prevPath: string;
  path: string;
}
