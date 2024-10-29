'use client';

import useAlterModal from '@/app/_hooks/useAlterModal';
import styles from './button.module.css';
import cx from 'classnames';
import { CSSProperties, MouseEventHandler, useState } from 'react';

interface Props {
  className?: string;
  style?: CSSProperties;
  disabled?: boolean;
}

export default function SubscribeButton({ className, style, disabled }: Props) {
  const { alterMessage } = useAlterModal();
  const [hover, setHover] = useState(false);
  const isSubscribe = false;
  const onClickSubscribe: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    alterMessage('This feature is in preparation.', 'warning');
  };

  return (
    <button
      className={cx(
        styles.btn,
        styles.followBtn,
        isSubscribe && styles.isFollow,
        className
      )}
      style={style}
      type="button"
      onClick={onClickSubscribe}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      disabled={disabled}
    >
      {isSubscribe ? (hover ? 'UnSubscribe' : 'Subscribing') : 'Subscribe'}
    </button>
  );
}
