'use client';

import styles from './button.module.css';
import { CSSProperties, MouseEventHandler, useContext } from 'react';
import { useRouter } from 'next/navigation';
import cx from 'classnames';
import XMarkSvg from '@/app/_svg/tweet/XMarkSvg';
import { PathRecordContext } from '@/app/_provider/PathRecordProvider';

interface Props {
  className?: string;
  style?: CSSProperties;
  width?: number;
  isSearch?: boolean;
  isVisible?: boolean;
  prevPath?: string;
  onClick?: () => void;
}

export default function CloseButton({
  className,
  style,
  width = 18,
  isSearch,
  isVisible,
  prevPath,
  onClick,
}: Props) {
  const router = useRouter();
  const ctx = useContext(PathRecordContext);
  const onClickDefault = () => {
    if (prevPath) {
      if (ctx.prevPath === ctx.path) {
        router.push(prevPath);
        return;
      }
    }
    if (typeof onClick === 'function') {
      onClick();
    }
    router.back();
  };

  return (
    <button
      type="button"
      className={cx(
        styles.btn,
        isSearch && styles.searchBtn,
        isVisible && styles.visible,
        className
      )}
      style={style}
      onClick={onClickDefault}
    >
      <XMarkSvg width={width} white />
    </button>
  );
}
