'use client';

import utils from '@/app/utility.module.css';
import cx from 'classnames';
import SubMenuWrapper from '@/app/(afterLogin)/_component/_subMenu/SubMenuWrapper';
import { AdvancedMessages } from '@/model/Message';
import Text from '@/app/_component/_text/Text';
import Image from 'next/image';
import { generateImagePath } from '@/app/_lib/common';
import { RoomOwn } from '@/app/(afterLogin)/messages/[room]/_component/_body/_messages/RoomMessage';
import { MouseEventHandler, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { SubMenuContext } from '@/app/(afterLogin)/_provider/SubMenuProvider';

interface Props {
  message: AdvancedMessages;
  sessionid: string;
  callback?: (reaction: AdvancedMessages['React'][0]) => void;
}

export default function MessageReactionInfoSubMenu({
  message,
  sessionid,
  callback,
}: Props) {
  return (
    <SubMenuWrapper
      className={cx(utils.ptb_12, utils.w_min_320, utils.h_max_35vh)}
      position="bottom-center"
    >
      {message.React.map((r) => (
        <ReactionInfo
          key={r.id}
          React={r}
          sessionid={sessionid}
          callback={callback}
        />
      ))}
    </SubMenuWrapper>
  );
}

interface ReactionInfoProps {
  React: AdvancedMessages['React'][0];
  sessionid: string;
  callback?: (reaction: AdvancedMessages['React'][0]) => void;
}

function ReactionInfo({ React, sessionid, callback }: ReactionInfoProps) {
  const own: RoomOwn = React.id === sessionid ? 'mine' : 'thine';

  const router = useRouter();
  const { close } = useContext(SubMenuContext);
  const onClickProfile: MouseEventHandler<HTMLDivElement> = () => {
    router.push(`/${React.id}`);
    close();
  };

  const onClickUndo: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof callback !== 'undefined') {
      callback(React);
    }
  };

  const flexItem = cx(
    utils.d_flexColumn,
    utils.flex_alignCenter,
    utils.flex_justiCenter
  );
  return (
    <div
      className={cx(
        utils.ptb_12,
        utils.prl_16,
        utils.d_flexRow,
        utils.h_min_56,
        utils.bg_trans,
        utils.hover_bg_gray,
        utils.active_bg_gray,
        utils.bd_1_solid_theme,
        utils.outline_none,
        utils.transit_basic,
        utils.cursor_point
      )}
      onClick={onClickProfile}
    >
      <div className={cx(utils.mr_16, flexItem)}>
        <Text text={React.content} size="fs_29" />
      </div>
      <div className={cx(utils.mr_4, flexItem)}>
        <div className={cx(utils.relative, utils.w_40, utils.h_40)}>
          <div className={cx(utils.pb_100, utils.w_100p)}></div>
          <div
            className={cx(
              utils.absolute,
              utils.t_r_b_l_0,
              utils.br_50,
              utils.of_hide
            )}
          >
            <Image
              src={generateImagePath(React.image)}
              alt={React.image}
              width={40}
              height={40}
            />
          </div>
        </div>
      </div>
      <div
        className={cx(
          utils.mrl_4,
          utils.d_flexColumn,
          utils.flex_justiCenter,
          utils.flexGrow_1,
          utils.flexShrink_1
        )}
      >
        <Text text={React.nickname} theme="theme" bold="bold" />
        <Text text={`@${React.id}`} theme="gray" />
      </div>
      {own === 'mine' && (
        <div className={cx(utils.mr_4, flexItem)}>
          <button
            className={cx(
              utils.prl_16,
              utils.w_min_32,
              utils.h_min_32,
              utils.bg_trans,
              utils.hover_bg_primary,
              utils.active_bg_primary,
              utils.bd_1_solid_trans,
              utils.br_9999,
              utils.outline_none,
              utils.transit_basic,
              utils.cursor_point
            )}
            onClick={onClickUndo}
          >
            <Text text="Undo" theme="primary" bold="bold" />
          </button>
        </div>
      )}
    </div>
  );
}
