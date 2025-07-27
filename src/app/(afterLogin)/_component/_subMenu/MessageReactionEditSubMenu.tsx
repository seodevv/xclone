'use client';

import utils from '@/app/utility.module.css';
import cx from 'classnames';
import SubMenuWrapper from '@/app/(afterLogin)/_component/_subMenu/SubMenuWrapper';
import { AdvancedMessages } from '@/model/Message';
import EmojiSelector, {
  EmojiProps,
} from '@/app/(afterLogin)/_component/emoji/EmojiSelector';
import { MouseEventHandler, useContext } from 'react';
import { SubMenuContext } from '@/app/(afterLogin)/_provider/SubMenuProvider';

interface Props {
  message: AdvancedMessages;
  sessionid: string;
  callback?: (content: string, selected: boolean) => void;
}

export default function MessageReactionEditSubMenu({
  message,
  sessionid,
  callback,
}: Props) {
  const find = message.React.find((r) => r.id === sessionid);
  const emojis = [
    { id: 0, content: '😀' },
    { id: 1, content: '😆' },
    { id: 2, content: '😍' },
    { id: 3, content: '😂' },
    { id: 4, content: '😅' },
    { id: 5, content: '😱' },
    { id: 6, content: '❤️' },
    { id: 7, content: '🙄' },
  ];

  return (
    <SubMenuWrapper
      className={utils.pa_8}
      direction="row"
      position="top-center"
    >
      {emojis.map((emoji, index) => (
        <EmojiReaction
          key={emoji.id}
          content={emoji.content}
          selected={find?.content === emoji.content}
          last={emojis.length - 1 === index}
          callback={callback}
        />
      ))}
    </SubMenuWrapper>
  );
}

interface EmojiReactionProps {
  content: string;
  selected?: boolean;
  last?: boolean;
  callback?: (content: string, selected: boolean) => void;
}

function EmojiReaction({
  content,
  selected,
  last,
  callback,
}: EmojiReactionProps) {
  const { close } = useContext(SubMenuContext);

  const onClickEmoji: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    reactionHandler(content);
  };
  const onSuccessEmojiSelector = (emoji: EmojiProps, close: () => void) => {
    reactionHandler(emoji.native);
    close();
  };
  const reactionHandler = (emoji: string) => {
    if (typeof callback === 'function') {
      callback(emoji, !!selected);
    }
    close();
  };

  const buttonClass = cx(
    utils.d_flexRow,
    utils.flex_alignCenter,
    utils.flex_justiCenter,
    utils.w_min_36,
    utils.h_min_36,
    utils.hover_bg_gray_light,
    utils.active_bg_gray_light,
    utils.bd_none,
    utils.br_4,
    utils.outline_none,
    utils.fs_27,
    utils.transit_basic,
    utils.cursor_point
  );

  if (last) {
    return (
      <EmojiSelector
        className={cx(buttonClass, utils.bg_trans, utils.br_50)}
        type="option"
        onSuccess={onSuccessEmojiSelector}
      />
    );
  }

  return (
    <button
      className={cx(
        buttonClass,
        selected ? utils.bg_gray_light : utils.bg_trans
      )}
      onClick={onClickEmoji}
    >
      {content}
    </button>
  );
}
