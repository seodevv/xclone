'use client';

import styles from './room.sender.module.css';
import utils from '@/app/utility.module.css';
import cx from 'classnames';
import {
  ChangeEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import SendSvg from '@/app/_svg/tweet/SendSvg';
import ReactTextareaAutosize from 'react-textarea-autosize';
import { splitEmoji } from '@/app/_lib/common';
import { WebSocketContext } from '@/app/(afterLogin)/messages/[room]/_provider/WebSocketProvider';
import { useSession } from 'next-auth/react';
import useMessagesStore from '@/app/(afterLogin)/_store/MessagesStore';
import RoomMessageFunc from '@/app/(afterLogin)/messages/[room]/_component/_body/_sender/RoomMessageFunc';
import RoomMessageReplyPreview from '@/app/(afterLogin)/messages/[room]/_component/_body/_sender/RoomMessageReplyPreview';
import RoomMessageMediaPreview from '@/app/(afterLogin)/messages/[room]/_component/_body/_sender/RoomMessageMediaPreview';
import { MessageMediaData } from '@/model/socket';
import { MessagesScrollContext } from '@/app/(afterLogin)/messages/[room]/_provider/MessagesScrollProvider';

interface Props {
  roomId: string;
}

export default function RoomMessageSender({ roomId }: Props) {
  const { data: session } = useSession();
  const { info, setScroll } = useContext(MessagesScrollContext);
  const { sendMessage } = useContext(WebSocketContext);
  const { reply, resetReply } = useMessagesStore();

  const [message, setMessage] = useState('');
  const [lastSelection, setLastSelection] = useState(0);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const [media, setMedia] = useState<MessageMediaData | null>(null);

  const onChangeMessage: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setMessage(e.target.value);
  };
  const onKeyDownMessage: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (!e.shiftKey && e.key === 'Enter') {
      e.preventDefault();
      onSubmitMessage();
      return;
    }
  };
  const onBlurMessage: FocusEventHandler<HTMLTextAreaElement> = (e) => {
    const prevContent = message.substring(0, e.target.selectionStart);
    setLastSelection(splitEmoji(prevContent).length);
  };

  const onSubmitMessage = async () => {
    if (message === '' && !media) return;
    if (!session?.user?.email) return;
    if (!session?.user?.image) return;
    if (!session?.user?.name) return;

    await sendMessage({
      type: 'new',
      message: {
        roomid: roomId,
        Sender: {
          id: session.user.email,
          image: session.user.image,
          nickname: session.user.name,
          verified: null,
        },
        content: message,
        parentid: reply ? reply.id : null,
      },
      media: media,
    });
    setMedia(null);
    resetReply();
    setMessage('');
    messageRef.current?.focus();
    if (info.position === 'bottom') {
      setTimeout(() => setScroll('bottom'), 300);
    }
  };

  const onFocusWindow = () => {
    console.log('onFocusWindow');
  };
  const onFocusTextarea = () => {
    console.log('onFocusTextarea');
  };

  useEffect(() => {
    if (reply) {
      messageRef.current?.focus();
    }
  }, [reply]);

  useEffect(() => {
    window.addEventListener('focus', onFocusWindow);
    return () => {
      window.removeEventListener('focus', onFocusWindow);
    };
  }, []);

  return (
    <aside className={styles.sender}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitMessage();
        }}
      >
        <RoomMessageReplyPreview />
        <div className={cx(utils.w_100p, utils.of_hide, styles.progress)}></div>
        <div
          className={cx(
            utils.ptb_8,
            utils.prl_12,
            utils.mtb_4,
            utils.mrl_12,
            utils.pa_4,
            utils.d_flexRow,
            utils.flex_alignCenter,
            utils.br_16,
            styles.bg
          )}
        >
          {/* func */}
          {!media && (
            <RoomMessageFunc
              onLoadedFile={(value) => setMedia(value)}
              onLoadedGif={(gif) =>
                setMedia({
                  type: 'gif',
                  url: gif.url,
                  width: gif.width,
                  height: gif.height,
                })
              }
              onLoadedEmoji={(emoji) => {
                setMessage((prev) => {
                  const a = splitEmoji(prev).splice(0, lastSelection).join('');
                  const b = splitEmoji(prev).splice(lastSelection).join('');
                  return a + emoji.native + b;
                });
                setLastSelection((prev) => prev + 1);
              }}
              onFocusCloseEmoji={() => {
                const range = splitEmoji(message)
                  .splice(0, lastSelection)
                  .join('').length;
                messageRef.current?.setSelectionRange(range, range);
                messageRef.current?.focus();
              }}
            />
          )}
          <div
            className={cx(
              utils.d_flexColumn,
              utils.flex_alignSelfCenter,
              utils.flexShrink_1,
              utils.flexGrow_1
            )}
          >
            <RoomMessageMediaPreview media={media} setMedia={setMedia} />
            <div className={cx(utils.ptb_4, utils.prl_16, utils.d_flexColumn)}>
              <ReactTextareaAutosize
                ref={messageRef}
                className={cx(
                  utils.flexGrow_1,
                  utils.h_min_20,
                  utils.h_max_160,
                  utils.bg_trans,
                  utils.bd_none,
                  utils.outline_none,
                  utils.resize_none
                )}
                placeholder="Start a new message"
                minRows={1}
                maxRows={8}
                maxLength={500}
                spellCheck={false}
                value={message}
                onChange={onChangeMessage}
                onKeyDown={onKeyDownMessage}
                onBlur={onBlurMessage}
                onFocus={onFocusTextarea}
              />
            </div>
          </div>
          {/* sender */}
          <button
            className={cx(
              utils.ml_4,
              utils.d_flexColumn,
              utils.flex_alignCenter,
              utils.flex_justiCenter,
              utils.w_min_36,
              utils.h_min_36,
              utils.bg_trans,
              message !== '' && media && utils.hover_bg_primary,
              message !== '' && media && utils.active_bg_primary,
              utils.bd_1_solid_trans,
              utils.br_9999,
              utils.outline_none,
              utils.transit_basic,
              message === '' && !media ? utils.opacity_0_5 : utils.opacity_1,
              message === '' && !media
                ? utils.cursor_default
                : utils.cursor_point
            )}
            type="submit"
            disabled={message === '' && !media}
          >
            <SendSvg width={20} theme="primary" />
          </button>
        </div>
      </form>
    </aside>
  );
}
