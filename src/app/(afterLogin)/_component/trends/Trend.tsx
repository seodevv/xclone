'use client';

import style from './trendSection.module.css';
import Link from 'next/link';
import { HashTag } from '@/model/Hashtag';

interface Props {
  tag: HashTag;
}

export default function Trend({ tag }: Props) {
  return (
    <Link href={`/search?q=${tag.title}`} className={style.trend}>
      <div className={style.count}>Trending</div>
      <div className={style.title}>{tag.title}</div>
      <div className={style.count}>{tag.count.toLocaleString()} posts</div>
    </Link>
  );
}
