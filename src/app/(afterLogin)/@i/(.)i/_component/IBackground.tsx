'use client';

import styles from './i.background.module.css';
import utils from '@/app/utility.module.css';
import cx from 'classnames';
import HtmlOverflowHidden from '@/app/_component/_overflow/HtmlOverflowHidden';
import { CSSProperties, MouseEventHandler, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import useHistoryStore from '@/app/(afterLogin)/_store/HistoryStore';

interface Props {
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  height?: 'auto';
  overflow?: 'auto';
  onClick?: () => void;
}

export default function IBackground({
  className,
  style,
  children,
  size = 'medium',
  height,
  overflow,
  onClick,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from');
  const record = useRef({ flag: false, timestamp: 0 });
  const { stack, resetStack } = useHistoryStore((state) => ({
    stack: state.stack,
    resetStack: state.resetStack,
  }));

  const onMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    if (e.target === e.currentTarget) {
      record.current = { flag: true, timestamp: Date.now() };
    } else {
      record.current = { ...record.current, flag: false };
    }
  };

  const onMouseUp: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    if (e.target !== e.currentTarget) return;
    if (!record.current.flag) return;
    // if (Date.now() - record.current.timestamp > 500) return;

    if (typeof onClick === 'function') {
      return onClick();
    }

    if (stack < 0) {
      resetStack();
      window.history.go(stack);
      return;
    }

    router.back();
  };

  return (
    <main
      className={cx(styles.background, !from && utils.fadeIn, className)}
      style={style}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      <HtmlOverflowHidden />
      <div
        className={cx(
          styles.modal,
          styles[size],
          styles[`height-${height}`],
          overflow === 'auto' && styles.auto
        )}
      >
        {children}
      </div>
    </main>
  );
}
