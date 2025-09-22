'use client';

import styles from './emojiSelector.module.css';
import EmojiSvg from '@/app/_svg/tweet/EmojiSvg';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { Emoji } from 'emoji-mart';
import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import cx from 'classnames';
import useViewport from '../../_hooks/useViewport';
import OptionSvg from '@/app/_svg/post/OptionSvg';

export type EmojiProps = typeof Emoji.Props;

interface Props {
  className?: string;
  type?: 'emoji' | 'option';
  theme?: 'default' | 'white' | 'primary';
  onSuccess?: (emoji: EmojiProps, close: () => void) => void;
  onFocus?: () => void;
  emojiButtonSize?: number;
  emojiSize?: number;
}

const EmojiSelector = ({
  className,
  type = 'emoji',
  theme = 'default',
  onSuccess,
  onFocus,
  emojiButtonSize = 38,
  emojiSize = 20,
}: Props) => {
  const { width, height } = useViewport();
  const [active, setActive] = useState<{
    flag: boolean;
    position: 'top' | 'bottom';
    x: number;
    y: number;
  }>({ flag: false, position: 'bottom', x: 0, y: 0 });
  const [fadeOut, setFadeOut] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const outsideRef = useRef<HTMLDivElement>(null);

  const onClickEmojiSelect = (emoji: EmojiProps) => {
    if (typeof onSuccess === 'function') {
      onSuccess(emoji, selectorClose);
    }
  };

  const onClickActive: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!btnRef.current) return;
    if (width === null || height === null) return;

    const contentWidth = 370;
    const contentHeight = 435;
    const { x, y } = btnRef.current.getBoundingClientRect();

    const isTop = height - y <= contentHeight && y >= contentHeight;
    const isLeft = width - x <= contentWidth && x >= contentWidth;
    const _x = isLeft ? x - 15 - (contentWidth - (width - x)) : x - 70;
    const _y = isTop ? y - contentHeight : y + 35;

    setActive((prev) => ({
      flag: !prev.flag,
      position: isTop ? 'top' : 'bottom',
      x: _x,
      y: _y,
    }));
  };
  const onClickOutSide = (e: Event) => {
    if (e.target === outsideRef.current) {
      selectorClose();
      if (typeof onFocus === 'function') {
        onFocus();
      }
    }
  };
  const selectorClose = useCallback(() => {
    setFadeOut(true);
    setTimeout(() => {
      setActive((prev) => ({ ...prev, flag: false }));
      setFadeOut(false);
    }, 300);

    if (typeof onFocus === 'function') {
      onFocus();
    }
  }, [setFadeOut, setActive, onFocus]);

  useEffect(() => {
    const scrollListener = () => {
      selectorClose();
    };
    const keydownListener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        selectorClose();
      }
    };
    if (active.flag) {
      window.addEventListener('scroll', scrollListener);
      window.addEventListener('keydown', keydownListener);
    }
    return () => {
      if (active.flag) {
        window.removeEventListener('scroll', scrollListener);
        window.removeEventListener('keydown', keydownListener);
      }
    };
  }, [active.flag, selectorClose]);

  return (
    <div className={styles.emojiPicker}>
      <button
        type="button"
        ref={btnRef}
        className={className}
        onClick={onClickActive}
      >
        {type === 'emoji' && <EmojiSvg theme={theme} width={20} />}
        {type === 'option' && <OptionSvg theme={theme} width={20} />}
      </button>
      {active.flag && (
        <div ref={outsideRef} className={styles.emojiOutside}>
          <div
            className={cx(
              styles.emojiContainer,
              styles[active.position],
              fadeOut && styles.fadeOut
            )}
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
