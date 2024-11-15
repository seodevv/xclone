'use client';

import Text from '@/app/_component/_text/Text';
import styles from './button.module.css';
import cx from 'classnames';
import { MouseEventHandler } from 'react';

interface Props {
  text: string;
  type?: 'button' | 'submit' | 'reset';
  theme?: 'theme' | 'gray' | 'primary' | 'error' | 'black';
  align?: 'left' | 'center' | 'right';
  onClick?: () => void;
}

export default function TransitionTextButton({
  text,
  type = 'button',
  theme = 'theme',
  align = 'center',
  onClick,
}: Props) {
  const onClickButton: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof onClick === 'function') {
      onClick();
    }
  };
  return (
    <button
      className={cx(
        styles.transitionBtn,
        styles[`transit_${theme}`],
        styles[`align_${align}`]
      )}
      type={type}
      onClick={onClickButton}
    >
      <Text theme={theme}>{text}</Text>
    </button>
  );
}
