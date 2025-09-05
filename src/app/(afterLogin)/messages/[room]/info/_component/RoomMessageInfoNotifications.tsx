import utils from '@/app/utility.module.css';
import cx from 'classnames';
import { AdvancedRooms } from '@/model/Room';
import DivideLine from '@/app/_component/_util/DivideLine';
import Text from '@/app/_component/_text/Text';
import IdentifierToggle from '@/app/_component/_input/IdentifierToggle';
import { ChangeEvent, Dispatch, SetStateAction, useContext } from 'react';
import { SubMenuContext } from '@/app/(afterLogin)/_provider/SubMenuProvider';
import useRoomSnoozeMutation from '@/app/(afterLogin)/messages/_hooks/useRoomSnoozeMutation';
import { useSession } from 'next-auth/react';
import { DAY_EN, MONTH_EN } from '@/app/_lib/common';

export const snoozeHandler = (
  snooze: AdvancedRooms['Snooze']
): { text: string; active: boolean } => {
  const result = {
    text: '',
    active: false,
  };

  if (snooze === null) return result;

  const { type, createat } = snooze;
  const convert = new Date(createat);
  const now = new Date();

  switch (type) {
    case '1h':
    case '8h': {
      const time = convert.getHours() + (type === '1h' ? 1 : 8);
      const standard = new Date(new Date(convert).setHours(time));

      if (time >= 24) {
        standard.setDate(convert.getDate() + 1);
      }

      if (standard >= now) {
        const hours = standard.getHours();
        const minutes = standard.getMinutes();
        const amPm = standard.getHours() >= 12 ? 'PM' : 'AM';
        result.text = `Snoozed until ${hours < 10 ? `0${hours}` : hours}:${
          minutes < 10 ? `0${minutes}` : minutes
        } ${amPm}`;
        result.active = true;
      }
      break;
    }
    case '1w': {
      const date = convert.getDate() + 7;
      const maxDate = new Date(
        convert.getFullYear(),
        convert.getMonth() + 1,
        0
      ).getDate();
      const standard = new Date(new Date(convert).setDate(date));

      if (date > maxDate) {
        standard.setMonth(convert.getMonth() + 1);
      }

      if (standard >= now) {
        result.text = `Snoozed until ${DAY_EN[standard.getDay()]}, ${MONTH_EN[
          standard.getMonth()
        ].substring(0, 3)} ${
          standard.getDate() < 10
            ? `0${standard.getDate()}`
            : standard.getDate()
        }`;
        result.active = true;
      }
      break;
    }
    case 'forever': {
      result.active = true;
      break;
    }
  }

  return result;
};

interface Props {
  nickname: string;
  roomid: AdvancedRooms['id'];
  Snooze: AdvancedRooms['Snooze'];
}

export default function RoomMessageInfoNotifications({
  nickname,
  roomid,
  Snooze,
}: Props) {
  const { data: session } = useSession();
  const { dispatchMenu, close } = useContext(SubMenuContext);
  const mutation = useRoomSnoozeMutation();

  const onToggleOn = (
    check: boolean,
    setCheck: Dispatch<SetStateAction<boolean>>,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { x, y, width, height } = event.currentTarget.getBoundingClientRect();
    dispatchMenu({
      type: 'set',
      payload: {
        flag: true,
        position: {
          x,
          y,
          width,
          height,
          target: event.currentTarget,
        },
        status: {
          type: 'message_notification',
          callback: (snooze) => {
            if (!session?.user?.email) return;

            mutation.mutate(
              {
                method: 'POST',
                sessionid: session.user.email,
                roomid,
                snooze,
              },
              {
                onSuccess: () => {
                  setCheck(true);
                  close();
                },
              }
            );
          },
        },
      },
    });
  };

  const onToggleOff = (
    check: boolean,
    setCheck: Dispatch<SetStateAction<boolean>>
  ) => {
    if (!session?.user?.email) return;

    mutation.mutate(
      {
        method: 'DELETE',
        sessionid: session.user.email,
        roomid,
        snooze: null,
      },
      {
        onSuccess: () => {
          setCheck(false);
          close();
        },
      }
    );
  };

  return (
    <div className={utils.d_flexColumn}>
      <DivideLine />
      <Text
        className={cx(
          utils.ptb_12,
          utils.prl_16,
          utils.d_flexColumn,
          utils.flex_justiBetween
        )}
        text="Notifications"
        size="xl"
        bold="bold"
        theme="theme"
      />
      <IdentifierToggle
        title={`Snooze notifications from ${nickname}`}
        defaultValue={snoozeHandler(Snooze).active}
        onToggleOn={onToggleOn}
        onToogleOff={onToggleOff}
      />
      {snoozeHandler(Snooze).active && (
        <Text
          className={cx(utils.prl_16, utils.pb_12)}
          style={{
            marginTop: -16,
          }}
          theme="gray"
          size="xs"
          bold="normal"
        >
          {snoozeHandler(Snooze).text}
        </Text>
      )}
    </div>
  );
}
