'use client';

import { useUserQuery } from '@/app/(afterLogin)/[username]/_hooks/useUserQuery';
import FollowButton from '@/app/(afterLogin)/_component/buttons/FollowButton';
import TransitionTextButton from '@/app/(afterLogin)/_component/buttons/TransitionTextButton';
import LoadingSpinner from '@/app/(afterLogin)/_component/loading/LoadingSpinner';
import OtherProfile from '@/app/(afterLogin)/_component/profile/OtherProfile';
import { ConfirmContext } from '@/app/(afterLogin)/_provider/ConfirmProvider';
import { SubMenuContext } from '@/app/(afterLogin)/_provider/SubMenuProvider';
import useSettingsLocalStore, {
  ConversationInfoSelector,
} from '@/app/(afterLogin)/_store/SettingsLocalStore';
import IdentifierToggle from '@/app/_component/_input/IdentifierToggle';
import Text from '@/app/_component/_text/Text';
import DivideLine from '@/app/_component/_util/DivideLine';
import useAlterModal from '@/app/_hooks/useAlterModal';
import { decryptRoomId } from '@/app/_lib/common';
import utils from '@/app/utility.module.css';
import cx from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';

interface Props {
  sessionId: string;
  roomId: string;
}

export default function RoomMessageInfo({ sessionId, roomId }: Props) {
  const router = useRouter();
  const targetUserId = decryptRoomId({ userId: sessionId, roomId });
  const { data: user } = useUserQuery(targetUserId);
  const { dispatchMenu } = useContext(SubMenuContext);
  const { conversationInfo, setConverstationInfo } = useSettingsLocalStore(
    ConversationInfoSelector
  );
  const { dispatchModal, close } = useContext(ConfirmContext);
  const { sendPrepareMessage } = useAlterModal();

  if (typeof user !== 'undefined') {
    const isFollower = !!user.data.Followings.find((u) => u.id === sessionId);

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
            title={`Snooze notifications from ${user.data.nickname}`}
            defaultValue={!!conversationInfo.find((c) => c.id === user.data.id)}
            onToggleOn={(check, setCheck, event) => {
              const { x, y, width, height } =
                event.currentTarget.getBoundingClientRect();
              dispatchMenu({
                type: 'set',
                payload: {
                  flag: true,
                  status: {
                    type: 'message',
                    detail: 'notification',
                    callback: (value) => {
                      dispatchMenu({ type: 'reset' });
                      setCheck(true);
                      setConverstationInfo({
                        type: 'add',
                        payload: {
                          id: user.data.id,
                          snooze: value,
                          timestamp: new Date(),
                        },
                      });
                    },
                  },
                  position: {
                    x,
                    y,
                    width,
                    height,
                    target: event.currentTarget,
                  },
                },
              });
            }}
            onToogleOff={(check, setCheck) => {
              dispatchMenu({ type: 'reset' });
              setCheck(false);
              setConverstationInfo({
                type: 'delete',
                payload: { id: user.data.id },
              });
            }}
          />
        </div>
        <div className={utils.d_flexColumn}>
          <DivideLine />
          <TransitionTextButton
            type="button"
            text="Block DMs"
            theme="primary"
            onClick={() => {
              dispatchModal({
                type: 'setCustom',
                payload: {
                  title: '',
                  sub: `Block DMs from @${user.data.id}?`,
                  btnText: 'Yes',
                  onClickCancle: () => close(),
                  onClickConfirm: () => sendPrepareMessage(),
                },
              });
            }}
          />
          <TransitionTextButton
            type="button"
            text="Block everything"
            theme="primary"
            onClick={() => {
              dispatchModal({
                type: 'setCustom',
                payload: {
                  title: '',
                  sub: `Block @${user.data.id}, @${user.data.id} will no longer be able to follow or message you, and you will not see notifications from @${user.data.id}`,
                  btnText: 'Yes',
                  onClickCancle: () => close(),
                  onClickConfirm: () => sendPrepareMessage(),
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
            onClick={() => {
              dispatchModal({
                type: 'setCustom',
                payload: {
                  title: 'Leave conversation?',
                  sub: 'This conversation will be deleted from your inbox. Other people in the conversation will still be able to see it.',
                  btnText: 'Leave',
                  btnTheme: 'red',
                  onClickCancle: () => close(),
                  onClickConfirm: () => {},
                },
              });
            }}
          />
        </div>
      </div>
    );
  }

  return <LoadingSpinner />;
}
