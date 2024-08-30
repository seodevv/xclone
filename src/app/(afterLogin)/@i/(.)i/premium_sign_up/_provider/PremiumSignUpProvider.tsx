'use client';

import { createContext, Dispatch, Reducer, useReducer } from 'react';

const initialState: State = {
  period: 'annual',
  subscribe: {
    id: 'premium',
    price: { origin: 124800, sale: 109000 },
  },
  footer: false,
};

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'setPeriod':
      return { ...state, period: action.payload };
    case 'setSubscribe':
      return { ...state, subscribe: action.payload };
    case 'setFooter':
      return { ...state, footer: action.payload };
  }
};

interface IPremiumSignUpContext {
  state: State;
  dispatch: Dispatch<Action>;
}

export const PremiumSignUpContext = createContext<IPremiumSignUpContext>({
  state: initialState,
  dispatch: () => {},
});

interface Props {
  children?: React.ReactNode;
}

export default function PremiumSignUpProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <PremiumSignUpContext.Provider value={{ state, dispatch }}>
      {children}
    </PremiumSignUpContext.Provider>
  );
}

interface State {
  period: 'annual' | 'monthly';
  subscribe: {
    id: 'basic' | 'premium' | 'premium+';
    price: { origin: number; sale: number };
  };
  footer: boolean;
}

type Action =
  | {
      type: 'setPeriod';
      payload: State['period'];
    }
  | { type: 'setSubscribe'; payload: State['subscribe'] }
  | { type: 'setFooter'; payload: State['footer'] };
