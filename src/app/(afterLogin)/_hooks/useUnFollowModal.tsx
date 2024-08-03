'use client';

import { useContext } from 'react';
import {
  UNFOLLOW_INITIAL_STATE,
  UnFollowContext,
} from '../_provider/UnFollowProvider';
import { User } from '@/model/User';

export default function useUnFollowModal() {
  const { modal, setModal } = useContext(UnFollowContext);

  const getModal = () => {
    return modal;
  };

  const alterModal = ({
    sourceId,
    targetId,
  }: {
    sourceId: User['id'];
    targetId: User['id'];
  }) => {
    setModal({
      flag: true,
      sourceId,
      targetId,
    });
  };

  const resetModal = () => {
    setModal(UNFOLLOW_INITIAL_STATE);
  };

  return { getModal, alterModal, resetModal };
}
