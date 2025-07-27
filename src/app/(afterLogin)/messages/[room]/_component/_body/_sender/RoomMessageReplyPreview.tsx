'use client';

import Text from '@/app/_component/_text/Text';
import styles from './room.sender.module.css';
import utils from '@/app/utility.module.css';
import cx from 'classnames';
import useMessagesStore from '@/app/(afterLogin)/_store/MessagesStore';
import XMarkSvg from '@/app/_svg/tweet/XMarkSvg';

interface Props {}

export default function ({}: Props) {
  const { reply, resetReply } = useMessagesStore();

  const onClickXMark = () => resetReply();

  if (!reply) return null;

  return (
    <div
      className={cx(
        utils.ptb_8,
        utils.prl_12,
        utils.d_flexRow,
        utils.flex_alignCenter,
        utils.flex_justiBetween,
        utils.gap_4,
        utils.bg_gray,
        styles.reply
      )}
    >
      <div className={cx(utils.d_flexColumn)}>
        <Text text={reply.Sender.nickname} size="s" />
        <Text text={reply.content} size="s" />
      </div>
      <div
        className={cx(utils.d_flexRow, utils.flex_alignCenter, utils.h_100p)}
      >
        <button
          className={cx(
            utils.d_flexColumn,
            utils.flex_alignCenter,
            utils.flex_justiCenter,
            utils.w_min_36,
            utils.h_min_36,
            utils.bg_trans,
            utils.hover_bg_gray_a_1,
            utils.active_bg_gray_a_1,
            utils.bd_1_solid_trans,
            utils.br_9999,
            utils.outline_none,
            utils.transit_basic,
            utils.cursor_point
          )}
          onClick={onClickXMark}
        >
          <XMarkSvg width={20} />
        </button>
      </div>
    </div>
  );
}
