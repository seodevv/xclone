'use client';

import styles from './unFollowModal.module.css';
import { MouseEventHandler } from 'react';
import cx from 'classnames';
import useFollowMutation from '../../_hooks/useFollowMutation';
import { useQueryClient } from '@tanstack/react-query';
import useAlterModal from '@/app/_hooks/useAlterModal';
import useUnFollowModal from '../../_hooks/useUnFollowModal';
import IBackground from '@/app/(afterLogin)/@i/(.)i/_component/IBackground';

export default function UnFollowModal() {
  const queryClient = useQueryClient();
  const followMutation = useFollowMutation();
  const { getModal, resetModal } = useUnFollowModal();
  const { alterMessage } = useAlterModal();
  const modal = getModal();

  const onClickOutSide = () => {
    resetModal();
  };
  const onClickUnFollow: MouseEventHandler<HTMLButtonElement> = () => {
    if (!modal.sourceId || !modal.targetId) {
      resetModal();
      alterMessage('Error. Please try again.', 'error');
      return;
    }
    followMutation.mutate(
      {
        queryClient,
        type: 'unfollow',
        sourceId: modal.sourceId,
        targetId: modal.targetId,
      },
      {
        onSettled: () => {
          resetModal();
        },
        onError: () => {
          alterMessage('Error. Please try again.', 'error');
        },
      }
    );
  };

  if (!modal.flag) return null;

  return (
    <IBackground small onClick={onClickOutSide}>
      <h1 className={styles.title}>Unfollow @{modal.targetId}?</h1>
      <div className={styles.desc}>
        <span>
          Their posts will no longer show up in your For You timeline. You can
          still view their profile, unless their posts are protected.
        </span>
      </div>
      <div className={styles.buttons}>
        <button
          className={cx(styles.button, styles.unFollow)}
          type="button"
          onClick={onClickUnFollow}
        >
          Unfollow
        </button>
        <button
          className={cx(styles.button, styles.cancel)}
          type="button"
          onClick={() => resetModal()}
        >
          Cancel
        </button>
      </div>
    </IBackground>
  );
}
