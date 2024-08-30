'use client';

import styles from './i.background.module.css';
import utils from '@/app/utility.module.css';
import cx from 'classnames';
import HtmlOverflowHidden from '@/app/_component/_overflow/HtmlOverflowHidden';
import { CSSProperties, MouseEventHandler } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  overflow?: 'auto';
  onClick?: () => void;
}

export default function IBackground({
  className,
  style,
  children,
  size = 'medium',
  overflow,
  onClick,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from');

  const onClickBackground: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) {
      if (typeof onClick === 'function') {
        onClick();
      } else {
        router.back();
      }
    }
  };

  return (
    <main
      className={cx(styles.background, !from && utils.fadeIn, className)}
      style={style}
      onClick={onClickBackground}
    >
      <HtmlOverflowHidden />
      <div
        className={cx(
          styles.modal,
          styles[size],
          overflow === 'auto' && styles.auto
        )}
      >
        {children}
      </div>
    </main>
  );
}
