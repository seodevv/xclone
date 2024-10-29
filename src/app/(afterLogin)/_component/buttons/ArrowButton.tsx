'use client';

import LeftArrowSvg from '@/app/_svg/arrow/LeftArrowSvg';
import RightArrowSvg from '@/app/_svg/arrow/RightArrowSvg';
import { CSSProperties, MouseEventHandler } from 'react';

interface Props {
  className?: string;
  style?: CSSProperties;
  type?: 'left' | 'right';
  width?: number;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function ArrowButton({
  className,
  style,
  type = 'left',
  width = 20,
  onClick,
}: Props) {
  return (
    <button className={className} style={style} onClick={onClick}>
      {type === 'left' ? (
        <LeftArrowSvg width={width} white />
      ) : (
        <RightArrowSvg width={width} white />
      )}
    </button>
  );
}
