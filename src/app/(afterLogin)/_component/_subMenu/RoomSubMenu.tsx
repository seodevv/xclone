'use client';

import SubMenu from '@/app/(afterLogin)/_component/_subMenu/SubMenu';
import SubMenuWrapper from '@/app/(afterLogin)/_component/_subMenu/SubMenuWrapper';
import { ConfirmContext } from '@/app/(afterLogin)/_provider/ConfirmProvider';
import { SubMenuContext } from '@/app/(afterLogin)/_provider/SubMenuProvider';
import { snoozeHandler } from '@/app/(afterLogin)/messages/[room]/info/_component/RoomMessageInfoNotifications';
import useRoomDisableMutation from '@/app/(afterLogin)/messages/_hooks/useRoomDisableMutation';
import useRoomPinMutation from '@/app/(afterLogin)/messages/_hooks/useRoomPinMutation';
import useRoomSnoozeMutation from '@/app/(afterLogin)/messages/_hooks/useRoomSnoozeMutation';
import useAlterModal from '@/app/_hooks/useAlterModal';
import AlarmSvg from '@/app/_svg/post/AlarmSvg';
import DeleteSvg from '@/app/_svg/post/DeleteSvg';
import PinedSvg from '@/app/_svg/post/PinedSvg';
import ReportSvg from '@/app/_svg/post/ReportSvg';
import { AdvancedRooms } from '@/model/Room';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { useContext } from 'react';

interface Props {
  room: AdvancedRooms;
}

export default function RoomSubMenu({ room }: Props) {
  const { data: session } = useSession();
  const { close, hide } = useContext(SubMenuContext);
  const { sendErrorMessage, sendPrepareMessage } = useAlterModal();
  const width = 18.75;

  const pinMutation = useRoomPinMutation();
  const onClickPinned = () => {
    if (!session?.user?.email) return;

    pinMutation.mutate(
      {
        method: room.Pinned ? 'DELETE' : 'POST',
        roomid: room.id,
        sessionid: session.user.email,
      },
      {
        onSettled: () => {
          close();
        },
        onError: () => {
          sendErrorMessage();
        },
      }
    );
  };

  const active = snoozeHandler(room.Snooze).active;
  const snoozeMutation = useRoomSnoozeMutation();
  const onClickSnooze = () => {
    if (!session?.user?.email) return;

    if (active) {
      snoozeMutation.mutate(
        {
          method: 'DELETE',
          roomid: room.id,
          sessionid: session.user.email,
          snooze: null,
        },
        {
          onSettled: () => {
            close();
          },
          onError: () => {
            sendErrorMessage();
          },
        }
      );
    } else {
      snoozeMutation.mutate(
        {
          method: 'POST',
          roomid: room.id,
          sessionid: session.user.email,
          snooze: 'forever',
        },
        {
          onSettled: () => {
            close();
          },
          onError: () => {
            sendErrorMessage();
          },
        }
      );
    }
  };

  const onClickReport = () => {
    sendPrepareMessage();
    close();
  };

  const router = useRouter();
  const pathname = usePathname();
  const { dispatchModal, close: closeConfirm } = useContext(ConfirmContext);
  const disableMutation = useRoomDisableMutation();
  const onClickDelete = () => {
    hide(true);
    dispatchModal({
      type: 'setCustom',
      payload: {
        title: 'Leave conversation?',
        sub: 'This conversation will be deleted from your inbox. Other people in the conversation will still be able to see it.',
        btnTheme: 'red',
        btnText: 'Leave',
        onClickCancle: () => {
          closeConfirm();
          close();
        },
        onClickConfirm: () => {
          if (!session?.user?.email) return;
          if (pathname.includes(room.id)) {
            router.replace('/messages');
          }
          disableMutation.mutate(
            {
              sessionid: session.user.email,
              roomid: room.id,
            },
            {
              onSettled: () => {
                closeConfirm();
                close();
              },
              onError: () => {
                sendErrorMessage();
              },
            }
          );
        },
      },
    });
  };

  return (
    <SubMenuWrapper position="left">
      <SubMenu
        type="div"
        svg={<PinedSvg width={width} white />}
        title={`${room.Pinned ? 'Unpin' : 'Pin'} conversation`}
        onClick={onClickPinned}
      />
      <SubMenu
        type="div"
        svg={<AlarmSvg width={width} type={active ? 'on' : 'off'} white />}
        title={active ? 'Take conversation off snooze' : 'Snooze conversation'}
        onClick={onClickSnooze}
      />
      <SubMenu
        type="div"
        svg={<ReportSvg width={width} white />}
        title="Report conversation"
        onClick={onClickReport}
      />
      <SubMenu
        type="div"
        theme="red"
        svg={<DeleteSvg width={width} />}
        title="Delete conversation"
        onClick={onClickDelete}
      />
    </SubMenuWrapper>
  );
}
