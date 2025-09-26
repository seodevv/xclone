'use client';

import styles from './button.module.css';
import { CSSProperties, MouseEventHandler, useState } from 'react';
import { useSession } from 'next-auth/react';
import cx from 'classnames';
import { AdvancedUser } from '@/model/User';
import useFollowMutation from '../../_hooks/useFollowMutation';
import { useQueryClient } from '@tanstack/react-query';
import useAlterModal from '@/app/_hooks/useAlterModal';
import { useRouter } from 'next/navigation';
import useConfirmStore, {
  confirmSelector,
} from '@/app/(afterLogin)/_store/ConfirmStore';

interface Props {
  className?: string;
  style?: CSSProperties;
  user: AdvancedUser;
  disabled?: boolean;
}

export default function FollowButton({
  className,
  style,
  user,
  disabled,
}: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const { alterMessage, sendErrorMessage } = useAlterModal();
  const { open, close } = useConfirmStore(confirmSelector);
  const [hover, setHover] = useState(false);
  const queryClient = useQueryClient();
  const followMutation = useFollowMutation();
  const isFollow = user.Followers.some((u) => u.id === session?.user?.email);

  const onClickFollow: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!session?.user?.email) {
      router.push('/i/flow/login');
      return;
    }

    const sourceId = session.user.email;
    const targetId = user.id;

    if (isFollow) {
      open({
        flag: true,
        title: `Unfollow @${user.id}?`,
        sub: 'Their posts will no longer show up in your For You timeline. You can still view their profile, unless their posts are protected.',
        btnText: 'UnFollow',
        btnTheme: 'theme',
        onClickCancle: () => {
          close();
        },
        onClickConfirm: () => {
          followMutation.mutate(
            {
              queryClient,
              type: 'unfollow',
              sourceId,
              targetId,
            },
            {
              onError: () => {
                sendErrorMessage();
              },
              onSettled: () => {
                close();
              },
            }
          );
        },
      });
    } else {
      followMutation.mutate(
        {
          queryClient,
          type: 'follow',
          sourceId: session.user.email,
          targetId: user.id,
        },
        {
          onError: (error) => {
            console.error(error);
            alterMessage('Follow failed. please try again', 'error');
          },
        }
      );
    }
  };

  if (session?.user?.email === user.id) {
    return null;
  }

  return (
    <button
      className={cx(
        styles.btn,
        styles.followBtn,
        isFollow && styles.isFollow,
        className
      )}
      style={style}
      type="button"
      onClick={onClickFollow}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      disabled={disabled}
    >
      {isFollow ? (hover ? 'Unfollow' : 'Following') : 'Follow'}
    </button>
  );
}
