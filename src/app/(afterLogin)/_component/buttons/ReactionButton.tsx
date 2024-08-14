'use client';

import styles from './reaction.button.module.css';
import utils from '@/app/utility.module.css';
import cx from 'classnames';
import HeartSvg from '@/app/_svg/actionbuttons/HeartSvg';
import { MouseEventHandler, useState } from 'react';
import useReactionMutation from '@/app/(afterLogin)/_hooks/useReactionMutation';
import { useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { AdvancedPost } from '@/model/Post';
import { unitConversion } from '@/app/_lib/common';
import CommentSvg from '@/app/_svg/actionbuttons/CommentSvg';
import RepostSvg from '@/app/_svg/actionbuttons/RepostSvg';
import ViewSvg from '@/app/_svg/actionbuttons/ViewSvg';
import { useRouter } from 'next/navigation';

interface Props {
  type: 'Comments' | 'Hearts' | 'Reposts' | 'Views';
  post: AdvancedPost;
  width?: number;
  white?: boolean;
}

export default function ReactionButton({
  type,
  post,
  width = 18.75,
  white = false,
}: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const [hover, setHover] = useState(false);
  const active =
    (type === 'Hearts' || type === 'Reposts') &&
    post[type].some((u) => u.id === session?.user?.email);
  const count = post._count[type];

  const reactionMutation = useReactionMutation();
  const onClickReaction: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    if (!session?.user?.email || !session.user.name || !session.user.image)
      return;

    switch (type) {
      case 'Comments':
        router.push('/compose/post', { scroll: false });
        break;
      case 'Hearts':
      case 'Reposts':
        reactionMutation.mutate({
          type,
          queryClient,
          method: active ? 'delete' : 'post',
          post: post,
          session: {
            email: session.user.email,
            name: session.user.name,
            image: session.user.image,
          },
        });
        break;
      case 'Views':
        break;
    }
  };

  return (
    <div
      className={cx([
        utils.d_flexRow,
        utils.flex_alignCenter,
        utils.cursor_point,
      ])}
    >
      <button
        className={cx(
          styles.reactionBtn,
          white && styles.theme,
          ['Comments', 'Views'].includes(type) && hover && styles.primary,
          type === 'Reposts' && (active || hover) && styles.secondary,
          type === 'Hearts' && (active || hover) && styles.tertiary
        )}
        onClick={onClickReaction}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {type === 'Comments' && <CommentSvg width={width} />}
        {type === 'Reposts' && <RepostSvg width={width} />}
        {type === 'Hearts' && <HeartSvg width={width} active={active} />}
        {type === 'Views' && <ViewSvg width={width} />}
        <div className={cx(utils.pl_4, utils.pr_4, utils.fs_xs, utils.fw_bold)}>
          <span>{count === 0 ? '' : unitConversion(count)}</span>
        </div>
      </button>
    </div>
  );
}
