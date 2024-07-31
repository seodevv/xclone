import styles from './postBody.module.css';
import { CSSProperties } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import cx from 'classnames';
import { MONTH_EN } from '@/app/_lib/common';

dayjs.locale('en');
dayjs.extend(relativeTime);

const CONVERT_TIME = (date: Date) => {
  const hour = date.getHours();
  const minute = date.getMinutes();
  const amPm = hour < 12 ? 'AM' : 'PM';

  return amPm === 'AM'
    ? `${hour === 0 ? 12 : hour}:${minute} ${amPm}`
    : `${hour - 12 === 0 ? 12 : hour - 12}:${minute} ${amPm}`;
};

interface Props {
  className?: string;
  style?: CSSProperties;
  date: string;
  based?: number;
  isFull?: boolean;
}

export default function PostDate({
  className,
  style,
  date,
  based = 1000 * 60 * 60 * 24, // 24 hours
  isFull = false,
}: Props) {
  const parsed = new Date(date);
  const isRelatived = Date.now() - parsed.getTime() <= based;
  const isSameYear = new Date().getFullYear() === parsed.getFullYear();

  let content = `${MONTH_EN[parsed.getMonth()].substring(
    0,
    3
  )} ${parsed.getDate()}${isSameYear ? '' : `, ${parsed.getFullYear()}`}`;
  if (isFull) {
    content = `${CONVERT_TIME(parsed)} · ${MONTH_EN[
      parsed.getMonth()
    ].substring(0, 3)} ${parsed.getDate()}, ${parsed.getFullYear()}`;
  }

  if (isRelatived && !isFull) {
    content = dayjs(date).fromNow(true);
  }

  return (
    <span className={cx(styles.postDate, className)} style={style}>
      {content}
    </span>
  );
}
