'use client';

import styles from './button.module.css';
import { CSSProperties, useContext } from 'react';
import { useRouter } from 'next/navigation';
import LeftArrowSvg from '@/app/_svg/arrow/LeftArrowSvg';
import cx from 'classnames';
import { PathRecordContext } from '@/app/_provider/PathRecordProvider';

interface Props {
  className?: string;
  style?: CSSProperties;
  width?: number;
  prevPath?: string;
}

export default function BackButton({
  className,
  style,
  width = 18,
  prevPath,
}: Props) {
  const router = useRouter();
  const ctx = useContext(PathRecordContext);

  const onClick = () => {
    if (prevPath) {
      if (ctx.prevPath === ctx.path) {
        router.push(prevPath);
        return;
      }
    }
    router.back();
  };

  return (
    <button
      className={cx(styles.btn, styles.backBtn, className)}
      style={style}
      onClick={onClick}
    >
      <LeftArrowSvg width={width} white />
    </button>
  );
}
