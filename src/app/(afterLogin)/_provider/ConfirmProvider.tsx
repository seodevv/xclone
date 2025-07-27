'use client';

import ConfirmModal from '@/app/(afterLogin)/_component/alter/ConfirmModal';
import UnFollowModal from '@/app/(afterLogin)/_component/alter/UnFollowModal';
import UnListsModal from '@/app/(afterLogin)/_component/alter/UnListsModal';
import { AdvancedLists } from '@/model/Lists';
import {
  createContext,
  Dispatch,
  MouseEventHandler,
  Reducer,
  useReducer,
} from 'react';

const initialState: State = {
  flag: false,
  type: 'idle',
  title: '',
  sub: '',
  btnText: '',
  onClickConfirm: () => {},
  onClickCancle: () => {},
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
    case 'setCustom':
      return { ...state, ...action.payload, flag: true, type: 'custom' };
    case 'setBirthEdit':
      return {
        ...state,
        ...action.payload,
        flag: true,
        type: 'custom',
        title: 'Edit date of birth?',
        sub: 'This can only be changed a few times. Make sure you enter the age of the person using the account.',
        btnText: 'Edit',
        noHidden: true,
      };
    case 'reset':
      return initialState;
  }
};

export const ConfirmContext = createContext<{
  modal: State;
  dispatchModal: Dispatch<Action>;
  close: () => void;
}>({
  modal: initialState,
  dispatchModal: () => {},
  close: () => {},
});

interface Props {
  children?: React.ReactNode;
}

export default function ConfirmProvider({ children }: Props) {
  const [modal, dispatchModal] = useReducer(reducer, initialState);

  const close = () => dispatchModal({ type: 'reset' });

  return (
    <ConfirmContext.Provider value={{ modal, dispatchModal, close }}>
      {children}
      {modal.flag && modal.type === 'unFollow' && <UnFollowModal />}
      {modal.flag && modal.type === 'unLists' && <UnListsModal />}
      {modal.flag && modal.type === 'custom' && (
        <ConfirmModal
          title={modal.title}
          sub={modal.sub}
          btnText={modal.btnText}
          btnTheme={modal.btnTheme}
          onClickOutSide={modal.onClickOutSide}
          onClickConfirm={modal.onClickConfirm}
          onClickCancle={modal.onClickCancle}
          noHidden={modal.noHidden}
        />
      )}
    </ConfirmContext.Provider>
  );
}

interface State {
  flag: boolean;
  type: 'idle' | 'unFollow' | 'unLists' | 'custom';
  title: string;
  sub: string;
  btnText: string;
  btnTheme?: 'theme' | 'reverse' | 'white' | 'red' | 'primary';
  onClickOutSide?: () => void;
  onClickConfirm: MouseEventHandler<HTMLButtonElement>;
  onClickCancle: () => void;
  noHidden?: boolean;
  unFollow?: { sourceId: string; targetId: string };
  unLists?: AdvancedLists;
}

type Action =
  | {
      type: 'unFollow';
      payload: State['unFollow'];
    }
  | { type: 'unLists'; payload: State['unLists'] }
  | {
      type: 'setCustom';
      payload: Pick<
        State,
        | 'title'
        | 'sub'
        | 'btnText'
        | 'btnTheme'
        | 'onClickOutSide'
        | 'onClickConfirm'
        | 'onClickCancle'
        | 'noHidden'
      >;
    }
  | {
      type: 'setBirthEdit';
      payload: Pick<
        State,
        'onClickOutSide' | 'onClickConfirm' | 'onClickCancle'
      >;
    }
  | { type: 'reset' };
