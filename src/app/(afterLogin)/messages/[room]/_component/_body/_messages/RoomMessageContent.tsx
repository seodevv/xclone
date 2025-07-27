import { RoomOwn } from '@/app/(afterLogin)/messages/[room]/_component/_body/_messages/RoomMessage';
import styles from './room.message.module.css';
import utils from '@/app/utility.module.css';
import cx from 'classnames';
import { splitEmoji } from '@/app/_lib/common';
import Text from '@/app/_component/_text/Text';
import { AdvancedMessages } from '@/model/Message';

interface Props {
  content: AdvancedMessages['content'];
  Media: AdvancedMessages['Media'];
  selected?: boolean;
  own: RoomOwn;
  failed?: boolean;
}

function isEmojiOnly(str: string) {
  // remove all white spaces from the input
  const stringToTest = str.replace(/ /g, '');
  const regexForEmojis = /\p{Extended_Pictographic}/gu;
  const regexForAlphaNums = /[\p{L}\p{N}]+/gu;

  // check to see if the string contains emojis
  if (regexForEmojis.test(stringToTest)) {
    // check to see if it contains any alphanumerics
    if (regexForAlphaNums.test(stringToTest)) {
      return false;
    }
    return true;
  }

  return false;
}

export default function RoomMessageContent({
  content,
  Media,
  selected,
  own,
  failed,
}: Props) {
  if (Media !== null && content === '') return null;

  if (isEmojiOnly(content)) {
    const emojis = splitEmoji(content);
    return (
      <Text
        size="fs_37"
        align={own === 'thine' ? 'left' : 'right'}
        style={{ letterSpacing: '-5px' }}
      >
        {emojis.map((e) => e)}
      </Text>
    );
  }

  return (
    <div
      className={cx(
        Media !== null && utils.mt_4,
        utils.transit_basic,
        styles.content,
        failed ? styles.failed : selected ? styles.selected : styles.primary,
        own === 'thine' && styles.you
      )}
    >
      {content}
    </div>
  );
}
