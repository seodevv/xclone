'use client';

import styles from './UnPinModal.module.css';
import { useContext } from 'react';
import IBackground from '@/app/(afterLogin)/@i/(.)i/_component/IBackground';
import { SubMenuContext } from '@/app/(afterLogin)/_provider/SubMenuProvider';
import FlexButton from '@/app/(beforeLogin)/_component/_button/FlexButton';
import usePostPinnedMutation from '@/app/(afterLogin)/_hooks/usePostPinnedMutation';
import { useQueryClient } from '@tanstack/react-query';
import useAlterModal from '@/app/_hooks/useAlterModal';

export default function UnPinModal() {
  const { menu, dispatchMenu } = useContext(SubMenuContext);
  const { alterMessage } = useAlterModal();
  const unPinMutation = usePostPinnedMutation();
  const queryClient = useQueryClient();

  const backSubMenu = () => {
    dispatchMenu({ type: 'set', payload: { status: 'post' } });
  };

  const onClickUnPin = () => {
    if (!menu.post) return;

    unPinMutation.mutate({
      method: 'delete',
      post: menu.post,
      queryClient,
    });

    dispatchMenu({ type: 'reset' });
    alterMessage('Your post was unpinned from your profile');
  };

  return (
    <IBackground size="small" onClick={backSubMenu}>
      <div className={styles.title}>
        <span>Unpin post from profile?</span>
      </div>
      <div className={styles.desc}>
        <span>
          This will no longer appear automatically at the top of your profile.
        </span>
      </div>
      <div className={styles.buttons}>
        <FlexButton theme="white" text="Unpin" medium onClick={onClickUnPin} />
        <FlexButton
          theme="reverse"
          text="Cancel"
          medium
          onClick={backSubMenu}
        />
      </div>
    </IBackground>
  );
}
