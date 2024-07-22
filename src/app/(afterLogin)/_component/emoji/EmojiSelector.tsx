'use client';

import styles from './emojiSelector.module.css';
import EmojiSvg from '@/app/_svg/tweet/EmojiSvg';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { Emoji } from 'emoji-mart';
import {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useRef,
  useState,
} from 'react';
import cx from 'classnames';

interface Props {
  setState: Dispatch<SetStateAction<string>>;
  onFocus?: () => void;
  className?: string;
  emojiButtonSize?: number;
  emojiSize?: number;
}

const EmojiSelector = ({
  setState,
  onFocus,
  className,
  emojiButtonSize = 38,
  emojiSize = 20,
}: Props) => {
  const [active, setActive] = useState<{
    flag: boolean;
    position: 'top' | 'bottom';
    x: number;
    y: number;
  }>({ flag: false, position: 'bottom', x: 0, y: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);
  const outsideRef = useRef<HTMLDivElement>(null);

  const onClickEmojiSelect = (emoji: typeof Emoji.Props) => {
    setState((prev) => prev + emoji.native);
    if (typeof onFocus === 'function') {
      onFocus();
    }
  };

  const onClickActive: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!btnRef.current) return;

    const contentWidth = 370;
    const contentHeight = 435;

    const { offsetWidth, offsetHeight } = document.body;
    const { x, y } = btnRef.current.getBoundingClientRect();

    const isTop = offsetHeight - y <= contentHeight;
    if (isTop) {
      return setActive((prev) => ({
        flag: !prev.flag,
        position: 'top',
        x: x - 70,
        y: y - contentHeight,
      }));
    }

    setActive((prev) => ({
      flag: !prev.flag,
      position: 'bottom',
      x: x - 70,
      y: y + 35,
    }));
  };

  const onClickOutSide = (e: Event) => {
    if (e.target === outsideRef.current) {
      setActive((prev) => ({ ...prev, flag: false }));
      if (typeof onFocus === 'function') {
        onFocus();
      }
    }
  };

  return (
    <div className={styles.emojiPicker}>
      <button
        ref={btnRef}
        className={className}
        type="button"
        onClick={onClickActive}
      >
        <EmojiSvg />
      </button>
      {active.flag && (
        <div ref={outsideRef} className={styles.emojiOutside}>
          <div
            className={cx(styles.emojiContainer, styles[active.position])}
            style={{ top: active.y, left: active.x }}
          >
            <Picker
              data={data}
              onEmojiSelect={onClickEmojiSelect}
              onClickOutside={onClickOutSide}
              emojiButtonSize={emojiButtonSize}
              emojiSize={emojiSize}
              autoFocus={true}
              maxFrequentRows={2}
              previewEmoji="arrow_forward"
              skinTonePosition="none"
              theme="auto"
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default EmojiSelector;
