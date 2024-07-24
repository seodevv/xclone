'use client';

import { useCallback, useContext } from 'react';
import {
  AlterModalContext,
  initialAlterModalState,
  Modal,
} from '../_provider/AlterModalProvider';

export default function useAlterModal() {
  const { modal, setModal } = useContext(AlterModalContext);

  const getMessage = useCallback(() => {
    return modal.message ? modal.message : 'Please try again';
  }, [modal.message]);

  const getDuration = useCallback(() => {
    return modal.duration;
  }, [modal.duration]);

  const getType = useCallback(() => {
    return modal.type;
  }, [modal.type]);

  const alterMessage = useCallback(
    (
      message: Modal['message'],
      type?: Modal['type'],
      duration?: Modal['duration']
    ) => {
      resetMessage();
      setTimeout(() => {
        setModal({
          show: true,
          message,
          duration: duration ? duration : 2000,
          type: type ? type : 'notice',
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

  return {
    getMessage,
    getDuration,
    getType,
    alterMessage,
    setDuration,
    resetMessage,
  };
}
