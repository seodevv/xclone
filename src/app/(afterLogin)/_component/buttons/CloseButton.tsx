'use client';

import styles from './button.module.css';
import { CSSProperties, MouseEventHandler, useContext } from 'react';
import { useRouter } from 'next/navigation';
import cx from 'classnames';
import XMarkSvg from '@/app/_svg/tweet/XMarkSvg';
import { PathRecordContext } from '@/app/_provider/PathRecordProvider';
import useHistoryStore from '@/app/(afterLogin)/_store/HistoryStore';

interface Props {
  className?: string;
  style?: CSSProperties;
  width?: number;
  isSearch?: boolean;
  isVisible?: boolean;
  prevPath?: string;
  noBack?: boolean;
  onClick?: () => void;
}

export default function CloseButton({
  className,
  style,
  width = 18,
  isSearch,
  isVisible,
  prevPath,
  noBack,
  onClick,
}: Props) {
  const router = useRouter();
  const ctx = useContext(PathRecordContext);
  const resetStack = useHistoryStore((state) => state.resetStack);

  const onClickDefault: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (prevPath) {
      if (ctx.prevPath === ctx.path) {
        router.push(prevPath);
        return;
      }
    }
    if (typeof onClick === 'function') {
      onClick();
    }
    if (!noBack) router.back();
    resetStack();
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
