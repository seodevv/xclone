'use client';

import { createContext, useState } from 'react';

interface Context extends MessagesSearchState {
  set: (state: Partial<MessagesSearchState>) => void;
}

const initialstate: Context = {
  active: false,
  input: '',
  tab: 'all',
  focus: false,
  enabled: true,
  set: () => undefined,
};

export const MessagesSearchContext = createContext<Context>(initialstate);

interface Props {
  children: React.ReactNode;
}

export default function MessagesSearchProvider({ children }: Props) {
  const [state, setState] = useState<MessagesSearchState>({
    active: false,
    input: '',
    tab: 'all',
    focus: false,
    enabled: true,
  });

  const set: Context['set'] = (state) => {
    setState((prev) => ({ ...prev, ...state }));
  };

  return (
    <MessagesSearchContext.Provider value={{ ...state, set }}>
      {children}
    </MessagesSearchContext.Provider>
  );
}

export type MessagesSearchTab = 'all' | 'people' | 'groups' | 'messages';
interface MessagesSearchState {
  active: boolean;
  input: string;
  tab: MessagesSearchTab;
  focus: boolean;
  enabled: boolean;
}
