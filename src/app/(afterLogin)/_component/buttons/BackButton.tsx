'use client';

import styles from './button.module.css';
import { CSSProperties, useContext } from 'react';
import { useRouter } from 'next/navigation';
import LeftArrowSvg from '@/app/_svg/arrow/LeftArrowSvg';
import cx from 'classnames';
import { PathRecordContext } from '@/app/_provider/PathRecordProvider';
import useHistoryStore from '@/app/(afterLogin)/_store/HistoryStore';

interface Props {
  className?: string;
  style?: CSSProperties;
  width?: number;
  prevPath?: string;
  noBack?: boolean;
  onClick?: () => void;
}

export default function BackButton({
  className,
  style,
  width = 18,
  prevPath,
  noBack,
  onClick,
}: Props) {
  const router = useRouter();
  const ctx = useContext(PathRecordContext);
  const { stack, removeStack } = useHistoryStore((state) => ({
    stack: state.stack,
    removeStack: state.removeStack,
  }));

  const onClickBack = () => {
    if (prevPath) {
      if (ctx.prevPath === ctx.path) {
        router.push(prevPath);
        return;
      }
    }
    if (typeof onClick === 'function') {
      onClick();
    }

    if (stack < -1) {
      removeStack();
    }

    if (!noBack) router.back();
  };

  return (
    <button
      className={cx(styles.btn, styles.backBtn, className)}
      style={style}
      onClick={onClickBack}
    >
      <LeftArrowSvg width={width} white />
    </button>
  );
}
