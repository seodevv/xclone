'use client';

import { User } from '@/model/User';
import { createContext, Dispatch, SetStateAction, useState } from 'react';
import UnFollowModal from '../_component/alter/UnFollowModal';

export interface UnFollowState {
  flag: boolean;
  sourceId: User['id'];
  targetId: User['id'];
}

export const UNFOLLOW_INITIAL_STATE: UnFollowState = {
  flag: false,
  sourceId: '',
  targetId: '',
};

export const UnFollowContext = createContext<{
  modal: UnFollowState;
  setModal: Dispatch<SetStateAction<UnFollowState>>;
}>({
  modal: UNFOLLOW_INITIAL_STATE,
  setModal: () => {},
});

interface Props {
  children: React.ReactNode;
}

export default function UnFollowProvider({ children }: Props) {
  const [modal, setModal] = useState<UnFollowState>(UNFOLLOW_INITIAL_STATE);

  return (
    <UnFollowContext.Provider value={{ modal, setModal }}>
      {children}
      <UnFollowModal />
    </UnFollowContext.Provider>
  );
}
