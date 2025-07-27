import utils from '@/app/utility.module.css';
import cx from 'classnames';
import { AdvancedMessages } from '@/model/Message';
import { RoomOwn } from '@/app/(afterLogin)/messages/[room]/_component/_body/_messages/RoomMessage';
import Text from '@/app/_component/_text/Text';
import { MouseEventHandler, useContext } from 'react';
import useMessagesQueryData from '@/app/(afterLogin)/messages/[room]/_hooks/useMessagesQueryData';
import { WebSocketContext } from '@/app/(afterLogin)/messages/[room]/_provider/WebSocketProvider';
import { dataURLtoFile } from '@/app/_lib/common';

interface Props {
  sessionId: string;
  message: AdvancedMessages;
  own: RoomOwn;
}

export default function RoomMessageFailed({ sessionId, message, own }: Props) {
  const { deleteMessage } = useMessagesQueryData({ sessionId });
  const { sendMessage } = useContext(WebSocketContext);

  const onClickDelete: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation;
    deleteMessage({
      roomId: message.roomid,
      target: { messageId: message.id },
    });
  };

  const onClickRetry: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();

    sendMessage({
      type: 'retry',
      message: {
        id: message.id,
        roomid: message.roomid,
        content: message.content,
        parentid: message.parentid,
        Sender: message.Sender,
      },
      media:
        message.Media?.type === 'image' && message.Media.filename
          ? {
              type: 'image',
              url: message.Media.url,
              width: message.Media.width,
              height: message.Media.height,
              file: dataURLtoFile(message.Media.url, message.Media.filename),
              filename: message.Media.filename,
            }
          : message.Media?.type === 'gif'
          ? {
              type: 'gif',
              url: message.Media.url,
              width: message.Media.width,
              height: message.Media.height,
            }
          : null,
    });
  };

  return (
    <div
      className={cx(
        utils.d_flexColumn,
        own === 'thine' ? utils.alignself_start : utils.alignself_end,
        utils.w_875p,
        utils.of_hide
      )}
    >
      <Text
        theme="gray"
        size="xs"
        align={own === 'thine' ? 'left' : 'right'}
        text="Message failed to send"
      />
      <div
        className={cx(
          utils.d_flexRow,
          own === 'thine' ? utils.flex_justiStart : utils.flex_justiEnd
        )}
      >
        <button
          className={cx(utils.bg_trans, utils.bd_none, utils.cursor_point)}
          type="button"
          onClick={onClickDelete}
        >
          <Text
            theme="pink"
            size="xs"
            bold="light"
            hover="underline"
            text="Delete for you"
          />
        </button>
        <Text className={utils.prl_4} theme="gray" size="xs" text="ㆍ" />
        <button
          className={cx(utils.bg_trans, utils.bd_none, utils.cursor_point)}
          onClick={onClickRetry}
        >
          <Text
            theme="primary"
            size="xs"
            bold="light"
            hover="underline"
            text="Try again"
          />
        </button>
      </div>
    </div>
  );
}
