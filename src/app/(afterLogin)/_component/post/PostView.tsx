import { unitConversion } from '@/app/_lib/common';
import { CSSProperties } from 'react';

interface Props {
  className?: string;
  style?: CSSProperties;
}

export default function PostView({ className, style }: Props) {
  return (
    <span className={className} style={style}>
      <span>{unitConversion(1234)}</span>
      <span>Views</span>
    </span>
  );
}
