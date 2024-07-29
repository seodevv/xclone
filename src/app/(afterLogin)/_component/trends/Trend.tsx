'use client';

import style from './trendSection.module.css';
import Link from 'next/link';
import { Tags } from '@/model/Hashtag';
import { unitConversion } from '@/app/_lib/common';

interface Props {
  tag: Tags;
  index?: number;
}

export default function Trend({ tag, index }: Props) {
  return (
    <Link
      href={`/search?q=${encodeURIComponent('#' + tag.title)}`}
      className={style.trend}
    >
      <div className={style.count}>
        {typeof index !== 'undefined' && `${index + 1} · `}Trending
      </div>
      <div className={style.title}>
        {tag.type === 'tag' ? `#${tag.title}` : tag.title}
      </div>
      <div className={style.count}>{unitConversion(tag.count)} posts</div>
    </Link>
  );
}
