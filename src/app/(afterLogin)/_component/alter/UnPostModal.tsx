'use client';

import useUnPostMutation from '@/app/(afterLogin)/_hooks/useUnPostMutation';
import styles from './unPostModal.module.css';
import IBackground from '@/app/(afterLogin)/@i/(.)i/_component/IBackground';
import { SubMenuContext } from '@/app/(afterLogin)/_provider/SubMenuProvider';
import FlexButton from '@/app/(beforeLogin)/_component/_button/FlexButton';
import { useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import useAlterModal from '@/app/_hooks/useAlterModal';

export default function UnPostModal() {
  const { alterMessage } = useAlterModal();
  const queryClient = useQueryClient();
  const unPostMutation = useUnPostMutation();
  const {
    menu: { post },
    dispatchMenu,
  } = useContext(SubMenuContext);

  const closeModal = () => {
    dispatchMenu({ type: 'set', payload: { status: 'post' } });
  };

  const unPostHandler = () => {
    if (!post) return;

    unPostMutation.mutate(
      {
        queryClient,
        post,
      },
      {
        onSuccess: () => {
          alterMessage('Your post was deleted');
          dispatchMenu({ type: 'reset' });
        },
        onError: (error) => {
          console.error(error);
          alterMessage('Failed to delete post.\nplease try again', 'error');
        },
      }
    );
  };

  return (
    <IBackground size="small" onClick={closeModal}>
      <div className={styles.unPost}>
        <div className={styles.title}>
          <span>Delete post?</span>
        </div>
        <div className={styles.sub}>
          <span>
            This can’t be undone and it will be removed from your profile, the
            timeline of any accounts that follow you, and from search results.
          </span>
        </div>
        <div className={styles.buttons}>
          <FlexButton
            theme="red"
            text="Delete"
            medium
            onClick={unPostHandler}
          />
          <FlexButton
            theme="reverse"
            text="Cancel"
            medium
            onClick={closeModal}
          />
        </div>
      </div>
    </IBackground>
  );
}
