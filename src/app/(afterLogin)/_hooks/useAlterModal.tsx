'use client';

import { useCallback, useContext } from 'react';
import {
  AlterModalContext,
  initialAlterModalState,
} from '../_provider/AlterModalProvider';

export default function useAlterModal() {
  const { modal, setModal } = useContext(AlterModalContext);

  const getMessage = useCallback(() => {
    return modal.message ? modal.message : 'Please try again';
  }, [modal.message]);

  const getDuration = useCallback(() => {
    return modal.duration;
  }, [modal.duration]);

  const alterMessage = useCallback(
    (message: string, duration?: number) => {
      resetMessage();
      setTimeout(() => {
        setModal({
          show: true,
          message,
          duration: duration ? duration : 2000,
        });
      });
    },
    [setModal]
  );

  const setDuration = useCallback(
    (duration: number) => {
      setModal((prev) => ({ ...prev, duration }));
    },
    [setModal]
  );

  const resetMessage = useCallback(() => {
    setModal(initialAlterModalState.modal);
  }, [setModal]);

  return { getMessage, getDuration, alterMessage, setDuration, resetMessage };
}
