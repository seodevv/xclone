'use client';

import OptionButton from '@/app/(afterLogin)/_component/buttons/OptionButton';
import OtherProfile from '@/app/(afterLogin)/_component/profile/OtherProfile';
import { SubMenuContext } from '@/app/(afterLogin)/_provider/SubMenuProvider';
import { AdvancedMessagesAddRooms } from '@/app/(afterLogin)/messages/_lib/getMessagesSearch';
import Text from '@/app/_component/_text/Text';
import ImageContainer from '@/app/_component/_util/ImageContainer';
import { MONTH_EN } from '@/app/_lib/common';
import BadgeSvg from '@/app/_svg/verified/BadgeSvg';
import utils from '@/app/utility.module.css';
import { AdvancedRooms } from '@/model/Room';
import { SafeUser } from '@/model/User';
import cx from 'classnames';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { MouseEventHandler, useContext, useState } from 'react';

interface Props {
  input: string;
  message: AdvancedMessagesAddRooms;
  room: AdvancedRooms;
}

export default function Message({ input, message, room }: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const [hover, setHover] = useState(false);
  const { dispatchMenu } = useContext(SubMenuContext);

  const target =
    session?.user?.email === message.Room.senderid
      ? message.Room.Receiver
      : message.Room.Sender;

  const onClickOption: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { x, y, width, height } = e.currentTarget.getBoundingClientRect();
    dispatchMenu({
      type: 'set',
      payload: {
        flag: true,
        status: {
          type: 'room',
          room,
        },
        position: {
          x,
          y,
          width,
          height,
          target: e.currentTarget,
        },
      },
    });
  };

  const cxRowCenterBetween = cx(
    utils.d_flexRow,
    utils.flex_alignCenter,
    utils.flex_justiBetween
  );
  return (
    <div
      className={cx(
        utils.hover_bg_primary_a_1,
        utils.active_bg_primary_a_2,
        utils.transit_basic
      )}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => {
        router.push(`/messages/${message.roomid}`);
      }}
    >
      <div
        className={cx(
          utils.pa_16,
          utils.d_flexColumn,
          utils.w_100p,
          utils.cursor_point,
          utils.transit_basic
        )}
      >
        <div className={utils.d_flexRow}>
          <div className={cx(utils.d_flexColumn, utils.flex_1)}>
            <div className={cxRowCenterBetween}>
              <Nick target={target} createat={message.createat} />
              <div className={cxRowCenterBetween}>
                <div className={cx(utils.ml_10, utils.h_100p)}>
                  <div
                    className={cx(
                      utils.d_flexRow,
                      utils.flex_justiStart,
                      !hover && utils.w_0,
                      hover ? utils.opacity_1 : utils.opacity_0,
                      utils.of_hide
                    )}
                  >
                    <OptionButton onClick={onClickOption} />
                  </div>
                </div>
              </div>
            </div>
            <Content
              input={input}
              content={message.content}
              media={message.Media}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Nick({ target, createat }: { target: SafeUser; createat: string }) {
  const date = new Date(createat);

  return (
    <div className={utils.d_flexRow}>
      <OtherProfile className={utils.mr_10} user={target} width={32} />
      <div
        className={cx(
          utils.d_flexRow,
          utils.flex_alignCenter,
          utils.flexShrink_1
        )}
      >
        <Text theme="theme" size="m" bold="bold">
          {target.nickname}
        </Text>
        <BadgeSvg type={target.verified?.type} width={18.75} />
        <Text className={cx(utils.prl_4)} theme="gray" size="m">
          ㆍ
        </Text>
        <Text theme="gray" size="s">
          {`${MONTH_EN[date.getMonth()]} ${date.getDate()}`}
        </Text>
      </div>
    </div>
  );
}

function Content({
  input,
  content,
  media,
}: {
  input: string;
  content: AdvancedMessagesAddRooms['content'];
  media: AdvancedMessagesAddRooms['Media'];
}) {
  const startIndex = content.indexOf(input);
  const lastIndex = startIndex + input.length;

  const first = content.substring(0, startIndex);
  const highlight = content.substring(startIndex, lastIndex);
  const last = content.substring(lastIndex);

  return (
    <div
      className={cx(
        utils.pr_28_75,
        utils.d_flexColumn,
        utils.h_max_40,
        utils.of_hide
      )}
    >
      <div className={cx(utils.d_flexRow, utils.flex_justiBetween)}>
        <Text className={cx(utils.ptb_2)} theme="gray" size="m" bold="normal">
          <span>{first}</span>
          <span style={{ backgroundColor: 'rgba(255,212,0,1)' }}>
            {highlight}
          </span>
          <span>{last}</span>
        </Text>
        <div
          className={cx(
            utils.ml_10,
            utils.d_flexColumn,
            utils.w_40,
            utils.h_40,
            utils.br_12,
            utils.of_hide
          )}
        >
          {media !== null && (
            <ImageContainer
              image={{
                src: media.url,
                alt: media.url,
                width: media.width,
                height: media.height,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
