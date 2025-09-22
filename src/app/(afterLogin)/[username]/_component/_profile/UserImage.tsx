'use client';

import styles from './userImage.module.css';
import cx from 'classnames';
import Image from 'next/image';
import { encryptRoomId, generateImagePath } from '@/app/_lib/common';
import { Session } from 'next-auth';
import { AdvancedUser } from '@/model/User';
import FollowButton from '@/app/(afterLogin)/_component/buttons/FollowButton';
import TextLink from '@/app/(afterLogin)/_component/Link/TextLink';
import MessageButton from '@/app/(afterLogin)/_component/buttons/MessageButton';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Props {
  session?: Session | null;
  user?: AdvancedUser;
}

export default function UserImage({ session, user }: Props) {
  const router = useRouter();
  const isMyProfile = session?.user?.email === user?.id;

  const onClickMessage = () => {
    if (!session?.user?.email) return;
    if (typeof user === 'undefined') return;

    const roomid = encryptRoomId(session.user.email, user.id);
    router.push(`/messages/${roomid}`);
  };

  return (
    <div className={styles.userImage}>
      <Link
        className={styles.imageBox}
        href={`${user?.id}/photo`}
        scroll={false}
      >
        <div className={styles.pad}></div>
        <div className={styles.absolute}>
          {user && (
            <Image
              className={styles.image}
              src={generateImagePath(user.image)}
              alt={user.id}
              width={145}
              height={145}
            />
          )}
        </div>
        <div className={cx(styles.absolute, styles.effect)}></div>
      </Link>
      {user && (
        <div className={styles.flex}>
          {isMyProfile ? (
            <TextLink
              theme="reverse"
              text="Edit profile"
              href="/settings/profile"
            />
          ) : (
            <>
              {session && (
                <MessageButton
                  className={styles.mr_4}
                  onClick={onClickMessage}
                />
              )}
              <FollowButton user={user} />
            </>
          )}
        </div>
      )}
    </div>
  );
}
