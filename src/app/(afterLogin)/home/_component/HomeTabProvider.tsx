'use client';

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';

interface ITabContext {
  tab: 'rec' | 'fol';
  setTab: Dispatch<SetStateAction<ITabContext['tab']>>;
}

export const HomeTabContext = createContext<ITabContext>({
  tab: 'rec',
  setTab: () => {},
});

type Props = { children: ReactNode };
export default function HomeTabProvider({ children }: Props) {
  const [tab, setTab] = useState<'rec' | 'fol'>('rec');

  return (
    <HomeTabContext.Provider value={{ tab, setTab }}>
      {children}
    </HomeTabContext.Provider>
  );
}
