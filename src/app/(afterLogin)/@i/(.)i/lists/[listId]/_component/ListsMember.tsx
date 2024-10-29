'use client';

import styles from './listsMember.module.css';
import Image from 'next/image';
import { AdvancedUser } from '@/model/User';
import { generateImagePath } from '@/app/_lib/common';
import Link from 'next/link';
import FollowButton from '@/app/(afterLogin)/_component/buttons/FollowButton';
import MemberButton from '@/app/(afterLogin)/_component/buttons/MemberButton';
import { AdvancedLists } from '@/model/Lists';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface Props {
  filter: 'members' | 'followers';
  lists: AdvancedLists;
  member: AdvancedUser;
}

export default function ListsMember({ filter, lists, member }: Props) {
  const router = useRouter();
  const { data: session } = useSession();

  const onClickLists = () => {
    router.push(`/${member.id}`);
  };

  return (
    <div className={styles.listsMember} onClick={onClickLists}>
      <div className={styles.profileSection}>
        <div className={styles.profile}>
          <Image
            src={generateImagePath(member.image)}
            alt={member.id}
            width={40}
            height={40}
          />
        </div>
      </div>
      <div className={styles.informSection}>
        <div className={styles.informTop}>
          <Link className={styles.identity} href={`/${member.id}`}>
            <div className={styles.userNick}>
              <span>{member.nickname}</span>
            </div>
            <div className={styles.userid}>
              <span>@{member.id}</span>
            </div>
          </Link>
          {filter === 'members' && lists.userid === session?.user?.email ? (
            <MemberButton lists={lists} user={member} />
          ) : (
            <FollowButton user={member} />
          )}
        </div>
        <div className={styles.informBottom}>
          <span>{member.desc}</span>
        </div>
      </div>
    </div>
  );
}
