'use client';

import utils from '@/app/utility.module.css';
import cx from 'classnames';
import { useUserQuery } from '@/app/(afterLogin)/[username]/_hooks/useUserQuery';
import Image from 'next/image';
import { generateImagePath, MONTH_EN } from '@/app/_lib/common';
import Link from 'next/link';
import Text from '@/app/_component/_text/Text';
import UserDesc from '@/app/(afterLogin)/[username]/_component/_profile/UserDesc';
import useGetRoomMessages from '@/app/(afterLogin)/messages/[room]/_lib/useGetRoomMessages';

interface Props {
  receiverId: string;
  sessionId: string;
  roomId: string;
}

export default function RoomReceiverInfo({
  receiverId,
  sessionId,
  roomId,
}: Props) {
  const { data: user } = useUserQuery(receiverId);
  const { data: rooms, hasPreviousPage } = useGetRoomMessages({
    sessionId,
    roomId: roomId,
  });
  const availableMessages = rooms?.pages
    .map((p) => p.data)
    .flat()
    .filter((m) => !m.Disable.find((u) => u.id === sessionId));

  if (
    typeof user === 'undefined' ||
    typeof rooms === 'undefined' ||
    hasPreviousPage ||
    availableMessages?.length === 0
  ) {
    return null;
  }

  const registDate = new Date(user.data.regist);

  return (
    <div
      className={cx(
        utils.mb_16,
        utils.ptb_20,
        utils.prl_16,
        utils.d_flexColumn,
        utils.flex_alignCenter,
        utils.bd_b_1_solid_gray,
        utils.transit_basic,
        utils.hover_bg_gray,
        utils.cursor_point
      )}
    >
      <div style={{ width: '64px', height: '64px' }} className={utils.relative}>
        <div className={cx(utils.pb_100, utils.w_100p)}></div>
        <div
          className={cx(
            utils.absolute,
            utils.t_r_b_l_0,
            utils.w_100p,
            utils.h_100p
          )}
        >
          <Image
            className={cx(utils.br_50)}
            src={generateImagePath(user.data.image)}
            alt={user.data.image}
            width={64}
            height={64}
          />
        </div>
      </div>
      <div className={cx(utils.w_max_100p, utils.flexShrink_1)}>
        <div
          className={cx(
            utils.mb_4,
            utils.d_flexColumn,
            utils.flex_alignCenter,
            utils.flexShrink_1
          )}
        >
          <Link className={cx(utils.cursor_point)} href={`/${user.data.id}`}>
            <Text text={user.data.id} bold="bold" />
          </Link>
          <Link className={utils.cursor_point} href={`/${user.data.id}`}>
            <Text text={`@${user.data.nickname}`} theme="gray" size="s" />
          </Link>
        </div>
      </div>
      <div className={utils.mt_12}>
        <UserDesc desc={user.data.desc} align="center" />
      </div>
      <div
        className={cx(
          utils.mt_12,
          utils.mb_12,
          utils.d_flexRow,
          utils.flex_alignBase
        )}
      >
        <Text
          text={`Joined ${
            MONTH_EN[registDate.getMonth()]
          } ${registDate.getFullYear()} · ${
            user.data._count.Followers
          } Followers`}
          theme="gray"
          size="s"
        />
      </div>
    </div>
  );
}
