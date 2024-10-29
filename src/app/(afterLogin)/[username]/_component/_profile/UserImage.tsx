import styles from './userImage.module.css';
import cx from 'classnames';
import Image from 'next/image';
import { generateImagePath } from '@/app/_lib/common';
import { Session } from 'next-auth';
import { AdvancedUser } from '@/model/User';
import FollowButton from '@/app/(afterLogin)/_component/buttons/FollowButton';
import TextLink from '@/app/(afterLogin)/_component/Link/TextLink';
import MessageButton from '@/app/(afterLogin)/_component/buttons/MessageButton';
import Link from 'next/link';

interface Props {
  session?: Session | null;
  user?: AdvancedUser;
}

export default function UserImage({ session, user }: Props) {
  const isMyProfile = session?.user?.email === user?.id;

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
              <MessageButton className={styles.mr_4} />
              <FollowButton user={user} />
            </>
          )}
        </div>
      )}
    </div>
  );
}
