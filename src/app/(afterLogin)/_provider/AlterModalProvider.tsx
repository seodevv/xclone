'use client';

import { createContext, Dispatch, SetStateAction, useState } from 'react';
import AlterModal from '../_component/alter/AlterModal';

interface Modal {
  show: boolean;
  message: string;
  duration: number;
}

export const initialAlterModalState: {
  modal: Modal;
  setModal: Dispatch<SetStateAction<Modal>>;
} = {
  modal: {
    show: false,
    message: '',
    duration: 2000,
  },
  setModal: () => {},
};

export const AlterModalContext = createContext<{
  modal: Modal;
  setModal: Dispatch<SetStateAction<Modal>>;
}>(initialAlterModalState);

interface Props {
  children: React.ReactNode;
}

export default function AlterModalProvider({ children }: Props) {
  const [modal, setModal] = useState(initialAlterModalState.modal);

  return (
    <AlterModalContext.Provider value={{ modal, setModal }}>
      {children}
      {modal.show && <AlterModal />}
    </AlterModalContext.Provider>
  );
}
