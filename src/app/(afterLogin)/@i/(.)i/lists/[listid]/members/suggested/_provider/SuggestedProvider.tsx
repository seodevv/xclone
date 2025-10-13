'use client';

import { createContext, Reducer, useReducer } from 'react';

const initialState = {
  search: '',
};

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'setSearch':
      return { ...state, search: action.payload };
    case 'reset':
      return { ...initialState };
  }
};

export const SuggestedContext = createContext<{
  search: State['search'];
  setSearch: (value: string) => void;
}>({
  search: '',
  setSearch: () => {},
});

interface Props {
  children?: React.ReactNode;
}

export default function SuggestedProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setSearch = (value: State['search']) => {
    dispatch({ type: 'setSearch', payload: value });
  };

  return (
    <SuggestedContext.Provider value={{ search: state.search, setSearch }}>
      {children}
    </SuggestedContext.Provider>
  );
}

interface State {
  search: string;
}
type Action =
  | { type: 'setSearch'; payload: State['search'] }
  | { type: 'reset' };
