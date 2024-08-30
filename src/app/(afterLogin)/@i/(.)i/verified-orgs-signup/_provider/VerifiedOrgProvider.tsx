'use client';

import { createContext, Dispatch, Reducer, useReducer } from 'react';

export const VERIFIED_ORG_SIGNUP = {
  basic: {
    credit: {
      annual: 2500,
      monthly: 200,
    },
    price: {
      origin: 3156360,
      sale: 2662700,
    },
  },
  full: {
    credit: {
      annual: 12000,
      monthly: 1000,
    },
    price: {
      origin: 15447600,
      sale: 12975900,
    },
    extra: {
      annual: 18600,
      monthly: 64370,
    },
  },
};

const initialState: State = {
  access: 'basic',
  period: 'annual',
  credit: 2500,
};

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'setAccess':
      return { ...state, access: action.payload };
    case 'setPeriod':
      return {
        ...state,
        period: action.payload,
        credit: VERIFIED_ORG_SIGNUP[state.access].credit[action.payload],
      };
    case 'setCredit':
      return {
        ...state,
        credit: VERIFIED_ORG_SIGNUP[state.access].credit[state.period],
      };
  }
};

interface IVerifoedOrgContext {
  state: State;
  dispatch: Dispatch<Action>;
}

export const VerifiedOrgContext = createContext<IVerifoedOrgContext>({
  state: initialState,
  dispatch: () => {},
});

interface Props {
  children?: React.ReactNode;
}
export default function VerifiedOrgProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <VerifiedOrgContext.Provider value={{ state, dispatch }}>
      {children}
    </VerifiedOrgContext.Provider>
  );
}

interface State {
  access: 'basic' | 'full';
  period: 'annual' | 'monthly';
  credit: number;
}

type Action =
  | { type: 'setAccess'; payload: State['access'] }
  | { type: 'setPeriod'; payload: State['period'] }
  | { type: 'setCredit' };
