'use client';

import style from './trendSection.module.css';
import Link from 'next/link';
import { unitConversion } from '@/app/_lib/common';
import { HashTags } from '@/model/Hashtag';

interface Props {
  tag: HashTags;
  index: number;
}

export default function Trend({ tag, index }: Props) {
  const indexing =
    typeof index !== 'undefined' ? `${index + 1}ㆍTrending` : 'Trending';
  const content = tag.type === 'tag' ? `#${tag.title}` : tag.title;

  return (
    <Link
      href={`/search?q=${encodeURIComponent(content)}`}
      className={style.trend}
      style={{ order: index + 1 }}
    >
      <div className={style.count}>{indexing}</div>
      <div className={style.title}>{content}</div>
      <div className={style.count}>{unitConversion(tag.count)} posts</div>
    </Link>
  );
}
