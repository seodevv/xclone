import { MouseEventHandler } from 'react';
import styles from './followRecommend.module.css';
import cx from 'classnames';
import { AdvancedUser } from '@/model/User';
import { generateImagePath } from '@/app/_lib/common';
import Image from 'next/image';
import BadgeSvg from '@/app/_svg/verified/BadgeSvg';
import CheckSvg from '@/app/_svg/input/CheckSvg';

interface Props {
  user: AdvancedUser;
  isCheck?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export default function UserRecommend({ user, isCheck, onClick }: Props) {
  return (
    <div className={cx(styles.container, styles.cursor)} onClick={onClick}>
      <div className={styles.userLogo}>
        <Image
          src={generateImagePath(user.image)}
          alt={user.id}
          width={40}
          height={40}
        />
      </div>
      <div className={styles.userInfo}>
        <div
          className={cx(styles.flex, styles.alignCenter, styles.justBetween)}
        >
          <div className={styles.grow}>
            <div className={styles.nickname}>
              {user.nickname}
              <BadgeSvg type={user.verified?.type} />
            </div>
            <div className={styles.identifier}>@{user.id}</div>
          </div>
          {isCheck && (
            <div>
              <CheckSvg width={18.75} style={{ fill: 'rgb(29,155,240)' }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
