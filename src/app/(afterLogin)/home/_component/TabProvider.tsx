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

export const TabContext = createContext<ITabContext>({
  tab: 'rec',
  setTab: () => {},
});

type Props = { children: ReactNode };
export default function TabProvider({ children }: Props) {
  const [tab, setTab] = useState<'rec' | 'fol'>('rec');

  return (
    <TabContext.Provider value={{ tab, setTab }}>
      {children}
    </TabContext.Provider>
  );
}
