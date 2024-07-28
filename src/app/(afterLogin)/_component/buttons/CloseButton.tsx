'use client';

import styles from './button.module.css';
import { CSSProperties, MouseEventHandler } from 'react';
import { useRouter } from 'next/navigation';
import cx from 'classnames';
import XMarkSvg from '@/app/_svg/tweet/XMarkSvg';

interface Props {
  className?: string;
  style?: CSSProperties;
  width?: number;
  isSearch?: boolean;
  isVisible?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function CloseButton({
  className,
  style,
  width = 18,
  isSearch,
  isVisible,
  onClick,
}: Props) {
  const router = useRouter();
  const onClickDefault = () => {
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
      onClick={onClick ? onClick : onClickDefault}
    >
      <XMarkSvg width={width} white />
    </button>
  );
}
