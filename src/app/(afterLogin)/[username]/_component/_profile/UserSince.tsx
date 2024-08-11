import styles from './userProfile.module.css';
import CalendarSvg from '@/app/_svg/profile/CalendarSvg';
import { MONTH_EN } from '@/app/_lib/common';
import Link from 'next/link';
import ReferenceSvg from '@/app/_svg/profile/ReferenceSvg';

interface Props {
  refer?: string;
  regist?: string;
}

export default function UserSince({ refer, regist }: Props) {
  if (!refer && !regist) return null;

  return (
    <div className={styles.userSince}>
      {refer && (
        <Link href={refer} target="_blank" className={styles.refer}>
          <ReferenceSvg className={styles.referSvg} />
          <span>{refer}</span>
        </Link>
      )}
      {regist && (
        <span className={styles.registDate}>
          <CalendarSvg className={styles.calendar} />
          <span>
            {`Joined ${MONTH_EN[new Date(regist).getMonth()]} ${new Date(
              regist
            ).getFullYear()}`}
          </span>
        </span>
      )}
    </div>
  );
}
