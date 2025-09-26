'use client';

import { useCallback } from 'react';
import useAlterStore, {
  AlterState,
} from '@/app/(afterLogin)/_store/AlterStore';

export default function useAlterModal() {
  const { setModal, resetModal } = useAlterStore();

  const alterMessage = useCallback(
    (
      message: AlterState['message'],
      type?: AlterState['type'],
      duration?: AlterState['duration']
    ) => {
      resetModal();
      setTimeout(() => {
        setModal({
          show: true,
          message,
          duration: duration ? duration : 2000,
          type: type ? type : 'notice',
        });
      });
    },
    [resetModal, setModal]
  );

  const sendPrepareMessage = useCallback(() => {
    resetModal();
    setTimeout(() => {
      setModal({
        show: true,
        message: 'This feature is in preparation.',
        duration: 2000,
        type: 'warning',
      });
    });
  }, [resetModal, setModal]);

  const sendErrorMessage = useCallback(() => {
    resetModal();
    setTimeout(() => {
      setModal({
        show: true,
        message: 'Something is wrong. Please try again',
        duration: 2000,
        type: 'error',
      });
    });
  }, [resetModal, setModal]);

  return {
    alterMessage,
    sendPrepareMessage,
    sendErrorMessage,
  };
}
