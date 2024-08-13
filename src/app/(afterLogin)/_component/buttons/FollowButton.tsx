'use client';

import styles from './button.module.css';
import { CSSProperties, MouseEventHandler, useState } from 'react';
import { useSession } from 'next-auth/react';
import cx from 'classnames';
import { AdvancedUser } from '@/model/User';
import useFollowMutation from '../../_hooks/useFollowMutation';
import { useQueryClient } from '@tanstack/react-query';
import useAlterModal from '@/app/_hooks/useAlterModal';
import useUnFollowModal from '../../_hooks/useUnFollowModal';

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
  const { data: session } = useSession();
  const { alterMessage } = useAlterModal();
  const { alterModal } = useUnFollowModal();
  const queryClient = useQueryClient();
  const followMutation = useFollowMutation();
  const [hover, setHover] = useState(false);
  const isFollow = user.Followers.some((u) => u.id === session?.user?.email);

  const onClickFollow: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!session?.user?.email) return;
    if (isFollow) {
      alterModal({ sourceId: session.user.email, targetId: user.id });
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
