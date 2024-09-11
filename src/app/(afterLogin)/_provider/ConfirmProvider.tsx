'use client';

import UnFollowModal from '@/app/(afterLogin)/_component/alter/UnFollowModal';
import UnListsModal from '@/app/(afterLogin)/_component/alter/UnListsModal';
import { AdvancedLists } from '@/model/Lists';
import { createContext, Dispatch, Reducer, useReducer } from 'react';

const initialState: State = {
  flag: false,
  type: 'idle',
};

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'unFollow':
      return {
        ...state,
        flag: true,
        type: 'unFollow',
        unFollow: action.payload,
      };
    case 'unLists':
      return { ...state, flag: true, type: 'unLists', unLists: action.payload };
    case 'reset':
      return { ...initialState };
  }
};

export const ConfirmContext = createContext<{
  modal: State;
  dispatchModal: Dispatch<Action>;
}>({
  modal: initialState,
  dispatchModal: () => {},
});

interface Props {
  children?: React.ReactNode;
}

export default function ConfirmProvider({ children }: Props) {
  const [modal, dispatchModal] = useReducer(reducer, initialState);
  return (
    <ConfirmContext.Provider value={{ modal, dispatchModal }}>
      {children}
      {modal.flag && modal.type === 'unFollow' && <UnFollowModal />}
      {modal.flag && modal.type === 'unLists' && <UnListsModal />}
    </ConfirmContext.Provider>
  );
}

interface State {
  flag: boolean;
  type: 'idle' | 'unFollow' | 'unLists';
  unFollow?: { sourceId: string; targetId: string };
  unLists?: AdvancedLists;
}

type Action =
  | {
      type: 'unFollow';
      payload: State['unFollow'];
    }
  | { type: 'unLists'; payload: State['unLists'] }
  | { type: 'reset' };
