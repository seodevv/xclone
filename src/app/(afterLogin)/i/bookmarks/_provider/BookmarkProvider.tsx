'use client';

import { createContext, Dispatch, Reducer, useReducer } from 'react';

const initialState = (): State => ({ status: 'idle', search: '' });
const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'setSearch':
      return { status: 'search', search: action.payload };
    case 'setLoading':
      return { ...state, status: 'loading' };
    case 'reset':
      return initialState();
  }
};

export const BookmarkContext = createContext<IBookmarkContext>({
  state: initialState(),
  dispatch: () => {},
});

interface Props {
  children: React.ReactNode;
}

export default function BookmarkProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, undefined, initialState);

  return (
    <BookmarkContext.Provider value={{ state, dispatch }}>
      {children}
    </BookmarkContext.Provider>
  );
}

interface IBookmarkContext {
  state: State;
  dispatch: Dispatch<Action>;
}

interface State {
  status: 'idle' | 'loading' | 'search';
  search: string;
}
type Action =
  | { type: 'setSearch'; payload: string }
  | { type: 'setLoading' | 'reset' };
