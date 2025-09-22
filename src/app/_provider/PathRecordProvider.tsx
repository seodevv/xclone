'use client';

import useHistoryStore from '@/app/(afterLogin)/_store/HistoryStore';
import { usePathname, useRouter } from 'next/navigation';
import { createContext, useEffect, useState } from 'react';

const initialState = {
  prevPath: '',
  path: '',
  routerBack: () => undefined,
};

export const PathRecordContext =
  createContext<IPathRecordContext>(initialState);

interface Props {
  children: React.ReactNode;
}

export default function PathRecordProvider({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [path, setPath] = useState<PathState>(initialState);
  const { stack, resetStack } = useHistoryStore((state) => ({
    stack: state.stack,
    resetStack: state.resetStack,
  }));

  const routerBack: IPathRecordContext['routerBack'] = (prevPath = '/') => {
    if (prevPath && path.prevPath === path.path) {
      router.push(prevPath);
      return;
    }

    if (stack < 0) {
      resetStack();
      window.history.go(stack);
      return;
    }

    router.back();
  };

  useEffect(() => {
    setPath((prev) => ({ ...prev, path: pathname }));
    return () => {
      setPath((prev) => ({ ...prev, prevPath: pathname }));
    };
  }, [pathname, setPath]);

  return (
    <PathRecordContext.Provider
      value={{ prevPath: path.prevPath, path: path.path, routerBack }}
    >
      {children}
    </PathRecordContext.Provider>
  );
}

interface IPathRecordContext {
  prevPath: string;
  path: string;
  routerBack: (prevPath?: string) => void;
}

interface PathState {
  prevPath: string;
  path: string;
}
