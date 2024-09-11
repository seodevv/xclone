'use client';

import { AdvancedLists } from '@/model/Lists';
import { createContext, Dispatch, Reducer, useReducer } from 'react';

const initialState: State = {
  selected: [],
  initial: [],
  included: [],
  excluded: [],
  disabled: true,
};

const reducer: Reducer<State, Action> = (state, action) => {
  const compareSelected = (newSelected: AdvancedLists['id'][]) => {
    const a = state.initial.sort().toString();
    const b = newSelected.sort().toString();
    return a === b;
  };

  switch (action.type) {
    case 'setDisabled': {
      return { ...state, disabled: action.payload };
    }
    case 'setInitial': {
      const newList = [...new Set([...state.initial, action.payload])];
      return {
        ...state,
        selected: newList,
        initial: newList,
      };
    }
    case 'addList': {
      const newSelected = [...new Set([...state.selected, action.payload])];
      const isInitial = state.initial.includes(action.payload);
      return {
        ...state,
        selected: newSelected,
        included: isInitial
          ? state.included
          : [...new Set([...state.included, action.payload])],
        excluded: isInitial
          ? state.excluded.filter((n) => n !== action.payload)
          : state.excluded,
        disabled: compareSelected(newSelected),
      };
    }
    case 'removeList': {
      const newSelected = state.selected.filter((n) => n !== action.payload);
      const isInitial = state.initial.includes(action.payload);
      return {
        ...state,
        selected: newSelected,
        included: isInitial
          ? state.included
          : state.included.filter((n) => n !== action.payload),
        excluded: isInitial
          ? [...new Set([...state.excluded, action.payload])]
          : state.excluded,
        disabled: compareSelected(newSelected),
      };
    }
  }
};

interface IAddMemberContext {
  state: State;
  dispatch: Dispatch<Action>;
}

export const AddMemberContext = createContext<IAddMemberContext>({
  state: initialState,
  dispatch: () => {},
});

interface Props {
  children?: React.ReactNode;
}

export default function AddMemberProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AddMemberContext.Provider value={{ state, dispatch }}>
      {children}
    </AddMemberContext.Provider>
  );
}

interface State {
  selected: AdvancedLists['id'][]; // number[]
  initial: AdvancedLists['id'][]; // number[]
  included: AdvancedLists['id'][]; // number[]
  excluded: AdvancedLists['id'][]; // number[]
  disabled: boolean;
}
type Action =
  | { type: 'setDisabled'; payload: State['disabled'] }
  | { type: 'setInitial'; payload: AdvancedLists['id'] }
  | { type: 'addList'; payload: AdvancedLists['id'] }
  | { type: 'removeList'; payload: AdvancedLists['id'] };
