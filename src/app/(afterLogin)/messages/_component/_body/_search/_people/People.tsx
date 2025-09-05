'use client';

import OptionButton from '@/app/(afterLogin)/_component/buttons/OptionButton';
import OtherProfile from '@/app/(afterLogin)/_component/profile/OtherProfile';
import Text, { TextBold, TextTheme } from '@/app/_component/_text/Text';
import utils from '@/app/utility.module.css';
import { AdvancedRooms } from '@/model/Room';
import { SafeUser } from '@/model/User';
import cx from 'classnames';
import { useRouter } from 'next/navigation';
import { MouseEventHandler, useState } from 'react';

interface Props {
  input: string;
  user: SafeUser;
  roomid: AdvancedRooms['id'];
}

export default function People({ input, user, roomid }: Props) {
  const router = useRouter();
  const [hover, setHover] = useState(false);

  const onClickContainer: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    router.push(`/messages/${roomid}`);
  };

  return (
    <div
      className={cx(
        utils.hover_bg_primary_a_1,
        utils.active_bg_primary_a_2,
        utils.transit_basic
      )}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClickContainer}
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
          <OtherProfile className={utils.mr_8} user={user} width={40} />
          <div className={cx(utils.d_flexRow, utils.flexGrow_1)}>
            <div
              className={cx(
                utils.d_flexColumn,
                utils.flexBasis_0,
                utils.flexGrow_1
              )}
            >
              <Highlighter
                input={input}
                content={user.nickname}
                theme="theme"
                bold="bold"
              />
              <Highlighter
                input={input}
                content={user.id}
                theme="gray"
                bold="normal"
              />
            </div>
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
                <OptionButton
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Highlighter({
  input,
  content,
  theme = 'theme',
  bold = 'normal',
}: {
  input: string;
  content: string;
  theme?: TextTheme;
  bold?: TextBold;
}) {
  const startIndex = content.indexOf(input);
  const lastIndex = startIndex + input.length;

  const first = content.substring(0, startIndex);
  const highlight = content.substring(startIndex, lastIndex);
  const last = content.substring(lastIndex);

  if (startIndex < 0) {
    return (
      <Text theme={theme} size="m" bold={bold}>
        {content}
      </Text>
    );
  }

  return (
    <Text theme={theme} size="m" bold={bold}>
      <span>{first}</span>
      <span
        style={{
          backgroundColor: 'rgba(255,212,0,1)',
          color: 'rgb(15, 20, 25)',
        }}
      >
        {highlight}
      </span>
      <span>{last}</span>
    </Text>
  );
}
