'use client';

import styles from './i.background.module.css';
import utils from '@/app/utility.module.css';
import cx from 'classnames';
import HtmlOverflowHidden from '@/app/_component/_overflow/HtmlOverflowHidden';
import { MouseEventHandler } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  children?: React.ReactNode;
  small?: boolean;
  onClick?: () => void;
}

export default function IBackground({ children, small, onClick }: Props) {
  const router = useRouter();

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
      className={cx(styles.background, utils.fadeIn)}
      onClick={onClickBackground}
    >
      <HtmlOverflowHidden />
      <div className={cx(styles.modal, small && styles.smallModal)}>
        {children}
      </div>
    </main>
  );
}
