'use client';

import styles from './unFollowModal.module.css';
import { MouseEventHandler } from 'react';
import cx from 'classnames';
import useFollowMutation from '../../_hooks/useFollowMutation';
import { useQueryClient } from '@tanstack/react-query';
import useAlterModal from '../../_hooks/useAlterModal';
import useUnFollowModal from '../../_hooks/useUnFollowModal';

export default function UnFollowModal() {
  const queryClient = useQueryClient();
  const followMutation = useFollowMutation();
  const { getModal, resetModal } = useUnFollowModal();
  const { alterMessage } = useAlterModal();
  const modal = getModal();

  const onClickOutSide: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) {
      resetModal();
    }
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
    <div className={styles.outSide} onClick={onClickOutSide}>
      <div className={styles.inSide}>
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
            className={cx(styles.button, styles.cancle)}
            type="button"
            onClick={() => resetModal()}
          >
            Cancle
          </button>
        </div>
      </div>
    </div>
  );
}
