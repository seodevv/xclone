'use client';

import Image from 'next/image';
import styles from './suggested.member.module.css';
import { AdvancedUser } from '@/model/User';
import { generateImagePath } from '@/app/_lib/common';
import Link from 'next/link';
import MemberButton from '@/app/(afterLogin)/_component/buttons/MemberButton';
import { AdvancedLists } from '@/model/Lists';

interface Props {
  lists: AdvancedLists;
  member: AdvancedUser;
}

export default function SuggestedMember({ lists, member }: Props) {
  const href = `/${member.id}`;

  return (
    <div className={styles.member}>
      <Link className={styles.image} href={href}>
        <div className={styles.pad}></div>
        <div className={styles.absolute}>
          <Image
            src={generateImagePath(member.image)}
            alt={member.image}
            width={40}
            height={40}
          />
        </div>
      </Link>
      <div className={styles.inform}>
        <div className={styles.identity}>
          <Link className={styles.nick} href={href}>
            <span>{member.nickname}</span>
          </Link>
          <Link className={styles.id} href={href}>
            <span>@{member.id}</span>
          </Link>
        </div>
        <MemberButton lists={lists} user={member} />
      </div>
    </div>
  );
}
