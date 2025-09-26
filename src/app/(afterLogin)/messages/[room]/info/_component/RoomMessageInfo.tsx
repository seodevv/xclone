'use client';

import { useUserQuery } from '@/app/(afterLogin)/[username]/_hooks/useUserQuery';
import FollowButton from '@/app/(afterLogin)/_component/buttons/FollowButton';
import TransitionTextButton from '@/app/(afterLogin)/_component/buttons/TransitionTextButton';
import LoadingSpinner from '@/app/(afterLogin)/_component/loading/LoadingSpinner';
import OtherProfile from '@/app/(afterLogin)/_component/profile/OtherProfile';
import useConfirmStore, {
  confirmSelector,
} from '@/app/(afterLogin)/_store/ConfirmStore';
import RoomMessageInfoNotifications from '@/app/(afterLogin)/messages/[room]/info/_component/RoomMessageInfoNotifications';
import useGetRoom from '@/app/(afterLogin)/messages/_hooks/useGetRoom';
import useRoomDisableMutation from '@/app/(afterLogin)/messages/_hooks/useRoomDisableMutation';
import Text from '@/app/_component/_text/Text';
import DivideLine from '@/app/_component/_util/DivideLine';
import useAlterModal from '@/app/_hooks/useAlterModal';
import utils from '@/app/utility.module.css';
import cx from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Props {
  roomid: string;
  sessionid: string;
  receiverid: string;
}

export default function RoomMessageInfo({
  roomid,
  sessionid,
  receiverid,
}: Props) {
  const router = useRouter();
  const { data: user } = useUserQuery(receiverid);
  const { data: room } = useGetRoom(roomid);
  const { open, close } = useConfirmStore(confirmSelector);
  const { sendPrepareMessage, sendErrorMessage } = useAlterModal();

  const disableMutation = useRoomDisableMutation();
  const onClickLeave = () => {
    open({
      flag: true,
      title: 'Leave conversation?',
      sub: 'This conversation will be deleted from your inbox. Other people in the conversation will still be able to see it.',
      btnText: 'Leave',
      btnTheme: 'red',
      onClickCancle: () => {
        close();
      },
      onClickConfirm: () => {
        disableMutation.mutate(
          {
            sessionid,
            roomid,
          },
          {
            onSettled: () => {
              close();
              router.push('/messages');
            },
            onError: () => {
              sendErrorMessage();
            },
          }
        );
      },
    });
  };

  if (typeof user !== 'undefined' && typeof room !== 'undefined') {
    const isFollower = !!user.data.Followings.find((u) => u.id === sessionid);

    return (
      <div
        className={cx(
          utils.d_flexColumn,
          utils.w_100px,
          utils.w_max_600,
          utils.bg_theme
        )}
      >
        <div className={utils.d_flexColumn}>
          <div
            className={cx(
              utils.ptb_12,
              utils.prl_16,
              utils.d_flexRow,
              utils.hover_bg_gray,
              utils.active_bg_gray,
              utils.transit_basic,
              utils.cursor_point
            )}
            onClick={() => {
              router.push(`/${user.data.id}`);
            }}
          >
            {/* user profile */}
            <OtherProfile
              className={utils.mr_8}
              user={{
                id: user.data.id,
                nickname: user.data.nickname,
                image: user.data.image,
                verified: user.data.verified,
              }}
              width={40}
            />
            <div
              className={cx(
                utils.d_flexRow,
                utils.flex_alignCenter,
                utils.flex_justiBetween,
                utils.flexGrow_1
              )}
            >
              {/* user info */}
              <div className={utils.d_flexColumn}>
                <Link href={`/${user.data.id}`}>
                  <Text text={user.data.nickname} size="m" bold="bold" />
                </Link>
                <div className={cx(utils.d_flexRow, utils.flex_alignCenter)}>
                  <Link href={`/${user.data.id}`}>
                    <Text
                      text={`@${user.data.id}`}
                      size="m"
                      bold="normal"
                      theme="gray"
                    />
                  </Link>
                  {isFollower && (
                    <div
                      className={cx(
                        utils.d_flexColumn,
                        utils.flex_alignCenter,
                        utils.br_4
                      )}
                    >
                      <Text
                        className={cx(
                          utils.ml_4,
                          utils.ptb_2,
                          utils.prl_4,
                          utils.bg_gray_light
                        )}
                        size="fs_11"
                        bold="normal"
                        theme="gray"
                        text="Follows you"
                      />
                    </div>
                  )}
                </div>
              </div>
              {/* follow button */}
              <FollowButton
                className={cx(utils.ml_12, utils.w_min_99)}
                user={user.data}
              />
            </div>
          </div>
        </div>
        <RoomMessageInfoNotifications
          nickname={user.data.nickname}
          roomid={room.data.id}
          Snooze={room.data.Snooze}
        />
        <div className={utils.d_flexColumn}>
          <DivideLine />
          <TransitionTextButton
            type="button"
            text="Block DMs"
            theme="primary"
            onClick={() => {
              open({
                flag: true,
                title: '',
                sub: `Block DMs from @${user.data.id}?`,
                btnText: 'Yes',
                onClickCancle: () => {
                  close();
                },
                onClickConfirm: () => {
                  sendPrepareMessage();
                  close();
                },
              });
            }}
          />
          <TransitionTextButton
            type="button"
            text="Block everything"
            theme="primary"
            onClick={() => {
              open({
                flag: true,
                title: '',
                sub: `Block @${user.data.id}, @${user.data.id} will no longer be able to follow or message you, and you will not see notifications from @${user.data.id}`,
                btnText: 'Yes',
                onClickCancle: () => {
                  close();
                },
                onClickConfirm: () => {
                  sendPrepareMessage();
                  close();
                },
              });
            }}
          />

          <TransitionTextButton
            type="button"
            text="Report"
            theme="primary"
            onClick={() => sendPrepareMessage()}
          />
          <TransitionTextButton
            type="button"
            text="Leave conversation"
            theme="error"
            onClick={onClickLeave}
          />
        </div>
      </div>
    );
  }

  return <LoadingSpinner />;
}
