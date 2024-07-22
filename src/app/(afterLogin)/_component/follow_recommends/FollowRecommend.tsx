'use client';

import style from './followRecommend.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { generateImagePath } from '@/app/_lib/common';
import { AdvancedUser } from '@/model/User';
import FollowButton from '@/app/(afterLogin)/_component/buttons/FollowButton';

interface Props {
  data: AdvancedUser;
}

export default function FollowRecommend({ data }: Props) {
  return (
    <Link className={style.container} href={`/${data.id}`}>
      <div className={style.userLogoSection}>
        <div className={style.userLogo}>
          <Image
            src={generateImagePath(data.image)}
            alt={data.id}
            width={40}
            height={40}
          />
        </div>
      </div>
      <div className={style.userInfo}>
        <div className={style.nickname}>{data.nickname}</div>
        <div className={style.identifier}>@{data.id}</div>
      </div>
      <FollowButton className={style.follow} user={data} />
    </Link>
  );
}
