'use client';

import styles from './reaction.button.module.css';
import utils from '@/app/utility.module.css';
import cx from 'classnames';
import HeartSvg from '@/app/_svg/actionbuttons/HeartSvg';
import { MouseEventHandler, useContext, useState } from 'react';
import useReactionMutation from '@/app/(afterLogin)/_hooks/useReactionMutation';
import { useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { AdvancedPost } from '@/model/Post';
import { unitConversion } from '@/app/_lib/common';
import CommentSvg from '@/app/_svg/actionbuttons/CommentSvg';
import RepostSvg from '@/app/_svg/actionbuttons/RepostSvg';
import ViewSvg from '@/app/_svg/actionbuttons/ViewSvg';
import { useRouter } from 'next/navigation';
import BookmarkSvg from '@/app/_svg/actionbuttons/BookmarkSvg';
import ShareSvg from '@/app/_svg/actionbuttons/ShareSvg';
import useAlterModal from '@/app/_hooks/useAlterModal';
import useComposeStore from '@/app/(afterLogin)/_store/ComposeStore';
import { SubMenuContext } from '@/app/(afterLogin)/_provider/SubMenuProvider';

interface Props {
  type: 'Comments' | 'Hearts' | 'Reposts' | 'Views' | 'Bookmarks' | 'Shares';
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
  const { menu, dispatchMenu } = useContext(SubMenuContext);
  const { setCompose, resetCompose } = useComposeStore((state) => ({
    setCompose: state.set,
    resetCompose: state.reset,
  }));
  const queryClient = useQueryClient();
  const { alterMessage } = useAlterModal();
  const { data: session } = useSession();
  const [hover, setHover] = useState(false);
  const active =
    (type === 'Hearts' || type === 'Reposts' || type === 'Bookmarks') &&
    post[type].some((u) => u.id === session?.user?.email);
  const count =
    type !== 'Bookmarks' && type !== 'Shares' ? post._count[type] : 0;

  const reactionMutation = useReactionMutation();
  const onClickReaction: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    if (!session?.user?.email) return;

    switch (type) {
      case 'Comments':
        setCompose({ type: 'comment', post });
        router.push('/compose/post', { scroll: false });
        break;
      case 'Reposts':
        const { x, y, width, height } = e.currentTarget.getBoundingClientRect();
        if (!menu.flag) {
          setCompose({ type: 'quote', post });
          dispatchMenu({
            type: 'set',
            payload: {
              flag: true,
              status: 'repost',
              position: {
                x,
                y: y + window.scrollY,
                width,
                height,
                target: e.currentTarget,
              },
              post,
            },
          });
        } else {
          resetCompose();
          dispatchMenu({ type: 'reset' });
        }
        break;
      case 'Hearts':
      case 'Bookmarks':
        reactionMutation.mutate({
          type,
          queryClient,
          method: active ? 'delete' : 'post',
          post: post,
          sessionid: session.user.email,
        });
        if (type === 'Hearts' && !active) {
          alterMessage(
            'Keep it up! The more posts you like, the better your timeline will be.'
          );
        } else if (type === 'Bookmarks') {
          alterMessage(
            active ? 'Removed from your Bookmarks' : 'Added to your Bookmarks'
          );
        }
        break;
      case 'Views':
        break;
      case 'Shares':
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
          ['Comments', 'Views', 'Shares'].includes(type) &&
            hover &&
            styles.primary,
          type === 'Reposts' && (active || hover) && styles.secondary,
          type === 'Hearts' && (active || hover) && styles.tertiary,
          type === 'Bookmarks' && (active || hover) && styles.primary
        )}
        onClick={onClickReaction}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {type === 'Comments' && <CommentSvg width={width} />}
        {type === 'Reposts' && <RepostSvg width={width} />}
        {type === 'Hearts' && <HeartSvg width={width} active={active} />}
        {type === 'Views' && <ViewSvg width={width} />}
        {type === 'Bookmarks' && <BookmarkSvg width={width} active={active} />}
        {type === 'Shares' && <ShareSvg width={width} />}
        <div className={cx(utils.pl_4, utils.pr_4, utils.fs_xs, utils.fw_bold)}>
          <span>{count === 0 ? '' : unitConversion(count)}</span>
        </div>
      </button>
    </div>
  );
}
